import { defineField, defineType } from 'sanity';

type NavigationLinkParent = {
  linkType?: 'internal' | 'external' | 'contact';
};

export const navigationLink = defineType({
  name: 'navigationLink',
  title: 'Navigationslink',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Linktekst',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'linkType',
      title: 'Linktype',
      type: 'string',
      initialValue: 'internal',
      options: {
        layout: 'radio',
        list: [
          { title: 'Intern side', value: 'internal' },
          { title: 'Ekstern side', value: 'external' },
          { title: 'Åbn kontaktpanelet', value: 'contact' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalPath',
      title: 'Intern sti',
      description: 'Brug en relativ sti, fx /cases eller /moed-bocca.',
      type: 'string',
      hidden: ({ parent }) =>
        (parent as NavigationLinkParent | undefined)?.linkType !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as NavigationLinkParent | undefined;

          if (parent?.linkType !== 'internal') return true;
          if (!value) return 'Angiv en intern sti.';
          if (!value.startsWith('/'))
            return 'Interne stier skal begynde med /.';

          return true;
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'Ekstern URL',
      type: 'url',
      hidden: ({ parent }) =>
        (parent as NavigationLinkParent | undefined)?.linkType !== 'external',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).custom((value, context) => {
          const parent = context.parent as NavigationLinkParent | undefined;
          return parent?.linkType === 'external' && !value
            ? 'Angiv en ekstern URL.'
            : true;
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Åbn i ny fane',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) =>
        (parent as NavigationLinkParent | undefined)?.linkType !== 'external',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      internalPath: 'internalPath',
      externalUrl: 'externalUrl',
    },
    prepare({ label, linkType, internalPath, externalUrl }) {
      return {
        title: label || 'Link uden tekst',
        subtitle:
          linkType === 'contact'
            ? 'Kontaktpanel'
            : linkType === 'external'
              ? externalUrl || 'Ekstern URL mangler'
              : internalPath || 'Intern sti mangler',
      };
    },
  },
});
