// Typed wrapper quanh chrome.storage.local. Điểm truy cập storage duy nhất.
// Trong test (jsdom, không có chrome) sẽ fallback về bộ nhớ tạm.

import { DEFAULT_SETTINGS, SCHEMA_VERSION, type StorageShape, type Meta } from './types';

const DEFAULTS: StorageShape = {
  settings: DEFAULT_SETTINGS,
  pauseEvents: [],
  sourceLog: [],
  sessions: [],
  meta: { schemaVersion: SCHEMA_VERSION, installDate: 0, mirrorOpenCount: 0 },
};

// Fallback in-memory khi chạy ngoài extension (unit test).
const memory: Partial<StorageShape> = {};
const hasChrome = typeof chrome !== 'undefined' && !!chrome.storage?.local;

export async function get<K extends keyof StorageShape>(key: K): Promise<StorageShape[K]> {
  if (!hasChrome) return (memory[key] ?? DEFAULTS[key]) as StorageShape[K];
  const res = await chrome.storage.local.get(key);
  return (res[key] ?? DEFAULTS[key]) as StorageShape[K];
}

export async function set<K extends keyof StorageShape>(
  key: K,
  value: StorageShape[K],
): Promise<void> {
  if (!hasChrome) {
    memory[key] = value;
    return;
  }
  await chrome.storage.local.set({ [key]: value });
}

/** Đọc/ghi settings tiện lợi. */
export async function getSettings() {
  return get('settings');
}
export async function patchSettings(patch: Partial<StorageShape['settings']>) {
  const cur = await get('settings');
  await set('settings', { ...cur, ...patch });
}

/** Đảm bảo meta có installDate (gọi ở onInstalled). */
export async function ensureMeta(now: number): Promise<Meta> {
  const meta = await get('meta');
  if (!meta.installDate) {
    const next: Meta = { ...meta, installDate: now };
    await set('meta', next);
    return next;
  }
  return meta;
}
