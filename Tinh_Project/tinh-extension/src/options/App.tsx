import { useEffect, useState } from 'react';
import { sendMessage } from '@shared/messages';
import type { Settings } from '@shared/types';
import { Onboarding } from './pages/Onboarding';
import { OptionsMain } from './pages/OptionsMain';

// Trang tùy chọn (docs/01, 07). Lần đầu → onboarding 3 bước; sau đó → cài đặt + export +
// "Vì sao?". Onboarding là consent gate nhưng không cưỡng ép (nút "Bắt đầu dùng" luôn bấm được).
export function App() {
  const [s, setS] = useState<Settings | null>(null);

  const load = () =>
    void sendMessage<{ settings: Settings }>({ type: 'GET_STATE' }).then(
      (r) => r && setS(r.settings),
    );

  useEffect(load, []);

  if (!s) return <div className="opt-loading">Đang tải…</div>;
  if (!s.onboardingCompleted) return <Onboarding initial={s} onDone={load} />;
  return <OptionsMain />;
}
