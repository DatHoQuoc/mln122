// Hàm THUẦN dựng dữ liệu hiển thị Nhật ký từ sessions (docs/06). Có test.
// Dùng chung cho popup Today + Journal, và cho phân tích paper.

import type { SessionRecord } from './types';
import { isMicroWin, type DayMicroWin } from './metrics';

const DAY_MS = 86_400_000;

function dayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

/** Chuỗi `days` ngày gần nhất tính tới `now`, mỗi ngày có micro-win hay không. */
export function dailyMicroWins(
  sessions: SessionRecord[],
  now: number,
  days: number,
): DayMicroWin[] {
  const byDay = new Map<string, boolean>();
  for (const s of sessions) {
    if (s.keptIntention === null) continue;
    const d = dayKey(s.ts);
    const win = isMicroWin(s.keptIntention, s.actualMinutes, s.plannedMinutes);
    byDay.set(d, (byDay.get(d) ?? false) || win);
  }
  const out: DayMicroWin[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = dayKey(now - i * DAY_MS);
    out.push({ date: d, hasMicroWin: byDay.get(d) ?? false });
  }
  return out;
}

/** Tỷ lệ phiên giữ đúng ý định (micro-win) trong các phiên đã đối chiếu kể từ `sinceTs`. */
export function intentionKeptRatio(sessions: SessionRecord[], sinceTs: number): number {
  const rel = sessions.filter(
    (s) => s.ts >= sinceTs && s.keptIntention !== null && s.intention !== null,
  );
  if (rel.length === 0) return 0;
  const kept = rel.filter((s) =>
    isMicroWin(s.keptIntention, s.actualMinutes, s.plannedMinutes),
  ).length;
  return kept / rel.length;
}

/** Phiên gần nhất đã kết thúc, có đặt ý định, nhưng CHƯA đối chiếu. null nếu không có. */
export function pendingReflection(sessions: SessionRecord[]): SessionRecord | null {
  for (let i = sessions.length - 1; i >= 0; i--) {
    const s = sessions[i];
    if (s.keptIntention === null && s.intention !== null) return s;
  }
  return null;
}
