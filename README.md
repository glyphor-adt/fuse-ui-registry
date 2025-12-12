# fuse-ui-registry

A pnpm workspace monorepo for template UI components with Next.js preview application.

## Structure

```
├── packages/
│   ├── template-core/     # Core logic with Zod validation
│   ├── template-kits/     # Config-driven template kits
│   └── ui/                # React UI components
├── apps/
│   └── preview/           # Next.js preview app
└── content/
    └── template.config.ts # Kit configuration (validated by Zod)
```

## Features

- ✅ pnpm workspace monorepo
- ✅ TypeScript throughout
- ✅ Zod validation for template configs
- ✅ Next.js App Router with Tailwind CSS
- ✅ Kit preview via `?kit=` query parameter
- ✅ GitHub Actions CI (lint, typecheck, build)
- ✅ No Math.random() or debug logs

## Getting Started

Install dependencies:
```bash
pnpm install
```

Run the preview app:
```bash
pnpm dev
```

Visit http://localhost:3000 to see available kits, or http://localhost:3000/?kit=hero to preview a specific kit.

## Development

Build all packages:
```bash
pnpm run build
```

Type check:
```bash
pnpm run typecheck
```

Lint:
```bash
pnpm run lint
```

## Adding New Kits

1. Add your kit configuration to `content/template.config.ts`
2. The configuration is validated by Zod at runtime
3. Access your kit via `?kit=<your-kit-id>`
