// Điểm ghi storage + rotation 30 ngày (docs/02 §2.3, NFR-6).
// P0: hàm rotation thuần (test được). P1+ gọi khi ghi pauseEvents/sourceLog/sessions.

import { RETENTION_DAYS } from '@shared/types';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Lọc bỏ bản ghi cũ hơn RETENTION_DAYS tính từ `now`. */
export function pruneByTimestamp<T extends { ts: number }>(items: T[], now: number): T[] {
  const cutoff = now - RETENTION_DAYS * DAY_MS;
  return items.filter((it) => it.ts >= cutoff);
}

/** Lọc DaySourceLog theo trường `date` (YYYY-MM-DD). */
export function pruneByDate<T extends { date: string }>(items: T[], now: number): T[] {
  const cutoff = new Date(now - RETENTION_DAYS * DAY_MS).toISOString().slice(0, 10);
  return items.filter((it) => it.date >= cutoff);
}
