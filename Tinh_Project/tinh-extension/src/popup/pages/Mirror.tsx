import { useEffect, useState } from 'react';
import { vi, t } from '@shared/i18n/vi';
import { get } from '@shared/storage';
import { sendMessage } from '@shared/messages';
import { diversityLabel } from '@shared/metrics';
import { mirrorStats, lowDiversityDayStreak, type PlatformFilter } from '@shared/mirror-view';
import type { DaySourceLog } from '@shared/types';

export function MirrorPage() {
  const [log, setLog] = useState<DaySourceLog[] | null>(null);
  const [filter, setFilter] = useState<PlatformFilter>('all');

  useEffect(() => {
    void sendMessage({ type: 'MIRROR_OPENED' }); // đếm lượt mở (biến X′2)
    void get('sourceLog').then(setLog);
  }, []);

  if (!log) return <p className="tinh-muted">Đang tải…</p>;

  const now = Date.now();
  const s = mirrorStats(log, filter, now);
  const streak = lowDiversityDayStreak(log, filter, now);

  return (
    <div className="tinh-mirror">
      <p className="tinh-muted small">{vi.mirror.subtitle}</p>

      <div className="mirror-filter">
        {(['all', 'youtube', 'facebook', 'tiktok'] as PlatformFilter[]).map((f) => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Tất cả' : vi.platformNames[f]}
          </button>
        ))}
      </div>

      {!s.enough ? (
        <p className="tinh-muted">{vi.mirror.notEnough}</p>
      ) : (
        <>
          <div className="diversity">
            <div className="diversity-head">
              <span title={vi.mirror.diversityHint}>
                {vi.mirror.diversity}
                <span className="stat-info" title={vi.mirror.diversityHint}> ⓘ</span>
              </span>
              <b>{s.entropyNorm.toFixed(2)}</b>
            </div>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${Math.round(s.entropyNorm * 100)}%` }} />
            </div>
            <div className="tinh-muted small">"{diversityLabel(s.entropyNorm)}"</div>
          </div>

          <div className="tinh-muted small">
            {t(vi.mirror.views, { items: s.totalItems, sources: s.uniqueSources })}
          </div>

          <div className="split">
            <span>
              ● {vi.mirror.selfSelected} {Math.round(s.selfSelectedRatio * 100)}%
            </span>
            <span>
              ● {vi.mirror.recommended} {Math.round(s.recommendedRatio * 100)}%
            </span>
          </div>

          <div className="top">
            <div className="tinh-muted small">{vi.mirror.topSources}</div>
            {s.top.map((src) => (
              <div key={src.name} className="top-row">
                <div className="top-bar" style={{ width: `${src.pct}%` }} />
                <span className="top-name">{src.name}</span>
                <span className="top-pct">{src.pct}%</span>
              </div>
            ))}
            {s.othersCount > 0 && (
              <div className="tinh-muted small">
                {t(vi.mirror.others, { n: s.uniqueSources - s.top.length })}: {s.othersCount} lượt
              </div>
            )}
          </div>

          {streak >= 3 && (
            <div className="suggestion">{t(vi.mirror.suggestion, { days: streak })}</div>
          )}
        </>
      )}

      <button
        className="tinh-muted small link"
        onClick={() => void sendMessage({ type: 'OPEN_OPTIONS', anchor: 'vi-sao-guong' })}
      >
        {vi.mirror.why}
      </button>
    </div>
  );
}
