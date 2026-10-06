import { defineField, defineType } from 'sanity';

export const caseMediaEditorial = defineType({
  name: 'caseMediaEditorial',
  title: '3 medier – 2 + 1',
  type: 'object',
  fields: [
    defineField({
      name: 'topLeftMedia',
      title: 'Øverst til venstre',
      description: 'Vises i et liggende felt.',
      type: 'media',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bottomLeftMedia',
      title: 'Nederst til venstre',
      description: 'Vises i et liggende felt.',
      type: 'media',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rightMedia',
      title: 'Højre medie',
      description: 'Vises i et højt, stående felt.',
      type: 'media',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      mediaType: 'rightMedia.mediaType',
      image: 'rightMedia.image',
      posterImage: 'rightMedia.posterImage',
    },
    prepare({ mediaType, image, posterImage }) {
      return {
        title: '3 medier – 2 + 1',
        subtitle: 'To liggende til venstre · ét stående til højre',
        media: mediaType === 'video' ? posterImage : image,
      };
    },
  },
});
