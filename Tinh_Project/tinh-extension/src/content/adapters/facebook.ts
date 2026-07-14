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

// Selector tên actor, xếp từ CỤ THỂ → RỘNG. Facebook đổi class liên tục nhưng cấu trúc
// header bài viết thường là: heading (h2/h3/h4) chứa a[role="link"] > strong > span, hoặc
// link tác giả có aria đi kèm ảnh đại diện. Bắt nhiều biến thể để không bỏ sót.
const ACTOR_SELECTORS = [
  'h2 a[role="link"] strong span',
  'h3 a[role="link"] strong span',
  'h4 a[role="link"] strong span',
  'h2 a[role="link"] span',
  'h3 a[role="link"] span',
  'h4 a[role="link"] span',
  'h2 a[role="link"]',
  'h3 a[role="link"]',
  'h4 a[role="link"]',
  'a[role="link"] strong span',
  'strong a[role="link"]',
  'span[dir="auto"] a[role="link"]',
  'h2 a',
  'h3 a',
  'h4 a',
  'strong a',
];

/** Text có vẻ là tên nguồn hợp lệ (không phải thời gian, số, URL, hay nhãn rác). */
function looksLikeName(txt: string | null | undefined): txt is string {
  if (!txt) return false;
  const t = txt.trim();
  if (t.length < 2 || t.length > 60) return false;
  if (/^\d/.test(t)) return false; // "5 giờ", "12 tháng 3"…
  if (/^https?:/.test(t)) return false;
  // Nhãn thời gian/hành động phổ biến không phải tên nguồn.
  if (/^(vừa xong|just now|đang theo dõi|follow|thích|like)\b/i.test(t)) return false;
  return true;
}

/** Tên actor của bài viết: quét theo danh sách selector, lấy ứng viên hợp lệ đầu tiên. */
function actorName(article: HTMLElement): string | null {
  for (const sel of ACTOR_SELECTORS) {
    for (const el of article.querySelectorAll<HTMLElement>(sel)) {
      const txt = el.textContent?.trim();
      if (looksLikeName(txt)) return txt;
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

    // Bài viết FB thường CAO hơn màn hình → chọn ngưỡng thấp (0.3) để post dài vẫn tính
    // là "đã xem", thay vì đòi nửa bài lọt khung nhìn (nhiều post sẽ không bao giờ đạt).
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target;
          if (e.isIntersecting && e.intersectionRatio >= 0.3) {
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
      { threshold: [0, 0.3, 0.6, 1] },
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
