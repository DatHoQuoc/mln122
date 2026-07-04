import { useEffect, useState } from 'react';
import { vi } from '@shared/i18n/vi';
import { get } from '@shared/storage';
import { currentStreak } from '@shared/metrics';
import { dailyMicroWins } from '@shared/journal-view';

// P1: khoảng dừng hôm nay. P2: thêm chuỗi micro-win.
export function TodayPage() {
  const [pauseToday, setPauseToday] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [anyData, setAnyData] = useState(false);

  useEffect(() => {
    void (async () => {
      const now = Date.now();
      const d = new Date(now).toISOString().slice(0, 10);
      const events = await get('pauseEvents');
      const sessions = await get('sessions');
      setPauseToday(events.filter((e) => new Date(e.ts).toISOString().slice(0, 10) === d).length);
      setStreak(currentStreak(dailyMicroWins(sessions, now, 30)));
      setAnyData(events.length > 0 || sessions.length > 0);
    })();
  }, []);

  if (pauseToday === null) return <p className="tinh-muted">Đang tải…</p>;
  if (!anyData) return <p className="tinh-muted">{vi.today.empty}</p>;

  return (
    <div className="tinh-stats">
      <Stat label={vi.today.pauseToday} value={pauseToday} />
      <Stat label={vi.today.streak} value={streak} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
