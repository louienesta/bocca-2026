import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';

import { sanityClient } from './client';
import type { SanityImageData } from './types';

const imageBuilder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export interface ImageUrlOptions {
  width: number;
  height?: number;
  fit?: 'cover' | 'contain';
  quality?: number;
}

export function getSanityImageUrl(
  image: SanityImageData | undefined,
  { width, height, fit = 'cover', quality = 85 }: ImageUrlOptions,
): string | undefined {
  if (!image?.asset || !imageBuilder) return image?.asset?.url;

  let builder = imageBuilder
    .image(image as SanityImageSource)
    .width(width)
    .auto('format')
    .quality(quality);

  if (fit === 'cover' && height) {
    builder = builder.height(height).fit('crop');
  } else {
    builder = builder.fit('max');
  }

  return builder.url();
}
