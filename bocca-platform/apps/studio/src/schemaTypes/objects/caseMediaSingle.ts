import { defineField, defineType } from 'sanity';

export const caseMediaSingle = defineType({
  name: 'caseMediaSingle',
  title: '1 medie',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      title: 'Medie',
      type: 'media',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      mediaType: 'media.mediaType',
      image: 'media.image',
      posterImage: 'media.posterImage',
    },
    prepare({ mediaType, image, posterImage }) {
      return {
        title: '1 medie',
        subtitle: mediaType === 'video' ? 'Video' : 'Billede',
        media: mediaType === 'video' ? posterImage : image,
      };
    },
  },
});
