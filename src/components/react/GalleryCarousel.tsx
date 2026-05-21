import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { galleryAlt } from '../../lib/image-alt';
import ImageLightbox from './ImageLightbox';

type Props = {
  images: readonly string[];
  assetBase: string;
};

function imageSrc(assetBase: string, file: string) {
  return `${assetBase.replace(/\/?$/, '/')}${encodeURI(file)}`;
}

/** ~3 tall slides visible, flush — like original iceking.guru gallery */
const slideClass =
  'min-w-0 flex-[0_0_88%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]';

export default function GalleryCarousel({ images, assetBase }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    direction: 'rtl',
    loop: true,
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
      <div className="gallery-carousel relative mx-auto w-full max-w-6xl px-10 sm:px-12 md:px-14">
        <button
          type="button"
          onClick={scrollNext}
          className="gallery-carousel__arrow absolute right-0 top-1/2 z-20 -translate-y-1/2 border-0 bg-transparent p-0 text-4xl leading-none text-slate-800/75 transition hover:text-slate-900 md:text-5xl"
          aria-label="הבא"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={scrollPrev}
          className="gallery-carousel__arrow absolute left-0 top-1/2 z-20 -translate-y-1/2 border-0 bg-transparent p-0 text-4xl leading-none text-slate-800/75 transition hover:text-slate-900 md:text-5xl"
          aria-label="הקודם"
        >
          ›
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-0">
            {images.map((file, i) => (
              <div key={`${file}-${i}`} className={slideClass}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="block h-full w-full cursor-zoom-in border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-cta"
                  aria-label={`תמונה ${i + 1}`}
                >
                  <img
                    src={imageSrc(assetBase, file)}
                    alt={galleryAlt(i)}
                    className="mx-auto h-[min(52vh,420px)] w-full object-contain object-center sm:h-[min(58vh,460px)] lg:h-[min(62vh,500px)]"
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
          getAlt={galleryAlt}
        />
      )}
    </>
  );
}
