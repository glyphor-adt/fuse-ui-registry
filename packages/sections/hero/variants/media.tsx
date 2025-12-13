import * as React from 'react';
import { z } from 'zod';

export const mediaSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  mediaType: z.enum(['image', 'video']).optional(),
  mediaSrc: z.string().optional(),
  backgroundImage: z.string().optional(),
});

export type MediaHeroProps = z.infer<typeof mediaSchema>;

export function MediaHero({ title, subtitle, description, mediaType = 'image', mediaSrc, backgroundImage }: MediaHeroProps): JSX.Element {
  return (
    <div className="hero-media" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {description && <p className="hero-description">{description}</p>}
      </div>
      {mediaSrc && (
        <div className="hero-media-element">
          {mediaType === 'video' ? (
            <video src={mediaSrc} controls />
          ) : (
            <img src={mediaSrc} alt={title} />
          )}
        </div>
      )}
    </div>
  );
}

export const mediaPresets = [
  {
    name: 'Default',
    props: {
      title: 'Media-Rich Hero',
      subtitle: 'Engage with visual content',
      description: 'Capture attention with images or videos in your hero section.',
      mediaType: 'image' as const,
      mediaSrc: 'https://via.placeholder.com/800x600',
    },
  },
  {
    name: 'Video',
    props: {
      title: 'Video Hero',
      subtitle: 'Dynamic content',
      description: 'Use video to tell your story.',
      mediaType: 'video' as const,
      mediaSrc: 'https://example.com/video.mp4',
    },
  },
  {
    name: 'Background Image',
    props: {
      title: 'Hero with Background',
      subtitle: 'Stunning visuals',
      description: 'Full-screen background image for maximum impact.',
      backgroundImage: 'https://via.placeholder.com/1920x1080',
    },
  },
];

export const mediaMeta = {
  displayName: 'Media Hero',
  description: 'A hero section with rich media support including images, videos, and background images',
  tags: ['hero', 'media', 'image', 'video', 'background'],
};
