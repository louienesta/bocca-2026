import { defineField, defineType } from 'sanity';

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'body',
      title: 'Beskrivelse',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkLabel',
      title: 'Linktekst (valgfri)',
      type: 'string',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'linkUrl',
      title: 'Linkadresse (valgfri)',
      description: 'Bruges kun, når der også er skrevet en linktekst.',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'body' },
  },
});
