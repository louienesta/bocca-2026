import { defineField } from 'sanity';
import { CaseTextColorInput } from '../../components/CaseBackgroundColorInput';

const hexColor = /^#[0-9a-f]{6}$/i;
const legacyBackgrounds: Record<string, string> = {
  beige: '#faf4f0',
  white: '#ffffff',
  bordeaux: '#4d1030',
  petroleum: '#2e4a50',
  blue: '#badbff',
};

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((index) => {
    const channel = Number.parseInt(hex.slice(index, index + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(first: string, second: string): number {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

export function caseTextColorField() {
  return defineField({
    name: 'textColor',
    title: 'Tekstfarve',
    description:
      'Valgfri. Uden et valg bruges en automatisk kontrastfarve. Vælg kun en anden farve, hvis teksten stadig kan læses tydeligt.',
    type: 'string',
    components: { input: CaseTextColorInput },
    validation: (rule) => [
      rule.custom((value) =>
        !value || hexColor.test(value)
          ? true
          : 'Angiv en hex-farve med seks tegn, fx #4d1030.',
      ),
      rule
        .custom((value, context) => {
          if (!value || !hexColor.test(value)) return true;

          const parent = context.parent as
            { backgroundColor?: string } | undefined;
          const backgroundValue = parent?.backgroundColor;
          const backgroundColor =
            legacyBackgrounds[backgroundValue || ''] ||
            (backgroundValue && hexColor.test(backgroundValue)
              ? backgroundValue
              : '#faf4f0');

          return contrast(value, backgroundColor) >= 4.5
            ? true
            : 'Lav kontrast mod baggrunden. Brødtekst bør have mindst 4,5:1 kontrast.';
        })
        .warning(),
    ],
  });
}
