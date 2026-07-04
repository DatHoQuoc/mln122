# 06 — SPEC F3: NHẬT KÝ CHỦ THỂ (Agency Journal)

> Neo: nghịch lý Biết–Làm (Z1, Level 4) · Tính chủ thể & tự do (SDT — Ryan & Deci, 2000) · Bằng chứng: cơ chế goal-advancement (Lyngs và cộng sự, 2019); nhắc mục tiêu hiệu quả với sinh viên (Lyngs và cộng sự, 2020); sense of agency (Lukoff và cộng sự, 2021).

## 1. Hành vi tổng thể

Vòng lặp 3 bước mỗi phiên: **đặt ý định → dùng → đối chiếu**. Mỗi lần giữ đúng ý định = một **micro-win**; chuỗi micro-wins tích lũy thành bằng chứng hữu hình rằng "mình làm chủ được" — đối trị trực tiếp nghịch lý Biết–Làm (biết mà không làm được vì thiếu phản hồi củng cố).

## 2. Flow chi tiết

### 2.1. Prompt đặt ý định (đầu phiên)
- **Kích hoạt:** lần đầu mở YouTube/Facebook trong ngày, HOẶC phiên mới sau ≥2h không hoạt động trên nền tảng đó.
- **UI:** banner nhỏ trượt xuống từ cạnh trên (KHÔNG phải overlay chặn — F3 nhẹ hơn F1):

```
┌──────────────────────────────────────────────┐
│ 🌙 Hôm nay bạn vào YouTube để làm gì?         │
│ [Giải trí ▾] [Học tập ▾] [Tìm cụ thể… ▾]     │
│ Dự kiến: [10′] [20′] [30′] [tự nhập]          │
│           [Bắt đầu phiên]   [Bỏ qua]          │
└──────────────────────────────────────────────┘
```

- Chọn nhanh 1 chạm (danh mục + thời lượng), không bắt gõ chữ (giảm friction nhập liệu). "Bỏ qua" luôn có — không ép buộc (ràng buộc đạo đức #3); bỏ qua ghi `intention: null`.
- Tự ẩn sau 20s nếu không tương tác (= bỏ qua).

### 2.2. Đối chiếu (kết phiên)
- **Kích hoạt:** đóng tab cuối của nền tảng, HOẶC idle >30′, HOẶC bấm "Dừng phiên" từ overlay F1.
- Vì tab có thể đã đóng, đối chiếu hiển thị ở **lần mở popup kế tiếp** hoặc **notification nhẹ** (chrome.notifications, tắt được trong Settings):

```
Phiên YouTube sáng nay: bạn định "Học tập · 20′", thực tế 47′.
Bạn có làm được điều mình định làm không?  [Có 💪] [Một phần] [Không]
```

- Trả lời ghi `keptIntention: true | 'partial' | false`; không trả lời trong 24h → `null` (không tính vào streak, không phạt).

### 2.3. Micro-wins & streak
- **Micro-win** = phiên có `keptIntention: true` HOẶC (`'partial'` VÀ thời gian thực ≤ dự kiến × 1.5).
- Streak = số ngày liên tiếp có ≥1 micro-win. **Nguyên tắc "không trừng phạt":** đứt streak hiển thị trung tính ("Bắt đầu chuỗi mới hôm nay?"), không màu đỏ, không icon buồn — chuỗi là *gương tích lũy năng lực*, không phải gamification gây áp lực (khác biệt với các app habit thô).

## 3. UI popup — tab "Nhật ký"

- Lịch 7/30 ngày: chấm xanh = ngày có micro-win, chấm rỗng = không có dữ liệu/không giữ được.
- Thống kê: tỷ lệ phiên giữ đúng ý định (tuần này vs tuần trước), tổng micro-wins, streak hiện tại/dài nhất.
- Danh sách phiên gần nhất: ý định · dự kiến · thực tế · kết quả.

## 4. Dữ liệu ghi (→ biến X′3, Y′1 gián tiếp)

```ts
interface SessionRecord {
  ts: number;                       // bắt đầu phiên
  platform: Platform;
  intention: 'giai-tri' | 'hoc-tap' | 'tim-cu-the' | null;   // null = bỏ qua
  plannedMinutes: number | null;
  actualMinutes: number;            // từ SessionTracker
  keptIntention: true | 'partial' | false | null;
  viaF1Stop: boolean;               // phiên kết thúc nhờ nút "Dừng phiên" của F1
}
```

`viaF1Stop` cho phép phân tích tương tác F1×F3 trong paper (khoảng dừng có giúp giữ ý định không — dữ liệu mô tả cho P1+P3).

## 5. Acceptance criteria

- [ ] AC-1: Mở YouTube lần đầu trong ngày → banner ý định hiện; chọn "Học tập · 20′" → SessionRecord tạo đúng.
- [ ] AC-2: "Bỏ qua" hoặc không tương tác 20s → banner ẩn, `intention: null`.
- [ ] AC-3: Đóng tab → lần mở popup kế tiếp có prompt đối chiếu với đúng số phút thực tế (±1′).
- [ ] AC-4: Trả lời "Có" với phiên 18′/dự kiến 20′ → micro-win; lịch chấm xanh ngày đó.
- [ ] AC-5: Streak tính đúng qua fixture 10 ngày (có ngày trống, ngày partial) — unit test `metrics.test.ts`.
- [ ] AC-6: Tắt notification trong Settings → đối chiếu chỉ hiện trong popup.
- [ ] AC-7: Bấm "Dừng phiên" ở F1 → đối chiếu kích hoạt ngay trên overlay, `viaF1Stop: true`.
