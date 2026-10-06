import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'replace-me';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  vite: {
    server: {
      watch: {
        // Avoid exhausting macOS native file watchers during local development.
        usePolling: true,
        interval: 500,
      },
    },
  },
});
