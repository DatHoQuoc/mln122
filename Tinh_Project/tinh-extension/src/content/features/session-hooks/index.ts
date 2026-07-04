// Gắn F3 vào content script: báo SESSION_START, nếu là phiên mới thì hiện banner ý định.

import type { FeedAdapter } from '../../adapters/feed-adapter';
import { sendMessage } from '@shared/messages';
import { showIntentionBanner } from './banner';

export async function initJournalFeature(adapter: FeedAdapter): Promise<void> {
  const res = await sendMessage<{ promptIntention: boolean }>({
    type: 'SESSION_START',
    platform: adapter.platform,
  });
  if (res?.promptIntention) {
    showIntentionBanner(adapter.platform, adapter.getOverlayRoot());
  }
}
