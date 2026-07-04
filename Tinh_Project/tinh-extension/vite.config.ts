/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest';

// Vite + CRXJS (Manifest V3). Xem ADR-3 trong docs/02_KienTruc_HeThong.md.
export default defineConfig({
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
  plugins: [react(), crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: { port: 5173 },
  },
  build: {
    // CRXJS xuất ra dist/ để load unpacked
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.ts'],
  },
});
