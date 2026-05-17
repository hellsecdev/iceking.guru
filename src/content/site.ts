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
  heroVideoBg: 'IYs32Vpi4RQ',
  heroVideoMain: 'pVeazlIFJGU',
  social: {
    email: 'mailto:Artium07@gmail.com',
    tiktok:
      'https://www.tiktok.com/@ice_king_by_boikov?_t=ZS-8uY6wp0AZ6u&_r=1',
    instagram: 'https://www.instagram.com/icekingil?igsh=MjZ3eTJzeG5pdzAw',
    facebook: 'https://www.facebook.com/share/1A1tXe8ex6/?mibextid=wwXIfr',
  },
  footerCredit: {
    text: 'Forged with 🧊 by HellSec',
    url: 'https://hellsec.dev',
  },
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function asset(path: string) {
  return `/assets/${path}`;
}
