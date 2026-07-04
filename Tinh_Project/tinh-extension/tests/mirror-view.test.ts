import { describe, it, expect } from 'vitest';
import { mirrorStats, lowDiversityDayStreak } from '../src/shared/mirror-view';
import type { DaySourceLog } from '../src/shared/types';

const DAY = 86_400_000;
const NOW = Date.parse('2026-07-10T12:00:00Z');
const dayKey = (ts: number) => new Date(ts).toISOString().slice(0, 10);

function day(offset: number, sources: DaySourceLog['sources']): DaySourceLog {
  return { date: dayKey(NOW - offset * DAY), platform: 'youtube', sources };
}

describe('mirrorStats', () => {
  it('gộp 7 ngày, tính entropy/đa dạng/tỷ lệ đề xuất', () => {
    const log: DaySourceLog[] = [
      day(0, { A: { count: 6, selfSelected: 2, recommended: 4 } }),
      day(1, {
        B: { count: 3, selfSelected: 0, recommended: 3 },
        C: { count: 1, selfSelected: 1, recommended: 0 },
      }),
    ];
    const s = mirrorStats(log, 'all', NOW, 7);
    expect(s.totalItems).toBe(10);
    expect(s.uniqueSources).toBe(3);
    expect(s.enough).toBe(true);
    // recommended = 4+3 = 7 / 10
    expect(s.recommendedRatio).toBeCloseTo(0.7, 5);
    expect(s.selfSelectedRatio).toBeCloseTo(0.3, 5);
    // top đầu là A với 60%
    expect(s.top[0]).toEqual({ name: 'A', count: 6, pct: 60 });
  });

  it('dưới 10 lượt xem → enough = false', () => {
    const log = [day(0, { A: { count: 3, selfSelected: 3, recommended: 0 } })];
    expect(mirrorStats(log, 'all', NOW, 7).enough).toBe(false);
  });

  it('lọc theo nền tảng', () => {
    const log: DaySourceLog[] = [
      { date: dayKey(NOW), platform: 'youtube', sources: { A: { count: 5, selfSelected: 5, recommended: 0 } } },
      { date: dayKey(NOW), platform: 'facebook', sources: { X: { count: 8, selfSelected: 0, recommended: 8 } } },
    ];
    expect(mirrorStats(log, 'youtube', NOW, 7).totalItems).toBe(5);
    expect(mirrorStats(log, 'facebook', NOW, 7).totalItems).toBe(8);
  });
});

describe('lowDiversityDayStreak (AC-6)', () => {
  it('3 ngày liên tiếp tập trung (H*<0.4, đủ ≥5 item) → streak = 3', () => {
    // mỗi ngày: 1 kênh áp đảo (19:1) → H* ≈ 0.29 < 0.4
    const skewed = { A: { count: 19, selfSelected: 1, recommended: 18 }, B: { count: 1, selfSelected: 0, recommended: 1 } };
    const log = [day(0, skewed), day(1, skewed), day(2, skewed)];
    expect(lowDiversityDayStreak(log, 'all', NOW, 7)).toBe(3);
  });

  it('ngày đa dạng cao làm đứt chuỗi', () => {
    const skewed = { A: { count: 9, selfSelected: 0, recommended: 9 } };
    const even = { A: { count: 5, selfSelected: 5, recommended: 0 }, B: { count: 5, selfSelected: 5, recommended: 0 } };
    const log = [day(0, skewed), day(1, even), day(2, skewed)];
    expect(lowDiversityDayStreak(log, 'all', NOW, 7)).toBe(1);
  });

  it('ngày thiếu dữ liệu (<5) → dừng, không tính', () => {
    const few = { A: { count: 2, selfSelected: 0, recommended: 2 } };
    expect(lowDiversityDayStreak(log_few(few), 'all', NOW, 7)).toBe(0);
  });
});

function log_few(sources: DaySourceLog['sources']): DaySourceLog[] {
  return [day(0, sources)];
}
