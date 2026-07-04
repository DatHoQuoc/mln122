# 00 — TỔNG QUAN DỰ ÁN "TỈNH"

> **File đọc đầu tiên.** Mọi agent (code hoặc viết paper) phải đọc file này trước khi làm bất cứ việc gì. Sau đó đọc `08_KeHoach_TrienKhai_Phases.md` để biết mình đang ở phase nào.

## 1. Dự án là gì

**"Tỉnh"** là một browser extension (Chrome, Manifest V3) giúp sinh viên Đại học FPT **tái chiếm tính chủ thể** trước thuật toán mạng xã hội. Đây là sản phẩm ứng dụng của đề tài RBL Level 5 (nghiên cứu liên ngành MLN × Kỹ thuật phần mềm), Nhóm 07, lớp SE1812, môn MLN122, GVHD: Thầy Nguyễn Trung Hiếu.

Extension gồm **3 tính năng**, mỗi tính năng sinh ra từ một phát hiện của nghiên cứu định tính Level 4 và một phạm trù lý luận Mác:

| # | Tính năng | Neo phát hiện L4 | Phạm trù MLN | Nguồn bằng chứng chính | Spec |
|---|---|---|---|---|---|
| F1 | **Khoảng dừng phản tư** | Want–Like Split (M1) | Nhu cầu giả tạo (Marcuse, 1964; Marx, *Grundrisse*) | Cox và cộng sự (2016) microboundary; Lyngs và cộng sự (2019, 2020) | `04_Spec_F1` |
| F2 | **Gương bong bóng lọc** | Nhận thức filter bubble yếu (X3, Z2) | Tha hóa nhận thức (Marx, 1844; Lenin — lý luận phản ánh) | Eslami và cộng sự (2015) FeedVis; Bakshy (2015) + Bruns (2019) cảnh báo | `05_Spec_F2` |
| F3 | **Nhật ký chủ thể** | Nghịch lý Biết–Làm (Z1) | Tính chủ thể & tự do (SDT — Ryan & Deci, 2000) | Lyngs và cộng sự (2019) goal-advancement; Lukoff và cộng sự (2021) | `06_Spec_F3` |

## 2. Câu hỏi nghiên cứu và mệnh đề thiết kế

**RQ1.** Làm thế nào chuyển hóa các phát hiện về tha hóa, Want–Like Split và bong bóng lọc thành đặc tả tính năng của một công cụ tái chiếm tính chủ thể?
**RQ2.** Sinh viên FPT trải nghiệm và đánh giá công cụ ra sao về tính khả dụng (usability)?
**RQ3.** Trong thử nghiệm ngắn, công cụ tác động thế nào đến cảm nhận quyền tự quyết và khả năng kiểm soát hành vi?

**Mệnh đề thiết kế (kiểm chứng định tính, KHÔNG phải giả thuyết thống kê):**
- **P1.** Khoảng dừng phản tư chèn đúng thời điểm cao trào cuộn giúp phân biệt "đang muốn" với "đang thích" → tăng cảm giác kiểm soát.
- **P2.** Trực quan hóa độ đa dạng nguồn tin làm người dùng nhận ra bong bóng lọc → chủ động tìm nguồn ngược chiều.
- **P3.** Đặt ý định trước phiên + đối chiếu sau giúp tích lũy "micro-wins" → củng cố năng lực tự quyết.

## 3. Khung biến nghiên cứu (đảo chiều mô hình SOR của Level 4)

L4 mô hình hóa: Stimulus (X: thuật toán) → Organism (M: tâm lý) → Response (Y: hành vi), điều tiết Z. L5 đảo chiều: **can thiệp** thay vào vị trí Stimulus.

| Loại biến | Mã | Tên biến | Đo lường | RQ |
|---|---|---|---|---|
| Độc lập (IV) | X′1 | Khoảng dừng phản tư | Có/không + tần suất kích hoạt | RQ1 |
| | X′2 | Gương bong bóng lọc | Tiếp xúc phản hồi đa dạng nguồn | RQ1 |
| | X′3 | Nhật ký chủ thể | Mức độ đặt/đối chiếu ý định | RQ1 |
| Trung gian | M′1 | Phản tư có ý thức (muốn vs thích) | Likert mục C (BoCongCu) | RQ3 |
| | M′2 | Nhận thức bong bóng lọc | Likert mục D + dữ liệu "gương" | RQ3 |
| Phụ thuộc (DV) | Y′1 | Sense of agency | Thang pre/post mục A (theo Lukoff, 2021) | RQ3 |
| | Y′2 | Cảm nhận kiểm soát hành vi | Likert pre/post mục B | RQ3 |
| | Y′3 | Tính khả dụng | SUS 10 mục E (Brooke, 1996) | RQ2 |
| Điều tiết | Z′1 | Mức dùng MXH nền | Screen-time tự báo cáo mục F | — |
| | Z′2 | Tư duy phản biện số nền | Likert (kế thừa Z2 L4) | — |

Sơ đồ: `X′ (can thiệp) → M′ (phản tư/nhận thức) → Y′ (tự quyết, kiểm soát)`, điều tiết bởi Z′. Ánh xạ: P1 = X′1→M′1→Y′1,Y′2 · P2 = X′2→M′2 · P3 = X′3→Y′1.

**Ràng buộc liêm chính:** n≥10, định hướng diễn giải → chỉ thống kê **mô tả**, kiểm chứng định tính qua P1–P3. Cấm mọi tuyên bố nhân quả thống kê (không hồi quy/SEM/p-value).

## 4. Quyết định kiến trúc đã chốt (KHÔNG bàn lại)

1. **Browser extension, KHÔNG mobile app** — iOS/Android không cho inject UI/đọc feed app khác; 2/3 tính năng cần inject feed. Mobile (Android Accessibility) để dành Level 6.
2. **KHÔNG có backend** — local-first, dữ liệu ở lại thiết bị (cam kết đạo đức trong báo cáo mục 4.7). Không network call. Khảo sát pre/post thu qua Google Forms; extension có export JSON/CSV thủ công (có consent).
3. **Stack:** Chrome Extension Manifest V3 · TypeScript · React 18 (popup/options) · Vite + CRXJS · chrome.storage.local · Vitest.
4. **Nền tảng đích:** YouTube + Facebook (web) chính; TikTok web là stretch goal (P7).

## 5. Bốn ràng buộc đạo đức thiết kế (bắt buộc mọi tính năng)

1. **Minh bạch (transparent nudge):** mọi can thiệp phải giải thích được "vì sao tôi thấy cái này" (Hansen & Jespersen, 2013 — nudge minh bạch vs thao túng).
2. **Tùy chỉnh được:** user chỉnh ngưỡng, tắt/bật từng tính năng.
3. **Không ép buộc:** luôn có đường "tiếp tục" — công cụ gợi phản tư, không khóa chặn.
4. **Local-only:** không gửi bất kỳ dữ liệu nào ra ngoài thiết bị; export chỉ khi user chủ động bấm.

Vi phạm bất kỳ điều nào = công cụ tự mâu thuẫn với khung lý luận giải phóng của chính nó ("dark pattern thiện chí").

## 6. Tài sản đã có (tham chiếu, KHÔNG viết lại)

| File (ở thư mục cha `MLN122/`) | Là gì | Dùng khi nào |
|---|---|---|
| `BaoCao_L5_KhungVaPhanVietDuoc.md/.docx` | Khung paper đầy đủ; chương I–V, IX viết sẵn; VI–VIII có ô 🔲 chờ data | Agent viết paper điền vào (xem `10_HuongDan_VietPaper`) |
| `BoCongCu_DoLuong_L5.md/.docx` | Phiếu đo A–H: agency, kiểm soát, muốn/thích, bong bóng, SUS, phỏng vấn | Tạo Google Forms pre/post; phân tích data |
| `TongQuan_NC_L5_DigitalSelfControl.md/.docx` | Tổng quan 28 nguồn verified | Trích dẫn; không thêm nguồn chưa kiểm chứng |
| `RBL_Nop_Nhom07_SUM26/` | Bản nộp checkpoint Slot 2/4/6 theo template thầy | Cập nhật theo tiến độ |
| `RBL_Checkpoint_Full_Templates_SUM26/` | Template gốc + rubric của thầy | Đối chiếu yêu cầu chấm điểm |

## 7. Glossary Việt–Anh

| Tiếng Việt | English | Ghi chú |
|---|---|---|
| Tha hóa | Alienation | Marx (1844); trong dự án: mất quyền làm chủ hoạt động tinh thần trước thuật toán |
| Nhu cầu giả tạo | False needs | Marcuse (1964); nhu cầu do hệ thống khen thưởng cấy vào |
| Tính chủ thể | Subjectivity / agency | Năng lực tự quyết của chủ thể |
| Cảm nhận quyền tự quyết | Sense of agency | Cấu trúc đo được (Lukoff và cộng sự, 2021) — DV chính |
| Bong bóng lọc | Filter bubble | Pariser (2011); đo bằng độ đa dạng nguồn |
| Khoảng dừng phản tư | Reflective pause / microboundary | Cox và cộng sự (2016) |
| Cuộn vô tận | Infinite scroll | Bề mặt can thiệp chính của F1 |
| Muốn vs Thích | Want–Like Split | Phát hiện M1 của Level 4 |
| Nghịch lý Biết–Làm | Knowing–Doing paradox | Phát hiện Z1 của Level 4 |
| Công cụ tự kiểm soát số | Digital self-control tool (DSCT) | Lyngs và cộng sự (2019) |

## 8. Nhóm và phân công

| Thành viên | MSSV | Vai trò |
|---|---|---|
| Hồ Quốc Đạt | SE193114 | Trưởng nhóm · Kiến trúc & dev core (service worker, adapters) |
| Nguyễn Thị Mai Vỹ | SE193020 | UI React (popup/options) & xử lý dữ liệu test |
| Hoàng Tấn Đạt | SE196321 | Phân tích lý luận MLN · rà "4 ràng buộc đạo đức" trên từng tính năng |
| Nguyễn Công Thành | SE196309 | Khảo sát người dùng, tổ chức pilot/trial, Google Forms |
| Phạm Trần Trung Hiếu | SE193483 | Phân tích dữ liệu phản hồi & viết báo cáo |
