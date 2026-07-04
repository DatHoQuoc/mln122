// Logic đếm phiên cuộn + quyết định hiện khoảng dừng (docs/04 §2). HÀM THUẦN — có test.
// Tách khỏi chrome API để kiểm chứng độc lập (docs/09 §1).

export interface TrackerState {
  scrolledSeconds: number;
  lastActivityAt: number;
  cooldownUntil: number;
}

export const HEARTBEAT_MS = 5000; // content gửi SCROLL_ACTIVITY mỗi 5s khi đang hoạt động
export const GAP_RESET_MS = 60_000; // gián đoạn ≥ 60s → phiên cuộn liên tục mới
export const MAX_INCREMENT_MS = 10_000; // chặn 1 heartbeat lỡ cộng quá nhiều
export const COOLDOWN_MIN_MS = 10 * 60_000; // cooldown tối thiểu 10 phút

export function initialState(): TrackerState {
  return { scrolledSeconds: 0, lastActivityAt: 0, cooldownUntil: 0 };
}

export interface TickResult {
  state: TrackerState;
  showPause: boolean;
  scrolledMinutes: number;
}

/**
 * Xử lý một nhịp hoạt động cuộn tại thời điểm `now`.
 * - Gián đoạn ≥ 60s (hoặc lần đầu): reset scrolledSeconds = 0.
 * - Ngược lại: cộng dồn khoảng cách (đã chặn trần MAX_INCREMENT_MS).
 * - Khi đạt ngưỡng và hết cooldown: showPause = true, đặt cooldown, reset bộ đếm.
 */
export function tick(prev: TrackerState, now: number, thresholdMinutes: number): TickResult {
  const gap = now - prev.lastActivityAt;

  let scrolledSeconds: number;
  if (prev.lastActivityAt === 0 || gap >= GAP_RESET_MS) {
    scrolledSeconds = 0;
  } else {
    scrolledSeconds = prev.scrolledSeconds + Math.min(gap, MAX_INCREMENT_MS) / 1000;
  }

  let cooldownUntil = prev.cooldownUntil;
  let showPause = false;
  let scrolledMinutes = 0;

  if (scrolledSeconds >= thresholdMinutes * 60 && now >= cooldownUntil) {
    showPause = true;
    scrolledMinutes = Math.round(scrolledSeconds / 60);
    cooldownUntil = now + Math.max(COOLDOWN_MIN_MS, (thresholdMinutes / 2) * 60_000);
    scrolledSeconds = 0;
  }

  return {
    state: { scrolledSeconds, lastActivityAt: now, cooldownUntil },
    showPause,
    scrolledMinutes,
  };
}
