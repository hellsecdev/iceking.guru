import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { imageAltForKind, type ImageAltKind } from '../../lib/image-alt';
import ImageLightbox from './ImageLightbox';

type Props = {
  images: string[];
  assetBase?: string;
  slidesToShow?: number;
  showFraction?: boolean;
  lightbox?: boolean;
  /** Max height of carousel thumbnails (px via Tailwind) */
  imageMaxHeight?: 'sm' | 'md' | 'lg';
  altKind?: ImageAltKind;
};

const heightClass = {
  sm: 'max-h-[280px]',
  md: 'max-h-[320px]',
  lg: 'max-h-[420px]',
} as const;

function imageSrc(assetBase: string, file: string) {
  return `${assetBase.replace(/\/?$/, '/')}${encodeURI(file)}`;
}

export default function ImageCarousel({
  images,
  assetBase = 'assets',
  slidesToShow = 1,
  showFraction = false,
  lightbox = false,
  imageMaxHeight = 'md',
  altKind = 'gallery',
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    direction: 'rtl',
    loop: true,
  });
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const basis =
    slidesToShow === 3
      ? 'min-w-0 flex-[0_0_72%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]'
      : 'min-w-0 flex-[0_0_78%] sm:flex-[0_0_58%] md:flex-[0_0_48%] lg:flex-[0_0_38%]';

  const maxH = heightClass[imageMaxHeight];

  const openLightbox = (slideIndex: number) => {
    if (!lightbox) return;
    setLightboxIndex(slideIndex);
  };

  return (
    <>
      <div className="site-wrap relative w-full">
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-2xl shadow-md transition hover:bg-white"
          aria-label="הבא"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-2xl shadow-md transition hover:bg-white"
          aria-label="הקודם"
        >
          ›
        </button>

        <div className="overflow-hidden px-8 sm:px-10" ref={emblaRef}>
          <div className="flex touch-pan-y gap-3 md:gap-4">
            {images.map((file, i) => (
              <div key={file} className={`${basis} pl-1`}>
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  disabled={!lightbox}
                  className={
                    lightbox
                      ? 'block w-full cursor-zoom-in rounded-xl transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-cta'
                      : 'block w-full'
                  }
                  aria-label={lightbox ? 'הגדל תמונה' : undefined}
                >
                  <img
                    src={imageSrc(assetBase, file)}
                    alt={imageAltForKind(altKind, i)}
                    className={`mx-auto w-full rounded-xl object-contain shadow-md ${maxH} ${lightbox ? '' : 'pointer-events-none'}`}
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {showFraction && (
          <p className="mt-4 text-center text-sm font-medium text-ice-300">
            {index + 1} / {images.length}
          </p>
        )}
      </div>

      {lightbox && lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          assetBase={assetBase}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          getAlt={(i) => imageAltForKind(altKind, i)}
        />
      )}
    </>
  );
}
