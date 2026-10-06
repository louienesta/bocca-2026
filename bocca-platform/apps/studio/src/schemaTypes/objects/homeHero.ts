import { defineField, defineType } from 'sanity';

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'body',
      title: 'Introduktion',
      description: 'Den korte tekst under overskriften.',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'video',
      title: 'Herovideo',
      description: 'Lydløs baggrundsvideo.',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
  ],
});
