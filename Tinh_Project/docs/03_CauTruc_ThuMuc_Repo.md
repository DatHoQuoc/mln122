# 03 — CẤU TRÚC THƯ MỤC REPO & QUY ƯỚC LÀM VIỆC

> Agent thực hiện Phase 0 (scaffold) tạo đúng cây thư mục này. Repo code đặt tại `Tinh_Project/tinh-extension/`.

## 1. Cây thư mục

```
tinh-extension/
├── package.json                  # deps pin version; scripts: dev/build/test/lint/zip
├── vite.config.ts                # Vite + @crxjs/vite-plugin
├── tsconfig.json                 # strict: true
├── .eslintrc.cjs + .prettierrc
├── README.md                     # cách chạy dev, build, load unpacked (viết ở P0)
│
├── src/
│   ├── manifest.ts               # định nghĩa manifest MV3 (CRXJS defineManifest)
│   │
│   ├── background/
│   │   ├── service-worker.ts     # entry: đăng ký listeners, alarms
│   │   ├── session-tracker.ts    # máy trạng thái phiên (02 §2.3)
│   │   └── storage-writer.ts     # điểm ghi storage duy nhất + rotation 30 ngày
│   │
│   ├── content/
│   │   ├── index.ts              # entry: chọn adapter theo hostname, init features
│   │   ├── adapters/
│   │   │   ├── feed-adapter.ts   # interface FeedAdapter (02 §2.2)
│   │   │   ├── youtube.ts        # YouTubeAdapter
│   │   │   ├── facebook.ts       # FacebookAdapter
│   │   │   └── tiktok.ts         # (P7 — stretch)
│   │   └── features/
│   │       ├── pause-overlay/    # F1: overlay.ts (Shadow DOM), trigger.ts
│   │       ├── source-tracker/   # F2: tracker.ts (nghe FEED_ITEM_SEEN)
│   │       └── session-hooks/    # F3: bắt mở/đóng phiên, prompt ý định
│   │
│   ├── popup/                    # React 18
│   │   ├── index.html + main.tsx
│   │   ├── App.tsx               # 4 tab: Today / Mirror / Journal / Settings
│   │   ├── pages/ (Today.tsx, Mirror.tsx, Journal.tsx, Settings.tsx)
│   │   └── components/ (DiversityChart.tsx, StreakCalendar.tsx, ...)
│   │
│   ├── options/                  # React 18
│   │   ├── index.html + main.tsx
│   │   └── pages/ (Onboarding.tsx, Consent.tsx, ExportData.tsx)
│   │
│   ├── shared/
│   │   ├── types.ts              # FeedItemInfo, Settings, các record storage
│   │   ├── messages.ts           # ExtMessage union (02 §3)
│   │   ├── storage.ts            # typed wrapper quanh chrome.storage.local
│   │   ├── metrics.ts            # entropy, unique-source ratio, streak (PURE functions)
│   │   ├── export.ts             # build JSON/CSV export (07 §4)
│   │   └── i18n/vi.ts            # toàn bộ chuỗi UI tiếng Việt
│   │
│   └── styles/                   # CSS cho popup/options (overlay tự chứa trong Shadow DOM)
│
├── tests/
│   ├── metrics.test.ts           # entropy/ratio/streak — bắt buộc có trước khi viết UI
│   ├── storage.test.ts           # rotation, schema version
│   ├── adapters/
│   │   ├── youtube.test.ts       # parse fixtures
│   │   └── facebook.test.ts
│   └── fixtures/                 # HTML snapshot của feed từng nền tảng
│       ├── youtube-home.html
│       ├── youtube-watch.html
│       └── facebook-feed.html
│
└── release/                      # output `npm run zip` — file .zip gửi người thử nghiệm
```

## 2. Quy ước đặt tên

- File: `kebab-case.ts`; component React: `PascalCase.tsx`; test: `*.test.ts` cạnh nhóm chức năng trong `tests/`.
- Types/interfaces: `PascalCase`; hằng số: `SCREAMING_SNAKE_CASE`; biến/hàm: `camelCase`.
- Chuỗi UI: **không hardcode trong component** — luôn qua `shared/i18n/vi.ts` (NFR-7).
- Selector DOM: chỉ được xuất hiện trong `content/adapters/*.ts` (ADR trong 02 §2.2).

## 3. Scripts npm (định nghĩa ở P0)

| Script | Làm gì |
|---|---|
| `npm run dev` | Vite dev + CRXJS HMR; load unpacked từ `dist/` |
| `npm run build` | Build production vào `dist/` |
| `npm run test` | Vitest (jsdom environment cho adapter tests) |
| `npm run lint` | ESLint + Prettier check |
| `npm run zip` | Build + nén `dist/` thành `release/tinh-vX.Y.Z.zip` |

## 4. Quy trình làm việc (gate-based, đúng cam kết đề cương)

1. **Đọc:** trước khi code một phase, đọc spec tương ứng (04/05/06) + DoD trong `08_KeHoach_TrienKhai_Phases.md`.
2. **Duyệt:** mở PR/commit theo phase; ít nhất 1 thành viên khác review (Trưởng nhóm review core; Tấn Đạt rà checklist đạo đức với mọi UI can thiệp).
3. **Thực thi:** merge khi test pass + DoD của phase được tick.

Commit message: `P<phase>: <mô tả ngắn>` — ví dụ `P1: overlay khoang dung tren youtube`. Mỗi phase hoàn thành = 1 tag `phase-N-done` (làm minh chứng tiến độ cho PAAL/checkpoint).

## 5. Definition of Done chung (mọi phase)

- [ ] Test liên quan pass (`npm run test`), lint sạch.
- [ ] Không network call mới (kiểm DevTools).
- [ ] Chuỗi UI nằm trong `i18n/vi.ts`.
- [ ] Checklist 4 ràng buộc đạo đức pass với tính năng mới (00 §5).
- [ ] README cập nhật nếu cách chạy thay đổi.
- [ ] DoD riêng của phase trong `08` được tick đủ.
