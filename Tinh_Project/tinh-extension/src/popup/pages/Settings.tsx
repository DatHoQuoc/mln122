import { useEffect, useState } from 'react';
import { vi } from '@shared/i18n/vi';
import { sendMessage } from '@shared/messages';
import type { Settings } from '@shared/types';

// Cài đặt có hiệu lực NÓNG: worker đọc settings mới ở nhịp SCROLL_ACTIVITY kế tiếp (AC-7).
export function SettingsPage() {
  const [s, setS] = useState<Settings | null>(null);

  useEffect(() => {
    sendMessage<{ settings: Settings }>({ type: 'GET_STATE' }).then((r) => r && setS(r.settings));
  }, []);

  if (!s) return <p className="tinh-muted">Đang tải…</p>;

  const update = (patch: Partial<Settings>) => {
    setS({ ...s, ...patch });
    void sendMessage({ type: 'UPDATE_SETTINGS', settings: patch });
  };

  return (
    <div className="tinh-settings">
      <div className="field">
        <label className="row">
          <span>{vi.settings.consent}</span>
          <input
            type="checkbox"
            checked={s.consentGiven}
            onChange={(e) => update({ consentGiven: e.target.checked })}
          />
        </label>
        <p className="tinh-muted small hint">{vi.settings.consentHint}</p>
      </div>

      <div className="field">
        <div className="row col">
          <span>
            {vi.settings.pauseThreshold}: <b>{s.pauseThresholdMinutes}</b> {vi.settings.minutesUnit}
          </span>
          <input
            type="range"
            min={1}
            max={60}
            step={1}
            value={s.pauseThresholdMinutes}
            onChange={(e) => update({ pauseThresholdMinutes: Number(e.target.value) })}
          />
        </div>
        <p className="tinh-muted small hint">{vi.settings.pauseThresholdHint}</p>
      </div>

      <Toggle
        label={vi.settings.featurePause}
        hint={vi.settings.featurePauseHint}
        checked={s.pauseEnabled}
        onChange={(v) => update({ pauseEnabled: v })}
      />
      <Toggle
        label={vi.settings.featureMirror}
        hint={vi.settings.featureMirrorHint}
        checked={s.mirrorEnabled}
        onChange={(v) => update({ mirrorEnabled: v })}
      />
      <Toggle
        label={vi.settings.featureJournal}
        hint={vi.settings.featureJournalHint}
        checked={s.journalEnabled}
        onChange={(v) => update({ journalEnabled: v })}
      />
      <Toggle
        label={vi.settings.notifications}
        hint={vi.settings.notificationsHint}
        checked={s.journalNotifications}
        onChange={(v) => update({ journalNotifications: v })}
      />

      <label className="row col">
        <span>{vi.settings.participantCode}</span>
        <input
          type="text"
          value={s.participantCode}
          placeholder="VD: K12"
          onChange={(e) => update({ participantCode: e.target.value })}
        />
      </label>

      <p className="tinh-muted small">{vi.settings.reloadHint}</p>
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="field">
      <label className="row">
        <span>{label}</span>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      </label>
      {hint && <p className="tinh-muted small hint">{hint}</p>}
    </div>
  );
}
