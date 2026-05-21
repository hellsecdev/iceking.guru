const BRAND = 'Ice King';

export function testimonialAlt(index: number): string {
  return `לקוח מרוצה ${index + 1} – ${BRAND} אמבטיית קרח`;
}

export function galleryAlt(index: number): string {
  return `תמונה ${index + 1} – ${BRAND} אמבטיית קרח בחיפה`;
}

export type ImageAltKind = 'testimonial' | 'gallery';

export function imageAltForKind(kind: ImageAltKind, index: number): string {
  return kind === 'testimonial' ? testimonialAlt(index) : galleryAlt(index);
}
