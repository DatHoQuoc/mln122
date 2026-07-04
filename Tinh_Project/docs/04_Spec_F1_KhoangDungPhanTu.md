# 04 — SPEC F1: KHOẢNG DỪNG PHẢN TƯ (Reflective Pause)

> **Tính năng must-demo** — ưu tiên cao nhất, hoàn thành ở Phase 1. Neo: Want–Like Split (M1, Level 4) · Nhu cầu giả tạo (Marcuse) · Bằng chứng: microboundary (Cox và cộng sự, 2016), gỡ feed/nhắc mục tiêu hiệu quả (Lyngs và cộng sự, 2020).

## 1. Hành vi tổng thể

Khi user cuộn feed **liên tục N phút** (mặc định 15), một overlay toàn màn hình xuất hiện với câu hỏi phản tư, buộc một **quyết định có ý thức** trước khi tiếp tục. Overlay là *microboundary* — đủ friction để ngắt automaticity, không đủ để thành hình phạt.

## 2. Trigger heuristic

```
Trạng thái phiên (per platform, giữ ở service worker):
  scrolledSeconds: number    — cộng dồn giây "đang hoạt động cuộn"
  lastActivityAt: timestamp
  cooldownUntil: timestamp

Luật:
  1. Content script gửi SCROLL_ACTIVITY (throttle 5s) khi có scroll/media playback
     trên tab ĐANG focus.
  2. Worker cộng scrolledSeconds nếu khoảng cách 2 activity < 60s
     (gián đoạn ≥60s → reset scrolledSeconds về 0: phiên cuộn liên tục mới).
  3. Khi scrolledSeconds ≥ N*60 và now > cooldownUntil:
       → gửi lệnh SHOW_PAUSE cho content script của tab focus
       → set cooldownUntil = now + max(10 phút, N/2)
       → reset scrolledSeconds = 0
  4. Video fullscreen: KHÔNG hiện overlay (chờ thoát fullscreen rồi hiện).
  5. Tab ẩn/blur: không cộng giờ.
```

Ngưỡng N: mặc định 15 phút; user chỉnh 5–60 phút (Settings). Với **YouTube Shorts / dạng video ngắn**, đếm thêm theo items: ≥30 video ngắn liên tiếp cũng kích hoạt (cái đến trước thắng).

## 3. Overlay UI (vanilla DOM + Shadow DOM — xem ADR-4)

```
┌──────────────────────────────────────────────┐
│                    🌙  Tỉnh                   │
│                                              │
│   Bạn đã cuộn liên tục 15 phút.              │
│                                              │
│   Bạn đang MUỐN xem điều gì cụ thể,          │
│   hay chỉ đang THÍCH cảm giác cuộn?          │
│                                              │
│   ┌────────────────────┐ ┌────────────────┐  │
│   │ Tiếp tục có ý thức │ │  Dừng phiên ở  │  │
│   │  (tôi biết mình     │ │     đây 👋      │  │
│   │   đang tìm gì)      │ │                │  │
│   └────────────────────┘ └────────────────┘  │
│                                              │
│          Vì sao tôi thấy màn hình này?        │
└──────────────────────────────────────────────┘
```

**Yêu cầu chi tiết:**
- Nền mờ (backdrop blur) phủ toàn viewport; overlay ở `getOverlayRoot()` của adapter, trong **Shadow DOM** (không rò CSS).
- Xuất hiện với animation fade-in ~400ms (đột ngột gây khó chịu — vi phạm tinh thần "gợi phản tư").
- **"Tiếp tục có ý thức"**: đóng overlay, feed tiếp tục. KHÔNG có dark pattern ngược (không làm nút này bé/xám/khó bấm — hai nút ngang hàng thị giác; đây là điểm khác biệt đạo đức với các app chặn thô bạo).
- **"Dừng phiên ở đây"**: đóng tab hiện tại nếu được (`chrome.tabs.remove` qua worker), fallback: chuyển về `about:blank`+lời chúc; đồng thời kích hoạt prompt đối chiếu của F3 nếu có ý định đang mở.
- **"Vì sao tôi thấy màn hình này?"**: mở options page mục giải thích — nêu cơ chế (đếm N phút), mục đích (hỗ trợ phân biệt muốn/thích — phát hiện nghiên cứu L4), và cách tắt/chỉnh. Đây là yêu cầu **nudge minh bạch** (Hansen & Jespersen, 2013).
- Phím ESC = "Tiếp tục có ý thức" (không giam user).

## 4. Dữ liệu ghi (→ biến X′1, M′1)

```ts
interface PauseEvent {
  ts: number;                    // epoch ms
  platform: 'youtube' | 'facebook' | 'tiktok';
  scrolledMinutes: number;       // thời gian cuộn liên tục trước khi dừng
  choice: 'continue' | 'stop' | 'dismissed';  // dismissed = ESC/click ngoài
  reactionMs: number;            // thời gian từ lúc hiện tới lúc chọn
}
```

`reactionMs` có giá trị nghiên cứu: phản ứng <1s gợi ý bấm vô thức (automaticity vẫn thắng); >3s gợi ý có phản tư thật — đưa vào chương VI của paper như dữ liệu mô tả.

## 5. Edge cases (bắt buộc xử lý)

| Case | Hành vi đúng |
|---|---|
| Video đang fullscreen | Hoãn overlay tới khi thoát fullscreen |
| User đổi tab giữa chừng | Dừng đếm; quay lại tab thì đếm tiếp (không reset nếu <60s) |
| SPA navigation (YouTube watch → home) | Adapter re-init; scrolledSeconds giữ nguyên |
| 2 tab YouTube song song | Chỉ tính tab focus; không hiện overlay trên 2 tab cùng lúc |
| Worker bị kill giữa phiên | scrolledSeconds đã persist mỗi 30s; khôi phục khi dậy |
| User tắt F1 trong Settings | Không đếm, không overlay, ngừng ghi PauseEvent |

## 6. Acceptance criteria (AC — tick đủ mới xong Phase 1)

- [ ] AC-1: Cuộn YouTube home liên tục 15′ (ngưỡng test chỉnh về 1′ khi dev) → overlay hiện đúng, hai nút hoạt động đúng hành vi mục 3.
- [ ] AC-2: Đang xem video fullscreen tới ngưỡng → overlay chỉ hiện sau khi thoát fullscreen.
- [ ] AC-3: Nghỉ cuộn 60s → bộ đếm reset (kiểm qua log worker).
- [ ] AC-4: Sau một lần dừng, trong cooldown không hiện lần hai.
- [ ] AC-5: PauseEvent ghi đúng schema mục 4 (kiểm qua export JSON).
- [ ] AC-6: Link "Vì sao?" mở đúng trang giải thích.
- [ ] AC-7: Chỉnh N=5 trong Settings → trigger theo ngưỡng mới không cần reload extension.
- [ ] AC-8: CSS của trang không vỡ (Shadow DOM cô lập) — kiểm trên cả YouTube & Facebook.
