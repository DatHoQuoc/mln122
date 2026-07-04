// Nén dist/ -> release/tinh-extension-vX.Y.Z.zip để gửi người thử nghiệm.
import { createWriteStream, mkdirSync, existsSync, readFileSync } from 'node:fs';
import archiver from 'archiver';

if (!existsSync('dist')) {
  console.error('Chưa có dist/. Chạy "npm run build" trước.');
  process.exit(1);
}

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
mkdirSync('release', { recursive: true });
const outPath = `release/tinh-extension-v${pkg.version}.zip`;
const out = createWriteStream(outPath);
const archive = archiver('zip', { zlib: { level: 9 } });

out.on('close', () => console.log(`Đã nén ${archive.pointer()} bytes -> ${outPath}`));
archive.on('error', (err) => {
  throw err;
});

archive.pipe(out);
archive.directory('dist/', false);
await archive.finalize();
