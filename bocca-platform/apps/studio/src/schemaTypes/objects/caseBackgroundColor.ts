import { defineField } from 'sanity';

export type CaseBackgroundColor =
  'beige' | 'white' | 'bordeaux' | 'petroleum' | 'blue';

export function caseBackgroundColorField(
  name: string,
  initialValue: CaseBackgroundColor = 'beige',
  group?: string,
) {
  return defineField({
    name,
    title: 'Baggrundsfarve',
    description:
      'Farven dækker hele sektionen. Tekstfarven tilpasses automatisk.',
    type: 'string',
    initialValue,
    group,
    options: {
      list: [
        { title: 'Beige', value: 'beige' },
        { title: 'Hvid', value: 'white' },
        { title: 'Bordeaux', value: 'bordeaux' },
        { title: 'Petroleum', value: 'petroleum' },
        { title: 'Lyseblå', value: 'blue' },
      ],
    },
  });
}
