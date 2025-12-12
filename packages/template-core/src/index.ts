/**
 * @fuse-ui/template-core
 *
 * Core schema and validation for Fuse UI marketing template configurations.
 * This package provides Zod schemas and TypeScript types for defining
 * marketing templates with meta, brand, theme, navigation, hero, and sections.
 *
 * @example
 * ```typescript
 * import { validateTemplateConfig, type TemplateConfig } from '@fuse-ui/template-core';
 *
 * const config: TemplateConfig = {
 *   meta: {
 *     title: 'My Marketing Template',
 *     description: 'A beautiful template',
 *     version: '1.0.0'
 *   },
 *   brand: {
 *     name: 'Acme Corp',
 *     primaryColor: '#3B82F6'
 *   },
 *   theme: {
 *     mode: 'light'
 *   },
 *   nav: {
 *     items: [
 *       { label: 'Home', href: '/' },
 *       { label: 'About', href: '/about' }
 *     ]
 *   },
 *   hero: {
 *     title: 'Welcome to Acme',
 *     subtitle: 'The best products in the world'
 *   },
 *   sections: [
 *     {
 *       type: 'features',
 *       title: 'Our Features',
 *       layout: 'grid',
 *       content: []
 *     }
 *   ]
 * };
 *
 * // Validate the config - throws clear errors in dev
 * const validated = validateTemplateConfig(config);
 * ```
 */

// Export all schemas
export {
  MetaSchema,
  BrandSchema,
  ThemeSchema,
  NavItemSchema,
  NavSchema,
  HeroSchema,
  ContentItemSchema,
  SectionSchema,
  TemplateConfigSchema,
} from "./schema";

// Export all types
export type {
  Meta,
  Brand,
  Theme,
  NavItem,
  Nav,
  Hero,
  ContentItem,
  Section,
  TemplateConfig,
} from "./schema";

// Export validation functions and error class
export {
  validateTemplateConfig,
  safeValidateTemplateConfig,
  TemplateValidationError,
} from "./validator";
