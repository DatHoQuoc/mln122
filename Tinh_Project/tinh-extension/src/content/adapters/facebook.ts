// FacebookAdapter (docs/04, docs/05). Selector Facebook CHỈ nằm trong file này.
// - observeScrollActivity (F1): cuộn HOẶC video/reel đang phát.
// - observeFeedItems (F2): IntersectionObserver ≥3s trên div[role="article"] → trích TÊN
//   NGUỒN (actor) + suy origin. "Được tài trợ / Gợi ý" = recommended; còn lại (bạn bè, trang
//   bạn theo dõi, nhóm bạn tham gia) = self-selected. CHỈ tên nguồn, KHÔNG nội dung (NFR-5).

import type { FeedItemInfo } from '@shared/types';
import type { FeedAdapter } from './feed-adapter';

const HEARTBEAT_MS = 5000;
const VISIBLE_MS = 3000; // item phải hiển thị ≥3s mới tính là "đã xem"

/** Dấu hiệu nội dung do thuật toán đẩy (không phải nguồn user tự chọn theo dõi). */
const RECOMMENDED_MARKERS = [
  'được tài trợ',
  'sponsored',
  'được đề xuất',
  'suggested for you',
  'gợi ý cho bạn',
  'gợi ý',
  'những người bạn có thể biết',
  'people you may know',
  'reels và video ngắn',
];

/** Tên actor của bài viết: link trong header (h2/h3/h4 hoặc strong). Bỏ chuỗi rác/thời gian. */
function actorName(article: HTMLElement): string | null {
  const links = article.querySelectorAll<HTMLElement>('h2 a, h3 a, h4 a, strong a');
  for (const el of links) {
    const txt = el.textContent?.trim();
    if (txt && txt.length >= 2 && txt.length <= 60 && !/^\d/.test(txt) && !/^https?:/.test(txt)) {
      return txt;
    }
  }
  return null;
}

export class FacebookAdapter implements FeedAdapter {
  readonly platform = 'facebook' as const;

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
    window.addEventListener('scroll', onScroll, { passive: true });
    // Watch/Reels: video đang phát cũng là "đang tiêu thụ feed".
    const interval = window.setInterval(() => {
      const v = document.querySelector<HTMLVideoElement>('video');
      if (v && !v.paused && !v.ended && v.currentTime > 0) fire();
    }, HEARTBEAT_MS);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(interval);
    };
  }

  observeFeedItems(onItem: (item: FeedItemInfo) => void): () => void {
    const recorded = new WeakSet<Element>();
    const timers = new Map<Element, number>();

    const record = (el: HTMLElement) => {
      if (recorded.has(el)) return;
      const name = actorName(el);
      if (!name) return; // không trích được nguồn → bỏ qua (graceful degradation)
      recorded.add(el);
      const header = (el.textContent ?? '').slice(0, 200).toLowerCase();
      const isRecommended = RECOMMENDED_MARKERS.some((m) => header.includes(m));
      onItem({
        sourceName: name,
        sourceType: 'unknown',
        origin: isRecommended ? 'recommended' : 'self-selected',
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target;
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            if (recorded.has(el) || timers.has(el)) continue;
            const id = window.setTimeout(() => {
              timers.delete(el);
              record(el as HTMLElement);
            }, VISIBLE_MS);
            timers.set(el, id);
          } else {
            const id = timers.get(el);
            if (id != null) {
              window.clearTimeout(id);
              timers.delete(el);
            }
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    // Quan sát article hiện có + article mới thêm vào khi cuộn (observe trùng là no-op).
    const attach = () =>
      document.querySelectorAll('div[role="article"]').forEach((a) => io.observe(a));
    attach();
    const mo = new MutationObserver(() => attach());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
    };
  }

  getOverlayRoot(): HTMLElement {
    return document.body;
  }
}
