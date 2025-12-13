import * as React from 'react';
import { z } from 'zod';

export const basicSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
});

export type BasicHeroProps = z.infer<typeof basicSchema>;

export function BasicHero({ title, subtitle, description }: BasicHeroProps): JSX.Element {
  return (
    <div className="hero-basic">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {description && <p className="hero-description">{description}</p>}
      </div>
    </div>
  );
}

export const basicPresets = [
  {
    name: 'Default',
    props: {
      title: 'Welcome to Our Platform',
      subtitle: 'Build amazing things',
      description: 'Start your journey with our powerful tools and features.',
    },
  },
  {
    name: 'Simple',
    props: {
      title: 'Simple Hero',
    },
  },
];

export const basicMeta = {
  displayName: 'Basic Hero',
  description: 'A simple hero section with title, subtitle, and description',
  tags: ['hero', 'basic', 'simple'],
};
