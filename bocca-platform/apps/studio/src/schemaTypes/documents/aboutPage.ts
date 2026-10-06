import { defineArrayMember, defineField, defineType } from 'sanity';

const initialTeaser = {
  heading: 'Mød BOCCA',
  body: 'Vi er et kreativt bureau, der kombinerer strategi, design og nysgerrighed for at skabe kommunikation med retning.',
  buttonLabel: 'Mød os',
};

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Mød BOCCA',
  type: 'document',
  groups: [
    { name: 'content', title: 'Indhold', default: true },
    { name: 'teaser', title: 'Teaser' },
    { name: 'team', title: 'Medarbejdere' },
    { name: 'seo', title: 'SEO' },
  ],
  initialValue: {
    heading: 'Mød os',
    introduction:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
    firstStory: {
      heading: 'Vi tror på nærhed.',
      body: 'De bedste løsninger opstår, når strategi og kreativitet arbejder tæt sammen. Derfor begynder vi med at lytte, stille spørgsmål og forstå den virkelighed, vores kunder og deres målgrupper befinder sig i. Det giver plads til idéer, der både kan mærkes og bruges.',
    },
    middleStory: {
      heading: 'Faglighed med personlighed.',
      body: 'Vi er forskellige specialister med én fælles arbejdsform: høj faglighed, ærlig dialog og nysgerrighed gennem hele processen. Hos os møder du de mennesker, der faktisk løser opgaven — fra de første overvejelser til det færdige udtryk.',
    },
    finalStory: {
      heading: 'Sammen gør vi en forskel.',
      body: 'Vi tror ikke på standardløsninger. Vi tror på samarbejder, hvor den rigtige indsigt kan blive til en klar retning — og hvor en stærk idé kan leve på tværs af mennesker, kanaler og tid.',
    },
    friendsBody:
      'På BOCCA arbejder vi sammen. Alt vi producerer er et resultat af mange dygtige menneskers indsatser og indsigter internt på BOCCA. Netop fordi vi ved, at samarbejde styrker os i alt vi skaber, omgiver vi os med gode og dygtige samarbejdspartnere. I indre København bor vi sammen med en række selvstændige fagfolk og firmaer, der alle er eksperter på hver deres felt, men som fællesnævner arbejder med markedsføring og kommunikation – det er dem vi kalder vores FRIENDS. Vi arbejder sammen om opgaver, når det giver mening (det gør det tit) og vi gør brug af hinandens viden og netværk.',
    teaser: initialTeaser,
    teamHeading: 'Medarbejdere',
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Sidens overskrift',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduktion',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'firstStory',
      title: 'Første fortælling · tekst og billede',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Overskrift',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'body',
          title: 'Tekst',
          type: 'text',
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'media',
          title: 'Billede eller video · 3:2',
          type: 'media',
          initialValue: null,
          description: 'Hvis feltet er tomt, vises prototypens billede.',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'middleStory',
      title: 'Midterste fortælling · to medier og tekst',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'leftMedia',
          title: 'Venstre medie · 1:1',
          type: 'media',
          initialValue: null,
          description: 'Hvis feltet er tomt, vises prototypens billede.',
        }),
        defineField({
          name: 'rightMedia',
          title: 'Højre medie · 3:2',
          type: 'media',
          initialValue: null,
          description: 'Hvis feltet er tomt, vises prototypens billede.',
        }),
        defineField({
          name: 'heading',
          title: 'Overskrift',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'body',
          title: 'Tekst',
          type: 'text',
          rows: 5,
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'finalStory',
      title: 'Sidste fortælling · tekst og billede',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Overskrift',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'body',
          title: 'Tekst',
          type: 'text',
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'media',
          title: 'Billede eller video · 3:2',
          type: 'media',
          initialValue: null,
          description: 'Hvis feltet er tomt, vises prototypens billede.',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'friendsBody',
      title: 'BOCCA & Friends · tekst',
      type: 'text',
      rows: 8,
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'teaser',
      title: 'Mød BOCCA-teaser',
      description:
        'Samme sektion vises på forsiden og efter alle cases på cases-oversigten.',
      type: 'object',
      group: 'teaser',
      initialValue: initialTeaser,
      fields: [
        defineField({
          name: 'heading',
          title: 'Overskrift',
          type: 'string',
          validation: (rule) => rule.required().max(80),
        }),
        defineField({
          name: 'body',
          title: 'Tekst',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required().max(400),
        }),
        defineField({
          name: 'buttonLabel',
          title: 'Knaptekst',
          description: 'Knappen fører til Mød BOCCA-siden.',
          type: 'string',
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: 'leftMedia',
          title: 'Venstre medie · 1:1',
          description: 'Hvis feltet er tomt, vises prototypens billede.',
          type: 'media',
          initialValue: null,
        }),
        defineField({
          name: 'rightMedia',
          title: 'Højre medie · 3:2',
          description: 'Hvis feltet er tomt, vises prototypens billede.',
          type: 'media',
          initialValue: null,
        }),
      ],
    }),
    defineField({
      name: 'teamHeading',
      title: 'Overskrift til medarbejdere',
      type: 'string',
      group: 'team',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'employees',
      title: 'Medarbejdere og rækkefølge',
      description:
        'Vælg og sortér medarbejdere. Hvis listen er tom, vises alle publicerede medarbejdere alfabetisk.',
      type: 'array',
      group: 'team',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'employee' }] }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO-overskrivning',
      description:
        'Valgfrit. Hvis feltet er tomt, bruges sidens overskrift og introduktion.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Mød BOCCA' };
    },
  },
});
