const legacyColors: Record<string, string> = {
  beige: '#faf4f0',
  white: '#ffffff',
  bordeaux: '#4d1030',
  petroleum: '#2e4a50',
  blue: '#badbff',
};

const bordeaux = '#4d1030';
const white = '#ffffff';
const black = '#000000';

function channelLuminance(hex: string, index: number): number {
  const channel = Number.parseInt(hex.slice(index, index + 2), 16) / 255;
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  return (
    channelLuminance(hex, 1) * 0.2126 +
    channelLuminance(hex, 3) * 0.7152 +
    channelLuminance(hex, 5) * 0.0722
  );
}

function contrast(first: string, second: string): number {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

export function getCaseSectionColors(
  value: string | null | undefined,
  fallback: string,
  textColor?: string | null,
) {
  const backgroundColor =
    legacyColors[value || ''] ||
    (value && /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : fallback);
  const automaticForeground =
    contrast(backgroundColor, bordeaux) >= 4.5
      ? bordeaux
      : contrast(backgroundColor, white) >= 4.5
        ? white
        : black;
  const foregroundColor =
    textColor && /^#[0-9a-f]{6}$/i.test(textColor)
      ? textColor.toLowerCase()
      : automaticForeground;

  return { backgroundColor, foregroundColor };
}

export function getCaseSectionStyle(
  value: string | null | undefined,
  fallback: string,
  textColor?: string | null,
): string {
  const { backgroundColor, foregroundColor } = getCaseSectionColors(
    value,
    fallback,
    textColor,
  );
  return `--case-section-background:${backgroundColor};--case-section-foreground:${foregroundColor}`;
}
