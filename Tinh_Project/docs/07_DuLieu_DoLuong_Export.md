# 07 — DỮ LIỆU, ĐO LƯỜNG & EXPORT

> File này là "hợp đồng dữ liệu" giữa code và nghiên cứu: schema storage, ánh xạ dữ liệu → biến, và định dạng export. Agent code implement `shared/types.ts` + `shared/export.ts` theo đây; agent viết paper đọc mục 3 để biết số nào đổ vào chương VI.

## 1. Schema chrome.storage.local (TypeScript)

```ts
// shared/types.ts
type Platform = 'youtube' | 'facebook' | 'tiktok';

interface Settings {
  consentGiven: boolean;            // false = mọi tính năng tắt
  participantCode: string;          // mã ẩn danh user tự đặt (vd "P07"), dùng khi export
  pauseEnabled: boolean;            // F1
  pauseThresholdMinutes: number;    // 5–60, mặc định 15
  mirrorEnabled: boolean;           // F2
  journalEnabled: boolean;          // F3
  journalNotifications: boolean;
}

interface PauseEvent {              // F1 — xem 04 §4
  ts: number; platform: Platform;
  scrolledMinutes: number;
  choice: 'continue' | 'stop' | 'dismissed';
  reactionMs: number;
}

interface DaySourceLog {            // F2 — xem 05 §2
  date: string; platform: Platform;
  sources: Record<string, { count: number; selfSelected: number; recommended: number }>;
}

interface SessionRecord {           // F3 — xem 06 §4
  ts: number; platform: Platform;
  intention: 'giai-tri' | 'hoc-tap' | 'tim-cu-the' | null;
  plannedMinutes: number | null;
  actualMinutes: number;
  keptIntention: true | 'partial' | false | null;
  viaF1Stop: boolean;
}

interface Meta {
  schemaVersion: 1;
  installDate: number;
  mirrorOpenCount: number;          // đếm lượt mở tab Gương (biến X′2)
}
```

**Keys:** `settings` · `pauseEvents: PauseEvent[]` · `sourceLog: DaySourceLog[]` · `sessions: SessionRecord[]` · `meta: Meta`.

**Rotation:** `storage-writer.ts` cắt dữ liệu >30 ngày mỗi lần ghi (NFR-6). **Versioning:** đọc `meta.schemaVersion`; nếu khác hiện tại → chạy migration (hiện chỉ có v1).

## 2. Nguyên tắc tối thiểu hóa dữ liệu (bắt buộc — NFR-5)

1. KHÔNG lưu: nội dung bài/video, tiêu đề, URL cụ thể, ảnh, bình luận, tin nhắn.
2. Nguồn cá nhân (bạn bè Facebook): hash SHA-256 lấy 8 hex đầu trước khi lưu.
3. Mọi dữ liệu ở `chrome.storage.local` — không sync, không network.
4. Gỡ extension = mất toàn bộ dữ liệu (nói rõ trong onboarding; nhắc export trước khi gỡ).

## 3. Ánh xạ dữ liệu → biến nghiên cứu → phiếu đo → paper

| Biến | Dữ liệu extension | Phiếu đo (BoCongCu) | Đổ vào paper |
|---|---|---|---|
| X′1 khoảng dừng | `pauseEvents` (số lần, choice, reactionMs) | — | VI.5 (mô tả sử dụng), VII.1 (P1) |
| X′2 gương | `meta.mirrorOpenCount`; H*/USR/RR tuần | — | VI.5, VII.1 (P2) |
| X′3 nhật ký | `sessions` (tỷ lệ đặt ý định, micro-wins, streak) | — | VI.5, VII.1 (P3) |
| M′1 muốn/thích | tỷ lệ `choice='stop'` + reactionMs | Mục C (2 item, pre/post) | VI.4–VI.5 |
| M′2 nhận thức bong bóng | (bối cảnh: H* của user) | Mục D (3 item, pre/post) | VI.4 |
| Y′1 sense of agency | — | **Mục A (8 item, pre/post)** — đo chính | **VI.4** |
| Y′2 kiểm soát | — | Mục B (3 item, pre/post) | VI.4 |
| Y′3 khả dụng | — | **Mục E (SUS 10 item, post)** | **VI.3** |
| Z′1 mức dùng nền | — | Mục F | VI.2 |
| Định tính P1–P3 | `viaF1Stop`, journal records | Mục G (phỏng vấn 10 câu) | VI.5, VII.1 |

## 4. Export (options page → `shared/export.ts`)

### 4.1. JSON đầy đủ (cho nhóm phân tích)
```json
{
  "exportVersion": 1,
  "participantCode": "P07",
  "installDate": "2026-07-10",
  "exportDate": "2026-07-24",
  "settings": { "pauseThresholdMinutes": 15, "...": "..." },
  "pauseEvents": [ { "ts": 1752345600000, "platform": "youtube", "scrolledMinutes": 16, "choice": "stop", "reactionMs": 4200 } ],
  "sourceSummaryByWeek": [ { "week": "2026-W29", "platform": "youtube", "totalItems": 147, "uniqueSources": 12, "entropyNorm": 0.38, "recommendedRatio": 0.66 } ],
  "sessions": [ { "ts": 1752345600000, "platform": "youtube", "intention": "hoc-tap", "plannedMinutes": 20, "actualMinutes": 47, "keptIntention": "partial", "viaF1Stop": false } ],
  "microWinStreakMax": 4
}
```
Lưu ý: `sourceSummaryByWeek` xuất **chỉ số tổng hợp**, KHÔNG xuất danh sách tên nguồn (tối thiểu hóa thêm một lớp khi dữ liệu rời máy user). Danh sách nguồn chi tiết chỉ hiển thị trong popup của chính user.

### 4.2. CSV tổng hợp (1 dòng/người — nhóm gộp bảng H của BoCongCu)
```csv
participantCode,daysActive,pauseShown,pauseContinue,pauseStop,avgReactionMs,mirrorOpens,entropyNormWk1,entropyNormWk2,sessionsTotal,intentionSetRatio,microWins,streakMax
P07,12,23,15,7,3400,9,0.38,0.52,31,0.71,11,4
```

### 4.3. Flow export
1. Options → "Xuất dữ liệu nghiên cứu" → hiện **preview** nội dung sẽ xuất (user thấy trước mọi thứ).
2. Xác nhận → tải 2 file `tinh-export-<code>-<date>.json/.csv` (Blob + download, không mạng).
3. User tự gửi file cho nhóm (Zalo/Drive/email của user) — extension không gửi gì.

## 5. Quy trình thu dữ liệu nghiên cứu (pre/post — Nguyễn Công Thành phụ trách)

1. **PRE (trước cài):** Google Form từ BoCongCu mục A+B+C+D+F. Form hỏi `participantCode` (hướng dẫn tự đặt: 1 chữ + 2 số, vd "K12") — khớp dữ liệu mà không lộ danh tính.
2. Cài extension từ zip + onboarding + consent; user nhập cùng `participantCode` vào Settings.
3. Dùng tự nhiên 1–2 tuần.
4. **POST:** Google Form mục A+B+C+D (lặp) + E (SUS); user export và gửi file; phỏng vấn mục G (8–10′, ghi âm nếu đồng ý).
5. Nhập tất cả vào bảng H (BoCongCu) — mỗi người 1 dòng: điểm pre/post từng nhóm + số liệu CSV.

## 6. Acceptance criteria (export)

- [ ] AC-1: Export JSON đúng schema 4.1; không chứa tên nguồn, URL, nội dung.
- [ ] AC-2: CSV mở bằng Excel không vỡ tiếng Việt (UTF-8 BOM).
- [ ] AC-3: Preview hiển thị đúng nội dung file trước khi tải.
- [ ] AC-4: `participantCode` chưa đặt → export bị chặn kèm hướng dẫn đặt mã.
- [ ] AC-5: Số liệu CSV khớp JSON (unit test trên fixture).
