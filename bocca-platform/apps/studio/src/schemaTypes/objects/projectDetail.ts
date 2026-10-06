import { defineField, defineType } from 'sanity';

export const projectDetail = defineType({
  name: 'projectDetail',
  title: 'Projektdetalje',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Betegnelse',
      description: 'Fx Kunde, Ydelser, ROI, Rækkevidde eller Resultat.',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'value',
      title: 'Indhold',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(240),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Detalje uden betegnelse',
        subtitle: subtitle || 'Indhold mangler',
      };
    },
  },
});
