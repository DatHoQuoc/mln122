// Service worker (MV3). Điều phối: listeners, alarms, định tuyến message.
// P1: F1 khoảng dừng. P2: F3 nhật ký (lifecycle phiên + alarm idle).

import { ensureMeta, getSettings, patchSettings, get, set } from '@shared/storage';
import type { ExtMessage } from '@shared/messages';
import { SessionTracker } from './session-tracker';
import { pruneByTimestamp, pruneByDate } from './storage-writer';
import * as journal from './journal';
import { registerNotificationClicks } from './notify';
import type { FeedItemInfo, Platform } from '@shared/types';

console.log('[Tỉnh] service worker alive');
registerNotificationClicks();

const tracker = new SessionTracker();
const IDLE_ALARM = 'idle-check';

function ensureAlarms() {
  chrome.alarms.create(IDLE_ALARM, { periodInMinutes: 5 });
}

chrome.runtime.onInstalled.addListener(async () => {
  await ensureMeta(Date.now());
  ensureAlarms();
  console.log('[Tỉnh] onInstalled — meta ready');
});
chrome.runtime.onStartup.addListener(ensureAlarms);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === IDLE_ALARM) void journal.checkIdle(Date.now());
});

chrome.runtime.onMessage.addListener((msg: ExtMessage, sender, sendResponse) => {
  handle(msg, sender).then(sendResponse);
  return true; // giữ kênh cho async response
});

/** Cộng dồn một item feed đã xem vào sourceLog theo ngày (docs/05 §2). CHỈ tên nguồn. */
async function recordFeedItem(platform: Platform, item: FeedItemInfo, now: number): Promise<void> {
  const date = new Date(now).toISOString().slice(0, 10);
  const log = await get('sourceLog');
  let day = log.find((d) => d.date === date && d.platform === platform);
  if (!day) {
    day = { date, platform, sources: {} };
    log.push(day);
  }
  const s = day.sources[item.sourceName] ?? { count: 0, selfSelected: 0, recommended: 0 };
  s.count += 1;
  if (item.origin === 'self-selected') s.selfSelected += 1;
  else s.recommended += 1;
  day.sources[item.sourceName] = s;
  await set('sourceLog', pruneByDate(log, now));
}

async function handle(msg: ExtMessage, sender: chrome.runtime.MessageSender): Promise<unknown> {
  switch (msg.type) {
    case 'SCROLL_ACTIVITY': {
      const settings = await getSettings();
      if (!settings.consentGiven) return { ok: true };
      const now = Date.now();

      // F3: cập nhật hoạt động phiên (để tính actualMinutes).
      if (settings.journalEnabled) void journal.onActivity(msg.platform, now);

      // F1: kiểm ngưỡng khoảng dừng.
      if (settings.pauseEnabled) {
        const { showPause, scrolledMinutes } = await tracker.onActivity(
          msg.platform,
          now,
          settings.pauseThresholdMinutes,
        );
        const tabId = sender.tab?.id;
        if (showPause && tabId != null) {
          chrome.tabs
            .sendMessage(tabId, { type: 'SHOW_PAUSE', platform: msg.platform, scrolledMinutes })
            .catch(() => {});
        }
      }
      return { ok: true };
    }

    case 'SESSION_START': {
      const settings = await getSettings();
      return journal.onSessionStart(
        msg.platform,
        Date.now(),
        settings.consentGiven && settings.journalEnabled,
      );
    }

    case 'INTENTION_SET':
      await journal.onIntentionSet(msg.platform, msg.intention, msg.plannedMinutes);
      return { ok: true };

    case 'SESSION_END_REFLECT': {
      const kept = msg.keptIntention === true ? true : msg.keptIntention; // boolean|'partial'|null
      await journal.onReflect(msg.platform, kept);
      return { ok: true };
    }

    case 'PAUSE_CHOICE': {
      const now = Date.now();
      const events = await get('pauseEvents');
      events.push({
        ts: now,
        platform: msg.platform,
        scrolledMinutes: msg.scrolledMinutes,
        choice: msg.choice,
        reactionMs: msg.reactionMs,
      });
      await set('pauseEvents', pruneByTimestamp(events, now));
      if (msg.choice === 'stop') {
        await journal.onF1Stop(msg.platform, now); // đánh dấu viaF1Stop + kết thúc phiên
        if (sender.tab?.id != null) {
          try {
            await chrome.tabs.remove(sender.tab.id);
          } catch {
            /* không đóng được thì thôi */
          }
        }
      }
      return { ok: true };
    }

    case 'FEED_ITEM_SEEN': {
      const settings = await getSettings();
      if (settings.consentGiven && settings.mirrorEnabled) {
        await recordFeedItem(msg.platform, msg.item, Date.now());
      }
      return { ok: true };
    }

    case 'OPEN_OPTIONS': {
      const base = chrome.runtime.getURL('src/options/index.html');
      await chrome.tabs.create({ url: msg.anchor ? `${base}#${msg.anchor}` : base });
      return { ok: true };
    }

    case 'GET_STATE':
      return { settings: await getSettings() };

    case 'UPDATE_SETTINGS':
      await patchSettings(msg.settings);
      return { settings: await getSettings() };

    case 'MIRROR_OPENED': {
      const meta = await get('meta');
      await set('meta', { ...meta, mirrorOpenCount: meta.mirrorOpenCount + 1 });
      return { ok: true };
    }

    default:
      return { ok: false, reason: 'unhandled' };
  }
}
