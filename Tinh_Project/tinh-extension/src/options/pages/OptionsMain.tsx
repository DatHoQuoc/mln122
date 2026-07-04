import { useEffect, useState } from 'react';
import { vi, t } from '@shared/i18n/vi';
import { sendMessage } from '@shared/messages';
import { get } from '@shared/storage';
import { buildExportJson, buildExportCsv } from '@shared/export';
import { dailyMicroWins } from '@shared/journal-view';
import { longestStreak } from '@shared/metrics';
import type { Settings, StorageShape } from '@shared/types';

function download(name: string, mime: string, text: string) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function OptionsMain() {
  const [s, setS] = useState<Settings | null>(null);
  const [data, setData] = useState<StorageShape | null>(null);

  useEffect(() => {
    void sendMessage<{ settings: Settings }>({ type: 'GET_STATE' }).then((r) => setS(r.settings));
    void Promise.all([
      get('settings'),
      get('pauseEvents'),
      get('sourceLog'),
      get('sessions'),
      get('meta'),
    ]).then(([settings, pauseEvents, sourceLog, sessions, meta]) =>
      setData({ settings, pauseEvents, sourceLog, sessions, meta }),
    );
  }, []);

  // Nhảy tới mục "Vì sao?" khi mở qua anchor (#vi-sao-khoang-dung / #vi-sao-guong).
  useEffect(() => {
    if (s && data && location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [s, data]);

  if (!s || !data) return <p className="opt-muted">Đang tải…</p>;

  const update = (patch: Partial<Settings>) => {
    setS({ ...s, ...patch });
    void sendMessage({ type: 'UPDATE_SETTINGS', settings: patch });
  };

  const now = Date.now();
  const merged: StorageShape = { ...data, settings: s };
  const streakMax = longestStreak(dailyMicroWins(data.sessions, now, 30));
  const jsonObj = buildExportJson(merged, now, streakMax);
  const jsonStr = JSON.stringify(jsonObj, null, 2);
  const canExport = s.participantCode.trim().length > 0;

  return (
    <div className="opt">
      <header className="opt-header" id="top">
        <h1>🌙 {vi.appName}</h1>
        <span className="opt-muted">{vi.tagline}</span>
      </header>

      {/* Cài đặt */}
      <section className="opt-section">
        <h2>{vi.options.settingsSection}</h2>
        <label className="opt-row">
          <span>{vi.settings.consent}</span>
          <input
            type="checkbox"
            checked={s.consentGiven}
            onChange={(e) => update({ consentGiven: e.target.checked })}
          />
        </label>
        <label className="opt-row col">
          <span>
            {vi.settings.pauseThreshold}: <b>{s.pauseThresholdMinutes}</b> {vi.settings.minutesUnit}
          </span>
          <input
            type="range"
            min={1}
            max={60}
            value={s.pauseThresholdMinutes}
            onChange={(e) => update({ pauseThresholdMinutes: Number(e.target.value) })}
          />
        </label>
        {(
          [
            ['pauseEnabled', vi.settings.featurePause],
            ['mirrorEnabled', vi.settings.featureMirror],
            ['journalEnabled', vi.settings.featureJournal],
            ['journalNotifications', vi.settings.notifications],
          ] as const
        ).map(([key, label]) => (
          <label className="opt-row" key={key}>
            <span>{label}</span>
            <input
              type="checkbox"
              checked={s[key]}
              onChange={(e) => update({ [key]: e.target.checked } as Partial<Settings>)}
            />
          </label>
        ))}
        <label className="opt-row col">
          <span>{vi.settings.participantCode}</span>
          <input
            type="text"
            value={s.participantCode}
            placeholder="VD: K12"
            onChange={(e) => update({ participantCode: e.target.value })}
          />
        </label>
      </section>

      {/* Export */}
      <section className="opt-section">
        <h2>{vi.export.title}</h2>
        <p className="opt-muted">{vi.export.body}</p>
        {!canExport && <p className="opt-warn">{vi.export.needCode}</p>}
        <p className="opt-muted small">
          {t(vi.export.summary, {
            pauses: data.pauseEvents.length,
            sessions: data.sessions.length,
            opens: data.meta.mirrorOpenCount,
          })}
        </p>
        <div className="opt-actions">
          <button
            className="btn-primary"
            disabled={!canExport}
            onClick={() => download(`tinh-${s.participantCode}.json`, 'application/json', jsonStr)}
          >
            {vi.export.downloadJson}
          </button>
          <button
            className="btn-ghost"
            disabled={!canExport}
            onClick={() =>
              download(
                `tinh-${s.participantCode}.csv`,
                'text/csv;charset=utf-8',
                buildExportCsv(merged),
              )
            }
          >
            {vi.export.downloadCsv}
          </button>
        </div>
        <details className="opt-preview">
          <summary>{vi.export.preview}</summary>
          <pre>{jsonStr}</pre>
        </details>
        <p className="opt-muted small">{vi.export.note}</p>
      </section>

      {/* Vì sao? — F1 */}
      <section className="opt-section" id="vi-sao-khoang-dung">
        <h2>{vi.options.whyPauseTitle}</h2>
        <p className="opt-muted">{vi.options.whyPauseBody}</p>
      </section>

      {/* Vì sao? — F2 */}
      <section className="opt-section" id="vi-sao-guong">
        <h2>{vi.options.whyMirrorTitle}</h2>
        <p className="opt-muted">{vi.options.whyMirrorBody}</p>
        <a className="opt-top" href="#top">
          {vi.options.backToTop}
        </a>
      </section>
    </div>
  );
}
