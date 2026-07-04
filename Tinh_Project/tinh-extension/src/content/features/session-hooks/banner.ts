// Banner đặt ý định đầu phiên (docs/06 §2.1). NHẸ hơn overlay F1 — trượt từ cạnh trên,
// KHÔNG chặn màn hình. Chọn nhanh 1 chạm (danh mục + thời lượng). "Bỏ qua" luôn có.
// Tự ẩn sau 20s (= bỏ qua). Shadow DOM cô lập CSS.

import { vi, t } from '@shared/i18n/vi';
import { sendMessage } from '@shared/messages';
import type { Intention, Platform } from '@shared/types';

let shown = false;
const AUTO_HIDE_MS = 20_000;

export function showIntentionBanner(platform: Platform, root: HTMLElement): void {
  if (shown) return;
  shown = true;

  const host = document.createElement('div');
  host.id = 'tinh-intention-host';
  host.style.cssText = 'all:initial; position:fixed; top:0; left:0; right:0; z-index:2147483646;';
  const shadow = host.attachShadow({ mode: 'open' });

  const cats: Intention[] = ['giai-tri', 'hoc-tap', 'tim-cu-the'];
  const mins = [10, 20, 30];
  let selCat: Intention = null;
  let selMin: number | null = null;

  shadow.innerHTML = `
    <style>
      .bar {
        font-family: 'Segoe UI', system-ui, sans-serif;
        background: #1b1e2a; color: #e8eaf2;
        box-shadow: 0 6px 24px rgba(0,0,0,0.4);
        padding: 12px 16px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
        animation: slide 0.35s ease;
      }
      @keyframes slide { from { transform: translateY(-100%) } to { transform: translateY(0) } }
      .q { font-size: 13px; font-weight: 600; margin-right: 4px; }
      .chip {
        padding: 6px 12px; border-radius: 999px; border: 1px solid #2a2e3d;
        background: #12141c; color: #e8eaf2; font-size: 12px; cursor: pointer; font-family: inherit;
      }
      .chip.sel { background: #7c9cff; color: #12141c; border-color: #7c9cff; }
      .spacer { flex: 1; }
      .go { padding: 7px 14px; border-radius: 8px; border: none; background: #7c9cff; color: #12141c;
            font-weight: 600; font-size: 12px; cursor: pointer; font-family: inherit; }
      .go:disabled { opacity: 0.45; cursor: default; }
      .skip { background: none; border: none; color: #9aa0b4; font-size: 12px; cursor: pointer;
              text-decoration: underline; font-family: inherit; }
      .grp { display: flex; gap: 6px; }
      .lbl { font-size: 11px; color: #9aa0b4; }
    </style>
    <div class="bar">
      <span class="q">🌙 ${t(vi.journal.intentionQuestion, { platform: vi.platformNames[platform] })}</span>
      <div class="grp" id="cats"></div>
      <span class="lbl">${vi.journal.planned}:</span>
      <div class="grp" id="mins"></div>
      <span class="spacer"></span>
      <button class="go" id="go" disabled>${vi.journal.start}</button>
      <button class="skip" id="skip">${vi.journal.skip}</button>
    </div>
  `;

  const catBox = shadow.getElementById('cats')!;
  const minBox = shadow.getElementById('mins')!;
  const goBtn = shadow.getElementById('go') as HTMLButtonElement;

  const refreshGo = () => {
    goBtn.disabled = selCat === null;
  };

  cats.forEach((c) => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = vi.journal.categories[c as Exclude<Intention, null>];
    b.onclick = () => {
      selCat = c;
      catBox.querySelectorAll('.chip').forEach((x) => x.classList.remove('sel'));
      b.classList.add('sel');
      refreshGo();
    };
    catBox.appendChild(b);
  });

  mins.forEach((m) => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = `${m}${vi.journal.minutesShort[0]}`;
    b.onclick = () => {
      selMin = m;
      minBox.querySelectorAll('.chip').forEach((x) => x.classList.remove('sel'));
      b.classList.add('sel');
    };
    minBox.appendChild(b);
  });

  let timer = 0;
  const dismiss = () => {
    if (!shown) return;
    shown = false;
    window.clearTimeout(timer);
    host.remove();
  };

  goBtn.onclick = () => {
    if (selCat === null) return;
    void sendMessage({
      type: 'INTENTION_SET',
      platform,
      intention: selCat,
      plannedMinutes: selMin,
    });
    dismiss();
  };
  (shadow.getElementById('skip') as HTMLButtonElement).onclick = dismiss;

  root.appendChild(host);
  timer = window.setTimeout(dismiss, AUTO_HIDE_MS);
}
