import { z } from "zod";

/**
 * Meta information about the marketing template
 */
export const MetaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  author: z.string().optional(),
  version: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * Brand configuration for the template
 */
export const BrandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  logo: z.string().url("Logo must be a valid URL").optional(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Primary color must be a valid hex color").optional(),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Secondary color must be a valid hex color").optional(),
});

/**
 * Theme configuration for the template
 */
export const ThemeSchema = z.object({
  mode: z.enum(["light", "dark", "auto"]).default("light"),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    background: z.string(),
    foreground: z.string(),
    accent: z.string().optional(),
    muted: z.string().optional(),
  }).optional(),
  fonts: z.object({
    heading: z.string().optional(),
    body: z.string().optional(),
  }).optional(),
  spacing: z.enum(["compact", "normal", "relaxed"]).optional(),
  borderRadius: z.enum(["none", "small", "medium", "large"]).optional(),
});

type NavItemType = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItemType[];
};

/**
 * Navigation item configuration
 */
export const NavItemSchema: z.ZodType<NavItemType> = z.object({
  label: z.string().min(1, "Nav item label is required"),
  href: z.string().min(1, "Nav item href is required"),
  external: z.boolean().optional(),
  children: z.array(z.lazy(() => NavItemSchema)).optional(),
});

/**
 * Navigation configuration
 */
export const NavSchema = z.object({
  items: z.array(NavItemSchema),
  logo: z.string().url("Nav logo must be a valid URL").optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(["primary", "secondary", "outline"]).optional(),
  }).optional(),
});

/**
 * Hero section configuration
 */
export const HeroSchema = z.object({
  title: z.string().min(1, "Hero title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url("Hero image must be a valid URL").optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(["primary", "secondary", "outline"]).optional(),
  }).optional(),
  secondaryCta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(["primary", "secondary", "outline"]).optional(),
  }).optional(),
  backgroundImage: z.string().url("Background image must be a valid URL").optional(),
  alignment: z.enum(["left", "center", "right"]).optional(),
});

/**
 * Generic section content item
 */
export const ContentItemSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url("Content item image must be a valid URL").optional(),
  href: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Generic section configuration
 */
export const SectionSchema = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  layout: z.enum(["single", "grid", "list", "carousel"]).optional(),
  columns: z.number().int().positive().optional(),
  content: z.union([z.array(ContentItemSchema), z.string()]).optional(),
  backgroundImage: z.string().url("Section background image must be a valid URL").optional(),
  backgroundColor: z.string().optional(),
  padding: z.enum(["none", "small", "medium", "large"]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Kit configuration for a reusable component kit
 */
export const KitSchema = z.object({
  id: z.string().min(1, "Kit id is required"),
  name: z.string().min(1, "Kit name is required"),
  description: z.string().optional(),
  sections: z.array(SectionSchema),
});

/**
 * Complete marketing template configuration schema
 */
export const TemplateConfigSchema = z.object({
  meta: MetaSchema.optional(),
  brand: BrandSchema.optional(),
  theme: ThemeSchema.optional(),
  nav: NavSchema.optional(),
  hero: HeroSchema.optional(),
  sections: z.array(SectionSchema).optional(),
  kits: z.array(KitSchema).optional(),
});

/**
 * TypeScript types inferred from schemas
 */
export type Meta = z.infer<typeof MetaSchema>;
export type Brand = z.infer<typeof BrandSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type NavItem = z.infer<typeof NavItemSchema>;
export type Nav = z.infer<typeof NavSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type ContentItem = z.infer<typeof ContentItemSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Kit = z.infer<typeof KitSchema>;
export type TemplateConfig = z.infer<typeof TemplateConfigSchema>;
