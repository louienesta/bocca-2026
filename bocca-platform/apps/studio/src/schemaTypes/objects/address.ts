import { defineField, defineType } from 'sanity';

export const address = defineType({
  name: 'address',
  title: 'Adresse',
  type: 'object',
  fields: [
    defineField({
      name: 'street',
      title: 'Vej og nummer',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postalCode',
      title: 'Postnummer',
      type: 'string',
      validation: (rule) =>
        rule.required().regex(/^\d{4}$/, {
          name: 'dansk postnummer',
          invert: false,
        }),
    }),
    defineField({
      name: 'city',
      title: 'By',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      initialValue: 'Danmark',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mapUrl',
      title: 'Link til kort',
      description: 'Valgfrit link til adressen i en korttjeneste.',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
});
