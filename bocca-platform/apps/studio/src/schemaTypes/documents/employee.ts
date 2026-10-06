import { defineField, defineType } from 'sanity';

export const employee = defineType({
  name: 'employee',
  title: 'Medarbejder',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profil', default: true },
    { name: 'contact', title: 'Kontakt' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'role',
      title: 'Stilling',
      description: 'Fx “Konceptchef, partner”.',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'portrait',
      title: 'Portræt',
      description:
        'Upload billedet uden afrundede hjørner. Websitet beskærer det til et kvadrat og tilføjer hjørnet i kode.',
      type: 'image',
      group: 'profile',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst',
          description: 'Fx “Portræt af [medarbejder navn]”.',
          type: 'string',
          validation: (rule) => rule.required().max(180),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      description:
        'Valgfri. Hvis feltet er tomt, kan de globale kontaktoplysninger bruges i stedet.',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      description: 'Valgfrit. Skriv nummeret, som det skal vises.',
      type: 'string',
      group: 'contact',
      validation: (rule) =>
        rule.regex(/^\+?[\d ()-]{8,24}$/, {
          name: 'telefonnummer',
          invert: false,
        }),
    }),
  ],
  orderings: [
    {
      title: 'Navn, A–Å',
      name: 'nameAscending',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'portrait',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Medarbejder uden navn',
        subtitle,
        media,
      };
    },
  },
});
