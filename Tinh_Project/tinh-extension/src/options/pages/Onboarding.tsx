import { useState } from 'react';
import { vi } from '@shared/i18n/vi';
import { sendMessage } from '@shared/messages';
import type { Settings } from '@shared/types';

// Onboarding 3 bước (docs/01). Bước 2 là CONSENT GATE nhưng KHÔNG ép: user vẫn bấm
// tiếp được, chỉ là tính năng chỉ bật khi đã đồng ý (worker kiểm consentGiven).
export function Onboarding({ initial, onDone }: { initial: Settings; onDone: () => void }) {
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(initial.consentGiven);
  const [code, setCode] = useState(initial.participantCode);
  const [pauseEnabled, setPause] = useState(initial.pauseEnabled);
  const [mirrorEnabled, setMirror] = useState(initial.mirrorEnabled);
  const [journalEnabled, setJournal] = useState(initial.journalEnabled);

  const finish = async () => {
    await sendMessage({
      type: 'UPDATE_SETTINGS',
      settings: {
        consentGiven: consent,
        onboardingCompleted: true,
        participantCode: code.trim(),
        pauseEnabled,
        mirrorEnabled,
        journalEnabled,
      },
    });
    onDone();
  };

  return (
    <div className="onb">
      <div className="onb-card">
        <div className="onb-dots">
          {[1, 2, 3].map((n) => (
            <span key={n} className={n === step ? 'on' : ''} />
          ))}
        </div>

        {step === 1 && (
          <>
            <h2>{vi.onboarding.step1Title}</h2>
            <p className="opt-muted">{vi.onboarding.step1Body}</p>
            <div className="onb-actions">
              <span />
              <button className="btn-primary" onClick={() => setStep(2)}>
                Tiếp →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>{vi.onboarding.step2Title}</h2>
            <p className="opt-muted">{vi.onboarding.step2Body}</p>
            <label className="onb-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>{vi.onboarding.consent}</span>
            </label>
            <div className="onb-actions">
              <button className="btn-ghost" onClick={() => setStep(1)}>
                ← Quay lại
              </button>
              <button className="btn-primary" onClick={() => setStep(3)}>
                Tiếp →
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>{vi.onboarding.step3Title}</h2>
            <label className="opt-row">
              <span>{vi.settings.featurePause}</span>
              <input
                type="checkbox"
                checked={pauseEnabled}
                onChange={(e) => setPause(e.target.checked)}
              />
            </label>
            <label className="opt-row">
              <span>{vi.settings.featureMirror}</span>
              <input
                type="checkbox"
                checked={mirrorEnabled}
                onChange={(e) => setMirror(e.target.checked)}
              />
            </label>
            <label className="opt-row">
              <span>{vi.settings.featureJournal}</span>
              <input
                type="checkbox"
                checked={journalEnabled}
                onChange={(e) => setJournal(e.target.checked)}
              />
            </label>
            <label className="opt-row col">
              <span>{vi.settings.participantCode}</span>
              <input
                type="text"
                value={code}
                placeholder="VD: K12"
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
            <div className="onb-actions">
              <button className="btn-ghost" onClick={() => setStep(2)}>
                ← Quay lại
              </button>
              <button className="btn-primary" onClick={() => void finish()}>
                {vi.onboarding.finish}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
