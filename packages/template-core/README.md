# @fuse-ui/template-core

Core schema and validation for Fuse UI marketing template configurations.

## Overview

This package provides **schema-only** validation for marketing template configurations. It contains:

- **Zod schemas** for canonical template structure (meta, brand, theme, nav, hero, sections)
- **TypeScript types** inferred from the schemas
- **Validation helpers** that throw clear, actionable errors in development
- **Zero framework dependencies** - just schema and helpers

## Installation

```bash
npm install @fuse-ui/template-core
# or
yarn add @fuse-ui/template-core
# or
pnpm add @fuse-ui/template-core
```

## Contract

### Template Configuration Structure

A valid template configuration must include:

1. **`meta`** - Template metadata (title, description, author, version, tags)
2. **`brand`** - Brand information (name, logo, colors)
3. **`theme`** - Theme settings (mode, colors, fonts, spacing, border radius)
4. **`nav`** - Navigation configuration (items, logo, CTA)
5. **`hero`** - Hero section (title, subtitle, description, image, CTAs)
6. **`sections`** - Array of content sections (type, layout, content items)

## Usage

### Basic Validation

```typescript
import { validateTemplateConfig } from '@fuse-ui/template-core';

const config = {
  meta: {
    title: 'My Marketing Template',
    description: 'A beautiful template for marketing pages',
    version: '1.0.0'
  },
  brand: {
    name: 'Acme Corporation',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981'
  },
  theme: {
    mode: 'light',
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#FFFFFF',
      foreground: '#1F2937'
    }
  },
  nav: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ],
    cta: {
      label: 'Get Started',
      href: '/signup',
      variant: 'primary'
    }
  },
  hero: {
    title: 'Welcome to Acme',
    subtitle: 'The best products in the world',
    description: 'We build amazing things that help you succeed.',
    cta: {
      label: 'Learn More',
      href: '/learn',
      variant: 'primary'
    }
  },
  sections: [
    {
      type: 'features',
      title: 'Our Features',
      layout: 'grid',
      columns: 3,
      content: [
        {
          type: 'feature',
          title: 'Fast',
          description: 'Lightning fast performance'
        },
        {
          type: 'feature',
          title: 'Reliable',
          description: '99.9% uptime guarantee'
        },
        {
          type: 'feature',
          title: 'Secure',
          description: 'Enterprise-grade security'
        }
      ]
    }
  ]
};

try {
  const validated = validateTemplateConfig(config);
  console.log('✅ Configuration is valid!');
} catch (error) {
  console.error('❌ Validation failed:', error.message);
  // In development, this will show clear, actionable errors
}
```

### Safe Validation (No Exceptions)

```typescript
import { safeValidateTemplateConfig } from '@fuse-ui/template-core';

const result = safeValidateTemplateConfig(config);

if (result.success) {
  console.log('Valid config:', result.data);
} else {
  console.error('Validation errors:');
  result.errors.forEach(err => {
    console.error(`  - ${err.path}: ${err.message}`);
  });
}
```

### Using TypeScript Types

```typescript
import type { TemplateConfig, Hero, Section } from '@fuse-ui/template-core';

// Type-safe configuration
const hero: Hero = {
  title: 'Welcome',
  subtitle: 'To our site'
};

const section: Section = {
  type: 'content',
  title: 'About Us',
  layout: 'single'
};

const config: TemplateConfig = {
  // TypeScript will ensure this matches the schema
  // ...
};
```

### Individual Schema Validation

```typescript
import { HeroSchema, SectionSchema } from '@fuse-ui/template-core';

// Validate just a hero section
const hero = HeroSchema.parse({
  title: 'Welcome',
  subtitle: 'To our amazing product'
});

// Validate just a section
const section = SectionSchema.parse({
  type: 'features',
  title: 'Key Features',
  layout: 'grid'
});
```

## Schema Details

### Meta

```typescript
{
  title: string;          // Required, min 1 character
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
}
```

### Brand

```typescript
{
  name: string;           // Required, min 1 character
  logo?: string;          // Must be valid URL
  primaryColor?: string;  // Must be valid hex color (#RRGGBB)
  secondaryColor?: string; // Must be valid hex color (#RRGGBB)
}
```

### Theme

```typescript
{
  mode: 'light' | 'dark' | 'auto';  // Default: 'light'
  colors?: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent?: string;
    muted?: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
  spacing?: 'compact' | 'normal' | 'relaxed';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
}
```

### Nav

```typescript
{
  items: NavItem[];       // Array of navigation items
  logo?: string;          // Must be valid URL
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
}

// NavItem supports nested children
interface NavItem {
  label: string;          // Required, min 1 character
  href: string;           // Required, min 1 character
  external?: boolean;
  children?: NavItem[];   // Recursive nesting
}
```

### Hero

```typescript
{
  title: string;          // Required, min 1 character
  subtitle?: string;
  description?: string;
  image?: string;         // Must be valid URL
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  secondaryCta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  backgroundImage?: string; // Must be valid URL
  alignment?: 'left' | 'center' | 'right';
}
```

### Section

```typescript
{
  id?: string;
  type: string;           // Required, min 1 character
  title?: string;
  subtitle?: string;
  description?: string;
  layout?: 'single' | 'grid' | 'list' | 'carousel';
  columns?: number;       // Positive integer
  content?: ContentItem[];
  backgroundImage?: string; // Must be valid URL
  backgroundColor?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  metadata?: Record<string, unknown>;
}
```

### ContentItem

```typescript
{
  id?: string;
  type: string;           // Required
  title?: string;
  description?: string;
  image?: string;         // Must be valid URL
  href?: string;
  metadata?: Record<string, unknown>;
}
```

## Error Handling

The `validateTemplateConfig` function throws a `TemplateValidationError` with clear, actionable error messages:

```typescript
import { validateTemplateConfig, TemplateValidationError } from '@fuse-ui/template-core';

try {
  validateTemplateConfig(invalidConfig);
} catch (error) {
  if (error instanceof TemplateValidationError) {
    console.error(error.message);
    // Template configuration validation failed:
    //   - meta.title: Title is required
    //   - brand.primaryColor: Primary color must be a valid hex color
    //   - hero.title: Hero title is required
    // 
    // Please fix the above errors and try again.
    
    // Access structured errors
    error.errors.forEach(err => {
      console.log(`${err.path}: ${err.message}`);
    });
  }
}
```

## Design Principles

1. **Schema-only**: No framework code, just validation schemas and helpers
2. **Strict TypeScript**: Full type safety with strict compiler options
3. **Clear errors**: Actionable error messages for development
4. **Zero dependencies**: Only Zod for schema validation
5. **Extensible**: Use schemas individually or compose them

## License

MIT
