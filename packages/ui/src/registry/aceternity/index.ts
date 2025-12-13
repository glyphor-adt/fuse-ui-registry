export * as ui from "./ui";
export * as sections from "./sections";

export const aceternityProvider = "aceternity" as const;

export const aceternityRegistry = {
  provider: aceternityProvider,
  ui: ui.aceternityUiMetas,
  sections: sections.aceternitySectionMetas,
} as const;
