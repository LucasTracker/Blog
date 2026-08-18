import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';
import localCreate from './src/integrations/local-create';

// Separate CI detection from production/local intent.
// isProdBuild = true only when explicitly running a CI/CD pipeline.
const isCiBuild = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://lucastracker.github.io',
  base: '/Blog',
  ...(isCiBuild
    ? {
        // Production (GitHub Actions): static SSG output, no adapter needed.
        output: 'static',
        integrations: [react(), mdx()],
      }
    : {
        // Local development: server output with Node adapter for Keystatic Admin API.
        // Note: 'hybrid' was removed in Astro 7 — use 'server' with per-page prerender exports.
        output: 'server',
        adapter: node({ mode: 'standalone' }),
        integrations: [react(), mdx(), keystatic(), localCreate()],
      })
});
