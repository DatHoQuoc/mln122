// Gắn tính năng F1 vào content script: lắng nghe SHOW_PAUSE từ service worker,
// hiện overlay ở điểm gắn an toàn của adapter.

import type { FeedAdapter } from '../../adapters/feed-adapter';
import type { ExtMessage } from '@shared/messages';
import { showPauseOverlay } from './overlay';

export function initPauseFeature(adapter: FeedAdapter): void {
  chrome.runtime.onMessage.addListener((msg: ExtMessage) => {
    if (msg.type === 'SHOW_PAUSE' && msg.platform === adapter.platform) {
      showPauseOverlay(msg.platform, msg.scrolledMinutes, adapter.getOverlayRoot());
    }
  });
}
