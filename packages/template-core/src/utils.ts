import type { TemplateConfig, Kit } from "./schema";

/**
 * Get a kit by ID from a template configuration
 * 
 * @param config - The template configuration
 * @param kitId - The ID of the kit to find
 * @returns The kit if found, undefined otherwise
 * 
 * @example
 * ```typescript
 * const kit = getKitById(config, 'hero');
 * if (kit) {
 *   console.log('Found kit:', kit.name);
 * }
 * ```
 */
export function getKitById(config: TemplateConfig, kitId: string): Kit | undefined {
  return config.kits?.find((kit) => kit.id === kitId);
}
