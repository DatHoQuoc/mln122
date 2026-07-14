import { useState } from 'react';
import { vi } from '@shared/i18n/vi';
import { TodayPage } from './pages/Today';
import { SettingsPage } from './pages/Settings';
import { JournalPage } from './pages/Journal';
import { MirrorPage } from './pages/Mirror';

type TabKey = 'today' | 'mirror' | 'journal' | 'settings';

// P1: Today + Settings. P2: Journal. P3: Mirror.
export function App() {
  const [tab, setTab] = useState<TabKey>('today');

  return (
    <div className="tinh-popup">
      <header className="tinh-header">
        <span className="tinh-logo">🌙 {vi.appName}</span>
        <span className="tinh-tagline">{vi.tagline}</span>
      </header>

      <nav className="tinh-tabs">
        {(Object.keys(vi.tabs) as TabKey[]).map((k) => (
          <button
            key={k}
            className={tab === k ? 'active' : ''}
            title={vi.tabHints[k]}
            onClick={() => setTab(k)}
          >
            {vi.tabs[k]}
          </button>
        ))}
      </nav>

      <main className="tinh-body">
        {tab === 'today' && <TodayPage />}
        {tab === 'mirror' && <MirrorPage />}
        {tab === 'journal' && <JournalPage />}
        {tab === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}
