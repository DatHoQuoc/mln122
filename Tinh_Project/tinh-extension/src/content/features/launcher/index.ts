// Nút nổi "🌙 Tỉnh" luôn hiện ở góc dưới-phải trang MXH.
// Vấn đề nó giải quyết: banner đặt ý định chỉ hiện 1 lần đầu phiên, và khi chuyển
// trang trong SPA (Facebook/YouTube/TikTok) hoặc đổi tab thì DOM bị thay, banner biến
// mất mà KHÔNG có cách mở lại (trước đây phải tắt/mở lại trình duyệt). Nút này:
//  - Tự gắn lại nếu bị SPA xóa khỏi DOM (kiểm tra định kỳ, thao tác idempotent).
//  - Bấm vào → gọi callback để mở lại banner đặt ý định bất cứ lúc nào.
// Shadow DOM cô lập CSS khỏi trang.

import { vi } from '@shared/i18n/vi';

const HOST_ID = 'tinh-launcher-host';
const REMOUNT_INTERVAL_MS = 1500;

export function initLauncher(onOpen: () => void): () => void {
  const mount = () => {
    if (document.getElementById(HOST_ID)) return; // đã có → không gắn trùng
    const root = document.body ?? document.documentElement;
    if (!root) return;

    const host = document.createElement('div');
    host.id = HOST_ID;
    host.style.cssText = 'all:initial; position:fixed; right:16px; bottom:16px; z-index:2147483645;';
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .btn {
          font-family: 'Segoe UI', system-ui, sans-serif;
          display: flex; align-items: center; gap: 6px;
          background: #1b1e2a; color: #e8eaf2;
          border: 1px solid #2a2e3d; border-radius: 999px;
          padding: 8px 14px; font-size: 13px; font-weight: 600; cursor: pointer;
          box-shadow: 0 6px 20px rgba(0,0,0,0.35);
          opacity: 0.82; transition: opacity .2s ease, transform .2s ease;
        }
        .btn:hover { opacity: 1; transform: translateY(-1px); }
      </style>
      <button class="btn" title="${vi.launcher.tooltip}">🌙 ${vi.launcher.label}</button>
    `;
    shadow.querySelector('.btn')!.addEventListener('click', () => onOpen());
    root.appendChild(host);
  };

  mount();
  // SPA thay DOM khi chuyển trang → gắn lại nếu nút bị xóa. Interval nhẹ (chỉ 1 getElementById).
  const remount = window.setInterval(mount, REMOUNT_INTERVAL_MS);

  return () => {
    window.clearInterval(remount);
    document.getElementById(HOST_ID)?.remove();
  };
}
