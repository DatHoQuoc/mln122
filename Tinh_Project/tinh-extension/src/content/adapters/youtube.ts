// YouTubeAdapter (docs/04, docs/05).
// - observeScrollActivity (F1): tín hiệu khi cuộn HOẶC video đang phát.
// - observeFeedItems (F2): trích TÊN KÊNH của video đã xem (watch ≥15s / Shorts ≥5s) +
//   suy đoán origin (self-selected vs recommended). CHỈ tên nguồn, không URL/nội dung.

import type { FeedItemInfo, FeedItemOrigin } from '@shared/types';
import type { FeedAdapter } from './feed-adapter';

const HEARTBEAT_MS = 5000;
const WATCH_THRESHOLD_MS = 15_000;
const SHORTS_THRESHOLD_MS = 5000;

/** Đường dẫn user tự chủ chọn nội dung (không phải thuật toán đẩy). */
function isSelfSelectedPath(path: string): boolean {
  return (
    path.startsWith('/feed/subscriptions') ||
    path.startsWith('/results') || // tìm kiếm
    path.startsWith('/feed/history') ||
    path.startsWith('/@') ||
    path.startsWith('/channel') ||
    path.startsWith('/playlist')
  );
}

function channelName(): string | null {
  // Shorts: CHỈ tìm trong reel đang active để không lấy nhầm kênh của Short khác/sidebar.
  if (location.pathname.startsWith('/shorts/')) {
    const scope: ParentNode =
      document.querySelector('ytd-reel-video-renderer[is-active]') ??
      document.querySelector('ytd-shorts') ??
      document;
    const sel = [
      'yt-reel-channel-bar-view-model a[href^="/@"]',
      '.ytReelChannelBarViewModelChannelName a',
      'ytd-reel-player-header-renderer #channel-name a',
      'a.yt-simple-endpoint[href^="/@"]',
      'a[href^="/@"]',
    ];
    for (const s of sel) {
      const txt = scope.querySelector<HTMLElement>(s)?.textContent?.trim();
      if (txt && txt.length <= 60) return txt;
    }
    return null;
  }
  // Trang xem thường (/watch).
  const sel = [
    'ytd-watch-metadata #channel-name a',
    '#owner #channel-name a',
    'ytd-channel-name#channel-name a',
  ];
  for (const s of sel) {
    const txt = document.querySelector(s)?.textContent?.trim();
    if (txt) return txt;
  }
  return null;
}

/** Lấy video đang thực sự phát (Shorts preload nhiều <video>, phải chọn cái đang chạy). */
function playingVideo(): HTMLVideoElement | null {
  const vids = Array.from(document.querySelectorAll<HTMLVideoElement>('video'));
  return vids.find((v) => !v.paused && !v.ended && v.currentTime > 0) ?? vids[0] ?? null;
}

export class YouTubeAdapter implements FeedAdapter {
  readonly platform = 'youtube' as const;

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
    // Shorts cuộn trong container riêng (không phải window) → nghe cả wheel/keydown.
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onScroll, { passive: true });
    window.addEventListener('keydown', onScroll, { passive: true });
    const interval = window.setInterval(() => {
      const v = playingVideo(); // chọn ĐÚNG video đang phát (Shorts nạp sẵn nhiều <video>)
      if (v && !v.paused && !v.ended && v.currentTime > 0) fire();
    }, HEARTBEAT_MS);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('keydown', onScroll);
      window.clearInterval(interval);
    };
  }

  observeFeedItems(onItem: (item: FeedItemInfo) => void): () => void {
    // origin của video sắp xem: suy từ trang lúc bấm. Bắt MỌI link video (/watch, /shorts)
    // bất kể id, để không bỏ sót cấu trúc DOM khác nhau (trang tìm kiếm, kênh, gợi ý…).
    let pendingOrigin: FeedItemOrigin = 'recommended';
    const onClick = (e: Event) => {
      const link = (e.target as HTMLElement | null)?.closest('a');
      const href = link?.getAttribute('href') ?? '';
      if (!href.includes('/watch') && !href.includes('/shorts/')) return;
      pendingOrigin = isSelfSelectedPath(location.pathname) ? 'self-selected' : 'recommended';
    };
    document.addEventListener('click', onClick, true);

    let curKey = '';
    let watchStart = 0;
    let recorded = false;

    const tick = () => {
      const path = location.pathname;
      const isShorts = path.startsWith('/shorts/');
      const isWatch = path === '/watch';

      let key = '';
      if (isWatch) key = 'w:' + (new URLSearchParams(location.search).get('v') ?? '');
      else if (isShorts) key = 's:' + (path.split('/shorts/')[1]?.split('/')[0] ?? '');

      if (key !== curKey) {
        curKey = key;
        watchStart = Date.now();
        recorded = false;
      }
      if (!key) return;

      const v = playingVideo();
      if (!v || v.paused || v.ended) return;

      const threshold = isShorts ? SHORTS_THRESHOLD_MS : WATCH_THRESHOLD_MS;
      if (!recorded && Date.now() - watchStart >= threshold) {
        const name = channelName();
        if (name) {
          const origin = isShorts ? 'recommended' : pendingOrigin;
          onItem({ sourceName: name, sourceType: 'channel', origin });
          recorded = true;
          pendingOrigin = 'recommended'; // reset cho video kế
        }
      }
    };

    const interval = window.setInterval(tick, 2000);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.clearInterval(interval);
    };
  }

  getOverlayRoot(): HTMLElement {
    return document.body;
  }
}
