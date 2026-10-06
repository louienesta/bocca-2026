import { defineField, defineType } from 'sanity';

export const caseMediaText = defineType({
  name: 'caseMediaText',
  title: 'Medie + tekst – 7/3',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      title: 'Medie',
      type: 'media',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'body',
      title: 'Brødtekst',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required().max(800),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      mediaType: 'media.mediaType',
      image: 'media.image',
      posterImage: 'media.posterImage',
    },
    prepare({ title, mediaType, image, posterImage }) {
      return {
        title: title || 'Medie + tekst – 7/3',
        subtitle: 'Medie + tekst – 7/3',
        media: mediaType === 'video' ? posterImage : image,
      };
    },
  },
});
