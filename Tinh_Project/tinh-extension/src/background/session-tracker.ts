// Máy trạng thái phiên cuộn (docs/02 §2.3, docs/04 §2).
// State lưu ở chrome.storage.session (in-memory, mất khi đóng trình duyệt) để sống sót
// khi MV3 service worker bị kill giữa phiên. Logic quyết định nằm ở pause-logic.ts (thuần).

import { tick, initialState, type TrackerState } from './pause-logic';
import type { Platform } from '@shared/types';

const key = (p: Platform) => `tracker:${p}`;

async function loadState(p: Platform): Promise<TrackerState> {
  const k = key(p);
  const res = await chrome.storage.session.get(k);
  return (res[k] as TrackerState | undefined) ?? initialState();
}

async function saveState(p: Platform, s: TrackerState): Promise<void> {
  await chrome.storage.session.set({ [key(p)]: s });
}

export class SessionTracker {
  /** Xử lý một nhịp hoạt động; trả quyết định hiện khoảng dừng. */
  async onActivity(
    platform: Platform,
    now: number,
    thresholdMinutes: number,
  ): Promise<{ showPause: boolean; scrolledMinutes: number }> {
    const prev = await loadState(platform);
    const r = tick(prev, now, thresholdMinutes);
    await saveState(platform, r.state);
    return { showPause: r.showPause, scrolledMinutes: r.scrolledMinutes };
  }
}
