function src(assetBase: string, file: string) {
  return `${assetBase.replace(/\/?$/, '/')}${encodeURI(file)}`;
}

export function initGalleryLightbox(images: string[], assetBase: string) {
  const root = document.getElementById('photo-gallery');
  if (!root || !images.length) return;

  let index = 0;
  let overlay: HTMLDivElement | null = null;
  let onKey: ((e: KeyboardEvent) => void) | null = null;

  const close = () => {
    if (onKey) {
      document.removeEventListener('keydown', onKey);
      onKey = null;
    }
    overlay?.remove();
    overlay = null;
    document.body.style.overflow = '';
  };

  const render = () => {
    if (!overlay) return;
    const file = images[index];
    const img = overlay.querySelector<HTMLImageElement>('[data-lightbox-img]');
    const counter = overlay.querySelector<HTMLElement>('[data-lightbox-counter]');
    if (img && file) img.src = src(assetBase, file);
    if (counter) counter.textContent = `${index + 1} / ${images.length}`;
  };

  const go = (delta: number) => {
    index = (index + delta + images.length) % images.length;
    render();
  };

  const open = (i: number) => {
    index = i;
    document.body.style.overflow = 'hidden';

    overlay = document.createElement('div');
    overlay.className =
      'gallery-lightbox fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <button type="button" data-lightbox-close class="absolute end-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white" aria-label="סגור">×</button>
      <button type="button" data-lightbox-prev class="absolute start-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 px-3 py-3 text-3xl text-white sm:start-4" aria-label="הקודם">‹</button>
      <button type="button" data-lightbox-next class="absolute end-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 px-3 py-3 text-3xl text-white sm:end-4" aria-label="הבא">›</button>
      <figure class="flex max-h-[92vh] max-w-[min(96vw,56rem)] flex-col items-center gap-4" data-lightbox-figure>
        <img data-lightbox-img alt="" class="max-h-[82vh] w-auto max-w-full object-contain" />
        <figcaption data-lightbox-counter class="text-sm font-medium text-white/80"></figcaption>
      </figure>
    `;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelector('[data-lightbox-close]')?.addEventListener('click', close);
    overlay.querySelector('[data-lightbox-prev]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      go(-1);
    });
    overlay.querySelector('[data-lightbox-next]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      go(1);
    });
    overlay.querySelector('[data-lightbox-figure]')?.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    onKey = (e: KeyboardEvent) => {
      if (!overlay) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(1);
      if (e.key === 'ArrowRight') go(-1);
    };
    document.addEventListener('keydown', onKey);

    document.body.appendChild(overlay);
    render();
  };

  root.querySelectorAll<HTMLButtonElement>('[data-gallery-index]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.galleryIndex);
      if (!Number.isNaN(i)) open(i);
    });
  });
}
