import { sanityClient } from './client';
import { HOME_PAGE_QUERY } from './queries';
import type { HomePage } from './types';

export const fallbackHomePage: HomePage = {
  _id: 'homePage-fallback',
  hero: {
    heading: 'Lorem ipsum dolor amet',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  clientLogos: [],
  featuredCasesHeading: 'Udvalgte cases',
  featuredCases: [],
  services: {
    heading: 'Services',
    introduction:
      'Vi udfolder potentialet i vores kunders budskaber; skriver ord, skaber billeder og sætter i bevægelse. Kort sagt hjælper vi vores kunder med at definere deres historier, løfte og give dem luft under vingerne.',
    items: [
      {
        heading: 'Sociale medier',
        body: 'På BOCCA skaber vi relevant og engagerende content, der sørger for synlighed for vores kunder. Vi måler på effekten af vores tilstedeværelse, så vi fortsat kan optimere og sikre sammenhængskraft på tværs af platforme.',
      },
      {
        heading: 'Strategi',
        body: 'Med indsigt i medier og målgrupper, starter vores arbejde altid med at udarbejde en klar strategi. Strategi hjælper med at navigere i bl.a. mediebrug og markedstendenser og skabe klar kommunikation med skarpe budskaber. Kort sagt gør strategi vores idéer bedre, så vi kan opnå vores kunders mål.',
      },
      {
        heading: 'Branding',
        body: 'Vores samtid er et tag-selv-bord af muligheder, derfor skal brands have værdi, så vores kunders kunder forbliver loyale. På BOCCA bringer vi brands til live, så de kan opleves gennem alle dine sanser: Vi gør dit brand distinkt og til det mest indbydende på hele buffeten.',
      },
      {
        heading: 'Koncept og kampagner',
        body: 'Når vi udvikler koncepter og kampagner, omsætter vi strategi og indsigter til kreative løsninger. Om budskabet er inspirerende, lærerigt eller tankevækkende stræber vi altid efter at skabe et holdbart og stærkt engagement vores kunder og deres kunder imellem.',
      },
      {
        heading: 'Film og animation',
        body: 'På BOCCA udvikler og skaber vi alt fra de helt korte film og animationer til sociale medier til dem, du oplever på flow-TV og i biografen. Vi filmer i fugle, frø og folk-perspektiv og kun fantasien sætter grænser, når virkeligheden skal animeres.',
        linkLabel: 'Se BOCCA Film',
        linkUrl: 'https://film.bocca.dk/',
      },
      {
        heading: 'Grafisk produktion – tryk og web',
        body: 'Vores erfarne tegnestue er en af grundstenene i vores inhouse produktion, der altid sørger for en kreativ, sikker og smidig proces i vores arbejde.',
      },
      {
        heading: 'Digitale løsninger',
        body: 'En digital verden kalder på digitale løsninger. Vi udvikler, optimerer og producerer alt fra digitale strategier til landing pages, websites og UX design, der sikrer den gode brugeroplevelse.',
      },
    ],
  },
};

export async function getHomePage(): Promise<HomePage> {
  if (!sanityClient) return fallbackHomePage;

  const page = await sanityClient.fetch<HomePage | null>(HOME_PAGE_QUERY);

  if (!page?.hero?.heading || !page.hero.body) return fallbackHomePage;

  return {
    ...page,
    clientLogos:
      page.clientLogos?.filter(
        (logo) => logo?.name?.trim() && logo.image?.asset?.url,
      ) || [],
    featuredCasesHeading:
      page.featuredCasesHeading || fallbackHomePage.featuredCasesHeading,
    featuredCases: page.featuredCases?.filter(Boolean) || [],
    services: {
      heading: page.services?.heading || fallbackHomePage.services.heading,
      introduction:
        page.services?.introduction || fallbackHomePage.services.introduction,
      items: page.services?.items?.filter((item) => item?.heading && item?.body)
        .length
        ? page.services.items.filter((item) => item?.heading && item?.body)
        : fallbackHomePage.services.items,
    },
  };
}
