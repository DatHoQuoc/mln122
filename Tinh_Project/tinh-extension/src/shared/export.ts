// Build export JSON/CSV (docs/07 §4). P0: khung + tổng hợp cơ bản.
// P4 sẽ hoàn thiện sourceSummaryByWeek + preview UI.

import type { StorageShape } from './types';
import { normalizedEntropy } from './metrics';

export interface ExportJson {
  exportVersion: 1;
  participantCode: string;
  installDate: string;
  exportDate: string;
  settings: StorageShape['settings'];
  pauseEvents: StorageShape['pauseEvents'];
  sessions: StorageShape['sessions'];
  microWinStreakMax: number;
}

function toISODate(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

/** JSON đầy đủ — KHÔNG kèm danh sách tên nguồn (tối thiểu hóa khi rời máy, 07 §4.1). */
export function buildExportJson(
  data: StorageShape,
  exportTs: number,
  microWinStreakMax: number,
): ExportJson {
  return {
    exportVersion: 1,
    participantCode: data.settings.participantCode,
    installDate: data.meta.installDate ? toISODate(data.meta.installDate) : '',
    exportDate: toISODate(exportTs),
    settings: data.settings,
    pauseEvents: data.pauseEvents,
    sessions: data.sessions,
    microWinStreakMax,
  };
}

/** CSV 1 dòng/người (07 §4.2). UTF-8 BOM để Excel không vỡ tiếng Việt. */
export function buildExportCsv(data: StorageShape): string {
  const p = data.settings.participantCode || 'UNKNOWN';
  const pauseShown = data.pauseEvents.length;
  const pauseContinue = data.pauseEvents.filter((e) => e.choice === 'continue').length;
  const pauseStop = data.pauseEvents.filter((e) => e.choice === 'stop').length;
  const avgReaction =
    pauseShown > 0
      ? Math.round(data.pauseEvents.reduce((a, e) => a + e.reactionMs, 0) / pauseShown)
      : 0;
  const sessionsTotal = data.sessions.length;
  const intentionSet = data.sessions.filter((s) => s.intention != null).length;
  const intentionSetRatio = sessionsTotal > 0 ? (intentionSet / sessionsTotal).toFixed(2) : '0';

  // entropy trung bình toàn kỳ (P4 sẽ tách theo tuần)
  const merged: Record<string, number> = {};
  for (const day of data.sourceLog) {
    for (const [name, s] of Object.entries(day.sources)) {
      merged[name] = (merged[name] ?? 0) + s.count;
    }
  }
  const entropyAll = normalizedEntropy(merged).toFixed(2);

  const header = [
    'participantCode',
    'pauseShown',
    'pauseContinue',
    'pauseStop',
    'avgReactionMs',
    'mirrorOpens',
    'entropyNormAll',
    'sessionsTotal',
    'intentionSetRatio',
  ].join(',');
  const row = [
    p,
    pauseShown,
    pauseContinue,
    pauseStop,
    avgReaction,
    data.meta.mirrorOpenCount,
    entropyAll,
    sessionsTotal,
    intentionSetRatio,
  ].join(',');

  return '﻿' + header + '\n' + row + '\n';
}
