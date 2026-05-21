# ICE KING — iceking.guru

Official marketing site for **Ice King** — professional ice bath experiences, Wim Hof–style workshops, and individual sessions in **Haifa, Israel**.

| | |
|---|---|
| **Live site** | https://iceking.guru/ |
| **Stack** | Astro 6 · Tailwind CSS 4 · React 19 |
| **Language** | Hebrew (RTL), single page |
| **Hosting** | GitHub Pages + custom domain |

---

## What’s on the site

One long landing page (`src/pages/index.astro`) with sections:

1. **Hero video** — intro clip (React, client-only)
2. **Hero** — headline, benefits, main video, header (phone, WhatsApp, social, logo)
3. **Testimonials** — 27-photo carousel + lightbox
4. **About** — biography (Artium Boikov)
5. **Services** — four offerings with images and copy
6. **Promo** — course banner image
7. **FAQ** — six questions (accordion + FAQ schema)
8. **Gallery** — 78 photos, RTL carousel + lightbox
9. **Contact** — form opens WhatsApp with prefilled message
10. **Footer** — NAP (name/address/phone), HellSec credit

Interactions: loading screen, scroll reveal, Embla carousels, image lightboxes.

---

## Requirements

- **Node.js** ≥ 22.12 (see `engines` in `package.json`)
- **npm** (lockfile: `package-lock.json`)

---

## Getting started

### 1. Clone and install

```bash
git clone <repo-url>
cd iceking.guru
npm install
```

### 2. Media assets

Images and videos are **not** generated in CI from WordPress. They must exist under `public/assets/` (usually committed after import).

```bash
npm run import-media
```

This copies files listed in [`scripts/import-media.mjs`](scripts/import-media.mjs) from a WordPress uploads folder into `public/assets/`.

**Custom source path:**

```bash
WP_UPLOADS=/path/to/wp-content/uploads/2025/03 npm run import-media
```

Default path is in the script (local backup path). After import, commit new/changed files under `public/assets/` if you want them on production.

**Lists to keep in sync:**

| Content | Code | Import script |
|---------|------|----------------|
| Gallery (78 files, order) | [`src/content/media.ts`](src/content/media.ts) `galleryImages` | `GALLERY_FILES` |
| Testimonials (27) | `media.ts` `testimonialImages` | `FILES` array (WA0103–0129) |

### 3. Development server

```bash
npm run dev
```

Open http://localhost:4321 — hot reload for Astro/React/CSS.

---

## Build and preview

```bash
npm run build    # output → dist/
npm run preview  # serve dist/ locally
```

Production build also generates **sitemap** files (`sitemap-index.xml`, `sitemap-0.xml`). See [docs/SEO.md](docs/SEO.md).

### Base path (`ASTRO_BASE`)

| Deployment | Value | Where |
|------------|-------|--------|
| **iceking.guru** (production) | `/` | Default in [`astro.config.mjs`](astro.config.mjs) and [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) |
| GitHub Project Pages subpath | `/iceking.guru/` | `ASTRO_BASE=/iceking.guru/ npm run build` |

`site` in `astro.config.mjs` must remain `https://iceking.guru` for canonical URLs, sitemap, and Open Graph.

---

## Deployment (GitHub Pages)

### CI/CD

Push to **`main`** triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `npm ci`
2. `npm run build` with `ASTRO_BASE=/`
3. Upload `dist/` to GitHub Pages

Manual run: **Actions → Deploy to GitHub Pages → Run workflow**.

### One-time GitHub setup

1. **Settings → Pages → Build and deployment** → Source: **GitHub Actions**
2. **Custom domain:** `iceking.guru` (file [`public/CNAME`](public/CNAME) is deployed automatically)
3. DNS at registrar: apex records for GitHub Pages ([documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))
4. Enable **Enforce HTTPS**

### Pre-push checklist

- [ ] `public/assets/` contains all images/videos used on the site
- [ ] `npm run build` succeeds locally
- [ ] SEO/media changes reflected in `media.ts` and `import-media.mjs` if needed

### After deploy

- https://iceking.guru/
- https://iceking.guru/sitemap-index.xml
- https://iceking.guru/robots.txt

---

## Project layout

```
iceking.guru/
├── public/
│   ├── assets/              # images, promo-course.png, video/*.mp4
│   ├── CNAME                # iceking.guru
│   └── robots.txt
├── src/
│   ├── pages/
│   │   └── index.astro      # page shell + section order
│   ├── layouts/
│   │   └── Layout.astro     # HTML head, SEO meta, loader wrapper
│   ├── content/             # copy & data (TypeScript)
│   │   ├── site.ts          # brand, contact, social, seo.*
│   │   ├── sections.ts      # hero, about, gallery, contact titles
│   │   ├── services.ts
│   │   ├── faq.ts
│   │   └── media.ts         # gallery + testimonial filenames
│   ├── components/
│   │   ├── sections/        # *.astro section blocks
│   │   ├── react/           # carousels, FAQ, form, hero video
│   │   ├── seo/JsonLd.astro
│   │   └── ui/              # waves, loader, social icons
│   ├── lib/image-alt.ts
│   ├── scripts/site-init.ts
│   └── styles/global.css
├── scripts/import-media.mjs
├── docs/
│   └── SEO.md               # SEO architecture & checklist
├── astro.config.mjs
└── .github/workflows/deploy.yml
```

---

## Editing content

All user-facing Hebrew copy is centralized in `src/content/` (no CMS).

| Change | File |
|--------|------|
| Site name, phone, email, WhatsApp, social links | [`src/content/site.ts`](src/content/site.ts) |
| SEO title, meta description, share image | `site.ts` → `seo` (details: [docs/SEO.md](docs/SEO.md)) |
| Hero headline, benefits, welcome text | [`src/content/sections.ts`](src/content/sections.ts) `intro` |
| About text | `sections.ts` `about.paragraphs` |
| Section headings | `sections.ts` (testimonials, gallery, FAQ, contact, …) |
| Service titles & descriptions | [`src/content/services.ts`](src/content/services.ts) |
| FAQ questions/answers | [`src/content/faq.ts`](src/content/faq.ts) |
| Gallery images & order | [`src/content/media.ts`](src/content/media.ts) + import script |

**Images in sections** are referenced by filename (e.g. `ICEKING-3.png`) and resolved via `asset()` from `site.ts`.

**React islands** (hydration):

| Component | Client directive | Section |
|-----------|------------------|---------|
| `HeroVideoIntro` | `client:only` | Hero video top |
| `ImageCarousel` | `client:visible` | Testimonials |
| `GalleryCarousel` | `client:load` | Gallery |
| `FaqAccordion` | `client:visible` | FAQ |
| `ContactForm` | `client:load` | Contact |

---

## SEO

SEO is built into the static HTML (sitemap, meta tags, JSON-LD, image alt text, footer NAP).

**Full guide:** [docs/SEO.md](docs/SEO.md) — configuration, structured data, verification checklist, common edits.

Short summary:

- `@astrojs/sitemap` + [`public/robots.txt`](public/robots.txt)
- Meta / OG / Twitter in `Layout.astro`
- `LocalBusiness` + `FAQPage` in `JsonLd.astro`
- Carousel alts via `image-alt.ts`

---

## npm scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server (Astro) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run import-media` | Copy media from WP backup to `public/assets/` |
| `npm run astro` | Astro CLI passthrough |

---

## Tech stack

| Package | Role |
|---------|------|
| [Astro](https://astro.build/) 6 | Static site generator |
| [Tailwind CSS](https://tailwindcss.com/) 4 | Styling (`@tailwindcss/vite`) |
| [React](https://react.dev/) 19 | Interactive islands |
| [Embla Carousel](https://www.embla-carousel.com/) | Testimonials & gallery |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | XML sitemap |
| [@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/) | React integration |

Contact form does not POST to a server — it builds a [WhatsApp](https://wa.me/) link (`site.whatsapp` in `site.ts`).

---

## Troubleshooting

| Problem | Likely cause |
|---------|----------------|
| Images 404 on production | Files missing from `public/assets/` or not committed; run `import-media` |
| Wrong asset URLs (`/iceking.guru/assets/...`) | Built with wrong `ASTRO_BASE`; production must use `/` |
| Sitemap 404 | Build without `@astrojs/sitemap` or old deploy |
| FAQ schema errors | `faq.ts` out of sync with UI text |
| Share preview without image | Cache; rescrape in Facebook Debugger; check `site.seo.ogImage` exists in `public/assets/` |

---

## License & credits

Site content © Ice King. Footer: [HellSec](https://hellsec.dev).
