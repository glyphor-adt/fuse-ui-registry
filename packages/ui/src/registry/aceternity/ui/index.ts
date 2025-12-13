export { BentoGrid, BentoGridItem, aceternityBentoGridMeta } from "./bento-grid";
export { HeroParallax, Header as HeroParallaxHeader, ProductCard as HeroParallaxProductCard, aceternityHeroParallaxMeta } from "./hero-parallax";
export { Timeline, type TimelineEntry, aceternityTimelineMeta } from "./timeline";
export { BackgroundBeams, aceternityBackgroundBeamsMeta } from "./background-beams";

import { aceternityBentoGridMeta } from "./bento-grid";
import { aceternityHeroParallaxMeta } from "./hero-parallax";
import { aceternityTimelineMeta } from "./timeline";
import { aceternityBackgroundBeamsMeta } from "./background-beams";

export const aceternityUiMetas = [
  aceternityBentoGridMeta,
  aceternityHeroParallaxMeta,
  aceternityTimelineMeta,
  aceternityBackgroundBeamsMeta,
] as const;
