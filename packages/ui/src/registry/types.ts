export type RegistryProvider = "aceternity" | "reactbits" | "heroui" | (string & {});

export type RegistryItemKind = "ui" | "section";

export interface RegistryItemSource {
  registryUrl?: string;
  docsUrl?: string;
  homepageUrl?: string;
}

export interface RegistryItemDependencies {
  npm?: string[];
  registry?: string[];
}

export interface RegistryItemMeta {
  /** Stable ID for agent indexing, e.g. "aceternity/ui/bento-grid" */
  id: string;

  provider: RegistryProvider;
  kind: RegistryItemKind;

  /** Registry item name, e.g. "bento-grid" */
  name: string;

  title?: string;
  description?: string;

  /** Free-form categories like "hero", "cta", "features", etc. */
  categories?: string[];

  /** Free-form tags like "animation", "grid", "dark", etc. */
  tags?: string[];

  source?: RegistryItemSource;
  dependencies?: RegistryItemDependencies;

  /** ISO timestamp for when the item was pulled/added */
  addedAt?: string;
}

export interface RegistryItem<T = unknown> {
  meta: RegistryItemMeta;
  value: T;
}
