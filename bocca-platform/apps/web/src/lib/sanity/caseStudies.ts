import { sanityClient } from './client';
import { CASE_STUDIES_QUERY } from './queries';
import type { CaseStudyData } from './types';

export async function getCaseStudies(): Promise<CaseStudyData[]> {
  if (!sanityClient) return [];

  const cases = await sanityClient.fetch<CaseStudyData[]>(CASE_STUDIES_QUERY);
  return cases?.filter((caseStudy) => caseStudy.slug) || [];
}
