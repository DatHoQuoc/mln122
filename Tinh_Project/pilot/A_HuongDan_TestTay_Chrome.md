# A — HƯỚNG DẪN TEST TAY EXTENSION "TỈNH" TRÊN CHROME

*Nhóm 07 · dùng trước khi phát hành bản pilot (Phase 5). Bám sát ma trận M1–M13 trong `docs/09`.*

Mục tiêu: mỗi thành viên tự chạy checklist này trên máy mình, tick ☑/☐ và ghi bug. Cần **≥2 người** chạy độc lập (1 YouTube, 1 Facebook) rồi gộp kết quả trước khi gửi cho người dùng pilot.

---

## 0. Chuẩn bị (một lần)

1. Mở thư mục `Tinh_Project/tinh-extension/`, chạy trong **PowerShell**:
   ```
   npm install      # nếu chưa cài
   npm run build    # tạo thư mục dist/
   ```
   (Hoặc giải nén `release/tinh-extension-v0.1.0.zip` — nội dung chính là thư mục `dist/`.)
2. Trình duyệt: **Chrome** (chính) + thử thêm **Edge** hoặc **Cốc Cốc** nếu có (đều dùng nhân Chromium, load y hệt).

## 1. Cài bản chưa đóng gói (load unpacked)

1. Vào `chrome://extensions`.
2. Bật **Developer mode** (góc trên phải).
3. Bấm **Load unpacked** → chọn thư mục **`dist/`** (KHÔNG chọn thư mục gốc repo).
4. Thấy icon mặt trăng 🌙 "Tỉnh" xuất hiện trên thanh công cụ → cài thành công.
   - Nếu lỗi: mở `chrome://extensions`, xem dòng đỏ "Errors", chụp lại.
5. Ghim icon vào thanh công cụ (biểu tượng ghim) để bấm nhanh.

> Sau mỗi lần sửa code + `npm run build`: quay lại `chrome://extensions` bấm **nút reload ⟳** trên thẻ "Tỉnh", rồi **tải lại tab MXH** đang mở.

## 2. Thiết lập để test nhanh

1. Bấm icon 🌙 → nếu lần đầu sẽ hiện **Onboarding**; hoặc chuột phải icon → **Tùy chọn (Options)**.
2. Đi hết onboarding: **Đồng ý tham gia** → chọn cả 3 tính năng → nhập **Mã tham gia** = `TEST01` → **Bắt đầu dùng**.
3. Vào tab **Cài đặt** (trong popup hoặc Options): kéo **Ngưỡng khoảng dừng xuống 5 phút** (mức thấp nhất) để F1 kích hoạt sớm.
4. Mở **DevTools → tab Network** trên tab MXH (để phục vụ M10 kiểm tra local-only).

**Lưu ý cơ chế khi test:**
- F1 đếm thời gian **cuộn liên tục**; nghỉ **> 60 giây** sẽ **reset về 0** → khi test đừng dừng cuộn quá 1 phút.
- Sau mỗi lần overlay hiện, có **cooldown ≥ 10 phút** mới hiện lại.
- F2 (Gương) cần **≥ 10 lượt xem** trong 7 ngày mới hiện số liệu; mỗi item phải hiển thị đủ (YouTube: xem video ≥15s / Shorts ≥5s · Facebook: bài viết nằm trong màn hình ≥3s).

---

## 3. Checklist F1 — Khoảng dừng phản tư

| # | Bước làm | Kỳ vọng | YT | FB |
|---|---|---|---|---|
| M1 | Cuộn feed liên tục ~5 phút (đừng nghỉ >60s) | Overlay hiện: câu hỏi "muốn hay thích?", **2 nút ngang hàng**, link "Vì sao tôi thấy màn hình này?" | ☐ | ☐ |
| M1b | Bấm **"Tiếp tục có ý thức"** | Overlay đóng, tiếp tục lướt bình thường | ☐ | ☐ |
| M1c | Kích hoạt lại (chờ hết cooldown hoặc reload+chỉnh N) → bấm **"Dừng phiên"** | Tab đóng lại | ☐ | ☐ |
| M1d | Overlay đang hiện → nhấn phím **ESC** | Overlay đóng (= tiếp tục), không đóng tab | ☐ | ☐ |
| M1e | Bấm link **"Vì sao?"** | Mở trang Options, **cuộn đúng tới mục "Vì sao có Khoảng dừng"** | ☐ | ☐ |
| M2 | (YT) Cho video **fullscreen** rồi để chạy tới ngưỡng | Overlay **không cắt ngang** fullscreen; hiện sau khi thoát fullscreen | ☐ | n/a |
| M3 | Cuộn tới gần ngưỡng → **nghỉ >60s** → cuộn lại | Bộ đếm reset, phải cuộn lại từ đầu mới hiện overlay | ☐ | ☐ |
| M3b | Đang cuộn → **chuyển sang tab khác** vài phút → quay lại | Thời gian ở tab khác **không** được tính | ☐ | ☐ |

## 4. Checklist F3 — Nhật ký chủ thể

| # | Bước làm | Kỳ vọng | YT | FB |
|---|---|---|---|---|
| M4 | Mở MXH **lần đầu trong ngày** (hoặc sau >2h không dùng) | **Banner đặt ý định** trượt xuống: chọn danh mục + số phút + "Bắt đầu phiên" | ☐ | ☐ |
| M4b | Không bấm gì, đợi ~20s | Banner **tự ẩn** (tính là bỏ qua) | ☐ | ☐ |
| M4c | Đặt ý định (VD "Học tập", 15 phút) → dùng vài phút → đóng tab | — | ☐ | ☐ |
| M5 | Mở lại popup tab **Nhật ký** sau đó | Hiện **thẻ đối chiếu** phiên vừa rồi; phút thực tế lệch không quá ±1′ | ☐ | ☐ |
| M5b | Bấm trả lời đối chiếu (Có / Một phần / Không) | Thẻ biến mất; nếu "Có" → **chấm micro-win** sáng lên trên lịch, streak +1 | ☐ | ☐ |
| N1 | (tùy chọn) Bật **Thông báo đối chiếu** trong Cài đặt; đặt ý định rồi để idle >30 phút | Có **thông báo hệ thống** 🌙 nhắc đối chiếu; bấm vào → mở "Tỉnh" | ☐ | ☐ |

## 5. Checklist F2 — Gương bong bóng lọc

| # | Bước làm | Kỳ vọng | YT | FB |
|---|---|---|---|---|
| M6 | Xem **≥10 nội dung** trộn nguồn: vài cái từ trang chủ/đề xuất + vài cái từ kênh/bạn bè bạn theo dõi (YT: bấm vào từ mục **Kênh đăng ký**/tìm kiếm; FB: xem bài của **bạn bè** + vài bài **"Được đề xuất/Được tài trợ"**) | — | ☐ | ☐ |
| M6b | Mở popup tab **Gương** | Hiện thanh **độ đa dạng H\***, số "lượt xem · nguồn", **tách "Do bạn chọn %" vs "Thuật toán đề xuất %"**, danh sách nguồn hàng đầu | ☐ | ☐ |
| M6c | Kiểm tra phân loại | Nội dung từ kênh/bạn bè theo dõi → **Do bạn chọn**; "Được đề xuất/tài trợ" → **Thuật toán** | ☐ | ☐ |
| M6d | Khi <10 lượt | Hiện "Chưa đủ dữ liệu để soi gương" | ☐ | ☐ |
| M6e | Bấm link **"Vì sao tôi thấy thống kê này?"** | Mở Options, cuộn đúng tới mục **"Vì sao có Gương bong bóng lọc"** | ☐ | ☐ |

> ⚠️ **Điểm dễ vỡ nhất:** trích tên nguồn Facebook phụ thuộc DOM mà Facebook thường xáo trộn (tên class ngẫu nhiên). Nếu Gương FB ra **0 nguồn** dù đã xem nhiều → ghi rõ, đây là bug selector cần cập nhật, KHÔNG phải lỗi logic. YouTube ổn định hơn.

## 6. Checklist đạo đức, hiệu năng & export

| # | Bước làm | Kỳ vọng | Kết quả |
|---|---|---|---|
| M7 | (YT) Điều hướng SPA liên tục 10 lần (bấm video → về trang chủ → video…) | Content script vẫn chạy, không lỗi console | ☐ |
| M8 | Mở **2 tab cùng nền tảng** cùng lúc | Không đếm trùng, không hiện overlay đôi | ☐ |
| M9 | Trong Cài đặt: đổi N, **tắt từng tính năng** → thao tác lại trên tab MXH (tải lại tab) | Tính năng đã tắt **không** còn kích hoạt | ☐ |
| **M10** | **DevTools → Network**, dùng bình thường ~15 phút | **0 request đi ra ngoài** từ extension (chỉ có traffic của chính trang MXH) — đây là bằng chứng **local-only / NFR-1** | ☐ |
| M11 | Options → **Xuất dữ liệu**: bấm "Xem trước", tải **JSON** và **CSV** | Preview đúng; 2 file tải được; mở CSV bằng Excel **không vỡ tiếng Việt**; JSON **không chứa nội dung** đã xem (chỉ số đếm + tên nguồn) | ☐ |
| M12 | `chrome://extensions` → **Remove** "Tỉnh" → Load unpacked lại | **Onboarding chạy lại từ đầu**; khi chưa đồng ý → các tính năng **tắt** (consent gate) | ☐ |
| M13 | Cuộn nhanh feed dài | Không giật lag rõ rệt (cảm quan; nếu nghi ngờ, đo bằng tab Performance) | ☐ |

---

## 7. Mẫu ghi nhận bug (điền vào bảng chung của nhóm)

| ID | Nền tảng/Trình duyệt | Mục (M#) | Mô tả hiện tượng | Bước tái hiện | Mức độ (Critical/Minor) | Ảnh/console |
|---|---|---|---|---|---|---|
| B01 | | | | | | |

**Phân loại xử lý:**
- **Critical** (chặn dùng: không cài được, overlay không hiện, extension crash, có request ra ngoài) → **fix trước khi pilot**.
- **Minor** (lệch nhỏ, selector FB thỉnh thoảng miss, UI xấu) → ghi **Known Issues** trong README, nói trước với người pilot.

**Xong checklist → tổng hợp kết quả vào Slot 6 (bảng PAAL StruggleLog: "gặp gì, xử lý sao").**
