# 05 — SPEC F2: GƯƠNG BONG BÓNG LỌC (Filter Bubble Mirror)

> Neo: nhận thức filter bubble yếu (X3/Z2, Level 4) · Tha hóa nhận thức (Marx, 1844; Lenin — lý luận phản ánh) · Bằng chứng: FeedVis (Eslami và cộng sự, 2015). **Cảnh báo thiết kế bắt buộc:** hiển thị đa dạng THỰC, gồm cả phần do chính user chọn (Bakshy và cộng sự, 2015; Bruns, 2019) — không giả định "bong bóng bịt kín".

## 1. Hành vi tổng thể

Extension **âm thầm đếm nguồn** nội dung user đã xem (chỉ tên nguồn — không nội dung, không URL). Popup tab "Gương" hiển thị bức tranh 7 ngày: nguồn tin của bạn đa dạng đến đâu, bao nhiêu phần do bạn chọn vs do thuật toán đề xuất, kèm một gợi ý mở rộng góc nhìn khi độ đa dạng thấp.

## 2. Thu thập dữ liệu (SourceTracker, content script)

- Adapter phát hiện item "đã xem" và trích `FeedItemInfo` (xem `02 §2.2`):
  - **YouTube:** một video được tính "đã xem" khi ở trang watch ≥15s hoặc Shorts hiển thị ≥5s. `sourceName` = tên kênh. `origin`: video từ trang Subscriptions = `self-selected`; từ home/recommended/autoplay = `recommended`.
  - **Facebook:** một post tính "đã xem" khi nằm trong viewport ≥3s (IntersectionObserver). `sourceName` = tên page/group/bạn. `origin`: từ bạn bè/nhóm đã tham gia = `self-selected`; post "Gợi ý cho bạn"/quảng cáo = `recommended`.
- Gửi `FEED_ITEM_SEEN` về worker; worker cộng dồn vào `sourceLog` theo ngày:

```ts
interface DaySourceLog {
  date: string;                       // 'YYYY-MM-DD'
  platform: Platform;
  sources: Record<string, {          // key = sourceName
    count: number;
    selfSelected: number;             // số item origin='self-selected'
    recommended: number;
  }>;
}
```

**Tối thiểu hóa dữ liệu (NFR-5):** không lưu tiêu đề, không URL, không nội dung, không ảnh. Chỉ tên nguồn + đếm. Nguồn là tin nhắn/bạn bè cá nhân: hash tên (SHA-256, 8 ký tự đầu) trước khi lưu — chỉ số đa dạng vẫn tính được mà không lộ danh tính khi export.

## 3. Chỉ số đa dạng (shared/metrics.ts — PURE functions, unit test bắt buộc)

Cửa sổ tính: 7 ngày gần nhất, gộp mọi nền tảng (và xem riêng từng nền tảng).

1. **Unique-source ratio** `USR = số nguồn khác nhau / tổng item đã xem` — dễ hiểu với user ("100 video từ 8 kênh").
2. **Shannon entropy chuẩn hóa** `H* = −Σ p_i·log2(p_i) / log2(S)` với `p_i` = tỷ trọng nguồn i, `S` = số nguồn. `H* ∈ [0,1]`: 0 = một nguồn thống trị tuyệt đối, 1 = phân bố đều. Diễn giải hiển thị: `H* < 0.4` → "rất tập trung"; `0.4–0.7` → "tập trung vừa"; `> 0.7` → "khá đa dạng".
3. **Tỷ lệ đề xuất** `RR = items recommended / tổng items` — cho phần "do thuật toán vs do bạn".

Trường hợp biên: S=1 → H*=0 theo quy ước (không chia log2(1)=0); <10 items trong 7 ngày → hiển thị "chưa đủ dữ liệu để soi gương" thay vì con số gây hiểu lầm.

## 4. UI popup — tab "Gương"

```
┌──────────────────────────────────────────┐
│  Gương 7 ngày qua            [YT|FB|Tất cả]│
│                                          │
│  Độ đa dạng nguồn tin        0.38 ────── │
│  ████████░░░░░░░░░░░░  "rất tập trung"   │
│                                          │
│  147 lượt xem · 12 nguồn                 │
│  ● Do bạn chọn 34%   ● Thuật toán 66%    │
│                                          │
│  Top nguồn:                              │
│  ▇▇▇▇▇▇▇▇ Kênh A            41%         │
│  ▇▇▇▇ Kênh B                18%         │
│  ▇▇▇ Kênh C                 12%         │
│  ▂ 9 nguồn khác             29%         │
│                                          │
│  💡 5 ngày qua bạn chưa xem nguồn nào     │
│     ngoài nhóm giải trí. Thử tìm một     │
│     kênh học thuật/tin tức xem sao?      │
│                                          │
│         Vì sao tôi thấy thống kê này?     │
└──────────────────────────────────────────┘
```

**Yêu cầu:**
- Biểu đồ thanh ngang đơn giản (CSS thuần hoặc SVG tự vẽ — KHÔNG thêm thư viện chart nặng vào popup).
- **Phần "Do bạn chọn vs Thuật toán" là bắt buộc** — đây là điểm trung thực học thuật (Bakshy/Bruns): nếu RR thấp mà đa dạng vẫn thấp, "gương" phải để user thấy vai trò lựa chọn của chính mình.
- Gợi ý (FR-6) chỉ hiện khi H* < 0.4 liên tục ≥3 ngày; văn phong **gợi mở, không phán xét** ("thử… xem sao?" — không "bạn đang nghiện!").
- Link "Vì sao tôi thấy thống kê này?" → options giải thích cách đếm + cam kết không lưu nội dung.

## 5. Dữ liệu → biến nghiên cứu

| Dữ liệu | Biến |
|---|---|
| User mở tab Gương (đếm lượt) | X′2 (mức tiếp xúc can thiệp) |
| H*, USR, RR theo tuần | Dữ liệu mô tả bối cảnh cho M′2 |
| Item D (Likert pre/post, BoCongCu) | M′2 (nhận thức bong bóng — đo chính) |
| Phỏng vấn câu 4–5 (mục G) | P2 — kiểm chứng định tính |

## 6. Acceptance criteria

- [ ] AC-1: Xem 5 video YouTube (2 từ subscription, 3 từ đề xuất) → sourceLog ghi đúng 5 items với origin đúng.
- [ ] AC-2: Hàm entropy: fixture `{A:50,B:50}` → H*=1.0; `{A:100}` → H*=0; `{A:90,B:5,C:5}` → H*≈0.35 (unit test).
- [ ] AC-3: Popup Gương hiển thị đúng USR/H*/RR khớp dữ liệu fixture bơm vào storage.
- [ ] AC-4: <10 items → hiện "chưa đủ dữ liệu", không hiện số.
- [ ] AC-5: Export ra CSV: chỉ có tên nguồn (hoặc hash) + count — không URL/nội dung (review file thật).
- [ ] AC-6: Gợi ý chỉ xuất hiện đúng điều kiện (H*<0.4 ≥3 ngày) — test bằng fixture.
- [ ] AC-7: Facebook: post bạn bè → origin `self-selected`; post "Gợi ý cho bạn" → `recommended`.
