import { defineField, defineType } from 'sanity';

export const homeServices = defineType({
  name: 'homeServices',
  title: 'Services-accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduktion',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Services og rækkefølge',
      description: 'Træk i listen for at ændre rækkefølgen på forsiden.',
      type: 'array',
      of: [{ type: 'serviceItem' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
