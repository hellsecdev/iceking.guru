# ICE KING — iceking.guru

Static Hebrew (RTL) landing page for Ice King ice bath experiences. Built with **Astro**, **Tailwind CSS**, and **React** (carousels + contact form).

## Develop

```bash
npm install
npm run import-media   # copies images from WordPress backup (once)
npm run dev
```

Set `WP_UPLOADS` to override the default backup path in `scripts/import-media.mjs`.

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

1. Push to `main` — workflow `.github/workflows/deploy.yml` publishes `dist/`.
2. Repo **Settings → Pages → Build and deployment**: source **GitHub Actions**.
3. Custom domain: `iceking.guru` — `public/CNAME` is included; add DNS records at your registrar.

Commit `public/assets/` after running `import-media` so CI has images.

### Base path

- **Custom domain** (`https://iceking.guru/`): CI builds with `ASTRO_BASE=/` (default).
- **GitHub Project Pages** subpath only: `ASTRO_BASE=/iceking.guru/ npm run build`.

## Stack

- Astro 6 (static)
- Tailwind CSS 4
- Embla Carousel (testimonials + gallery)
- Contact form → WhatsApp deep link
