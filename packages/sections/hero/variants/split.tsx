import * as React from 'react';
import { z } from 'zod';

export const splitSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  imagePosition: z.enum(['left', 'right']).optional(),
});

export type SplitHeroProps = z.infer<typeof splitSchema>;

export function SplitHero({ title, subtitle, description, image, imagePosition = 'right' }: SplitHeroProps): JSX.Element {
  return (
    <div className={`hero-split hero-split-${imagePosition}`}>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {description && <p className="hero-description">{description}</p>}
      </div>
      {image && (
        <div className="hero-image">
          <img src={image} alt={title} />
        </div>
      )}
    </div>
  );
}

export const splitPresets = [
  {
    name: 'Default',
    props: {
      title: 'Split Layout Hero',
      subtitle: 'Two columns for better content',
      description: 'Showcase your content with a beautiful split layout design.',
      image: 'https://via.placeholder.com/600x400',
      imagePosition: 'right' as const,
    },
  },
  {
    name: 'Image Left',
    props: {
      title: 'Image on Left',
      subtitle: 'Alternative layout',
      description: 'Same great content, different arrangement.',
      image: 'https://via.placeholder.com/600x400',
      imagePosition: 'left' as const,
    },
  },
];

export const splitMeta = {
  displayName: 'Split Hero',
  description: 'A hero section with content split into two columns, with an optional image',
  tags: ['hero', 'split', 'two-column', 'image'],
};
