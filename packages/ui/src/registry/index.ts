export type { RegistryItem, RegistryItemMeta, RegistryItemKind, RegistryProvider } from "./types";

export * as aceternity from "./aceternity";

export const allRegistryMetas = {
  aceternity: [
	...aceternity.aceternityRegistry.ui,
	...aceternity.aceternityRegistry.sections,
  ],
} as const;

