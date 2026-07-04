import { useEffect, useState } from 'react';
import { vi, t } from '@shared/i18n/vi';
import { get } from '@shared/storage';
import { sendMessage } from '@shared/messages';
import { currentStreak, longestStreak } from '@shared/metrics';
import { dailyMicroWins, intentionKeptRatio, pendingReflection } from '@shared/journal-view';
import type { SessionRecord, KeptIntention } from '@shared/types';

const WEEK_MS = 7 * 86_400_000;

export function JournalPage() {
  const [sessions, setSessions] = useState<SessionRecord[] | null>(null);

  const load = () => get('sessions').then(setSessions);
  useEffect(() => {
    void load();
  }, []);

  if (!sessions) return <p className="tinh-muted">Đang tải…</p>;

  const now = Date.now();
  const days = dailyMicroWins(sessions, now, 30);
  const streak = currentStreak(days);
  const best = longestStreak(days);
  const keptRatio = Math.round(intentionKeptRatio(sessions, now - WEEK_MS) * 100);
  const pending = pendingReflection(sessions);

  const answer = async (kept: KeptIntention) => {
    if (!pending) return;
    await sendMessage({
      type: 'SESSION_END_REFLECT',
      platform: pending.platform,
      keptIntention: kept,
    });
    await load();
  };

  if (sessions.length === 0) {
    return <p className="tinh-muted">{vi.journal.noSessions}</p>;
  }

  return (
    <div className="tinh-journal">
      {pending && (
        <div className="reflect-card">
          <div className="reflect-title">
            {t(vi.journal.reflectTitle, { platform: vi.platformNames[pending.platform] })}
          </div>
          <div className="reflect-detail">
            {t(vi.journal.reflectDetail, {
              intention: vi.journal.categories[pending.intention as 'giai-tri'],
              planned: pending.plannedMinutes ?? '—',
              actual: pending.actualMinutes,
            })}
          </div>
          <div className="reflect-q">{vi.journal.reflectQuestion}</div>
          <div className="reflect-btns">
            <button onClick={() => answer(true)}>{vi.journal.kept}</button>
            <button onClick={() => answer('partial')}>{vi.journal.partial}</button>
            <button onClick={() => answer(false)}>{vi.journal.notKept}</button>
          </div>
        </div>
      )}

      <div className="tinh-stats">
        <Stat label={vi.journal.streakCurrent} value={`${streak} ${vi.journal.days}`} />
        <Stat label={vi.journal.streakLongest} value={`${best} ${vi.journal.days}`} />
        <Stat label={vi.journal.keptRatioWeek} value={`${keptRatio}%`} />
      </div>

      <div className="calendar">
        {days.map((d) => (
          <span key={d.date} className={`dot ${d.hasMicroWin ? 'win' : ''}`} title={d.date} />
        ))}
      </div>

      <div className="session-list">
        <div className="tinh-muted small">{vi.journal.recent}</div>
        {[...sessions]
          .reverse()
          .slice(0, 6)
          .map((s, i) => (
            <div key={i} className="session-row">
              <span>{vi.platformNames[s.platform]}</span>
              <span className="tinh-muted">
                {s.intention ? vi.journal.categories[s.intention as 'giai-tri'] : '—'} ·{' '}
                {s.actualMinutes}
                {vi.journal.minutesShort[0]}
              </span>
              <span>{markKept(s.keptIntention)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

function markKept(k: KeptIntention): string {
  if (k === true) return '💪';
  if (k === 'partial') return '◐';
  if (k === false) return '·';
  return '…';
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <div className="stat-value small">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
