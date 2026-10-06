import { daDKLocale } from '@sanity/locale-da-dk';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './src/schemaTypes';
import { structure } from './src/structure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'replace-me';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const singletonTypes = new Set(['homePage', 'casesPage', 'siteSettings']);
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: 'BOCCA',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool(),
    daDKLocale({ title: 'Dansk' }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previousActions, context) =>
      singletonTypes.has(context.schemaType)
        ? previousActions.filter(
            ({ action }) => action && singletonActions.has(action),
          )
        : previousActions,
    newDocumentOptions: (previousOptions, context) =>
      context.creationContext.type === 'global'
        ? previousOptions.filter(
            ({ templateId }) => !singletonTypes.has(templateId),
          )
        : previousOptions,
  },
});
