import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import ImageLightbox from './ImageLightbox';

type Props = {
  images: readonly string[];
  assetBase: string;
};

function imageSrc(assetBase: string, file: string) {
  return `${assetBase.replace(/\/?$/, '/')}${encodeURI(file)}`;
}

export default function GalleryCarousel({ images, assetBase }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    direction: 'rtl',
    loop: true,
    dragFree: true,
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, images.length]);

  return (
    <>
      <div className="gallery-carousel relative w-full">
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-2 text-2xl text-ice-400 shadow-md transition hover:bg-white sm:right-2"
          aria-label="הבא"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-2 text-2xl text-ice-400 shadow-md transition hover:bg-white sm:left-2"
          aria-label="הקודם"
        >
          ›
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-0">
            {images.map((file, i) => (
              <div
                key={`${file}-${i}`}
                className="min-w-0 flex-[0_0_33.333%] sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_16.666%] xl:flex-[0_0_14.285%]"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="block w-full cursor-zoom-in border-0 bg-ice-50 p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ice-cta"
                  aria-label={`תמונה ${i + 1}`}
                >
                  <img
                    src={imageSrc(assetBase, file)}
                    alt=""
                    className="aspect-square h-auto w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={[...images]}
          assetBase={assetBase}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
