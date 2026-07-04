import { describe, it, expect } from 'vitest';
import {
  normalizedEntropy,
  diversityLabel,
  uniqueSourceRatio,
  recommendedRatio,
  isMicroWin,
  currentStreak,
  longestStreak,
  type DayMicroWin,
} from '../src/shared/metrics';

// Khớp AC trong docs/05 §6 (AC-2) và docs/06 §5 (AC-5).

describe('normalizedEntropy (docs/05 AC-2)', () => {
  it('phân bố đều 2 nguồn → 1.0', () => {
    expect(normalizedEntropy({ A: 50, B: 50 })).toBeCloseTo(1.0, 5);
  });
  it('một nguồn thống trị tuyệt đối → 0', () => {
    expect(normalizedEntropy({ A: 100 })).toBe(0);
  });
  it('{A:90,B:5,C:5} → ≈0.35', () => {
    expect(normalizedEntropy({ A: 90, B: 5, C: 5 })).toBeCloseTo(0.35, 1);
  });
  it('rỗng → 0', () => {
    expect(normalizedEntropy({})).toBe(0);
  });
});

describe('diversityLabel', () => {
  it('phân nhãn đúng ngưỡng', () => {
    expect(diversityLabel(0.2)).toBe('rất tập trung');
    expect(diversityLabel(0.5)).toBe('tập trung vừa');
    expect(diversityLabel(0.8)).toBe('khá đa dạng');
  });
});

describe('uniqueSourceRatio & recommendedRatio', () => {
  it('USR = số nguồn / tổng item', () => {
    expect(uniqueSourceRatio({ A: 3, B: 1 })).toBeCloseTo(2 / 4, 5);
  });
  it('RR = recommended / tổng', () => {
    expect(recommendedRatio(66, 34)).toBeCloseTo(0.66, 5);
    expect(recommendedRatio(0, 0)).toBe(0);
  });
});

describe('micro-win & streak (docs/06 AC-5)', () => {
  it('kept=true luôn là micro-win', () => {
    expect(isMicroWin(true, 47, 20)).toBe(true);
  });
  it("partial trong 1.5× dự kiến → micro-win", () => {
    expect(isMicroWin('partial', 28, 20)).toBe(true);
    expect(isMicroWin('partial', 40, 20)).toBe(false);
  });
  it('false/null → không', () => {
    expect(isMicroWin(false, 10, 20)).toBe(false);
    expect(isMicroWin(null, 10, 20)).toBe(false);
  });

  const days: DayMicroWin[] = [
    { date: '2026-07-01', hasMicroWin: true },
    { date: '2026-07-02', hasMicroWin: true },
    { date: '2026-07-03', hasMicroWin: false },
    { date: '2026-07-04', hasMicroWin: true },
    { date: '2026-07-05', hasMicroWin: true },
    { date: '2026-07-06', hasMicroWin: true },
  ];
  it('currentStreak đếm lùi từ ngày cuối', () => {
    expect(currentStreak(days)).toBe(3);
  });
  it('longestStreak', () => {
    expect(longestStreak(days)).toBe(3);
  });
});
