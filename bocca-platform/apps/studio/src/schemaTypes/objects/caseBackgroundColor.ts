import { defineField } from 'sanity';

import {
  BeigeCaseBackgroundInput,
  BordeauxCaseBackgroundInput,
} from '../../components/CaseBackgroundColorInput';

const legacyColors = new Set([
  'beige',
  'white',
  'bordeaux',
  'petroleum',
  'blue',
]);

export function caseBackgroundColorField(
  name: string,
  initialValue = '#faf4f0',
  group?: string,
) {
  return defineField({
    name,
    title: 'Baggrundsfarve',
    description:
      'Vælg en farve, eller indsæt en hex-kode (#RRGGBB). Tekstfarven tilpasses automatisk.',
    type: 'string',
    initialValue,
    group,
    components: {
      input:
        initialValue === '#4d1030'
          ? BordeauxCaseBackgroundInput
          : BeigeCaseBackgroundInput,
    },
    validation: (rule) =>
      rule.custom((value) =>
        !value || /^#[0-9a-f]{6}$/i.test(value) || legacyColors.has(value)
          ? true
          : 'Angiv en hex-farve med seks tegn, fx #faf4f0.',
      ),
  });
}
