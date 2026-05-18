import { useState } from 'react';
import ImageLightbox from './ImageLightbox';

type Props = {
  images: readonly string[];
  assetBase: string;
};

function imageSrc(assetBase: string, file: string) {
  return `${assetBase.replace(/\/?$/, '/')}${encodeURI(file)}`;
}

export default function PhotoGallery({ images, assetBase }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="gallery-grid grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((file, index) => (
          <li key={file}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="gallery-grid__item group relative block w-full overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-cta"
              aria-label={`הגדל תמונה ${index + 1} מתוך ${images.length}`}
            >
              <span className="block aspect-square w-full bg-ice-50">
                <img
                  src={imageSrc(assetBase, file)}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

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
