// Message passing schema. Khớp docs/02_KienTruc_HeThong.md §3.
// Quy tắc: content script CHỈ gửi sự kiện thô; mọi quyết định nằm ở service worker.

import type { FeedItemInfo, Platform, Settings, Intention } from './types';

export type ExtMessage =
  // content → worker
  | { type: 'SCROLL_ACTIVITY'; platform: Platform }
  | { type: 'FEED_ITEM_SEEN'; platform: Platform; item: FeedItemInfo }
  | {
      type: 'PAUSE_CHOICE';
      platform: Platform;
      choice: 'continue' | 'stop';
      reactionMs: number;
      scrolledMinutes: number;
    }
  | { type: 'SESSION_START'; platform: Platform }
  | {
      type: 'INTENTION_SET';
      platform: Platform;
      intention: Intention;
      plannedMinutes: number | null;
    }
  | { type: 'SESSION_END_REFLECT'; platform: Platform; keptIntention: boolean | 'partial' | null }
  | { type: 'OPEN_OPTIONS'; anchor?: string }
  // worker → content
  | { type: 'SHOW_PAUSE'; platform: Platform; scrolledMinutes: number }
  // popup/options ↔ worker
  | { type: 'GET_STATE' }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<Settings> }
  | { type: 'MIRROR_OPENED' };

export type MessageType = ExtMessage['type'];

/**
 * Gửi message có type an toàn. Nuốt lỗi "Extension context invalidated" —
 * xảy ra vô hại khi tab cũ vẫn mở content script sau khi extension được
 * reload (chưa F5 lại tab); không phải lỗi logic, không cần báo người dùng.
 */
export function sendMessage<T = unknown>(msg: ExtMessage): Promise<T | undefined> {
  try {
    return (chrome.runtime.sendMessage(msg) as Promise<T>).catch(() => undefined);
  } catch {
    return Promise.resolve(undefined);
  }
}
