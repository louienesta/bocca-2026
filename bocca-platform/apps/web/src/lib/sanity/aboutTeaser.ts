import { sanityClient } from './client';
import { ABOUT_TEASER_QUERY } from './queries';
import type { AboutTeaserData } from './types';

export const fallbackAboutTeaser: AboutTeaserData = {
  heading: 'Mød BOCCA',
  body: 'Vi er et kreativt bureau, der kombinerer strategi, design og nysgerrighed for at skabe kommunikation med retning.',
  buttonLabel: 'Mød os',
};

export async function getAboutTeaser(): Promise<AboutTeaserData> {
  if (!sanityClient) return fallbackAboutTeaser;

  const teaser = await sanityClient.fetch<AboutTeaserData | null>(
    ABOUT_TEASER_QUERY,
  );

  return {
    heading: teaser?.heading || fallbackAboutTeaser.heading,
    body: teaser?.body || fallbackAboutTeaser.body,
    buttonLabel: teaser?.buttonLabel || fallbackAboutTeaser.buttonLabel,
    leftMedia: teaser?.leftMedia ?? null,
    rightMedia: teaser?.rightMedia ?? null,
  };
}
