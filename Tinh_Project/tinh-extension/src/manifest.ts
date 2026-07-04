import { defineManifest } from '@crxjs/vite-plugin';
import pkg from '../package.json';

// Manifest V3. Quyền tối thiểu (NFR-1 local-only): KHÔNG có host_permissions ngoài
// hai domain MXH đích trong content_scripts.matches. Không có quyền mạng nào khác.
export default defineManifest({
  manifest_version: 3,
  name: 'Tỉnh',
  version: pkg.version,
  description:
    'Công cụ giúp bạn tái chiếm quyền làm chủ trước thuật toán mạng xã hội — dữ liệu ở lại máy bạn.',
  icons: {
    '16': 'icons/icon-16.png',
    '48': 'icons/icon-48.png',
    '128': 'icons/icon-128.png',
  },
  action: {
    default_popup: 'src/popup/index.html',
    default_title: 'Tỉnh',
    default_icon: {
      '16': 'icons/icon-16.png',
      '48': 'icons/icon-48.png',
      '128': 'icons/icon-128.png',
    },
  },
  options_page: 'src/options/index.html',
  background: {
    service_worker: 'src/background/service-worker.ts',
    type: 'module',
  },
  permissions: ['storage', 'alarms', 'tabs', 'notifications'],
  content_scripts: [
    {
      matches: ['*://*.youtube.com/*', '*://*.facebook.com/*', '*://*.tiktok.com/*'],
      js: ['src/content/index.ts'],
      run_at: 'document_idle',
    },
  ],
});
