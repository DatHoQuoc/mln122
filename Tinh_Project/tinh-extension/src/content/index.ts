// Content script entry. Chọn adapter theo hostname, khởi tạo tính năng.
// P1: gắn F1 (khoảng dừng) + gửi SCROLL_ACTIVITY (chỉ khi tab đang hiển thị & focus).

import { detectPlatform, type FeedAdapter } from './adapters/feed-adapter';
import { YouTubeAdapter } from './adapters/youtube';
import { FacebookAdapter } from './adapters/facebook';
import { TikTokAdapter } from './adapters/tiktok';
import { getSettings } from '@shared/storage';
import { sendMessage } from '@shared/messages';
import { initPauseFeature } from './features/pause-overlay';
import { initJournalFeature } from './features/session-hooks';
import { initMirrorFeature } from './features/source-tracker';

function createAdapter(): FeedAdapter | null {
  const platform = detectPlatform(location.host);
  if (platform === 'youtube') return new YouTubeAdapter();
  if (platform === 'facebook') return new FacebookAdapter();
  if (platform === 'tiktok') return new TikTokAdapter();
  return null;
}

async function main() {
  const adapter = createAdapter();
  if (!adapter) return;
  console.log(`[Tỉnh] content script trên ${adapter.platform}`);

  const settings = await getSettings();
  if (!settings.consentGiven) {
    console.log('[Tỉnh] chưa đồng ý tham gia — tính năng tắt.');
    return;
  }

  if (settings.pauseEnabled) {
    initPauseFeature(adapter);
  }

  if (settings.journalEnabled) {
    void initJournalFeature(adapter);
  }

  if (settings.mirrorEnabled) {
    initMirrorFeature(adapter);
  }

  // Chỉ tính hoạt động khi tab đang hiển thị & được focus (AC-3, AC-8).
  adapter.observeScrollActivity(() => {
    if (document.visibilityState === 'visible' && document.hasFocus()) {
      void sendMessage({ type: 'SCROLL_ACTIVITY', platform: adapter.platform });
    }
  });
}

void main();
