import { z } from 'zod';

export const TemplateConfigSchema = z.object({
  kits: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      sections: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
        })
      ),
    })
  ),
});

export type TemplateConfig = z.infer<typeof TemplateConfigSchema>;
export type Kit = TemplateConfig['kits'][number];
export type Section = Kit['sections'][number];

export function validateTemplateConfig(config: unknown): TemplateConfig {
  return TemplateConfigSchema.parse(config);
}

export function getKitById(config: TemplateConfig, kitId: string): Kit | undefined {
  return config.kits.find((kit) => kit.id === kitId);
}
