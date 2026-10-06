import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta-titel',
      description: 'Bruges som standard, når en side ikke har sin egen titel.',
      type: 'string',
      validation: (rule) => [
        rule.required().error('Meta-titlen er påkrævet.'),
        rule
          .min(30)
          .warning('En meta-titel fungerer ofte bedst fra ca. 30 tegn.'),
        rule.max(60).warning('Hold helst meta-titlen på højst 60 tegn.'),
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta-beskrivelse',
      description: 'Bruges som standard i søgeresultater og ved deling.',
      type: 'text',
      rows: 4,
      validation: (rule) => [
        rule.required().error('Meta-beskrivelsen er påkrævet.'),
        rule
          .min(120)
          .warning('Sigt efter mindst 120 tegn, når teksten tillader det.'),
        rule
          .max(160)
          .warning('Sigt efter højst 160 tegn for at undgå afkortning.'),
      ],
    }),
    defineField({
      name: 'shareImage',
      title: 'Standardbillede til deling',
      description: 'Anbefalet format: 1200 × 630 px.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst',
          description: 'Beskriv billedets indhold kort og præcist.',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
      ],
    }),
  ],
});
