// Gắn F2 vào content script: nghe item feed đã xem từ adapter → gửi FEED_ITEM_SEEN.
// Không lưu gì ở content; service worker cộng dồn (docs/05 §2).

import type { FeedAdapter } from '../../adapters/feed-adapter';
import { sendMessage } from '@shared/messages';

export function initMirrorFeature(adapter: FeedAdapter): () => void {
  return adapter.observeFeedItems((item) => {
    void sendMessage({ type: 'FEED_ITEM_SEEN', platform: adapter.platform, item });
  });
}
