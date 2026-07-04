// Hàm thống kê THUẦN (pure) — logic nghiên cứu, phải có unit test (docs/09 §1).
// Sai ở đây = sai số liệu trong paper. Khớp docs/05 §3 và docs/06 §2.3.

/** Tổng số lượt xem từ phân bố nguồn {tên: đếm}. */
export function totalItems(sources: Record<string, number>): number {
  return Object.values(sources).reduce((a, b) => a + b, 0);
}

/** Số nguồn khác nhau. */
export function uniqueSourceCount(sources: Record<string, number>): number {
  return Object.keys(sources).length;
}

/** Unique-source ratio = số nguồn / tổng item. 0 nếu chưa có item. */
export function uniqueSourceRatio(sources: Record<string, number>): number {
  const total = totalItems(sources);
  if (total === 0) return 0;
  return uniqueSourceCount(sources) / total;
}

/**
 * Shannon entropy chuẩn hóa H* ∈ [0,1].
 * 0 = một nguồn thống trị tuyệt đối; 1 = phân bố đều.
 * Quy ước: S<=1 → 0 (không chia cho log2(1)=0).
 */
export function normalizedEntropy(sources: Record<string, number>): number {
  const counts = Object.values(sources).filter((c) => c > 0);
  const total = counts.reduce((a, b) => a + b, 0);
  const S = counts.length;
  if (total === 0 || S <= 1) return 0;
  let h = 0;
  for (const c of counts) {
    const p = c / total;
    h -= p * Math.log2(p);
  }
  return h / Math.log2(S);
}

/** Nhãn diễn giải cho H* (docs/05 §3). */
export function diversityLabel(hStar: number): 'rất tập trung' | 'tập trung vừa' | 'khá đa dạng' {
  if (hStar < 0.4) return 'rất tập trung';
  if (hStar <= 0.7) return 'tập trung vừa';
  return 'khá đa dạng';
}

/** Tỷ lệ item do thuật toán đề xuất (vs do người dùng tự chọn). */
export function recommendedRatio(recommended: number, selfSelected: number): number {
  const total = recommended + selfSelected;
  if (total === 0) return 0;
  return recommended / total;
}

// ---- F3: micro-win & streak (docs/06 §2.3) ----

export interface DayMicroWin {
  date: string; // 'YYYY-MM-DD'
  hasMicroWin: boolean;
}

/**
 * Một phiên là micro-win nếu keptIntention === true,
 * HOẶC 'partial' và thời gian thực ≤ dự kiến × 1.5.
 */
export function isMicroWin(
  keptIntention: true | 'partial' | false | null,
  actualMinutes: number,
  plannedMinutes: number | null,
): boolean {
  if (keptIntention === true) return true;
  if (keptIntention === 'partial' && plannedMinutes != null) {
    return actualMinutes <= plannedMinutes * 1.5;
  }
  return false;
}

/**
 * Streak = số ngày LIÊN TIẾP gần nhất có micro-win, tính lùi từ ngày cuối.
 * days phải sắp xếp tăng dần theo ngày.
 */
export function currentStreak(days: DayMicroWin[]): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].hasMicroWin) streak++;
    else break;
  }
  return streak;
}

/** Streak dài nhất từng đạt. */
export function longestStreak(days: DayMicroWin[]): number {
  let best = 0;
  let cur = 0;
  for (const d of days) {
    if (d.hasMicroWin) {
      cur++;
      best = Math.max(best, cur);
    } else {
      cur = 0;
    }
  }
  return best;
}
