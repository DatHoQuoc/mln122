# Tỉnh — Browser Extension (RBL Level 5, Nhóm 07)

Công cụ giúp sinh viên tái chiếm tính chủ thể trước thuật toán mạng xã hội. **Local-first, không backend, không gửi dữ liệu đi đâu.**

> Tài liệu thiết kế đầy đủ ở `../docs/` (đọc `00_TongQuan_DuAn.md` trước, rồi `08_KeHoach_TrienKhai_Phases.md`).

## Stack

Chrome Extension Manifest V3 · TypeScript · React 18 (popup/options) · Vite + CRXJS · chrome.storage.local · Vitest.

## Chạy dev

```bash
npm install
npm run dev          # Vite + CRXJS HMR, build vào dist/
```

Rồi load unpacked:
1. Mở `chrome://extensions`
2. Bật **Developer mode** (góc trên phải)
3. **Load unpacked** → chọn thư mục `dist/`
4. Icon 🌙 Tỉnh xuất hiện; mở YouTube/Facebook → mở DevTools Console thấy log `[Tỉnh] content script trên youtube`.

## Lệnh

| Lệnh | Việc |
|---|---|
| `npm run dev` | Dev + HMR |
| `npm run build` | Type-check + build production vào `dist/` |
| `npm run test` | Vitest (metrics, storage, adapters) |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Prettier ghi lại |
| `npm run zip` | Build + nén `dist/` → `release/tinh-extension-vX.Y.Z.zip` (gửi người thử nghiệm) |

## Cấu trúc

Xem `../docs/03_CauTruc_ThuMuc_Repo.md`. Tóm tắt:
- `src/background/` — service worker, session tracker, storage writer
- `src/content/` — content script + `adapters/` (youtube, facebook, tiktok) + `features/` (F1/F2/F3)
- `src/popup/` · `src/options/` — React UI
- `src/shared/` — types, messages, storage, **metrics** (pure, có test), i18n, export
- `tests/` — Vitest + fixtures HTML

## Trạng thái (P0–P7 — code hoàn tất, chờ pilot)

✅ **P0** scaffold · **P1** F1 Khoảng dừng · **P2** F3 Nhật ký · **P3** F2 Gương · **P4** Facebook adapter + onboarding/consent + export JSON/CSV + trang "Vì sao?" + notification · **P7** TikTok web adapter (stretch).
- 3 tính năng lõi chạy trên **YouTube + Facebook + TikTok**; popup 4 tab thật; options đầy đủ (onboarding → cài đặt → export → "Vì sao?").
- **33 unit test** (metrics, pause-logic, journal-view, mirror-view, tiktok parse) — `npm run test`.
- Vẫn **local-only**: chỉ có `content_scripts.matches` 3 domain, không host_permissions, 0 request ra ngoài.

⏭️ Tiếp theo (không phải code): **P5 pilot ≥5 người** → **P6 trial ≥10 + pre/post** → điền chương VI–VIII báo cáo. Xem `../pilot/` (README bản pilot, checklist test tay, form khảo sát) và `../docs/09`, `../docs/10`.

## Nguyên tắc bất di bất dịch (docs/00 §5)

1. Minh bạch — mọi can thiệp giải thích được "vì sao".
2. Tùy chỉnh được — user chỉnh ngưỡng, tắt/bật từng tính năng.
3. Không ép buộc — luôn có đường tiếp tục.
4. Local-only — không network call; export chỉ khi user chủ động bấm.

## Ghi chú kỹ thuật

- Node ≥ 20 khuyến nghị; đã kiểm với Node 25.
- `@crxjs/vite-plugin` đã dùng bản **stable 2.0.0** — pin trong `package.json`, không tự nâng.
- MV3 service worker có thể bị kill — mọi state đếm giờ phải persist vào storage (xử lý ở P1).
