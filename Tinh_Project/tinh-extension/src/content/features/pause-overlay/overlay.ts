// Overlay "Khoảng dừng phản tư" (docs/04 §3). Vanilla DOM + Shadow DOM (ADR-4):
// cô lập CSS khỏi trang, không rò style. Hai nút NGANG HÀNG thị giác (không dark pattern
// ngược). ESC = "Tiếp tục có ý thức" (không giam người dùng). Hoãn khi đang fullscreen.

import { vi, t } from '@shared/i18n/vi';
import { sendMessage } from '@shared/messages';
import type { Platform } from '@shared/types';

let active = false;

export function showPauseOverlay(
  platform: Platform,
  scrolledMinutes: number,
  overlayRoot: HTMLElement,
): void {
  if (active) return;

  // AC-2: đang fullscreen → hoãn tới khi thoát.
  if (document.fullscreenElement) {
    const onFs = () => {
      if (!document.fullscreenElement) {
        document.removeEventListener('fullscreenchange', onFs);
        showPauseOverlay(platform, scrolledMinutes, overlayRoot);
      }
    };
    document.addEventListener('fullscreenchange', onFs);
    return;
  }

  active = true;
  const shownAt = Date.now();

  const host = document.createElement('div');
  host.id = 'tinh-pause-host';
  host.style.cssText = 'all:initial; position:fixed; inset:0; z-index:2147483647;';
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      .backdrop {
        position: fixed; inset: 0;
        background: rgba(10, 12, 20, 0.55);
        backdrop-filter: blur(6px);
        display: flex; align-items: center; justify-content: center;
        font-family: 'Segoe UI', system-ui, sans-serif;
        animation: fade 0.4s ease;
      }
      @keyframes fade { from { opacity: 0 } to { opacity: 1 } }
      .card {
        width: 420px; max-width: 90vw;
        background: #1b1e2a; color: #e8eaf2;
        border-radius: 16px; padding: 28px 26px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        text-align: center;
      }
      .logo { font-size: 15px; color: #9aa0b4; margin-bottom: 14px; }
      .heading { font-size: 14px; color: #9aa0b4; margin-bottom: 8px; }
      .question { font-size: 19px; font-weight: 600; line-height: 1.4; margin-bottom: 24px; }
      .buttons { display: flex; gap: 12px; }
      button {
        flex: 1; padding: 14px 12px; border-radius: 10px; border: none;
        font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit;
      }
      .continue { background: #2a2e3d; color: #e8eaf2; }
      .continue:hover { background: #333849; }
      .stop { background: #7c9cff; color: #12141c; }
      .stop:hover { background: #93abff; }
      .why {
        display: inline-block; margin-top: 18px; font-size: 12px;
        color: #9aa0b4; text-decoration: underline; cursor: pointer; background: none; border: none;
      }
    </style>
    <div class="backdrop">
      <div class="card" role="dialog" aria-modal="true">
        <div class="logo">🌙 ${vi.appName}</div>
        <div class="heading">${t(vi.pause.heading, { minutes: scrolledMinutes })}</div>
        <div class="question">${vi.pause.question}</div>
        <div class="buttons">
          <button class="continue">${vi.pause.continue}</button>
          <button class="stop">${vi.pause.stop}</button>
        </div>
        <button class="why">${vi.pause.why}</button>
      </div>
    </div>
  `;

  overlayRoot.appendChild(host);

  const close = (choice: 'continue' | 'stop' | null) => {
    if (!active) return;
    active = false;
    document.removeEventListener('keydown', onKey);
    host.remove();
    if (choice) {
      void sendMessage({
        type: 'PAUSE_CHOICE',
        platform,
        choice,
        reactionMs: Date.now() - shownAt,
        scrolledMinutes,
      });
    }
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close('continue'); // ESC = tiếp tục có ý thức
  };
  document.addEventListener('keydown', onKey);

  shadow.querySelector('.continue')!.addEventListener('click', () => close('continue'));
  shadow.querySelector('.stop')!.addEventListener('click', () => close('stop'));
  shadow.querySelector('.why')!.addEventListener('click', () => {
    void sendMessage({ type: 'OPEN_OPTIONS', anchor: 'vi-sao-khoang-dung' });
  });
}
