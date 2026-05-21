// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

/**
 * Production (custom domain): ASTRO_BASE=/ (set in CI).
 * Project Pages subpath only: ASTRO_BASE=/iceking.guru/ npm run build
 */
const base = process.env.ASTRO_BASE ?? '/';

export default defineConfig({
  site: 'https://iceking.guru',
  base,
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
