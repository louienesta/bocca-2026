import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const token = import.meta.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId);

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-09-10',
      perspective: 'published',
      ...(token ? { token } : {}),
      useCdn: false,
    })
  : null;
