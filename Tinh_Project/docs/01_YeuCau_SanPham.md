# 01 — YÊU CẦU SẢN PHẨM (Requirements Specification)

> Đọc sau `00_TongQuan_DuAn.md`. File này định nghĩa **cái gì** phải làm; **làm thế nào** nằm ở docs 02–06.

## 1. User stories

### Onboarding & consent (US-0x)
- **US-01.** Là sinh viên tham gia thử nghiệm, tôi muốn được giải thích rõ extension làm gì, thu dữ liệu gì và dữ liệu ở đâu, để tôi quyết định có tham gia không. *(Màn onboarding lần đầu cài — bắt buộc trước khi bất kỳ tính năng nào chạy.)*
- **US-02.** Là người dùng, tôi muốn bật/tắt từng tính năng riêng lẻ để chọn mức can thiệp phù hợp với mình.

### F1 — Khoảng dừng phản tư (US-1x)
- **US-11.** Là người dùng đang cuộn liên tục, tôi muốn được nhắc dừng đúng lúc để tự hỏi mình đang "muốn" hay đang "thích", trước khi tiếp tục.
- **US-12.** Là người dùng, tôi muốn chỉnh được ngưỡng thời gian (N phút) kích hoạt khoảng dừng.
- **US-13.** Là người dùng, tôi muốn hiểu vì sao màn hình dừng xuất hiện (link "Vì sao tôi thấy cái này?").

### F2 — Gương bong bóng lọc (US-2x)
- **US-21.** Là người dùng, tôi muốn xem thống kê nguồn nội dung mình đã tiêu thụ 7 ngày qua, để biết nguồn tin của mình đa dạng hay thu hẹp.
- **US-22.** Là người dùng, tôi muốn thấy phần nào do **tôi chọn** (subscription/bạn bè) và phần nào do **thuật toán đề xuất**, để không đổ hết trách nhiệm cho thuật toán.
- **US-23.** Là người dùng, tôi muốn được gợi ý "thử một góc nhìn khác" khi độ đa dạng của tôi thấp.

### F3 — Nhật ký chủ thể (US-3x)
- **US-31.** Là người dùng, khi mở mạng xã hội lần đầu trong ngày, tôi muốn được hỏi ý định ("vào để làm gì, dự kiến bao lâu") để bắt đầu phiên có ý thức.
- **US-32.** Là người dùng, khi kết thúc phiên, tôi muốn đối chiếu thực tế với ý định để nhận ra mình giữ được lời hứa với bản thân hay không.
- **US-33.** Là người dùng, tôi muốn xem chuỗi "micro-wins" (số phiên giữ đúng ý định) theo 7/30 ngày để có động lực.

### Export dữ liệu nghiên cứu (US-4x)
- **US-41.** Là người tham gia nghiên cứu, tôi muốn tự bấm "Xuất dữ liệu nghiên cứu" để xem trước và tự gửi file cho nhóm — không có gì tự động gửi đi.

## 2. Yêu cầu chức năng (FR)

| ID | Yêu cầu | Ưu tiên | Nguồn |
|---|---|---|---|
| FR-1 | Content script phát hiện phiên cuộn liên tục trên YouTube/Facebook và kích hoạt overlay dừng sau ngưỡng N phút (mặc định 15, min 5, max 60) | MUST | US-11, US-12 |
| FR-2 | Overlay dừng hiển thị câu hỏi muốn/thích + 2 lựa chọn ("Tiếp tục có ý thức" / "Dừng phiên") + link giải thích; có cooldown ≥10 phút giữa 2 lần | MUST | US-11, US-13 |
| FR-3 | Ghi log local mỗi lần dừng: timestamp, thời gian cuộn trước đó, lựa chọn của user | MUST | biến X′1, M′1 |
| FR-4 | Trích xuất **tên nguồn** của item đã xem (YouTube: channel; Facebook: page/group/friend) + cờ `recommended` vs `self-selected`; KHÔNG lưu nội dung, KHÔNG lưu URL đầy đủ | MUST | US-21, US-22 |
| FR-5 | Tính và hiển thị chỉ số đa dạng nguồn (unique-source ratio + Shannon entropy, cửa sổ 7 ngày) trong popup, tách phần "bạn chọn" vs "thuật toán đề xuất" | MUST | US-21, US-22 |
| FR-6 | Gợi ý khám phá nguồn khác khi entropy dưới ngưỡng (văn phong gợi mở, không phán xét) | SHOULD | US-23 |
| FR-7 | Prompt đặt ý định ở phiên đầu ngày/nền tảng; đối chiếu khi kết phiên (đóng tab hoặc idle >30′); lưu streak micro-wins | MUST | US-31–33 |
| FR-8 | Popup React: 4 tab — Hôm nay (tổng quan), Gương, Nhật ký, Cài đặt | MUST | tất cả |
| FR-9 | Options page: onboarding + consent + bật/tắt tính năng + nút export JSON/CSV | MUST | US-01, US-02, US-41 |
| FR-10 | Export: JSON đầy đủ + CSV tổng hợp đúng schema trong `07_DuLieu_DoLuong_Export.md` | MUST | US-41 |
| FR-11 | TikTok web adapter cho F1+F2 | COULD (P7) | stretch |

## 3. Yêu cầu phi chức năng (NFR)

| ID | Yêu cầu | Kiểm chứng |
|---|---|---|
| NFR-1 | **Local-only:** không có network request nào ra ngoài (trừ tài nguyên tĩnh đóng gói sẵn). Manifest không khai `host_permissions` ngoài các domain MXH đích | Review manifest + DevTools Network tab trống |
| NFR-2 | **Minh bạch:** mọi can thiệp có mục "Vì sao?" giải thích cơ chế + mục đích nghiên cứu | Checklist đạo đức (Hoàng Tấn Đạt rà) |
| NFR-3 | **Không ép buộc:** không tính năng nào chặn cứng; user luôn tiếp tục được trong ≤2 click | Test thủ công |
| NFR-4 | **Hiệu năng:** content script không làm giật feed — MutationObserver có debounce; CPU idle <1% | Chrome Performance profile |
| NFR-5 | **Riêng tư:** chỉ lưu tên nguồn + đếm; không nội dung bài, không URL video/post cụ thể, không PII của người khác | Code review + xem file export |
| NFR-6 | Storage < 5MB (quota chrome.storage.local 10MB) — dữ liệu >30 ngày tự cắt | Unit test rotation |
| NFR-7 | Tiếng Việt là ngôn ngữ UI chính; chuỗi tập trung trong `shared/i18n/vi.ts` | Review |
| NFR-8 | Hoạt động trên Chrome ≥120 và Edge; SPA navigation (YouTube) không làm chết content script | Test matrix trong `09_KiemThu` |

## 4. Phạm vi

**Trong phạm vi:** Chrome/Edge desktop; YouTube (trang chủ, watch, Shorts web), Facebook (news feed, watch); 3 tính năng F1–F3; onboarding/consent; export.

**Ngoài phạm vi (ghi rõ trong paper mục Hạn chế):**
- **Mobile app** — đã phân tích và loại: iOS/Android sandbox không cho inject UI/đọc feed app khác; 2/3 tính năng bất khả thi. Hướng Level 6: Android Accessibility Service (như one sec, ScreenZen).
- Backend/tài khoản/đồng bộ đám mây — vi phạm cam kết local-only, không cần cho nghiên cứu n≥10.
- Instagram/Threads/Shopee — ngoài nguồn lực 5 tuần.
- Đo lường "thời gian thực sự tiết kiệm" — cần theo dõi dài hạn, ngoài phạm vi thử nghiệm 1–2 tuần.

## 5. Tiêu chí nghiệm thu tổng thể (trước trial)

1. Cả 3 tính năng chạy ổn trên YouTube + Facebook trong 30 phút dùng thử liên tục, không crash, không giật feed.
2. Checklist 4 ràng buộc đạo đức (mục 5 của `00_TongQuan`) pass 100%.
3. Export ra file JSON + CSV mở được, đúng schema, không chứa nội dung bài/URL cụ thể.
4. Một người ngoài nhóm cài được extension từ file zip + hướng dẫn trong ≤5 phút.
