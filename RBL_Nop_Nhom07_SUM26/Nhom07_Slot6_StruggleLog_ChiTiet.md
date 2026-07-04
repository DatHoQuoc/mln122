# PAAL STRUGGLE LOG — CHI TIẾT (phụ lục Slot 6)

*Nhóm 07 · SE1812 · MLN122 — RBL Level 5. Bổ trợ cho bảng PAAL trong bản nộp Slot 6 chính.*

Tài liệu này ghi lại **dấu vết thử–sai–học** trong giai đoạn hiện thực hóa và **kiểm thử tay trên môi trường thật** của prototype "Tỉnh". Trọng tâm không phải "code chạy", mà là **những chỗ vấp thật, cách nhóm tự chẩn đoán và bài học rút ra** — đặc biệt về **ranh giới giữa việc AI sinh mã và việc con người kiểm chứng**.

## 1. Bối cảnh

Sau khi lập trình xong prototype (Chrome MV3, 3 tính năng: Khoảng dừng phản tư, Gương bong bóng lọc, Nhật ký chủ thể) chạy trên YouTube/Facebook/TikTok với 33 unit test xanh, nhóm **không dừng ở "test tự động xanh là xong"** mà cài bản chưa đóng gói (load unpacked) lên Chrome thật và dùng như người dùng cuối. Chính bước này lộ ra một loạt lỗi mà unit test **không thể** bắt được, vì chúng nằm ở phần **giao tiếp với DOM thật của nền tảng** — thứ luôn thay đổi và AI không "nhìn thấy".

## 2. Nhật ký thử – sai – học (3 lỗi tiêu biểu)

| # | Triệu chứng quan sát | Chẩn đoán nguyên nhân (nhóm tự tìm qua Console) | Cách xử lý | Bài học / ý nghĩa |
|---|---|---|---|---|
| 1 | Khoảng dừng (F1) **hiện được trên video thường nhưng KHÔNG hiện trên Shorts** dù đã xem/lướt hơn 1 phút | Bộ đếm chỉ đọc **thẻ `<video>` đầu tiên** trong trang. Shorts nạp sẵn nhiều thẻ video; thẻ đầu thường đang **tạm dừng** → code tưởng "không có video phát" → không gửi tín hiệu đếm | Thêm hàm chọn **đúng video đang phát**; đồng thời nghe thêm sự kiện `wheel`/`keydown` (Shorts cuộn trong container riêng, không phải cửa sổ) | Test tự động không thể thay test tay: lỗi chỉ lộ trên DOM thật của Shorts. "Xanh CI" ≠ "chạy đúng ngoài đời" |
| 2 | Tab Gương (F2) ghi nguồn, nhưng **mọi Short lại ra CÙNG một tên kênh** | Hàm trích tên kênh lấy **link `/@…` đầu tiên toàn trang** — một phần tử cố định — thay vì kênh của Short đang xem | Giới hạn phạm vi tìm kiếm **trong reel đang active** (`ytd-reel-video-renderer[is-active]`) mới lấy đúng kênh từng Short | Selector "chộp đại" cho kết quả **trông có vẻ đúng nhưng sai bản chất** — nếu không kiểm sẽ đưa số liệu rác vào nghiên cứu. Phải soi từng trường hợp |
| 3 | Đã **tìm kiếm** một kênh rồi bấm xem, nhưng Gương vẫn báo **"Do bạn chọn 0% · Thuật toán 100%"** | Bộ bắt cú bấm dựa trên vài **`id` cố định** của thumbnail; trang **kết quả tìm kiếm** dùng cấu trúc DOM khác nên cú bấm không được nhận diện là "tự chọn" → mặc định về "thuật toán" | Đổi sang bắt **mọi liên kết video** (`/watch`, `/shorts/`) bất kể `id`, rồi suy origin theo trang lúc bấm | Phân loại "tự chọn vs thuật toán" — trục học thuật cốt lõi (Bakshy 2015; Bruns 2019) — **suýt bị sai âm thầm**. Sai ở tầng đo lường thì mọi kết luận phía sau đổ theo |

Sau sửa, nhóm xác nhận trên YouTube thật: F1 hiện đúng trên cả video thường lẫn Shorts; F2 trích đúng tên từng kênh và tách đúng phần "do bạn chọn" (ví dụ tìm *freeCodeCamp* → ghi nhận **self-selected**, tỷ lệ "Do bạn chọn" tăng khỏi 0%).

## 3. Điểm căng về vai trò AI (liên hệ AI-Free Zone)

Ba lỗi trên đều xuất hiện ở **mã do AI hỗ trợ sinh**. Điều đáng nói: AI viết được logic sạch và test thuần, nhưng **không thể kiểm chứng phần chạm vào DOM thật** vì nó không truy cập được trang runtime của YouTube/TikTok. **Phần "tin nhưng phải kiểm" là công việc tư duy gốc của nhóm**: đặt log chẩn đoán, đọc Console, khoanh vùng nguyên nhân, và quyết định cách sửa. Đây chính là ranh giới AI-Free trong dự án: *AI đề xuất cách làm; con người chịu trách nhiệm kiểm chứng trên thực địa.*

## 4. Một quan sát mang tính phát hiện (dự kiến kiểm với người dùng thật ở trial)

Khi tự dùng thử, thành viên nhóm **ngạc nhiên** khi thấy Gương báo phần lớn nội dung là "do thuật toán đề xuất" dù **cảm giác chủ quan là "tôi tự chọn mà"**. Đây đúng là loại phản ứng mà Eslami và cộng sự (2015) mô tả khi người dùng đối diện thuật toán vô hình, và là **giả thuyết cho finding P2** sẽ kiểm chứng với người tham gia ở giai đoạn trial (không kết luận vội từ trải nghiệm nội bộ).

## 5. Ánh xạ vào báo cáo & rubric

- **Mục Hạn chế (9.1):** "trích xuất nguồn phụ thuộc DOM nền tảng, dễ vỡ khi nền tảng đổi cấu trúc" — 3 lỗi trên là bằng chứng cụ thể.
- **Tiêu chí rubric Slot 6 "PAAL & AI-Free Zone" (2đ):** tài liệu này là dấu vết thử–sai–học và phần tư duy gốc của nhóm.
- **Việc cần làm tiếp:** đưa các trường hợp này vào checklist test tay khi kiểm Facebook và TikTok (selector hai nền tảng này còn dễ vỡ hơn YouTube).
