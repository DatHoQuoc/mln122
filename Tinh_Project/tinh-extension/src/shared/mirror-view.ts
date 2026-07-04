// Hàm THUẦN tổng hợp dữ liệu "Gương bong bóng lọc" từ sourceLog (docs/05 §3). Có test.
// Nguyên tắc trung thực (Bakshy 2015; Bruns 2019): luôn tách phần "do bạn chọn" vs
// "thuật toán đề xuất"; không giả định bong bóng bịt kín.

import type { DaySourceLog, Platform } from './types';
import { normalizedEntropy } from './metrics';

const DAY_MS = 86_400_000;
const dayKey = (ts: number) => new Date(ts).toISOString().slice(0, 10);

export type PlatformFilter = Platform | 'all';

interface Merged {
  counts: Record<string, number>;
  total: number;
  recommended: number;
  selfSelected: number;
}

/** Gộp nguồn theo điều kiện ngày + nền tảng. */
function merge(
  log: DaySourceLog[],
  platform: PlatformFilter,
  keep: (date: string) => boolean,
): Merged {
  const counts: Record<string, number> = {};
  let total = 0;
  let recommended = 0;
  let selfSelected = 0;
  for (const d of log) {
    if (!keep(d.date)) continue;
    if (platform !== 'all' && d.platform !== platform) continue;
    for (const [name, s] of Object.entries(d.sources)) {
      counts[name] = (counts[name] ?? 0) + s.count;
      total += s.count;
      recommended += s.recommended;
      selfSelected += s.selfSelected;
    }
  }
  return { counts, total, recommended, selfSelected };
}

export interface MirrorStats {
  totalItems: number;
  uniqueSources: number;
  entropyNorm: number;
  recommendedRatio: number;
  selfSelectedRatio: number;
  top: { name: string; count: number; pct: number }[];
  othersCount: number;
  enough: boolean; // ≥ 10 lượt xem mới đủ soi gương
}

/** Thống kê cửa sổ `days` ngày gần nhất (mặc định 7). */
export function mirrorStats(
  log: DaySourceLog[],
  platform: PlatformFilter,
  now: number,
  days = 7,
): MirrorStats {
  const fromDate = dayKey(now - (days - 1) * DAY_MS);
  const m = merge(log, platform, (date) => date >= fromDate);
  const entries = Object.entries(m.counts).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3).map(([name, count]) => ({
    name,
    count,
    pct: m.total ? Math.round((count / m.total) * 100) : 0,
  }));
  const othersCount = entries.slice(3).reduce((a, [, c]) => a + c, 0);
  return {
    totalItems: m.total,
    uniqueSources: entries.length,
    entropyNorm: normalizedEntropy(m.counts),
    recommendedRatio: m.total ? m.recommended / m.total : 0,
    selfSelectedRatio: m.total ? m.selfSelected / m.total : 0,
    top,
    othersCount,
    enough: m.total >= 10,
  };
}

/**
 * Số ngày gần nhất LIÊN TIẾP có độ đa dạng thấp (H* < 0.4), chỉ tính ngày đủ dữ liệu
 * (≥ 5 lượt xem). Dùng cho điều kiện hiện gợi ý mở rộng góc nhìn (docs/05 §4, AC-6).
 */
export function lowDiversityDayStreak(
  log: DaySourceLog[],
  platform: PlatformFilter,
  now: number,
  days = 7,
): number {
  let streak = 0;
  for (let i = 0; i < days; i++) {
    const date = dayKey(now - i * DAY_MS);
    const m = merge(log, platform, (d) => d === date);
    if (m.total < 5) break; // ngày thiếu dữ liệu → dừng đếm
    if (normalizedEntropy(m.counts) < 0.4) streak++;
    else break;
  }
  return streak;
}
