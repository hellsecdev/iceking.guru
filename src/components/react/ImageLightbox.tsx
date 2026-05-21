import { useCallback, useEffect, useState } from 'react';

type Props = {
  images: string[];
  assetBase: string;
  initialIndex: number;
  onClose: () => void;
  getAlt?: (index: number) => string;
};

function imageSrc(assetBase: string, file: string) {
  return `${assetBase.replace(/\/?$/, '/')}${encodeURI(file)}`;
}

export default function ImageLightbox({
  images,
  assetBase,
  initialIndex,
  onClose,
  getAlt,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const total = images.length;

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goPrev();
      if (e.key === 'ArrowLeft') goNext();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext]);

  const file = images[index];
  if (!file) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="תצוגה מוגדלת"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute end-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
        aria-label="סגור"
      >
        ×
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute start-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/15 p-3 text-3xl text-white transition hover:bg-white/25 sm:block md:start-4"
        aria-label="הבא"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute end-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/15 p-3 text-3xl text-white transition hover:bg-white/25 sm:block md:end-4"
        aria-label="הקודם"
      >
        ›
      </button>

      <figure
        className="flex max-h-[92vh] max-w-[min(96vw,56rem)] flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc(assetBase, file)}
          alt={getAlt ? getAlt(index) : ''}
          className="max-h-[82vh] w-auto max-w-full object-contain"
        />
        <figcaption className="text-sm font-medium text-white/80">
          {index + 1} / {total}
        </figcaption>
      </figure>

      <div className="absolute bottom-6 flex gap-3 sm:hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="rounded-full bg-white/15 px-5 py-2.5 text-lg text-white"
        >
          הבא
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="rounded-full bg-white/15 px-5 py-2.5 text-lg text-white"
        >
          הקודם
        </button>
      </div>
    </div>
  );
}
