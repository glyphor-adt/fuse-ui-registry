# @fuse-ui/ui

Minimal UI primitives with Tailwind CSS. Stateless, deterministic components with className overrides.

## Installation

```bash
npm install @fuse-ui/ui
```

## Features

- ✅ Stateless and deterministic components
- ✅ Full TypeScript support with strict typing
- ✅ Tailwind CSS styling
- ✅ className overrides for customization
- ✅ ESLint configured with strict rules
- ✅ Zero runtime dependencies (except clsx)

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@fuse-ui/ui';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With className override
<Button className="w-full">Full Width</Button>

// With HTML button attributes
<Button onClick={() => console.log('clicked')} disabled>
  Disabled
</Button>
```

### Card

A card container for grouping related content.

```tsx
import { Card } from '@fuse-ui/ui';

// Basic usage
<Card>
  <div className="p-4">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </div>
</Card>

// With variants
<Card variant="default">Default Card</Card>
<Card variant="bordered">Bordered Card</Card>
<Card variant="elevated">Elevated Card</Card>

// With className override
<Card className="p-6 hover:shadow-xl transition-shadow">
  Hover effect card
</Card>
```

### Container

A responsive container for page layouts.

```tsx
import { Container } from '@fuse-ui/ui';

// Basic usage
<Container>
  <p>Your content here</p>
</Container>

// With different sizes
<Container size="sm">Small container</Container>
<Container size="md">Medium container</Container>
<Container size="lg">Large container</Container>
<Container size="xl">Extra large container</Container>
<Container size="full">Full width container</Container>

// With className override
<Container className="bg-gray-50">
  Styled container
</Container>
```

### Section

A semantic section element with spacing controls.

```tsx
import { Section } from '@fuse-ui/ui';

// Basic usage
<Section>
  <h2>Section Title</h2>
  <p>Section content</p>
</Section>

// With different spacing
<Section spacing="sm">Small spacing</Section>
<Section spacing="md">Medium spacing</Section>
<Section spacing="lg">Large spacing</Section>
<Section spacing="xl">Extra large spacing</Section>

// With className override
<Section className="bg-blue-50">
  Colored section
</Section>
```

### Heading

Responsive heading component with semantic levels.

```tsx
import { Heading } from '@fuse-ui/ui';

// Different heading levels
<Heading level={1}>Main Title</Heading>
<Heading level={2}>Subtitle</Heading>
<Heading level={3}>Section Title</Heading>
<Heading level={4}>Subsection</Heading>
<Heading level={5}>Minor Heading</Heading>
<Heading level={6}>Small Heading</Heading>

// With className override
<Heading level={1} className="text-blue-600 mb-4">
  Custom styled heading
</Heading>
```

### Text

A flexible text component with size and variant options.

```tsx
import { Text } from '@fuse-ui/ui';

// Basic usage
<Text>Regular paragraph text</Text>

// With sizes
<Text size="xs">Extra small text</Text>
<Text size="sm">Small text</Text>
<Text size="base">Base text</Text>
<Text size="lg">Large text</Text>
<Text size="xl">Extra large text</Text>

// With variants
<Text variant="default">Default text</Text>
<Text variant="muted">Muted text</Text>
<Text variant="light">Light text</Text>

// With className override
<Text className="font-semibold text-center">
  Custom styled text
</Text>
```

## Usage in Templates

### Complete Page Example

```tsx
import {
  Container,
  Section,
  Heading,
  Text,
  Card,
  Button,
} from '@fuse-ui/ui';
import '@fuse-ui/ui/src/globals.css';

export default function HomePage() {
  return (
    <main>
      <Section spacing="xl" className="bg-gradient-to-b from-blue-50 to-white">
        <Container size="lg">
          <Heading level={1} className="text-center mb-6">
            Welcome to Fuse UI
          </Heading>
          <Text variant="muted" className="text-center mb-8">
            Build beautiful interfaces with minimal primitives
          </Text>
          <div className="flex justify-center gap-4">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="elevated" className="p-6">
              <Heading level={3} className="mb-4">
                Feature One
              </Heading>
              <Text variant="muted">
                Description of the first feature
              </Text>
            </Card>
            <Card variant="elevated" className="p-6">
              <Heading level={3} className="mb-4">
                Feature Two
              </Heading>
              <Text variant="muted">
                Description of the second feature
              </Text>
            </Card>
            <Card variant="elevated" className="p-6">
              <Heading level={3} className="mb-4">
                Feature Three
              </Heading>
              <Text variant="muted">
                Description of the third feature
              </Text>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
```

### Form Example

```tsx
import { Container, Card, Heading, Text, Button } from '@fuse-ui/ui';

export function ContactForm() {
  return (
    <Container size="sm">
      <Card className="p-8">
        <Heading level={2} className="mb-2">
          Contact Us
        </Heading>
        <Text variant="muted" className="mb-6">
          Fill out the form below to get in touch
        </Text>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Card>
    </Container>
  );
}
```

## Styling with globals.css

Import the global styles in your application entry point:

```tsx
// In your _app.tsx, layout.tsx, or main entry file
import '@fuse-ui/ui/src/globals.css';
```

This includes Tailwind's base, components, and utilities layers.

## TypeScript

All components are fully typed with TypeScript. Props interfaces are exported for convenience:

```tsx
import type { ButtonProps, CardProps, ContainerProps } from '@fuse-ui/ui';

// Use in your own component types
type MyButtonProps = ButtonProps & {
  customProp?: string;
};
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Lint
npm run lint

# Lint and fix
npm run lint:fix
```

## License

MIT
