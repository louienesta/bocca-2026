import { defineField, defineType } from 'sanity';
import { caseBackgroundColorField } from './caseBackgroundColor';
import { caseTextColorField } from './caseTextColor';

export const caseTextSplit = defineType({
  name: 'caseTextSplit',
  title: 'Tekst – 50/50',
  type: 'object',
  fields: [
    caseBackgroundColorField('backgroundColor'),
    caseTextColorField(),
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'body',
      title: 'Brødtekst',
      description: 'Adskil eventuelle afsnit med en tom linje.',
      type: 'text',
      rows: 10,
      validation: (rule) => rule.required().max(2000),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Tekst – 50/50',
        subtitle: 'Overskrift + brødtekst',
      };
    },
  },
});
