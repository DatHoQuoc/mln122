# 10 — HƯỚNG DẪN VIẾT PAPER & CHUẨN BỊ SHOWCASE

> Dành cho agent/thành viên viết báo cáo sau khi P6 xong (đã có dữ liệu). Nguyên tắc tối cao: **chỉ viết điều dữ liệu cho phép** — n≥10, mô tả, không nhân quả thống kê, không khái quát hóa.

## 1. File đích và nguyên tắc

- File đích: `MLN122/BaoCao_L5_KhungVaPhanVietDuoc.md` (convert .docx bằng `tools/md2docx.py` sau khi điền xong).
- Chương I–V và IX **đã viết hoàn chỉnh** — KHÔNG viết lại; chỉ rà số liệu tham chiếu (vd "tối thiểu mười sinh viên" → số thật).
- Mọi ô `🔲 [ĐIỀN: ...]` là việc của bạn. Tìm bằng cách search chuỗi `🔲` trong file.
- Trích dẫn: chỉ dùng nguồn đã có trong danh mục (28 nguồn HCI + 11 nguồn MLN đã verified). KHÔNG thêm nguồn mới chưa kiểm chứng DOI.
- Văn phong: tiếng Việt học thuật, thuật ngữ EN giữ nguyên; tránh từ AI sáo rỗng ("đáng chú ý là", "quan trọng cần lưu ý"); độ dài đoạn biến thiên tự nhiên.

## 2. Điền từng ô — checklist theo chương

### Tóm tắt & Abstract
- [ ] Điền câu kết quả chính vào Tóm tắt (1–2 câu: SUS đạt bao nhiêu, agency thay đổi hướng nào, phản hồi P1–P3 ra sao).
- [ ] Viết **Abstract (EN) 150–250 từ** — viết ĐỘC LẬP theo cùng dàn ý, không dịch máy từng câu.

### Chương VI (từ bảng H + export + phỏng vấn)
- [ ] **6.1 Quy trình triển khai:** số người mời/cài thành công/hoàn thành; thời gian trial; vướng mắc cài đặt (lấy từ pilot log).
- [ ] **6.2 Đặc điểm mẫu:** bảng n người × (năm học, ngành, nền tảng chính, giờ MXH/ngày — mục F).
- [ ] **6.3 SUS (RQ2):** trung bình ± SD, min–max, so mốc tham chiếu 68 (Brooke, 1996). 1 bảng + 1 câu diễn giải. KHÔNG nói "công cụ tốt/kém" — nói "trên/dưới mốc tham chiếu".
- [ ] **6.4 Agency pre/post (RQ3):** bảng A/B/C/D pre vs post (trung bình, chênh lệch). Câu khung: *"Ở mức mô tả, điểm trung bình mục A tăng/giảm từ … lên …; do cỡ mẫu nhỏ, khác biệt này chỉ mang tính gợi ý, không kiểm định."*
- [ ] **6.5 Phản hồi định tính theo tính năng:** nhóm trích dẫn theo P1/P2/P3; mỗi P: 2–3 trích dẫn + số liệu hành vi đối chứng từ export (vd P1: tỷ lệ choice `stop` 30%, reactionMs trung vị 3.4s → có phản tư thật).

### Chương VII
- [ ] **7.1 Đối chiếu P1–P3:** mỗi mệnh đề một tiểu đoạn: bằng chứng ủng hộ / không ủng hộ / hỗn hợp — trung thực, được phép kết luận "không ủng hộ".
- [ ] **7.2 Đối chiếu tài liệu:** khung đã viết sẵn trong file — chỉ điền số: hiệu ứng khiêm tốn có lặp lại Monge Roffarello & De Russis (2023)? agency có hướng như Lukoff (2021)? phản ứng với "gương" có giống bất ngờ kiểu Eslami (2015)?
- [ ] **7.3 Giá trị liên ngành:** dẫn 1–2 minh chứng phản hồi cho thấy *lý luận định hình trải nghiệm* (vd người dùng nhắc lại ngôn ngữ "muốn/thích").

### Chương VIII
- [ ] Kết luận 3 đoạn: (1) đã chuyển hóa 3 phát hiện L4 thành công cụ chạy được; (2) kết quả chính RQ2/RQ3 một cách thận trọng; (3) ý nghĩa cho giáo dục năng lực số FPT + hướng Level 6.

### Phụ lục
- [ ] Bảng AI Usage 5 cột (công cụ/mục đích/prompt mẫu/giữ–bỏ/điểm mù) — gộp từ PAAL các phase + AI Declaration.
- [ ] CRediT theo bảng phân công 00 §8; xác nhận cơ chế bảo mật dữ liệu thực tế (07 §2) vào mục Đạo đức.

### Việc tồn đọng từ trước (nhắc lại)
- [ ] Điền tên lớp/CLB đối tác (mọi chỗ `[ĐIỀN tên đối tác]`).
- [ ] Chốt năm Giáo trình KTCT (2021/2024) + tên tác giả bài IUH 2025 trong danh mục.

## 3. Bẫy cần tránh (mentor sẽ soi)

1. **Overclaim nhân quả:** cấm "công cụ ĐÃ LÀM TĂNG tự quyết" — chỉ "người tham gia BÁO CÁO cảm nhận kiểm soát cao hơn".
2. **Overclaim bong bóng:** nếu entropy user không thấp, viết đúng như vậy — nó khớp Bakshy/Bruns và là finding tốt, không phải thất bại.
3. **Chôn kết quả xấu:** SUS thấp hay P nào không được ủng hộ → báo cáo thẳng + bàn ở Hạn chế. Rubric chấm "findings có vượt quá bằng chứng không".
4. **Số liệu lệch nhau giữa các chương:** một nguồn sự thật duy nhất = bảng H; mọi con số trong VI–VIII phải truy về bảng H hoặc file export.

## 4. Slide Showcase Slot 8 (khung 8 nội dung bắt buộc của rubric L5)

| Slide | Nội dung | Ghi chú |
|---|---|---|
| 1 | Tên đề tài + nhóm + 1 câu "extension giúp SV tái chiếm tính chủ thể" | |
| 2 | Vấn đề thực tiễn & bối cảnh (3 phát hiện L4, 1 hình) | nội dung bắt buộc #1 |
| 3 | Khung lý luận: tha hóa/nhu cầu giả tạo → bảng ánh xạ phạm trù→tính năng | #2 |
| 4 | Phương pháp: DSR + khung biến X′→M′→Y′ (1 sơ đồ) | #3 |
| 5 | Kết quả: SUS + agency pre/post + 2 trích dẫn đắt giá | #4 |
| 6 | **DEMO TRỰC TIẾP** F1 trên YouTube (fallback: video 60s quay sẵn) | #5 |
| 7 | Phản hồi người dùng + điểm căng đạo đức nudge | #6 |
| 8 | AI Usage từng bước (bảng 5 cột rút gọn) | #7 |
| 9 | Hạn chế + hướng phát triển (mobile/L6, Euréka) + "giá trị liên ngành" 1 câu | #8 |

**Chuẩn bị demo:** máy demo cài sẵn bản build ổn định + ngưỡng N=1′ để trigger nhanh; video backup quay trước; tập trả lời 8 trục hỏi của thầy (file `04_Template_RBL_QuickReport_Slides_Outline.docx` bảng 4).

## 5. Sau Showcase (Slot 9–10)

1. Ghi nhận góp ý hội đồng vào bảng D của template Slot tương ứng.
2. Sửa báo cáo theo góp ý; convert .docx; nộp bản cuối + Dual Output (bản đại chúng: infographic/bài giới thiệu "Tỉnh" cho SV ngoài ngành — quy tắc "3 XÓA": bỏ thuật ngữ, bỏ cấu trúc học thuật, bỏ giọng nghiêm trang).
3. Viết **Inheritance Chunk** 300–500 chữ (RQ, dữ liệu, phát hiện, hướng tiếp) — đầu vào Level 6/môn LLCT kế tiếp.
