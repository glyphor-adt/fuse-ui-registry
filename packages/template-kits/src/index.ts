import { validateTemplateConfig, type TemplateConfig } from '@fuse-ui-registry/template-core';

export function loadTemplateConfig(config: unknown): TemplateConfig {
  return validateTemplateConfig(config);
}

export { getKitById } from '@fuse-ui-registry/template-core';
export type { TemplateConfig, Kit, Section } from '@fuse-ui-registry/template-core';
