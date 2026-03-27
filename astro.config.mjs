import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://1421582341.github.io',
  base: '/learn-note/',
  trailingSlash: 'always', // 强制末尾带斜杠，避免 404
  integrations: [mdx(), sitemap(), tailwind()],
});
