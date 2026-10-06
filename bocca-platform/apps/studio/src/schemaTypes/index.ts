import type { SchemaTypeDefinition } from 'sanity';

import { aboutPage } from './documents/aboutPage';
import { caseStudy } from './documents/caseStudy';
import { casesPage } from './documents/casesPage';
import { employee } from './documents/employee';
import { homePage } from './documents/homePage';
import { siteSettings } from './documents/siteSettings';
import { address } from './objects/address';
import { caseMediaEditorial } from './objects/caseMediaEditorial';
import { caseMediaSingle } from './objects/caseMediaSingle';
import { caseMediaSplit } from './objects/caseMediaSplit';
import { caseMediaText } from './objects/caseMediaText';
import { clientLogo } from './objects/clientLogo';
import { homeHero } from './objects/homeHero';
import { homeServices } from './objects/homeServices';
import { media } from './objects/media';
import { navigationLink } from './objects/navigationLink';
import { projectDetail } from './objects/projectDetail';
import { seo } from './objects/seo';
import { serviceItem } from './objects/serviceItem';
import { socialLink } from './objects/socialLink';

export const schemaTypes: SchemaTypeDefinition[] = [
  aboutPage,
  caseStudy,
  casesPage,
  employee,
  homePage,
  siteSettings,
  address,
  caseMediaSingle,
  caseMediaSplit,
  caseMediaEditorial,
  caseMediaText,
  clientLogo,
  homeHero,
  homeServices,
  media,
  navigationLink,
  projectDetail,
  socialLink,
  seo,
  serviceItem,
];
