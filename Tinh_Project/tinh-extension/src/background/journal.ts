// Lifecycle phiên cho F3 Nhật ký chủ thể (docs/06 §2).
// Phiên "đang chạy" lưu ở chrome.storage.session (ephemeral); phiên đã kết thúc đẩy vào
// sessions[] (local) với keptIntention=null = chờ đối chiếu. Không giữ state trong biến
// toàn cục vì MV3 worker có thể bị kill.

import { get, set } from '@shared/storage';
import type { Intention, KeptIntention, Platform, SessionRecord } from '@shared/types';
import { pruneByTimestamp } from './storage-writer';
import { notifyReflectDue } from './notify';

const NEW_SESSION_GAP_MS = 2 * 60 * 60_000; // > 2h không hoạt động → phiên mới
export const IDLE_MS = 30 * 60_000; // idle > 30' → kết thúc phiên
const PLATFORMS: Platform[] = ['youtube', 'facebook', 'tiktok'];

interface CurrentSession {
  startedAt: number;
  lastActivityAt: number;
  intention: Intention;
  plannedMinutes: number | null;
  viaF1Stop: boolean;
}

const curKey = (p: Platform) => `session:current:${p}`;

async function loadCurrent(p: Platform): Promise<CurrentSession | null> {
  const k = curKey(p);
  const r = await chrome.storage.session.get(k);
  return (r[k] as CurrentSession | undefined) ?? null;
}
async function saveCurrent(p: Platform, s: CurrentSession | null): Promise<void> {
  if (s === null) await chrome.storage.session.remove(curKey(p));
  else await chrome.storage.session.set({ [curKey(p)]: s });
}

function sameDay(a: number, b: number): boolean {
  return new Date(a).toDateString() === new Date(b).toDateString();
}

/** Đẩy phiên hiện tại thành SessionRecord (chờ đối chiếu) rồi xóa current. */
async function finalize(
  p: Platform,
  cur: CurrentSession,
  now: number,
  notify = false,
): Promise<void> {
  const actualMinutes = Math.max(0, Math.round((cur.lastActivityAt - cur.startedAt) / 60_000));
  const rec: SessionRecord = {
    ts: cur.startedAt,
    platform: p,
    intention: cur.intention,
    plannedMinutes: cur.plannedMinutes,
    actualMinutes,
    keptIntention: null,
    viaF1Stop: cur.viaF1Stop,
  };
  const sessions = await get('sessions');
  sessions.push(rec);
  await set('sessions', pruneByTimestamp(sessions, now));
  await saveCurrent(p, null);
  // Chỉ nhắc đối chiếu khi phiên có đặt ý định (bằng không chẳng có gì để đối chiếu).
  if (notify && rec.intention !== null) void notifyReflectDue(p);
}

/** SESSION_START: quyết định phiên mới → có nên hỏi ý định không. */
export async function onSessionStart(
  p: Platform,
  now: number,
  journalActive: boolean,
): Promise<{ promptIntention: boolean }> {
  if (!journalActive) return { promptIntention: false };
  const cur = await loadCurrent(p);
  if (cur && now - cur.lastActivityAt <= NEW_SESSION_GAP_MS && sameDay(cur.startedAt, now)) {
    return { promptIntention: false }; // vẫn cùng phiên
  }
  if (cur) await finalize(p, cur, now);
  await saveCurrent(p, {
    startedAt: now,
    lastActivityAt: now,
    intention: null,
    plannedMinutes: null,
    viaF1Stop: false,
  });
  return { promptIntention: true };
}

/** Cập nhật mốc hoạt động cuối (để tính actualMinutes). */
export async function onActivity(p: Platform, now: number): Promise<void> {
  const cur = await loadCurrent(p);
  if (cur) {
    cur.lastActivityAt = now;
    await saveCurrent(p, cur);
  }
}

export async function onIntentionSet(
  p: Platform,
  intention: Intention,
  plannedMinutes: number | null,
): Promise<void> {
  const cur = await loadCurrent(p);
  if (cur) {
    cur.intention = intention;
    cur.plannedMinutes = plannedMinutes;
    await saveCurrent(p, cur);
  }
}

/** F1 "Dừng phiên": kết thúc ngay với cờ viaF1Stop=true (docs/06 AC-7). */
export async function onF1Stop(p: Platform, now: number): Promise<void> {
  const cur = await loadCurrent(p);
  if (cur) {
    cur.viaF1Stop = true;
    cur.lastActivityAt = now;
    await finalize(p, cur, now, true);
  }
}

/** Alarm định kỳ: kết thúc mọi phiên idle > 30'. */
export async function checkIdle(now: number): Promise<void> {
  for (const p of PLATFORMS) {
    const cur = await loadCurrent(p);
    if (cur && now - cur.lastActivityAt > IDLE_MS) await finalize(p, cur, now, true);
  }
}

/** SESSION_END_REFLECT: gán kết quả đối chiếu cho phiên chờ gần nhất của platform. */
export async function onReflect(p: Platform, kept: KeptIntention): Promise<void> {
  const sessions = await get('sessions');
  for (let i = sessions.length - 1; i >= 0; i--) {
    const s = sessions[i];
    if (s.platform === p && s.keptIntention === null && s.intention !== null) {
      s.keptIntention = kept;
      await set('sessions', sessions);
      return;
    }
  }
}
