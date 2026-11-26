import { defineField, defineType } from 'sanity';
import { caseBackgroundColorField } from './caseBackgroundColor';

export const caseMediaSplit = defineType({
  name: 'caseMediaSplit',
  title: '2 medier – 50/50',
  type: 'object',
  fields: [
    caseBackgroundColorField('backgroundColor'),
    defineField({
      name: 'leftMedia',
      title: 'Venstre medie',
      type: 'media',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rightMedia',
      title: 'Højre medie',
      type: 'media',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      mediaType: 'leftMedia.mediaType',
      image: 'leftMedia.image',
      posterImage: 'leftMedia.posterImage',
    },
    prepare({ mediaType, image, posterImage }) {
      return {
        title: '2 medier – 50/50',
        subtitle: 'To stående mediefelter',
        media: mediaType === 'video' ? posterImage : image,
      };
    },
  },
});
