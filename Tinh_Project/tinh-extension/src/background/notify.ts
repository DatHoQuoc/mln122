// Thông báo nhắc đối chiếu (F3). Chỉ nhắc, KHÔNG ép: bấm vào mở "Tỉnh" để phản hồi.
// Tôn trọng NFR: chỉ chạy khi user bật journalNotifications trong Cài đặt.

import { getSettings } from '@shared/storage';
import { vi, t } from '@shared/i18n/vi';
import type { Platform } from '@shared/types';

const REFLECT_TAG = 'tinh-reflect';

/** Nhắc rằng có một phiên (đã đặt ý định) vừa kết thúc, chờ đối chiếu. */
export async function notifyReflectDue(platform: Platform): Promise<void> {
  const settings = await getSettings();
  if (!settings.consentGiven || !settings.journalEnabled || !settings.journalNotifications) return;
  if (!chrome.notifications) return;
  try {
    chrome.notifications.create(REFLECT_TAG, {
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/icon-128.png'),
      title: vi.notify.reflectTitle,
      message: t(vi.notify.reflectBody, { platform: vi.platformNames[platform] }),
      priority: 0,
      requireInteraction: false,
    });
  } catch {
    /* notifications không khả dụng → bỏ qua */
  }
}

/** Bấm vào thông báo: mở popup nếu được, không thì mở trang tùy chọn. */
export function registerNotificationClicks(): void {
  if (!chrome.notifications) return;
  chrome.notifications.onClicked.addListener((id) => {
    if (id !== REFLECT_TAG) return;
    chrome.notifications.clear(id);
    const openPopup = (chrome.action as { openPopup?: () => Promise<void> }).openPopup;
    if (openPopup) {
      openPopup.call(chrome.action).catch(() => {
        void chrome.tabs.create({ url: chrome.runtime.getURL('src/options/index.html') });
      });
    } else {
      void chrome.tabs.create({ url: chrome.runtime.getURL('src/options/index.html') });
    }
  });
}
