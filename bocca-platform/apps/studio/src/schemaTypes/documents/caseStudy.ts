import { defineArrayMember, defineField, defineType } from 'sanity';
import { caseBackgroundColorField } from '../objects/caseBackgroundColor';

type ProjectDetailValue = {
  label?: string;
};

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case',
  type: 'document',
  groups: [
    { name: 'content', title: 'Indhold', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  initialValue: {
    projectDetails: [
      {
        _key: 'client',
        _type: 'projectDetail',
        label: 'Kunde',
      },
      {
        _key: 'services',
        _type: 'projectDetail',
        label: 'Ydelser',
      },
    ],
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL-navn',
      description: 'Bruges i casens webadresse, fx /cases/danish-minies.',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Projektbeskrivelse',
      description:
        'Valgfri tekst under casens titel. Udelad den, hvis titlen og projektdetaljerne skal stå alene.',
      type: 'text',
      rows: 5,
      group: 'content',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'heroMedia',
      title: 'Oversigtsmedie',
      description:
        'Vises på caseoversigten og i Udvalgte cases på forsiden, men ikke i casens tekstbaserede hero.',
      type: 'media',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    caseBackgroundColorField('heroBackgroundColor', '#faf4f0', 'content'),
    defineField({
      name: 'projectDetails',
      title: 'Projektdetaljer',
      description:
        'Tilføj 2–4 frie par. Kunde og Ydelser er foreslået, men alle betegnelser kan ændres eller erstattes.',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'projectDetail' })],
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(4)
          .custom((details) => {
            if (!details) return true;

            const labels = (details as ProjectDetailValue[])
              .map((detail) => detail.label?.trim().toLocaleLowerCase('da-DK'))
              .filter(Boolean);

            return new Set(labels).size === labels.length
              ? true
              : 'Hver betegnelse må kun bruges én gang.';
          }),
    }),
    defineField({
      name: 'contactPerson',
      title: 'Kontaktperson',
      description:
        'Valgfri medarbejder til kontaktsektionen nederst på casen. Hvis medarbejderen ikke har egne kontaktoplysninger, bruges BOCCAs globale oplysninger.',
      type: 'reference',
      to: [{ type: 'employee' }],
      group: 'content',
    }),
    caseBackgroundColorField('contactBackgroundColor', '#4d1030', 'content'),
    defineField({
      name: 'contentBlocks',
      title: 'Indholdsblokke',
      description:
        'Byg casen ved at tilføje, gentage og sortere de fire tilgængelige layouts.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({ type: 'caseMediaSingle' }),
        defineArrayMember({ type: 'caseMediaSplit' }),
        defineArrayMember({ type: 'caseMediaEditorial' }),
        defineArrayMember({ type: 'caseMediaText' }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO-overskrivning',
      description:
        'Valgfrit. Hvis feltet er tomt, bruger websitet titel, eventuel projektbeskrivelse og de globale SEO-indstillinger.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      details: 'projectDetails',
    },
    prepare({ title, slug, details }) {
      const client = (details as Array<ProjectDetailValue & { value?: string }>)
        ?.find(
          (detail) =>
            detail.label?.trim().toLocaleLowerCase('da-DK') === 'kunde',
        )
        ?.value?.trim();

      return {
        title: title || 'Case uden titel',
        subtitle: [client, slug ? `/cases/${slug}` : 'URL-navn mangler']
          .filter(Boolean)
          .join(' · '),
      };
    },
  },
});
