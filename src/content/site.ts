export const site = {
  name: 'ICE KING',
  title: 'ICEKING 🧊 אמבטיות קרח',
  description:
    'גלו את הכוח שבקור – חוויית אמבטיות הקרח המובילה בישראל לבריאות, אנרגיה והתחדשות',
  location: 'חיפה',
  phone: '054-3319843',
  phoneTel: '0543319843',
  whatsapp: '972543319843',
  email: 'Artium07@gmail.com',
  seo: {
    title: 'אמבטיות קרח בחיפה | Ice King',
    description:
      'אמבטיות קרח מקצועיות בחיפה – סדנאות קבוצתיות, זוגיות וטבילת יחיד. שיטת Wim Hof, התאוששות, אנרגיה וחוסן מנטלי. Ice King.',
    ogImage: 'promo-course.png',
    ogImageAlt: 'מבצע ייחודי לקורס מדריכי אמבטיות קרח – Ice King',
    themeColor: '#d8f5fd',
  },
  /** Верх: intro лёд (self-hosted) */
  heroIntroVideo: 'video/ice-logo-intro.mp4',
  /** HERO: три кадра (self-hosted) */
  heroMainVideo: 'video/hero-section.mp4',
  social: {
    email: 'mailto:Artium07@gmail.com',
    tiktok:
      'https://www.tiktok.com/@ice_king_by_boikov?_t=ZS-8uY6wp0AZ6u&_r=1',
    instagram: 'https://www.instagram.com/icekingil?igsh=MjZ3eTJzeG5pdzAw',
    facebook: 'https://www.facebook.com/share/1A1tXe8ex6/?mibextid=wwXIfr',
  },
  footerCredit: {
    prefix: 'Developed with',
    middle: 'by',
    brand: 'HellSec',
    logo: 'hellsec-logo.png',
    url: 'https://hellsec.dev',
  },
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Respects Astro `base` (GitHub Project Pages vs custom domain). */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, '');
  return `${base}assets/${clean}`;
}

/** Absolute URL for OG / JSON-LD (requires `site` in astro.config). */
export function absoluteAsset(path: string, siteOrigin: string | URL) {
  return new URL(asset(path), siteOrigin).href;
}
