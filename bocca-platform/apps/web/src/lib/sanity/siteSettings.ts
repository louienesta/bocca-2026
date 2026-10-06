import { sanityClient } from './client';
import { SITE_SETTINGS_QUERY } from './queries';
import type { SiteSettings } from './types';

export const fallbackSiteSettings: SiteSettings = {
  _id: 'siteSettings-fallback',
  siteName: 'BOCCA',
  legalName: 'BOCCA',
  siteUrl: 'https://bocca.dk',
  headerPrimaryLink: {
    label: 'Cases',
    linkType: 'internal',
    href: '/cases/',
    openInNewTab: false,
  },
  headerSecondaryLinks: [
    {
      label: 'Mød os',
      linkType: 'internal',
      href: '/moed-bocca/',
      openInNewTab: false,
    },
    {
      label: 'Kontakt',
      linkType: 'contact',
      href: '#site-footer',
      openInNewTab: false,
    },
  ],
  footerNavigation: [
    {
      label: 'Cookiepolitik',
      linkType: 'internal',
      href: '/cookiepolitik/',
      openInNewTab: false,
    },
    {
      label: 'Privatlivspolitik',
      linkType: 'internal',
      href: '/privatlivspolitik-bocca/',
      openInNewTab: false,
    },
  ],
  footerHeading: 'Lad os tage en snak',
  caseContactHeading: 'Har du en lignende opgave?\nLad os tage en snak.',
  email: 'hello@bocca.dk',
  phone: '33 11 13 00',
  address: {
    street: 'Borgergade 2, 6. sal',
    postalCode: '1300',
    city: 'København K',
    country: 'Danmark',
  },
  socialLinks: [],
  defaultSeo: {
    metaTitle: 'BOCCA — kreativt bureau',
    metaDescription:
      'BOCCA er et kreativt bureau, der kombinerer strategi, design og nysgerrighed for at skabe kommunikation med retning.',
  },
};

function withFallbacks(settings: SiteSettings | null): SiteSettings {
  if (!settings) return fallbackSiteSettings;

  return {
    ...fallbackSiteSettings,
    ...settings,
    caseContactHeading:
      settings.caseContactHeading || fallbackSiteSettings.caseContactHeading,
    headerPrimaryLink:
      settings.headerPrimaryLink ?? fallbackSiteSettings.headerPrimaryLink,
    headerSecondaryLinks: settings.headerSecondaryLinks?.length
      ? settings.headerSecondaryLinks
      : fallbackSiteSettings.headerSecondaryLinks,
    footerNavigation: settings.footerNavigation?.length
      ? settings.footerNavigation
      : fallbackSiteSettings.footerNavigation,
    address: settings.address ?? fallbackSiteSettings.address,
    socialLinks: settings.socialLinks ?? fallbackSiteSettings.socialLinks,
    defaultSeo: settings.defaultSeo ?? fallbackSiteSettings.defaultSeo,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) return fallbackSiteSettings;

  const settings = await sanityClient.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
  );

  return withFallbacks(settings);
}
