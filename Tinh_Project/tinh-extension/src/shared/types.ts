// Kiểu dữ liệu dùng chung. Khớp docs/07_DuLieu_DoLuong_Export.md §1.
// Đây là "hợp đồng dữ liệu" giữa code và nghiên cứu — sửa ở đây phải cập nhật doc 07.

export type Platform = 'youtube' | 'facebook' | 'tiktok';

export type FeedItemOrigin = 'self-selected' | 'recommended';
export type SourceType = 'channel' | 'page' | 'group' | 'friend' | 'unknown';

/** Thông tin một item trong feed — CHỈ tên nguồn, KHÔNG nội dung/URL (NFR-5). */
export interface FeedItemInfo {
  sourceName: string;
  sourceType: SourceType;
  origin: FeedItemOrigin;
}

export interface Settings {
  consentGiven: boolean;
  onboardingCompleted: boolean;
  participantCode: string;
  pauseEnabled: boolean;
  pauseThresholdMinutes: number; // 5–60, mặc định 15
  mirrorEnabled: boolean;
  journalEnabled: boolean;
  journalNotifications: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  consentGiven: false,
  onboardingCompleted: false,
  participantCode: '',
  pauseEnabled: true,
  pauseThresholdMinutes: 15,
  mirrorEnabled: true,
  journalEnabled: true,
  journalNotifications: true,
};

// ---- F1: Khoảng dừng phản tư (04 §4) ----
export type PauseChoice = 'continue' | 'stop' | 'dismissed';
export interface PauseEvent {
  ts: number;
  platform: Platform;
  scrolledMinutes: number;
  choice: PauseChoice;
  reactionMs: number;
}

// ---- F2: Gương bong bóng lọc (05 §2) ----
export interface DaySourceLog {
  date: string; // 'YYYY-MM-DD'
  platform: Platform;
  sources: Record<string, { count: number; selfSelected: number; recommended: number }>;
}

// ---- F3: Nhật ký chủ thể (06 §4) ----
export type Intention = 'giai-tri' | 'hoc-tap' | 'tim-cu-the' | null;
export type KeptIntention = true | 'partial' | false | null;
export interface SessionRecord {
  ts: number;
  platform: Platform;
  intention: Intention;
  plannedMinutes: number | null;
  actualMinutes: number;
  keptIntention: KeptIntention;
  viaF1Stop: boolean;
}

export interface Meta {
  schemaVersion: 1;
  installDate: number;
  mirrorOpenCount: number;
}

/** Toàn bộ hình dạng storage. */
export interface StorageShape {
  settings: Settings;
  pauseEvents: PauseEvent[];
  sourceLog: DaySourceLog[];
  sessions: SessionRecord[];
  meta: Meta;
}

export const SCHEMA_VERSION = 1 as const;
export const RETENTION_DAYS = 30;
