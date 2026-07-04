# 08 — KẾ HOẠCH TRIỂN KHAI THEO PHASE

> **File điều phối chính cho agent code.** Làm tuần tự P0→P6; mỗi phase chỉ bắt đầu khi phase trước tick đủ DoD. P7 là stretch. Deadline neo theo checkpoint Slot của thầy (Slot 4: Literature+Method + prototype v1 · Slot 6: Findings+PAAL · Slot 8: Showcase).

## Tổng quan

| Phase | Tên | Phụ thuộc | Deadline | Người chính |
|---|---|---|---|---|
| P0 | Scaffold & khung sườn | — | trước Slot 4 | Quốc Đạt |
| P1 | F1 Khoảng dừng (YouTube) — **must-demo** | P0 | Slot 4 (prototype v1) | Quốc Đạt + Mai Vỹ |
| P2 | F3 Nhật ký chủ thể | P0 | Slot 4→6 | Mai Vỹ |
| P3 | F2 Gương bong bóng (YouTube) | P0 | Slot 4→6 | Quốc Đạt |
| P4 | Facebook adapter + onboarding/consent/export | P1–P3 | trước pilot | Quốc Đạt + Mai Vỹ |
| P5 | Pilot ≥5 người + fix | P4 | **Slot 6** | Công Thành |
| P6 | Trial ≥10 người + thu dữ liệu | P5 | trước Slot 8 | Công Thành + Trung Hiếu |
| P7 | (stretch) TikTok web adapter | P4 | nếu kịp | — |

Song song code: **Tấn Đạt** rà checklist đạo đức mỗi UI mới; **Trung Hiếu** chuẩn bị Google Forms (07 §5) từ P4.

---

## P0 — Scaffold & khung sườn

**Việc:**
1. `npm create vite` + cài `@crxjs/vite-plugin`, React 18, TypeScript strict, Vitest, ESLint/Prettier — pin version.
2. Tạo đúng cây thư mục `03 §1`; viết `src/manifest.ts` (name "Tỉnh", permissions: `storage`, `alarms`, `tabs`, `notifications`; content_scripts matches: `*://*.youtube.com/*`, `*://*.facebook.com/*`).
3. Skeleton: service worker log "alive"; content script log platform; popup React "Hello Tỉnh" 4 tab rỗng; options rỗng.
4. `shared/`: types.ts + messages.ts (copy từ 02/07), storage.ts wrapper, i18n/vi.ts.
5. Scripts npm đủ (03 §3); `npm run zip` ra file cài được.
6. README: hướng dẫn dev + load unpacked (chụp màn hình).

**DoD:**
- [ ] `npm run dev` → load unpacked → icon hiện, popup mở, console content script log đúng trên youtube.com và facebook.com.
- [ ] `npm run test` chạy (1 test placeholder pass), lint sạch.
- [ ] `npm run zip` ra zip; người khác cài được theo README.

## P1 — F1 Khoảng dừng trên YouTube (spec: `04`)

**Việc:**
1. `YouTubeAdapter.observeScrollActivity` + `getOverlayRoot` (xử lý SPA `yt-navigate-finish`).
2. SessionTracker trong worker: đếm scrolledSeconds, ngưỡng, cooldown, persist 30s/lần (04 §2).
3. Overlay Shadow DOM đúng mockup 04 §3 (2 nút ngang hàng + link "Vì sao?" + ESC).
4. Ghi PauseEvent; Settings popup chỉnh N phút (5–60) áp dụng nóng.
5. Unit test trigger logic (mô phỏng chuỗi activity timestamps).

**DoD:** AC-1 → AC-8 của `04 §6` tick đủ. **Đây là bản demo Slot 4** — quay video demo 1 phút làm minh chứng.

## P2 — F3 Nhật ký chủ thể (spec: `06`)

**Việc:**
1. Banner ý định (content, Shadow DOM) + trigger phiên đầu ngày/sau 2h idle.
2. Đối chiếu qua popup + notification (tắt được); SessionRecord đầy đủ.
3. Tab Nhật ký: lịch chấm, streak, danh sách phiên; `metrics.ts`: streak + micro-win (unit test fixture 10 ngày).
4. Tích hợp F1: nút "Dừng phiên" → đối chiếu ngay, `viaF1Stop: true`.

**DoD:** AC-1 → AC-7 của `06 §5` tick đủ.

## P3 — F2 Gương bong bóng trên YouTube (spec: `05`)

**Việc:**
1. `YouTubeAdapter.observeFeedItems`: watch ≥15s / Shorts ≥5s; phân origin subscription vs recommended.
2. Worker cộng dồn DaySourceLog; hash nguồn cá nhân.
3. `metrics.ts`: USR + Shannon entropy chuẩn hóa + RR (PURE, unit test trước).
4. Tab Gương đúng mockup 05 §4 (chart CSS/SVG thuần, filter nền tảng, gợi ý có điều kiện).

**DoD:** AC-1 → AC-6 của `05 §6` tick đủ (AC-7 dời sang P4).

## P4 — Facebook + onboarding/consent/export

**Việc:**
1. `FacebookAdapter`: observeScrollActivity + observeFeedItems (IntersectionObserver ≥3s; attribute/role-based selectors — 02 §6); F1+F2+F3 chạy trên Facebook.
2. Options: onboarding 3 bước + consent gate (chưa đồng ý = mọi tính năng tắt) + trang "Vì sao?" cho F1/F2.
3. Export JSON/CSV + preview đúng `07 §4`; participantCode trong Settings.
4. Fixture tests cho FacebookAdapter.

**DoD:** AC-7 của 05; AC export 07 §6; checklist 4 ràng buộc đạo đức pass trên cả 2 nền tảng; tiêu chí nghiệm thu tổng thể `01 §5` pass → **tag `phase-4-done` = bản pilot**.

## P5 — Pilot ≥5 người (protocol: `09 §3`)

**Việc:** tuyển 5 người (lớp/CLB đối tác), cài từ zip, dùng 3–5 ngày; thu phản hồi nhanh + quan sát lỗi; fix critical bugs; ghi PAAL đầy đủ (thử–sai–học).

**DoD:**
- [ ] ≥5 người cài & dùng ≥3 ngày; ≥5 phản hồi ghi nhận (đủ minh chứng Slot 6).
- [ ] Không còn bug crash/mất dữ liệu; danh sách known-issues cập nhật.
- [ ] Điền findings sơ bộ vào `RBL_Nop_Nhom07_SUM26/Nhom07_Slot6_Findings_PAAL.docx` (các ô 🔲).

## P6 — Trial ≥10 người + thu dữ liệu (protocol: `09 §4` + `07 §5`)

**Việc:** PRE Forms → cài → 1–2 tuần → POST Forms + export + phỏng vấn G; nhập bảng H; Trung Hiếu tổng hợp mô tả (pre/post, SUS, trích phỏng vấn theo P1–P3).

**DoD:**
- [ ] ≥10 bộ dữ liệu đầy đủ (pre + post + export; phỏng vấn ≥6 người).
- [ ] Bảng H hoàn chỉnh; SUS trung bình tính xong; agency pre/post tính xong.
- [ ] Dữ liệu đủ điền chương VI của paper → chuyển sang `10_HuongDan_VietPaper.md`.

## P7 — (stretch) TikTok web

Chỉ làm khi P0–P6 xong và còn thời gian: `TikTokAdapter` cho F1 (+F2 nếu kịp). Không cam kết trong báo cáo.

---

## Luật chung khi thực thi

1. **Không bắt đầu phase khi phase phụ thuộc chưa tick đủ DoD.** Nếu kẹt >1 ngày ở một AC: ghi vào PAAL, hỏi nhóm, có thể degrade (ví dụ bỏ Shorts, chỉ làm watch page) nhưng phải ghi rõ vào known-issues + mục Hạn chế của paper.
2. Mỗi phase xong: tag git `phase-N-done` + 1 dòng PAAL (Plan/Action/AI use/Learning) — làm minh chứng checkpoint.
3. Mọi UI mới phải qua checklist đạo đức (00 §5) trước khi merge.
4. AI dùng để sinh code phải khai trong AI Declaration (bảng 5 cột) — giữ kỷ luật liêm chính như đã cam kết Slot 2.
