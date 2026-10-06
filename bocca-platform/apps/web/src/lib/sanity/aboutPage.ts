import { sanityClient } from './client';
import { ABOUT_PAGE_QUERY } from './queries';
import type { AboutPage, EmployeeData } from './types';

interface AboutPageQueryResult {
  page: AboutPage | null;
  allEmployees: EmployeeData[];
}

export const fallbackAboutPage: AboutPage = {
  _id: 'aboutPage-fallback',
  heading: 'Mød os',
  introduction:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
  firstStory: {
    heading: 'Vi tror på nærhed.',
    body: 'De bedste løsninger opstår, når strategi og kreativitet arbejder tæt sammen. Derfor begynder vi med at lytte, stille spørgsmål og forstå den virkelighed, vores kunder og deres målgrupper befinder sig i. Det giver plads til idéer, der både kan mærkes og bruges.',
  },
  middleStory: {
    heading: 'Faglighed med personlighed.',
    body: 'Vi er forskellige specialister med én fælles arbejdsform: høj faglighed, ærlig dialog og nysgerrighed gennem hele processen. Hos os møder du de mennesker, der faktisk løser opgaven — fra de første overvejelser til det færdige udtryk.',
  },
  finalStory: {
    heading: 'Sammen gør vi en forskel.',
    body: 'Vi tror ikke på standardløsninger. Vi tror på samarbejder, hvor den rigtige indsigt kan blive til en klar retning — og hvor en stærk idé kan leve på tværs af mennesker, kanaler og tid.',
  },
  friendsBody:
    'På BOCCA arbejder vi sammen. Alt vi producerer er et resultat af mange dygtige menneskers indsatser og indsigter internt på BOCCA. Netop fordi vi ved, at samarbejde styrker os i alt vi skaber, omgiver vi os med gode og dygtige samarbejdspartnere. I indre København bor vi sammen med en række selvstændige fagfolk og firmaer, der alle er eksperter på hver deres felt, men som fællesnævner arbejder med markedsføring og kommunikation – det er dem vi kalder vores FRIENDS. Vi arbejder sammen om opgaver, når det giver mening (det gør det tit) og vi gør brug af hinandens viden og netværk.',
  teamHeading: 'Medarbejdere',
  employees: [],
};

export async function getAboutPage(): Promise<AboutPage> {
  if (!sanityClient) return fallbackAboutPage;

  const result =
    await sanityClient.fetch<AboutPageQueryResult>(ABOUT_PAGE_QUERY);
  const page = result.page;
  const curatedEmployees = page?.employees?.filter(Boolean) || [];

  return {
    ...fallbackAboutPage,
    ...page,
    heading: page?.heading || fallbackAboutPage.heading,
    introduction: page?.introduction || fallbackAboutPage.introduction,
    firstStory: {
      ...fallbackAboutPage.firstStory,
      ...page?.firstStory,
    },
    middleStory: {
      ...fallbackAboutPage.middleStory,
      ...page?.middleStory,
    },
    finalStory: {
      ...fallbackAboutPage.finalStory,
      ...page?.finalStory,
    },
    friendsBody: page?.friendsBody || fallbackAboutPage.friendsBody,
    teamHeading: page?.teamHeading || fallbackAboutPage.teamHeading,
    employees: curatedEmployees.length
      ? curatedEmployees
      : result.allEmployees?.filter(Boolean) || [],
  };
}
