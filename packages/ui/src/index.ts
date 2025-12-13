// Export components
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Card } from './components/Card';
export type { CardProps } from './components/Card';

export { Container } from './components/Container';
export type { ContainerProps } from './components/Container';

export { Section } from './components/Section';
export type { SectionProps } from './components/Section';

export { Heading } from './components/Heading';
export type { HeadingProps } from './components/Heading';

export { Text } from './components/Text';
export type { TextProps } from './components/Text';

export { KitRenderer } from './KitRenderer';

// Registry exports (provider namespaced)
export * as registry from './registry';
export * as aceternity from './registry/aceternity';

// Convenience named exports (prefixed to avoid collisions across providers)
export {
	BentoGrid as AceternityBentoGrid,
	BentoGridItem as AceternityBentoGridItem,
	aceternityBentoGridMeta,
} from "./registry/aceternity/ui/bento-grid";
export {
	HeroParallax as AceternityHeroParallax,
	Header as AceternityHeroParallaxHeader,
	ProductCard as AceternityHeroParallaxProductCard,
	aceternityHeroParallaxMeta,
} from "./registry/aceternity/ui/hero-parallax";
export {
	Timeline as AceternityTimeline,
	type TimelineEntry as AceternityTimelineEntry,
	aceternityTimelineMeta,
} from "./registry/aceternity/ui/timeline";
export {
	BackgroundBeams as AceternityBackgroundBeams,
	aceternityBackgroundBeamsMeta,
} from "./registry/aceternity/ui/background-beams";

// Aceternity sections
export {
	HeroSectionDemo1 as AceternityHeroSectionDemo1,
	aceternityHeroSectionDemo1Meta,
} from "./registry/aceternity/sections/hero-section-demo-1";
export {
	FeaturesSectionDemo1 as AceternityFeaturesSectionDemo1,
	aceternityFeaturesSectionDemo1Meta,
} from "./registry/aceternity/sections/features-section-demo-1";
export {
	FeaturesSectionDemo2 as AceternityFeaturesSectionDemo2,
	aceternityFeaturesSectionDemo2Meta,
} from "./registry/aceternity/sections/features-section-demo-2";
export {
	FeaturesSectionDemo3 as AceternityFeaturesSectionDemo3,
	aceternityFeaturesSectionDemo3Meta,
} from "./registry/aceternity/sections/features-section-demo-3";
export {
	CardsDemo1 as AceternityCardsDemo1,
	aceternityCardsDemo1Meta,
} from "./registry/aceternity/sections/cards-demo-1";
export {
	CardsDemo2 as AceternityCardsDemo2,
	aceternityCardsDemo2Meta,
} from "./registry/aceternity/sections/cards-demo-2";
export {
	CardsDemo3 as AceternityCardsDemo3,
	CardsDemo3Card as AceternityCardsDemo3Card,
	CardsDemo3CardTitle as AceternityCardsDemo3CardTitle,
	CardsDemo3CardDescription as AceternityCardsDemo3CardDescription,
	CardsDemo3CardSkeletonContainer as AceternityCardsDemo3CardSkeletonContainer,
	aceternityCardsDemo3Meta,
} from "./registry/aceternity/sections/cards-demo-3";
