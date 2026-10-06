export type NavigationLinkType = 'internal' | 'external' | 'contact';

export interface NavigationLink {
  _key?: string;
  label: string;
  linkType: NavigationLinkType;
  href: string;
  openInNewTab: boolean;
}

export interface SocialLink {
  _key?: string;
  platform: string;
  url: string;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
  mapUrl?: string;
}

export interface ShareImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface DefaultSeo {
  metaTitle: string;
  metaDescription: string;
  shareImage?: ShareImage;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  legalName: string;
  siteUrl: string;
  cvrNumber?: string;
  headerPrimaryLink: NavigationLink;
  headerSecondaryLinks: NavigationLink[];
  footerNavigation: NavigationLink[];
  footerHeading: string;
  caseContactHeading: string;
  email: string;
  phone: string;
  address: Address;
  socialLinks: SocialLink[];
  defaultSeo: DefaultSeo;
}

export interface HomeHero {
  heading: string;
  body: string;
  videoUrl?: string;
  videoMimeType?: string;
}

export interface ClientLogo {
  _key: string;
  name: string;
  image: SanityImageData;
  size?: 'normal' | 'small';
}

export interface ServiceItem {
  _key?: string;
  heading: string;
  body: string;
  linkLabel?: string;
  linkUrl?: string;
}

export interface HomeServices {
  heading: string;
  introduction: string;
  items: ServiceItem[];
}

export type MediaObjectFit = 'cover' | 'contain';
export type MediaCorner =
  'none' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface SanityImageData {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  crop?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface CmsMedia {
  mediaType: 'image' | 'video';
  image?: SanityImageData;
  videoUrl?: string;
  videoMimeType?: string;
  captionsUrl?: string;
  posterImage?: SanityImageData;
  isDecorative?: boolean;
  alt?: string;
  videoTitle?: string;
  hasAudio?: boolean;
  objectFit?: MediaObjectFit;
  corner?: MediaCorner;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export interface ProjectDetail {
  _key?: string;
  label: string;
  value: string;
}

export interface CaseCardData {
  _id: string;
  title: string;
  slug: string;
  introduction: string;
  projectDetails: ProjectDetail[];
  heroMedia?: CmsMedia | null;
}

export interface HomePage {
  _id: string;
  hero: HomeHero;
  clientLogos: ClientLogo[];
  featuredCasesHeading: string;
  featuredCases: CaseCardData[];
  services: HomeServices;
}

export interface CasesPage {
  _id: string;
  heading: string;
  introduction: string;
  cases: CaseCardData[];
  seo?: DefaultSeo;
}

interface CaseBlockBase {
  _key: string;
}

export interface CaseMediaSingleBlock extends CaseBlockBase {
  _type: 'caseMediaSingle';
  media?: CmsMedia | null;
}

export interface CaseMediaSplitBlock extends CaseBlockBase {
  _type: 'caseMediaSplit';
  leftMedia?: CmsMedia | null;
  rightMedia?: CmsMedia | null;
}

export interface CaseMediaEditorialBlock extends CaseBlockBase {
  _type: 'caseMediaEditorial';
  topLeftMedia?: CmsMedia | null;
  bottomLeftMedia?: CmsMedia | null;
  rightMedia?: CmsMedia | null;
}

export interface CaseMediaTextBlock extends CaseBlockBase {
  _type: 'caseMediaText';
  media?: CmsMedia | null;
  heading: string;
  body: string;
}

export type CaseContentBlock =
  | CaseMediaSingleBlock
  | CaseMediaSplitBlock
  | CaseMediaEditorialBlock
  | CaseMediaTextBlock;

export interface CaseStudyData extends CaseCardData {
  contentBlocks: CaseContentBlock[];
  contactPerson?: EmployeeData | null;
  seo?: DefaultSeo;
}

export interface EmployeePortrait extends SanityImageData {
  alt: string;
}

export interface EmployeeData {
  _id: string;
  name: string;
  role: string;
  portrait?: EmployeePortrait | null;
  email?: string;
  phone?: string;
}

export interface AboutStory {
  heading: string;
  body: string;
  media?: CmsMedia | null;
}

export interface AboutMiddleStory {
  heading: string;
  body: string;
  leftMedia?: CmsMedia | null;
  rightMedia?: CmsMedia | null;
}

export interface AboutTeaserData {
  heading: string;
  body: string;
  buttonLabel: string;
  leftMedia?: CmsMedia | null;
  rightMedia?: CmsMedia | null;
}

export interface AboutPage {
  _id: string;
  heading: string;
  introduction: string;
  firstStory: AboutStory;
  middleStory: AboutMiddleStory;
  finalStory: AboutStory;
  friendsBody: string;
  teamHeading: string;
  employees: EmployeeData[];
  seo?: DefaultSeo;
}
