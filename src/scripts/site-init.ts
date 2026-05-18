const LOADER_ID = 'site-loader';
const MIN_MS = 750;
const MAX_WAIT_MS = 8000;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function waitForLoad(): Promise<void> {
  if (document.readyState === 'complete') {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

function waitForFonts(): Promise<void> {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(() => undefined).catch(() => undefined);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dismissLoader(): Promise<void> {
  const loader = document.getElementById(LOADER_ID);
  if (!loader) {
    document.body.classList.remove('is-loading');
    document.body.classList.add('site-ready');
    return;
  }

  const reduced = prefersReducedMotion();
  loader.classList.add('site-loader--exit');

  await delay(reduced ? 80 : 520);

  loader.setAttribute('aria-busy', 'false');
  loader.remove();
  document.body.classList.remove('is-loading');
  document.body.classList.add('site-ready');
}

function tagSectionReveals(): void {
  const sections = document.querySelectorAll<HTMLElement>('main > section');
  let index = 0;
  sections.forEach((section) => {
    if (section.id === 'hero') return;
    section.setAttribute('data-reveal', '');
    section.style.setProperty('--reveal-delay', `${Math.min(index * 0.06, 0.24)}s`);
    index += 1;
  });

  const footer = document.querySelector<HTMLElement>('main footer');
  if (footer && !footer.hasAttribute('data-reveal')) {
    footer.setAttribute('data-reveal', 'fade');
    footer.style.setProperty('--reveal-delay', '0.1s');
  }
}

function initScrollReveal(): void {
  if (prefersReducedMotion()) {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
}

async function boot(): Promise<void> {
  tagSectionReveals();

  if (prefersReducedMotion()) {
    const loader = document.getElementById(LOADER_ID);
    loader?.remove();
    document.body.classList.remove('is-loading');
    document.body.classList.add('site-ready');
    initScrollReveal();
    return;
  }

  const started = performance.now();

  const loadRace = Promise.race([
    Promise.all([waitForLoad(), waitForFonts()]),
    delay(MAX_WAIT_MS),
  ]);

  await loadRace;

  const elapsed = performance.now() - started;
  if (!prefersReducedMotion() && elapsed < MIN_MS) {
    await delay(MIN_MS - elapsed);
  }

  await dismissLoader();
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => void boot(), { once: true });
} else {
  void boot();
}
