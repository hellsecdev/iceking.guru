import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  images: string[];
  assetBase?: string;
  slidesToShow?: number;
  showFraction?: boolean;
};

export default function ImageCarousel({
  images,
  assetBase = 'assets',
  slidesToShow = 1,
  showFraction = false,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    direction: 'rtl',
    loop: true,
  });
  const [index, setIndex] = useState(0);

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
      ? 'min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]'
      : 'min-w-0 flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_55%] lg:flex-[0_0_45%]';

  return (
    <div className="relative mx-auto w-full max-w-5xl px-10">
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

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {images.map((file) => (
            <div key={file} className={`${basis} pl-2`}>
              <img
                src={`${assetBase.replace(/\/?$/, '/')}${encodeURI(file)}`}
                alt=""
                className="mx-auto max-h-[420px] w-full rounded-xl object-contain shadow-lg"
                loading="lazy"
              />
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
  );
}
