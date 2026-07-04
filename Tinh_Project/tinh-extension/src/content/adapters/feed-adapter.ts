// Interface FeedAdapter + factory (docs/02 §2.2).
// Selector DOM của từng nền tảng CHỈ được xuất hiện trong file adapter tương ứng.

import type { FeedItemInfo, Platform } from '@shared/types';

export interface FeedAdapter {
  readonly platform: Platform;
  /** Quan sát item feed; callback mỗi khi user "xem" một item. Trả về hàm hủy. */
  observeFeedItems(onItem: (item: FeedItemInfo) => void): () => void;
  /** Quan sát hoạt động cuộn (đã throttle). Trả về hàm hủy. */
  observeScrollActivity(onActivity: () => void): () => void;
  /** Điểm gắn overlay an toàn (F1). */
  getOverlayRoot(): HTMLElement;
}

export function detectPlatform(host: string): Platform | null {
  if (host.includes('youtube.com')) return 'youtube';
  if (host.includes('facebook.com')) return 'facebook';
  if (host.includes('tiktok.com')) return 'tiktok';
  return null;
}
