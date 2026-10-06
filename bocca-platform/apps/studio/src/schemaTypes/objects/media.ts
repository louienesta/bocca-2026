import { defineField, defineType } from 'sanity';

type MediaValue = {
  mediaType?: 'image' | 'video';
  isDecorative?: boolean;
  hasAudio?: boolean;
  autoplay?: boolean;
  muted?: boolean;
};

export const media = defineType({
  name: 'media',
  title: 'Medie',
  type: 'object',
  groups: [
    { name: 'source', title: 'Medie', default: true },
    { name: 'accessibility', title: 'Tilgængelighed' },
    { name: 'presentation', title: 'Visning' },
  ],
  initialValue: {
    mediaType: 'image',
    isDecorative: false,
    hasAudio: false,
    objectFit: 'cover',
    corner: 'none',
    autoplay: true,
    loop: true,
    muted: true,
    controls: false,
  },
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Medietype',
      type: 'string',
      group: 'source',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Billede', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Billede',
      type: 'image',
      group: 'source',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) =>
        (parent as MediaValue | undefined)?.mediaType !== 'image',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as MediaValue | undefined;

          return parent?.mediaType === 'image' && !value
            ? 'Vælg et billede.'
            : true;
        }),
    }),
    defineField({
      name: 'video',
      title: 'Videofil',
      description: 'Upload en komprimeret MP4- eller WebM-fil.',
      type: 'file',
      group: 'source',
      options: {
        accept: 'video/mp4,video/webm',
      },
      hidden: ({ parent }) =>
        (parent as MediaValue | undefined)?.mediaType !== 'video',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as MediaValue | undefined;

          return parent?.mediaType === 'video' && !value
            ? 'Vælg en videofil.'
            : true;
        }),
    }),
    defineField({
      name: 'posterImage',
      title: 'Posterbillede',
      description:
        'Vises, mens videoen indlæses, og hvis automatisk afspilning er slået fra.',
      type: 'image',
      group: 'source',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) =>
        (parent as MediaValue | undefined)?.mediaType !== 'video',
    }),
    defineField({
      name: 'isDecorative',
      title: 'Dekorativt medie',
      description:
        'Slå kun dette til, hvis mediet ikke tilfører information. Dekorative medier skjules for skærmlæsere.',
      type: 'boolean',
      group: 'accessibility',
      initialValue: false,
    }),
    defineField({
      name: 'alt',
      title: 'Alternativ tekst',
      description:
        'Beskriv billedets indhold og funktion i den sammenhæng, hvor det vises. Undlad “billede af”.',
      type: 'string',
      group: 'accessibility',
      hidden: ({ parent }) => {
        const media = parent as MediaValue | undefined;
        return media?.mediaType !== 'image' || media.isDecorative === true;
      },
      validation: (rule) =>
        rule.max(180).custom((value, context) => {
          const parent = context.parent as MediaValue | undefined;

          return parent?.mediaType === 'image' && !parent.isDecorative && !value
            ? 'Skriv en alternativ tekst, eller markér mediet som dekorativt.'
            : true;
        }),
    }),
    defineField({
      name: 'videoTitle',
      title: 'Tilgængelig videotitel',
      description:
        'En kort beskrivelse, som identificerer videoen for brugere af hjælpemidler.',
      type: 'string',
      group: 'accessibility',
      hidden: ({ parent }) => {
        const media = parent as MediaValue | undefined;
        return media?.mediaType !== 'video' || media.isDecorative === true;
      },
      validation: (rule) =>
        rule.max(120).custom((value, context) => {
          const parent = context.parent as MediaValue | undefined;

          return parent?.mediaType === 'video' && !parent.isDecorative && !value
            ? 'Skriv en tilgængelig titel, eller markér mediet som dekorativt.'
            : true;
        }),
    }),
    defineField({
      name: 'hasAudio',
      title: 'Videoen indeholder lyd',
      type: 'boolean',
      group: 'accessibility',
      initialValue: false,
      hidden: ({ parent }) => {
        const media = parent as MediaValue | undefined;
        return media?.mediaType !== 'video' || media.isDecorative === true;
      },
    }),
    defineField({
      name: 'captions',
      title: 'Undertekster',
      description: 'Upload en WebVTT-fil (.vtt), hvis videoen indeholder lyd.',
      type: 'file',
      group: 'accessibility',
      options: {
        accept: '.vtt,text/vtt',
      },
      hidden: ({ parent }) => {
        const media = parent as MediaValue | undefined;
        return (
          media?.mediaType !== 'video' ||
          media.isDecorative === true ||
          media.hasAudio !== true
        );
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as MediaValue | undefined;

          return parent?.mediaType === 'video' &&
            !parent.isDecorative &&
            parent.hasAudio &&
            !value
            ? 'Upload undertekster til videoer med lyd.'
            : true;
        }),
    }),
    defineField({
      // Kept hidden so media created before format became placement-controlled
      // does not surface as an unknown field in existing documents.
      name: 'aspectRatio',
      title: 'Format',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'objectFit',
      title: 'Tilpasning',
      description:
        '“Beskær” fylder rammen. “Vis hele mediet” bevarer hele motivet og kan give luft omkring det.',
      type: 'string',
      group: 'presentation',
      initialValue: 'cover',
      options: {
        layout: 'radio',
        list: [
          { title: 'Beskær', value: 'cover' },
          { title: 'Vis hele mediet', value: 'contain' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'corner',
      title: 'Afrundet hjørne',
      type: 'string',
      group: 'presentation',
      initialValue: 'none',
      options: {
        layout: 'radio',
        list: [
          { title: 'Ingen', value: 'none' },
          { title: 'Øverst til venstre', value: 'top-left' },
          { title: 'Øverst til højre', value: 'top-right' },
          { title: 'Nederst til venstre', value: 'bottom-left' },
          { title: 'Nederst til højre', value: 'bottom-right' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'autoplay',
      title: 'Afspil automatisk',
      type: 'boolean',
      group: 'presentation',
      initialValue: true,
      hidden: ({ parent }) =>
        (parent as MediaValue | undefined)?.mediaType !== 'video',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as MediaValue | undefined;

          return value && parent?.muted === false
            ? 'Automatisk afspilning kræver, at videoen er lydløs.'
            : true;
        }),
    }),
    defineField({
      name: 'loop',
      title: 'Gentag video',
      type: 'boolean',
      group: 'presentation',
      initialValue: true,
      hidden: ({ parent }) =>
        (parent as MediaValue | undefined)?.mediaType !== 'video',
    }),
    defineField({
      name: 'muted',
      title: 'Lydløs',
      type: 'boolean',
      group: 'presentation',
      initialValue: true,
      hidden: ({ parent }) =>
        (parent as MediaValue | undefined)?.mediaType !== 'video',
    }),
    defineField({
      name: 'controls',
      title: 'Vis afspilningsknapper',
      type: 'boolean',
      group: 'presentation',
      initialValue: false,
      hidden: ({ parent }) =>
        (parent as MediaValue | undefined)?.mediaType !== 'video',
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      alt: 'alt',
      videoTitle: 'videoTitle',
      corner: 'corner',
      image: 'image',
      posterImage: 'posterImage',
    },
    prepare({ mediaType, alt, videoTitle, corner, image, posterImage }) {
      const isVideo = mediaType === 'video';

      return {
        title: isVideo ? videoTitle || 'Video' : alt || 'Billede',
        subtitle: [isVideo ? 'Video' : 'Billede', corner]
          .filter(Boolean)
          .join(' · '),
        media: isVideo ? posterImage : image,
      };
    },
  },
});
