import { defineArrayMember, defineField, defineType } from 'sanity';

export const casesPage = defineType({
  name: 'casesPage',
  title: 'Caseoversigt',
  type: 'document',
  groups: [
    { name: 'content', title: 'Indhold', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  initialValue: {
    heading: 'Cases',
    introduction:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduktion',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'cases',
      title: 'Sortering af cases',
      description:
        'Valgfrit. Tilføj og sortér cases her for at styre rækkefølgen. Hvis listen er tom, vises alle publicerede cases med de nyeste først.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO-overskrivning',
      description:
        'Valgfrit. Hvis feltet er tomt, bruges sidens overskrift og introduktion.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Caseoversigt' };
    },
  },
});
