import { defineField, defineType } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Socialt medie',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profil-URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url' },
    prepare({ title, subtitle }) {
      return {
        title: title
          ? `${title.charAt(0).toUpperCase()}${title.slice(1)}`
          : 'Socialt medie',
        subtitle,
      };
    },
  },
});
