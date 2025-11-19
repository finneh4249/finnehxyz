import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { agentsSummary } from '@nuasite/agent-summary'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx(),
    tailwind({
      // Disable injecting base styles since we have custom CSS
      applyBaseStyles: false,
    }),
    agentsSummary(),
  ],
  vite: {
    css: {
      postcss: './postcss.config.js',
    },
  },
});
