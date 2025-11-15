import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx(),
    tailwind({
      // Disable injecting base styles since we have custom CSS
      applyBaseStyles: false,
    }),
  ],
  vite: {
    css: {
      postcss: './postcss.config.js',
    },
  },
});
