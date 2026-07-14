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
import { showIntentionBanner } from './features/session-hooks/banner';
import { initMirrorFeature } from './features/source-tracker';
import { initLauncher } from './features/launcher';

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

    // Nút nổi 🌙 luôn hiện: mở lại banner đặt ý định bất cứ lúc nào, không cần
    // restart trình duyệt. Bấm nút → đảm bảo có phiên hiện tại rồi hiện banner.
    initLauncher(() => {
      void (async () => {
        await sendMessage({ type: 'SESSION_START', platform: adapter.platform });
        showIntentionBanner(adapter.platform, adapter.getOverlayRoot(), { force: true });
      })();
    });

    // SPA (FB/YT/TikTok) chuyển trang mà không tải lại → content script không chạy lại.
    // Bắt đổi URL để kiểm tra lại vòng đời phiên (worker tự chống lặp banner).
    onSpaNavigation(() => void initJournalFeature(adapter));
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

/** Gọi cb mỗi khi URL đổi trong SPA (pushState/replaceState/popstate + fallback polling). */
function onSpaNavigation(cb: () => void): void {
  let last = location.href;
  const check = () => {
    if (location.href !== last) {
      last = location.href;
      cb();
    }
  };
  for (const name of ['pushState', 'replaceState'] as const) {
    const orig = history[name];
    history[name] = function (this: History, ...args: Parameters<typeof orig>) {
      const r = orig.apply(this, args);
      check();
      return r;
    };
  }
  window.addEventListener('popstate', check);
  window.setInterval(check, 2000); // fallback cho SPA không dùng history API chuẩn
}

void main();
