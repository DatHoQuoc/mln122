import { describe, it, expect } from 'vitest';
import { dailyMicroWins, intentionKeptRatio, pendingReflection } from '../src/shared/journal-view';
import type { SessionRecord } from '../src/shared/types';

const DAY = 86_400_000;
const T0 = Date.parse('2026-07-10T08:00:00Z'); // mốc "now" cố định (không dùng Date.now)

function sess(partial: Partial<SessionRecord>): SessionRecord {
  return {
    ts: T0,
    platform: 'youtube',
    intention: 'hoc-tap',
    plannedMinutes: 20,
    actualMinutes: 18,
    keptIntention: true,
    viaF1Stop: false,
    ...partial,
  };
}

describe('dailyMicroWins', () => {
  it('gộp theo ngày, ngày trống → không micro-win', () => {
    const sessions = [
      sess({ ts: T0 - 2 * DAY, keptIntention: true, actualMinutes: 18, plannedMinutes: 20 }),
      sess({ ts: T0 - 0 * DAY, keptIntention: 'partial', actualMinutes: 40, plannedMinutes: 20 }), // 40>30 → không micro-win
    ];
    const days = dailyMicroWins(sessions, T0, 3);
    expect(days).toHaveLength(3);
    expect(days[0].hasMicroWin).toBe(true); // 2 ngày trước
    expect(days[1].hasMicroWin).toBe(false); // hôm qua trống
    expect(days[2].hasMicroWin).toBe(false); // hôm nay partial-quá-giờ
  });

  it('phiên chưa đối chiếu (null) bị bỏ qua', () => {
    const days = dailyMicroWins([sess({ keptIntention: null })], T0, 1);
    expect(days[0].hasMicroWin).toBe(false);
  });
});

describe('intentionKeptRatio', () => {
  it('chỉ tính phiên đã đối chiếu, có ý định', () => {
    const sessions = [
      sess({ keptIntention: true }),
      sess({ keptIntention: false, actualMinutes: 60 }),
      sess({ keptIntention: null }), // chưa đối chiếu — bỏ
      sess({ intention: null, keptIntention: true }), // không ý định — bỏ
    ];
    expect(intentionKeptRatio(sessions, T0 - DAY)).toBeCloseTo(1 / 2, 5);
  });

  it('không có phiên phù hợp → 0', () => {
    expect(intentionKeptRatio([], T0)).toBe(0);
  });
});

describe('pendingReflection', () => {
  it('trả phiên gần nhất có ý định & chưa đối chiếu', () => {
    const sessions = [
      sess({ ts: T0 - DAY, keptIntention: null }),
      sess({ ts: T0, keptIntention: null, platform: 'facebook' }),
    ];
    expect(pendingReflection(sessions)?.platform).toBe('facebook');
  });
  it('bỏ qua phiên không ý định', () => {
    expect(pendingReflection([sess({ intention: null, keptIntention: null })])).toBeNull();
  });
});
