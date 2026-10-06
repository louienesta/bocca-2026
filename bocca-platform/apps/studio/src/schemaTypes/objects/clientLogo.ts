import { defineField, defineType } from 'sanity';

export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Kundelogo',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Kundenavn',
      description: 'Bruges som alternativ tekst for logoet.',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'image',
      title: 'Logo',
      description:
        'Upload et logo med transparent baggrund, gerne SVG eller PNG.',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Visuel størrelse',
      description: 'Brug Lille til et mere kompakt eller kvadratisk logo.',
      type: 'string',
      initialValue: 'normal',
      options: {
        layout: 'radio',
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Lille', value: 'small' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image', size: 'size' },
    prepare({ title, media, size }) {
      return {
        title: title || 'Logo uden navn',
        subtitle: size === 'small' ? 'Lille visning' : 'Normal visning',
        media,
      };
    },
  },
});
