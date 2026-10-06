const required = ['PUBLIC_SANITY_PROJECT_ID', 'PUBLIC_SANITY_DATASET'];
const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  throw new Error(`Missing Netlify build variables: ${missing.join(', ')}`);
}

if (!['staging', 'production'].includes(process.env.PUBLIC_SITE_ENV)) {
  throw new Error(
    'PUBLIC_SITE_ENV must be set to staging or production in the Netlify build environment.',
  );
}
