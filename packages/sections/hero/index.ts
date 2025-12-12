import { BasicHero, basicSchema, basicPresets, basicMeta } from './variants/basic';
import { SplitHero, splitSchema, splitPresets, splitMeta } from './variants/split';
import { MediaHero, mediaSchema, mediaPresets, mediaMeta } from './variants/media';

export const variants = {
  basic: {
    slug: 'basic',
    Component: BasicHero,
    schema: basicSchema,
    presets: basicPresets,
    meta: basicMeta,
  },
  split: {
    slug: 'split',
    Component: SplitHero,
    schema: splitSchema,
    presets: splitPresets,
    meta: splitMeta,
  },
  media: {
    slug: 'media',
    Component: MediaHero,
    schema: mediaSchema,
    presets: mediaPresets,
    meta: mediaMeta,
  },
};

export const variantList = ['basic', 'split', 'media'] as const;

export default variants;
