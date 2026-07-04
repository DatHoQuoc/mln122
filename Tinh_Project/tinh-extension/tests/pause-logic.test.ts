import { describe, it, expect } from 'vitest';
import {
  tick,
  initialState,
  HEARTBEAT_MS,
  GAP_RESET_MS,
  type TrackerState,
} from '../src/background/pause-logic';

// Mô phỏng chuỗi heartbeat mỗi 5s. Khớp docs/04 §6 (AC-1, AC-3, AC-4).

/** Chạy `beats` nhịp heartbeat liên tiếp từ t0; trả về {state, pauses}. */
function runHeartbeats(
  state: TrackerState,
  t0: number,
  beats: number,
  thresholdMinutes: number,
): { state: TrackerState; pauses: number; lastPauseAt: number } {
  let s = state;
  let pauses = 0;
  let lastPauseAt = 0;
  let now = t0;
  for (let i = 0; i < beats; i++) {
    const r = tick(s, now, thresholdMinutes);
    s = r.state;
    if (r.showPause) {
      pauses++;
      lastPauseAt = now;
    }
    now += HEARTBEAT_MS;
  }
  return { state: s, pauses, lastPauseAt };
}

describe('tick — tích lũy & ngưỡng (AC-1)', () => {
  it('cuộn liên tục đạt ngưỡng 1 phút → hiện đúng 1 lần', () => {
    // 60s / 5s = 13 heartbeat mới đạt (heartbeat đầu chỉ set mốc, chưa cộng)
    const { pauses } = runHeartbeats(initialState(), 1_000_000, 20, 1);
    expect(pauses).toBe(1);
  });

  it('chưa đủ ngưỡng thì không hiện', () => {
    const { pauses } = runHeartbeats(initialState(), 1_000_000, 5, 1);
    expect(pauses).toBe(0);
  });

  it('scrolledMinutes ≈ ngưỡng khi kích hoạt', () => {
    let s = initialState();
    let now = 1_000_000;
    let fired = false;
    for (let i = 0; i < 30; i++) {
      const r = tick(s, now, 1);
      s = r.state;
      if (r.showPause) {
        expect(r.scrolledMinutes).toBe(1);
        fired = true;
        break;
      }
      now += HEARTBEAT_MS;
    }
    expect(fired).toBe(true);
  });
});

describe('tick — reset khi nghỉ ≥ 60s (AC-3)', () => {
  it('gián đoạn ≥ 60s làm bộ đếm về 0', () => {
    // Tích ~40s rồi nghỉ 60s → phải bắt đầu lại, không kích hoạt sớm
    const a = runHeartbeats(initialState(), 0, 8, 1); // ~35s tích lũy
    expect(a.state.scrolledSeconds).toBeGreaterThan(0);
    const afterGap = tick(a.state, a.state.lastActivityAt + GAP_RESET_MS, 1);
    expect(afterGap.state.scrolledSeconds).toBe(0);
    expect(afterGap.showPause).toBe(false);
  });
});

describe('tick — cooldown (AC-4)', () => {
  it('sau khi hiện, không hiện lại ngay trong cooldown', () => {
    // Chạy dài (5 phút heartbeat) với ngưỡng 1 phút:
    // cooldown tối thiểu 10 phút ⇒ chỉ được hiện đúng 1 lần trong 5 phút.
    const { pauses } = runHeartbeats(initialState(), 2_000_000, 60, 1);
    expect(pauses).toBe(1);
  });
});
