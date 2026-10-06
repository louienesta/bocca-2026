import { sanityClient } from './client';
import { CASES_PAGE_QUERY } from './queries';
import type { CaseCardData, CasesPage } from './types';

interface CasesPageQueryResult {
  page: CasesPage | null;
  allCases: CaseCardData[];
}

export const fallbackCasesPage: CasesPage = {
  _id: 'casesPage-fallback',
  heading: 'Cases',
  introduction:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
  cases: [],
};

export async function getCasesPage(): Promise<CasesPage> {
  if (!sanityClient) return fallbackCasesPage;

  const result =
    await sanityClient.fetch<CasesPageQueryResult>(CASES_PAGE_QUERY);
  const page = result.page;
  const curatedCases = page?.cases?.filter(Boolean) || [];

  return {
    ...fallbackCasesPage,
    ...page,
    heading: page?.heading || fallbackCasesPage.heading,
    introduction: page?.introduction || fallbackCasesPage.introduction,
    cases: curatedCases.length
      ? curatedCases
      : result.allCases?.filter(Boolean) || [],
  };
}
