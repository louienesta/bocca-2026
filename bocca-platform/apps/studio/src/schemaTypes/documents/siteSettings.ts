import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Globale indstillinger',
  type: 'document',
  groups: [
    { name: 'general', title: 'Generelt', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'contact', title: 'Kontakt' },
    { name: 'seo', title: 'Standard-SEO' },
  ],
  initialValue: {
    siteName: 'BOCCA',
    footerHeading: 'Lad os tage en snak',
    caseContactHeading: 'Har du en lignende opgave?\nLad os tage en snak.',
  },
  fields: [
    defineField({
      name: 'siteName',
      title: 'Websitets navn',
      description: 'Det korte navn, der bruges i metadata og browserfaner.',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'legalName',
      title: 'Virksomhedens juridiske navn',
      description: 'Fx BOCCA ApS. Bruges i strukturerede virksomhedsdata.',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Websitets primære URL',
      description: 'Den endelige offentlige URL, fx https://bocca.dk.',
      type: 'url',
      group: 'general',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'cvrNumber',
      title: 'CVR-nummer',
      type: 'string',
      group: 'general',
      validation: (rule) =>
        rule.regex(/^\d{8}$/, {
          name: 'CVR-nummer med otte cifre',
          invert: false,
        }),
    }),
    defineField({
      name: 'headerPrimaryLink',
      title: 'Primært header-link',
      description: 'Linket på venstre side af logoet.',
      type: 'navigationLink',
      group: 'navigation',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headerSecondaryLinks',
      title: 'Sekundære header-links',
      description: 'Linkene på højre side af logoet.',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({ type: 'navigationLink' })],
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer-navigation',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({ type: 'navigationLink' })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'footerHeading',
      title: 'Kontaktoverskrift i footer',
      description: 'Den gennemgående invitation til at kontakte BOCCA.',
      type: 'text',
      rows: 3,
      group: 'contact',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'caseContactHeading',
      title: 'Kontaktoverskrift på cases',
      description:
        'Den faste overskrift i den bordeaux kontaktsektion nederst på alle cases.',
      type: 'text',
      rows: 3,
      group: 'contact',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      description: 'Skriv nummeret, som det skal vises på websitet.',
      type: 'string',
      group: 'contact',
      validation: (rule) =>
        rule.required().regex(/^\+?[\d ()-]{8,24}$/, {
          name: 'telefonnummer',
          invert: false,
        }),
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'address',
      group: 'contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sociale medier',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({ type: 'socialLink' })],
      validation: (rule) =>
        rule.unique().custom((links) => {
          if (!links) return true;

          const platforms = (links as Array<{ platform?: string }>)
            .map((link) => link.platform)
            .filter(Boolean);

          return new Set(platforms).size === platforms.length
            ? true
            : 'Hver platform må kun tilføjes én gang.';
        }),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Standard-SEO',
      description: 'Fallback-værdier for sider, der ikke har deres egen SEO.',
      type: 'seo',
      group: 'seo',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Globale indstillinger' };
    },
  },
});
