// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

/**
 * GitHub Project Pages: https://hellsecdev.github.io/iceking.guru/
 * Custom domain iceking.guru: set ASTRO_BASE=/ in CI or .env
 */
const base = process.env.ASTRO_BASE ?? '/iceking.guru/';

export default defineConfig({
  site: 'https://iceking.guru',
  base,
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
