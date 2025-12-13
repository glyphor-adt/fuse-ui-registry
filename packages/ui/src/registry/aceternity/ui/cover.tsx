export * from "./cover/cover";

import type { RegistryItemMeta } from "../../types";

export const aceternityCoverMeta = {
	id: "aceternity/ui/cover",
	provider: "aceternity",
	kind: "ui",
	name: "cover",
	title: "Cover",
	categories: [],
	tags: [],
	source: {
		registryUrl: "https://ui.aceternity.com/registry/cover.json",
		docsUrl: "https://ui.aceternity.com/components/cover",
	},
	dependencies: {
		npm: [
		  "motion"
		],
	},
} satisfies RegistryItemMeta;
