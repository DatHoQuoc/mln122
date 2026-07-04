# 09 — KIỂM THỬ & PROTOCOL PILOT/TRIAL

## 1. Unit tests (Vitest — chạy trong CI/`npm run test`)

| File | Kiểm gì | Ghi chú |
|---|---|---|
| `tests/metrics.test.ts` | Entropy chuẩn hóa (fixture 05 AC-2), USR, RR, streak/micro-win (fixture 10 ngày 06 AC-5) | **Viết TRƯỚC khi viết UI** — đây là logic nghiên cứu, sai là sai số liệu paper |
| `tests/storage.test.ts` | Rotation 30 ngày, schemaVersion, ghi/đọc typed wrapper | |
| `tests/adapters/youtube.test.ts` | Parse `fixtures/youtube-home.html`, `youtube-watch.html`: trích sourceName/origin đúng | jsdom environment |
| `tests/adapters/facebook.test.ts` | Parse `fixtures/facebook-feed.html`: phân origin bạn bè vs "Gợi ý cho bạn" | |
| `tests/export.test.ts` | JSON/CSV khớp nhau; không lộ tên nguồn trong export (07 AC-1, AC-5) | |

Fixtures: lưu HTML snapshot thật (View Source → cắt phần feed, xóa PII trước khi commit). Khi nền tảng đổi DOM → cập nhật fixture + adapter cùng lúc.

## 2. Manual test matrix (chạy trước mỗi tag `phase-N-done` và trước pilot)

| # | Kịch bản | YouTube | Facebook |
|---|---|---|---|
| M1 | Cuộn liên tục tới ngưỡng → overlay F1 đúng hành vi (2 nút + ESC + Vì sao?) | ☐ | ☐ |
| M2 | Fullscreen video tới ngưỡng → overlay chờ thoát fullscreen | ☐ | n/a |
| M3 | Nghỉ 60s → đếm reset; đổi tab → dừng đếm | ☐ | ☐ |
| M4 | Banner ý định phiên đầu ngày; Bỏ qua tự ẩn 20s | ☐ | ☐ |
| M5 | Đóng tab → đối chiếu hiện ở popup kế tiếp, phút thực tế ±1′ | ☐ | ☐ |
| M6 | Xem 10 item (trộn self-selected/recommended) → Gương đếm & phân loại đúng | ☐ | ☐ |
| M7 | SPA navigation liên tục 10 lần → content script vẫn sống | ☐ | n/a |
| M8 | 2 tab cùng nền tảng → không đếm trùng, không overlay đôi | ☐ | ☐ |
| M9 | Settings: đổi N, tắt từng tính năng → hiệu lực ngay | ☐ | ☐ |
| M10 | DevTools Network: 0 request ra ngoài trong 15′ dùng | ☐ | ☐ |
| M11 | Export: preview đúng, 2 file tải được, mở Excel không vỡ | — | — |
| M12 | Gỡ + cài lại extension → onboarding lại từ đầu, consent gate hoạt động | — | — |
| M13 | Feed không giật khi cuộn nhanh (cảm quan + Performance profile) | ☐ | ☐ |

## 3. Pilot protocol — Phase 5 (≥5 người, phục vụ Slot 6)

**Mục tiêu:** bắt bug thực địa + thu ≥5 phản hồi sơ bộ làm minh chứng Slot 6. KHÔNG phải trial chính thức — không cần pre/post đầy đủ.

1. **Tuyển:** 5 sinh viên từ lớp/CLB đối tác (ưu tiên người dùng YouTube/Facebook trên máy tính hằng ngày). Nói rõ: bản thử nghiệm, có thể lỗi.
2. **Cài:** gửi zip + README; hướng dẫn qua call 10′ nếu kẹt. Ghi lại mọi vướng mắc khi cài (chính nó là finding usability).
3. **Dùng 3–5 ngày** tự nhiên; nhóm KHÔNG nhắc dùng (tránh demand effect).
4. **Thu:** form phản hồi nhanh 5 câu (thang 1–5 + 1 câu mở): dễ cài? overlay xuất hiện hợp lý? có gây phiền? tính năng nào hữu ích nhất? gặp lỗi gì? — kèm 1 buổi quan sát 15′/người nếu thu xếp được.
5. **Xử lý:** phân loại bug (critical → fix ngay; minor → known-issues); phản hồi → điền Slot 6 (bảng Findings + PAAL).

## 4. Trial protocol — Phase 6 (≥10 người, dữ liệu chính cho paper)

Theo đúng `07 §5` + `BoCongCu_DoLuong_L5`:

| Bước | Việc | Công cụ | Ai |
|---|---|---|---|
| 1 | Mời ≥12 người (dự phòng rơi rớt còn ≥10), giải thích + consent | Thư mời + form consent | Công Thành |
| 2 | **PRE**: Forms mục A+B+C+D+F; đặt participantCode | Google Forms | Công Thành |
| 3 | Cài extension, nhập participantCode vào Settings | zip + README | Quốc Đạt hỗ trợ |
| 4 | Dùng tự nhiên **1–2 tuần** (không nhắc, không can thiệp) | — | — |
| 5 | **POST**: Forms A+B+C+D+E(SUS); export JSON/CSV gửi nhóm | Forms + export | Công Thành |
| 6 | Phỏng vấn mục G (8–10′/người, ≥6 người, ghi âm nếu đồng ý) | BoCongCu §G | Công Thành + Tấn Đạt |
| 7 | Nhập bảng H; tính mô tả: SUS trung bình±SD (mốc 68), agency pre/post, tỷ lệ choice stop/continue, entropy tuần 1 vs 2 | Excel | Trung Hiếu |
| 8 | Mã hóa phỏng vấn theo chủ đề (Braun & Clarke, 2006), ánh xạ P1–P3 | — | Trung Hiếu + Tấn Đạt |

**Ràng buộc đạo đức trial:** tình nguyện, rút lui bất kỳ lúc nào không cần lý do; dữ liệu ẩn danh theo participantCode; ghi âm chỉ khi đồng ý; nhắc export/gỡ extension sau khi xong nếu không muốn dùng tiếp.

**Tiêu chí dữ liệu "đủ để viết paper":** ≥10 bộ (pre+post+export); ≥6 phỏng vấn; bảng H không ô trống ở cột SUS và A_pre/A_post.
