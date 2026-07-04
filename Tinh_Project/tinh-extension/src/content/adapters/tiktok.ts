// TikTokAdapter (P7 stretch, docs/04–05). Selector TikTok CHỈ nằm trong file này.
// TikTok web = feed video dọc, tự phát; "cuộn" chủ yếu qua wheel/phím ↓, URL đổi sang
// /@handle/video/id theo từng video. Vì vậy:
// - observeScrollActivity (F1): scroll + wheel + phím điều hướng + heartbeat video đang phát.
// - observeFeedItems (F2): trích @handle của video đang xem (ưu tiên URL — ổn định nhất),
//   ngưỡng 5s như Shorts; origin: feed "Following" = self-selected, còn lại (For You) = thuật toán.

import type { FeedItemInfo } from '@shared/types';
import type { FeedAdapter } from './feed-adapter';

const HEARTBEAT_MS = 5000;
const WATCH_THRESHOLD_MS = 5000;
const NAV_KEYS = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '];

/** Trích @handle + videoId từ path dạng /@handle/video/123. Hàm THUẦN — có test. */
export function parseAuthorFromPath(pathname: string): { handle: string; videoId: string } | null {
  const m = pathname.match(/^\/@([\w.-]+)\/video\/(\d+)/);
  if (!m) return null;
  return { handle: m[1], videoId: m[2] };
}

function fallbackUsername(): string | null {
  const sel = ['[data-e2e="video-author-uniqueid"]', '[data-e2e="browse-username"]'];
  for (const s of sel) {
    const txt = document.querySelector(s)?.textContent?.trim();
    if (txt) return txt;
  }
  return null;
}

/** Feed "Following" = nguồn user tự chọn theo dõi; For You / mặc định = thuật toán đẩy. */
function isFollowingFeed(): boolean {
  if (location.pathname.startsWith('/following')) return true;
  const tab = document.querySelector('[data-e2e="following-title"]');
  return tab?.getAttribute('aria-selected') === 'true';
}

/** Có video nào đang thực sự phát không (TikTok nạp sẵn nhiều <video>, đa số đang tạm dừng). */
function anyVideoPlaying(): boolean {
  return Array.from(document.querySelectorAll<HTMLVideoElement>('video')).some(
    (v) => !v.paused && !v.ended && v.currentTime > 0,
  );
}

export class TikTokAdapter implements FeedAdapter {
  readonly platform = 'tiktok' as const;

  observeScrollActivity(onActivity: () => void): () => void {
    let last = 0;
    const fire = () => {
      const now = Date.now();
      if (now - last >= HEARTBEAT_MS) {
        last = now;
        onActivity();
      }
    };
    const onScroll = () => fire();
    const onWheel = () => fire();
    const onKey = (e: KeyboardEvent) => {
      if (NAV_KEYS.includes(e.key)) fire();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey, { passive: true });
    const interval = window.setInterval(() => {
      if (anyVideoPlaying()) fire();
    }, HEARTBEAT_MS);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.clearInterval(interval);
    };
  }

  observeFeedItems(onItem: (item: FeedItemInfo) => void): () => void {
    let curKey = '';
    let watchStart = 0;
    let recorded = false;

    const tick = () => {
      const parsed = parseAuthorFromPath(location.pathname);
      const name = parsed ? '@' + parsed.handle : fallbackUsername();
      const key = parsed ? 'v:' + parsed.videoId : name ? 'u:' + name : '';

      if (key !== curKey) {
        curKey = key;
        watchStart = Date.now();
        recorded = false;
      }
      if (!key || !name) return;
      if (!anyVideoPlaying()) return;

      if (!recorded && Date.now() - watchStart >= WATCH_THRESHOLD_MS) {
        onItem({
          sourceName: name,
          sourceType: 'channel',
          origin: isFollowingFeed() ? 'self-selected' : 'recommended',
        });
        recorded = true;
      }
    };

    const interval = window.setInterval(tick, 2000);
    return () => window.clearInterval(interval);
  }

  getOverlayRoot(): HTMLElement {
    return document.body;
  }
}
