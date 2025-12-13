export * from "./card-spotlight/card-spotlight";

import type { RegistryItemMeta } from "../../types";

export const aceternityCardSpotlightMeta = {
	id: "aceternity/ui/card-spotlight",
	provider: "aceternity",
	kind: "ui",
	name: "card-spotlight",
	title: "Card Spotlight",
	categories: [],
	tags: [],
	source: {
		registryUrl: "https://ui.aceternity.com/registry/card-spotlight.json",
		docsUrl: "https://ui.aceternity.com/components/card-spotlight",
	},
	dependencies: {
		npm: [
		  "motion"
		],
	},
} satisfies RegistryItemMeta;
