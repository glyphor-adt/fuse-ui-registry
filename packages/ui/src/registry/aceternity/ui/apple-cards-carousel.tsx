export * from "./apple-cards-carousel/apple-cards-carousel";

import type { RegistryItemMeta } from "../../types";

export const aceternityAppleCardsCarouselMeta = {
	id: "aceternity/ui/apple-cards-carousel",
	provider: "aceternity",
	kind: "ui",
	name: "apple-cards-carousel",
	title: "Apple Cards Carousel",
	categories: [],
	tags: [],
	source: {
		registryUrl: "https://ui.aceternity.com/registry/apple-cards-carousel.json",
		docsUrl: "https://ui.aceternity.com/components/apple-cards-carousel",
	},
	dependencies: {
		npm: [
		  "@tabler/icons-react",
		  "motion"
		],
	},
} satisfies RegistryItemMeta;
