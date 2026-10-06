// @ts-check
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  integrations: projectId
    ? [
        sanity({
          projectId,
          dataset,
          apiVersion: '2026-09-10',
          useCdn: false,
        }),
      ]
    : [],
  vite: {
    plugins: [tailwindcss()],
  },
});
