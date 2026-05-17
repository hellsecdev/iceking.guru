import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC =
  process.env.WP_UPLOADS ??
  '/home/d371l/Desktop/AEMO-379_iceking.guru_2026-05-16_20-49-53./public_html/wp-content/uploads/2025/03';
const DEST = join(ROOT, 'public/assets');

const FILES = [
  'ICEKING45465.png',
  'ICEKING213213.png',
  'ICEKING-3.png',
  'ICEKING3423423.png',
  'ICEKING444.png',
  'ICEKING-5.png',
  '2139087.png',
  '223908.png',
  '23258.png',
  '2312539.png',
  'FROST-KING324234234324.jpg',
  'FROST-KING11.jpg',
  'FROST-KING22223.jpg',
  'FROST-KING6666.jpg',
  '1.png',
  '2.png',
  '3.png',
  'Add-a-heading-1.png',
  'ICEKINGwwwwwr.png',
  'cropped-ICEKING-32x32.png',
  'cropped-ICEKING-192x192.png',
  ...Array.from({ length: 27 }, (_, i) => {
    const n = String(103 + i).padStart(4, '0');
    return `IMG-20250220-WA${n}.jpg`;
  }),
  'B5D4B5BA-1BFF-469C-AB2D-176E8F61D47F.jpg',
  'IMG_4775.jpg',
  'IMG_5166.jpg',
  'IMG_6206.jpg',
  'IMG_7623.jpg',
  'IMG-20250220-WA0011.jpg',
  'IMG-20250220-WA0012.jpg',
  'IMG-20250220-WA0013.jpg',
  'IMG-20250220-WA0024.jpg',
  'IMG-20250220-WA0037.jpg',
  'IMG-20250220-WA0041.jpg',
  'IMG-20250220-WA0047.jpg',
  'IMG-20250220-WA0054.jpg',
  'IMG_8694.jpg',
  'IMG_8508.jpg',
  'IMG_8057.jpg',
  'IMG_7802.jpg',
  'תמונה-של-WhatsApp‏-2025-02-20-בשעה-11.34.27_d6324fcf.jpg',
  'תמונה-של-WhatsApp‏-2025-02-20-בשעה-11.34.04_0fda741c.jpg',
  'תמונה-של-WhatsApp‏-2024-11-21-בשעה-14.03.44_cfb501b7.jpg',
  'תמונה-של-WhatsApp‏-2024-07-18-בשעה-11.03.02_6932c843.jpg',
  'תמונה-של-WhatsApp‏-2024-07-18-בשעה-11.03.04_8c1e4c65.jpg',
];

await mkdir(DEST, { recursive: true });

let copied = 0;
let missing = 0;

for (const file of FILES) {
  const src = join(SRC, file);
  const dest = join(DEST, file);
  try {
    await copyFile(src, dest);
    copied++;
  } catch {
    missing++;
    console.warn(`Missing: ${file}`);
  }
}

console.log(`Media import: ${copied} copied, ${missing} missing → ${DEST}`);
