import type { StructureResolver } from 'sanity/structure';

export const SITE_SETTINGS_ID = 'siteSettings';
export const HOME_PAGE_ID = 'homePage';
export const CASES_PAGE_ID = 'casesPage';
export const ABOUT_PAGE_ID = 'aboutPage';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Indhold')
    .items([
      S.listItem()
        .title('Forside')
        .id(HOME_PAGE_ID)
        .child(S.document().schemaType('homePage').documentId(HOME_PAGE_ID)),
      S.listItem()
        .title('Caseoversigt')
        .id(CASES_PAGE_ID)
        .child(S.document().schemaType('casesPage').documentId(CASES_PAGE_ID)),
      S.listItem()
        .title('Mød BOCCA')
        .id(ABOUT_PAGE_ID)
        .child(S.document().schemaType('aboutPage').documentId(ABOUT_PAGE_ID)),
      S.documentTypeListItem('caseStudy').title('Cases'),
      S.documentTypeListItem('employee').title('Medarbejdere'),
      S.listItem()
        .title('Globale indstillinger')
        .id(SITE_SETTINGS_ID)
        .child(
          S.document().schemaType('siteSettings').documentId(SITE_SETTINGS_ID),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          listItem.getId() !== 'homePage' &&
          listItem.getId() !== 'casesPage' &&
          listItem.getId() !== 'aboutPage' &&
          listItem.getId() !== 'caseStudy' &&
          listItem.getId() !== 'employee' &&
          listItem.getId() !== 'siteSettings',
      ),
    ]);
