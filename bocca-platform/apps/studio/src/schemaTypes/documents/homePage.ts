import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Forside',
  type: 'document',
  initialValue: {
    hero: {
      _type: 'homeHero',
      heading: 'Lorem ipsum dolor amet',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    featuredCasesHeading: 'Udvalgte cases',
    services: {
      _type: 'homeServices',
      heading: 'Services',
      introduction:
        'Vi udfolder potentialet i vores kunders budskaber; skriver ord, skaber billeder og sætter i bevægelse. Kort sagt hjælper vi vores kunder med at definere deres historier, løfte og give dem luft under vingerne.',
      items: [
        {
          _key: 'social-media',
          _type: 'serviceItem',
          heading: 'Sociale medier',
          body: 'På BOCCA skaber vi relevant og engagerende content, der sørger for synlighed for vores kunder. Vi måler på effekten af vores tilstedeværelse, så vi fortsat kan optimere og sikre sammenhængskraft på tværs af platforme.',
        },
        {
          _key: 'strategy',
          _type: 'serviceItem',
          heading: 'Strategi',
          body: 'Med indsigt i medier og målgrupper, starter vores arbejde altid med at udarbejde en klar strategi. Strategi hjælper med at navigere i bl.a. mediebrug og markedstendenser og skabe klar kommunikation med skarpe budskaber. Kort sagt gør strategi vores idéer bedre, så vi kan opnå vores kunders mål.',
        },
        {
          _key: 'branding',
          _type: 'serviceItem',
          heading: 'Branding',
          body: 'Vores samtid er et tag-selv-bord af muligheder, derfor skal brands have værdi, så vores kunders kunder forbliver loyale. På BOCCA bringer vi brands til live, så de kan opleves gennem alle dine sanser: Vi gør dit brand distinkt og til det mest indbydende på hele buffeten.',
        },
        {
          _key: 'campaigns',
          _type: 'serviceItem',
          heading: 'Koncept og kampagner',
          body: 'Når vi udvikler koncepter og kampagner, omsætter vi strategi og indsigter til kreative løsninger. Om budskabet er inspirerende, lærerigt eller tankevækkende stræber vi altid efter at skabe et holdbart og stærkt engagement vores kunder og deres kunder imellem.',
        },
        {
          _key: 'film',
          _type: 'serviceItem',
          heading: 'Film og animation',
          body: 'På BOCCA udvikler og skaber vi alt fra de helt korte film og animationer til sociale medier til dem, du oplever på flow-TV og i biografen. Vi filmer i fugle, frø og folk-perspektiv og kun fantasien sætter grænser, når virkeligheden skal animeres.',
          linkLabel: 'Se BOCCA Film',
          linkUrl: 'https://film.bocca.dk/',
        },
        {
          _key: 'production',
          _type: 'serviceItem',
          heading: 'Grafisk produktion – tryk og web',
          body: 'Vores erfarne tegnestue er en af grundstenene i vores inhouse produktion, der altid sørger for en kreativ, sikker og smidig proces i vores arbejde.',
        },
        {
          _key: 'digital',
          _type: 'serviceItem',
          heading: 'Digitale løsninger',
          body: 'En digital verden kalder på digitale løsninger. Vi udvikler, optimerer og producerer alt fra digitale strategier til landing pages, websites og UX design, der sikrer den gode brugeroplevelse.',
        },
      ],
    },
  },
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'homeHero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientLogos',
      title: 'Kundelogoer',
      description:
        'Logoerne vises i en langsomt bevægende række efter heroen. Tilføj og sortér de rigtige logoer her. Indtil da vises neutrale pladsholdere.',
      type: 'array',
      of: [{ type: 'clientLogo' }],
    }),
    defineField({
      name: 'featuredCasesHeading',
      title: 'Overskrift til udvalgte cases',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'featuredCases',
      title: 'Udvalgte cases',
      description:
        'Vælg og sortér op til fire cases. Rækkefølgen her bestemmer placeringen på forsiden.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
      validation: (rule) => rule.max(4).unique(),
    }),
    defineField({
      name: 'services',
      title: 'Services-accordion',
      description:
        'Redigér introduktionen og de enkelte services. Alle punkter er lukkede, når siden indlæses.',
      type: 'homeServices',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Forside' };
    },
  },
});
