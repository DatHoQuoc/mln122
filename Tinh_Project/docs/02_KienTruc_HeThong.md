# 02 — KIẾN TRÚC HỆ THỐNG

> Đọc sau `00` và `01`. File này chốt kiến trúc kỹ thuật; cấu trúc thư mục cụ thể ở `03_CauTruc_ThuMuc_Repo.md`.

## 1. Sơ đồ tổng thể (Manifest V3, local-only)

```
┌─────────────────────────────  Trình duyệt Chrome  ─────────────────────────────┐
│                                                                                 │
│  Tab YouTube/Facebook                        Extension                          │
│  ┌──────────────────────┐     chrome.runtime.sendMessage / port                 │
│  │  CONTENT SCRIPT      │◄───────────────────────────┐                          │
│  │  ┌────────────────┐  │                            │                          │
│  │  │ FeedAdapter    │  │                   ┌────────┴─────────┐                │
│  │  │ (youtube.ts /  │  │                   │ SERVICE WORKER   │                │
│  │  │  facebook.ts)  │  │                   │ (background)     │                │
│  │  └───────┬────────┘  │                   │ - SessionTracker │                │
│  │  ┌───────┴────────┐  │                   │ - alarm/cooldown │                │
│  │  │ F1 PauseOverlay│  │                   │ - storage writer │                │
│  │  │ F2 SourceTracker│ │                   └────────┬─────────┘                │
│  │  │ F3 SessionHooks│  │                            │                          │
│  │  └────────────────┘  │                   chrome.storage.local                │
│  └──────────────────────┘                            │                          │
│                                              ┌───────┴─────────┐                │
│  ┌──────────────────────┐                    │  POPUP (React)  │                │
│  │  OPTIONS PAGE (React)│────────────────────│  Hôm nay/Gương/ │                │
│  │  onboarding·consent· │                    │  Nhật ký/Cài đặt│                │
│  │  export JSON/CSV     │                    └─────────────────┘                │
│  └──────────────────────┘                                                       │
│                                                                                 │
│  ✗ KHÔNG có network call ra ngoài — mọi dữ liệu ở chrome.storage.local          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 2. Các thành phần

### 2.1. Content script (per tab)
- Chạy trên `*.youtube.com` và `*.facebook.com` (khai trong manifest `content_scripts.matches`).
- Khởi tạo **FeedAdapter** phù hợp theo hostname; adapter là nguồn sự thật duy nhất về DOM của từng nền tảng.
- Ba module tính năng dùng chung adapter: `PauseOverlay` (F1), `SourceTracker` (F2), `SessionHooks` (F3 — bắt sự kiện mở/đóng phiên).
- Gửi sự kiện về service worker qua `chrome.runtime.sendMessage`; **không tự ghi storage** (tránh race giữa nhiều tab).

### 2.2. Platform adapter pattern (quyết định quan trọng nhất)

```ts
// shared/types.ts
interface FeedItemInfo {
  sourceName: string;          // "Kênh ABC" / "Trang XYZ" — TÊN nguồn, không URL
  sourceType: 'channel' | 'page' | 'group' | 'friend' | 'unknown';
  origin: 'self-selected' | 'recommended';  // subscription/bạn bè vs thuật toán đề xuất
}

interface FeedAdapter {
  readonly platform: 'youtube' | 'facebook' | 'tiktok';
  /** Bắt đầu quan sát feed; gọi callback mỗi khi user xem một item mới */
  observeFeedItems(onItem: (item: FeedItemInfo) => void): () => void;
  /** Bắt đầu đo hoạt động cuộn; callback mỗi tick hoạt động (throttled) */
  observeScrollActivity(onActivity: () => void): () => void;
  /** Điểm gắn overlay an toàn (F1) */
  getOverlayRoot(): HTMLElement;
}
```

- Thêm nền tảng mới (TikTok ở P7) = viết 1 file adapter mới, **không sửa core**.
- Selector DOM của từng nền tảng chỉ được phép xuất hiện trong file adapter tương ứng — nếu YouTube đổi DOM, chỉ sửa 1 file.
- Mỗi adapter có bộ **HTML fixture** trong `tests/fixtures/` để unit test parsing không cần mở trình duyệt.

### 2.3. Service worker (background)
- **SessionTracker:** máy trạng thái phiên theo (tabId, platform): `idle → active → paused-shown → ended`. Phiên kết thúc khi tab đóng hoặc idle >30 phút.
- **Cooldown & alarm:** dùng `chrome.alarms` (MV3 worker có thể bị kill — mọi state phải persist vào storage, không giữ trong biến toàn cục).
- **Storage writer:** điểm ghi duy nhất vào `chrome.storage.local`; áp dụng schema + rotation 30 ngày.

### 2.4. Popup (React 18)
4 tab: **Hôm nay** (phiên hôm nay, số lần dừng, streak) · **Gương** (biểu đồ đa dạng nguồn — F2) · **Nhật ký** (lịch sử ý định — F3) · **Cài đặt** (ngưỡng N phút, bật/tắt tính năng).

### 2.5. Options page (React 18)
Onboarding 3 bước lần đầu cài: (1) giải thích công cụ + nghiên cứu, (2) consent (đồng ý tham gia — lưu flag, không chạy tính năng nếu chưa đồng ý), (3) chọn tính năng bật. Kèm mục **Export dữ liệu nghiên cứu** (JSON/CSV).

## 3. Message passing schema

```ts
// shared/messages.ts — union type, discriminated bởi `type`
type ExtMessage =
  | { type: 'SCROLL_ACTIVITY';  platform: Platform }                       // content → worker
  | { type: 'FEED_ITEM_SEEN';   platform: Platform; item: FeedItemInfo }   // content → worker
  | { type: 'PAUSE_SHOWN';      platform: Platform; scrolledMinutes: number }
  | { type: 'PAUSE_CHOICE';     platform: Platform; choice: 'continue' | 'stop' }
  | { type: 'SESSION_START';    platform: Platform }
  | { type: 'INTENTION_SET';    platform: Platform; intention: string; plannedMinutes: number }
  | { type: 'SESSION_END_REFLECT'; platform: Platform; keptIntention: boolean | null }
  | { type: 'GET_STATE';        platform: Platform }                       // popup → worker
  | { type: 'UPDATE_SETTINGS';  settings: Partial<Settings> };             // popup/options → worker
```

Quy tắc: content script **chỉ gửi sự kiện thô**; mọi logic quyết định (đã tới ngưỡng chưa, cooldown còn không) nằm ở service worker. Popup chỉ đọc state + gửi settings.

## 4. Storage schema (chrome.storage.local)

Chi tiết đầy đủ + TypeScript interfaces ở `07_DuLieu_DoLuong_Export.md`. Tóm tắt keys:

| Key | Nội dung | Rotation |
|---|---|---|
| `settings` | Ngưỡng N phút, tính năng bật/tắt, consent flag | không |
| `pauseEvents` | Log F1: mảng {ts, platform, scrolledMinutes, choice} | 30 ngày |
| `sourceLog` | Log F2: map ngày → {sourceName → {count, origin}} | 30 ngày |
| `sessions` | Log F3: mảng {ts, platform, intention, plannedMinutes, actualMinutes, kept} | 30 ngày |
| `meta` | schemaVersion, installDate, participantCode (user tự đặt mã ẩn danh) | không |

## 5. ADR — Architecture Decision Records (ngắn)

**ADR-1: Manifest V3 (không V2).** V2 bị Chrome khai tử; V3 là bắt buộc để cài trên Chrome hiện tại. Hệ quả: service worker không persistent → mọi state qua storage + alarms.

**ADR-2: Không backend.** Cam kết đạo đức local-only (báo cáo mục 4.7) + n≥10 không cần hạ tầng server + demo không phụ thuộc mạng/hosting. Trade-off chấp nhận: thu số liệu qua export thủ công + Google Forms.

**ADR-3: Vite + CRXJS (không Webpack).** HMR cho content script/popup, config tối thiểu, template TS+React sẵn. Trade-off: CRXJS là community plugin — pin version trong package.json.

**ADR-4: React chỉ cho popup/options; overlay F1 là vanilla DOM + Shadow DOM.** Content script cần nhẹ và không đụng CSS trang chủ (Shadow DOM cô lập style). Nhúng cả React vào content script làm nặng và tăng rủi ro xung đột.

**ADR-5: Chỉ lưu tên nguồn, không URL/nội dung.** Tối thiểu hóa dữ liệu (NFR-5); đủ cho chỉ số đa dạng; giảm mọi rủi ro riêng tư khi export.

## 6. Rủi ro kỹ thuật & phòng bị

| Rủi ro | Ảnh hưởng | Phòng bị |
|---|---|---|
| YouTube/Facebook đổi DOM | Adapter chết | Selector tập trung 1 file/nền tảng + fixture test + fallback "degrade gracefully" (tính năng tắt im lặng, log console) |
| MV3 worker bị kill giữa phiên | Mất trạng thái đếm giờ | State persist vào storage mỗi tick 30s; khôi phục khi worker dậy |
| SPA navigation (YouTube không reload trang) | Content script mất kết nối DOM mới | Lắng nghe `yt-navigate-finish` event + re-init adapter |
| Facebook obfuscated class names | Selector khó viết | Dùng attribute/aria-based selectors + role, không class hash |
| User mở nhiều tab cùng nền tảng | Đếm trùng thời gian cuộn | SessionTracker gộp theo platform, chỉ tính tab đang focus |
