import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC =
  process.env.WP_UPLOADS ??
  '/home/d371l/Desktop/AEMO-379_iceking.guru_2026-05-16_20-49-53./public_html/wp-content/uploads/2025/03';
const DEST = join(ROOT, 'public/assets');

/** Same order as src/content/media.ts galleryImages */
const GALLERY_FILES = [
  'B5D4B5BA-1BFF-469C-AB2D-176E8F61D47F.jpg',
  'IMG_4775.jpg',
  'IMG_5166.jpg',
  'IMG_6206.jpg',
  'IMG_7623.jpg',
  'IMG-20250220-WA0011.jpg',
  'IMG-20250220-WA0012.jpg',
  'IMG-20250220-WA0013.jpg',
  'IMG-20250220-WA0014.jpg',
  'IMG-20250220-WA0015.jpg',
  'IMG-20250220-WA0016.jpg',
  'IMG-20250220-WA0024.jpg',
  'IMG-20250220-WA0026.jpg',
  'IMG-20250220-WA0029.jpg',
  'IMG-20250220-WA0030.jpg',
  'IMG-20250220-WA0054.jpg',
  'IMG-20250220-WA0046.jpg',
  'IMG-20250220-WA0045.jpg',
  'IMG-20250220-WA0043.jpg',
  'IMG-20250220-WA0042.jpg',
  'IMG-20250220-WA0041.jpg',
  'IMG-20250220-WA0040.jpg',
  'IMG-20250220-WA0032.jpg',
  'IMG-20250220-WA0031.jpg',
  'IMG-20250220-WA0055.jpg',
  'IMG-20250220-WA0056.jpg',
  'IMG-20250220-WA0057.jpg',
  'IMG-20250220-WA0058.jpg',
  'IMG-20250220-WA0059.jpg',
  'IMG-20250220-WA0068.jpg',
  'IMG-20250220-WA0067.jpg',
  'IMG-20250220-WA0069.jpg',
  'IMG-20250220-WA0070.jpg',
  'IMG-20250220-WA0009.jpg',
  'IMG-20250220-WA0008.jpg',
  'IMG_8694.jpg',
  'IMG_8508.jpg',
  'IMG_8057.jpg',
  'IMG_7802.jpg',
  'תמונה-של-WhatsApp‏-2025-02-20-בשעה-11.34.27_d6324fcf.jpg',
  'IMG-20250220-WA0072.jpg',
  'IMG-20250220-WA0071.jpg',
  'IMG-20250220-WA0010.jpg',
  'IMG-20250220-WA0017.jpg',
  'IMG-20250220-WA0018.jpg',
  'IMG-20250220-WA0020.jpg',
  'IMG-20250220-WA0019.jpg',
  'IMG-20250220-WA0021.jpg',
  'IMG-20250220-WA0022.jpg',
  'IMG-20250220-WA0033.jpg',
  'IMG-20250220-WA0023.jpg',
  'IMG-20250220-WA0048.jpg',
  'IMG-20250220-WA0049.jpg',
  'IMG-20250220-WA0047.jpg',
  'IMG-20250220-WA0039.jpg',
  'IMG-20250220-WA0038.jpg',
  'IMG-20250220-WA0037.jpg',
  'IMG-20250220-WA0036.jpg',
  'IMG-20250220-WA0035.jpg',
  'IMG-20250220-WA0034.jpg',
  'IMG-20250220-WA0050.jpg',
  'IMG-20250220-WA0051.jpg',
  'IMG-20250220-WA0052.jpg',
  'IMG-20250220-WA0053.jpg',
  'IMG-20250220-WA0060.jpg',
  'IMG-20250220-WA0061.jpg',
  'IMG-20250220-WA0062.jpg',
  'IMG-20250220-WA0063.jpg',
  'IMG-20250220-WA0064.jpg',
  'תמונה-של-WhatsApp‏-2025-02-20-בשעה-11.34.04_0fda741c.jpg',
  'תמונה-של-WhatsApp‏-2024-11-21-בשעה-14.03.44_cfb501b7.jpg',
  'תמונה-של-WhatsApp‏-2024-07-18-בשעה-11.03.04_8c1e4c65.jpg',
  'תמונה-של-WhatsApp‏-2024-07-18-בשעה-11.03.02_6932c843.jpg',
  'IMG-20250220-WA0076.jpg',
  'IMG-20250220-WA0075.jpg',
  'IMG-20250220-WA0073.jpg',
  'IMG-20250220-WA0066.jpg',
  'IMG-20250220-WA0065.jpg',
];

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
  ...GALLERY_FILES,
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
