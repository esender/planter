# AGENTS.md - Agentic Coding Guidelines for Planter

This file provides guidelines for agentic coding agents working in this repository.

## Project Overview

Planter is an Astro-based plant care tracking website deployed to Cloudflare Pages. It uses content collections for plant data and Tailwind CSS for styling.

## Tech Stack

- **Framework**: Astro 5.x with Cloudflare Pages adapter
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **Content**: Astro Content Collections (markdown)
- **Deployment**: Cloudflare Workers/Pages via Wrangler

---

## Build / Lint / Test Commands

### Core Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally before deploying |
| `npm run astro check` | Run Astro's built-in type checking |
| `npm run astro sync` | Sync content collections and generate types |

### Running a Single Test

This project does not have a test framework configured. To add tests, consider using:
- Vitest for unit/component tests
- Playwright for E2E tests

### Type Checking

```bash
# Full type check (runs as part of build)
npm run astro check

# Or with npx
npx astro check
```

---

## Code Style Guidelines

### General Principles

- Follow Astro's official conventions and best practices
- Use strict TypeScript mode (extends `astro/tsconfigs/strict`)
- Keep components small and focused
- Use semantic HTML elements
- Prefer composition over complex abstractions

### Imports

- Use explicit relative imports for local files: `import PlantLayout from '../layouts/PlantLayout.astro';`
- Use astro: imports for built-in features: `import { getCollection } from 'astro:content';`
- Group imports: external libraries first, then local imports

### File Naming

- Astro components: `PascalCase.astro` (e.g., `PlantLayout.astro`)
- Pages: `kebab-case.astro` or `[slug].astro` for dynamic routes
- TypeScript files: `camelCase.ts` or `kebab-case.ts`
- Content: `kebab-case.md` for markdown files

### TypeScript Conventions

- Enable strict mode in tsconfig.json
- Use explicit types for component props (interface Props)
- Define schemas using Zod for content collections
- Use enums for fixed sets of values

Example from this codebase:
```typescript
// Content collection schema
import { defineCollection, z } from 'astro:content';

const waterEnum = z.enum([
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'rarely',
  'keep moist',
]);

const lightAmountEnum = z.enum([
  'low',
  'medium',
  'bright',
]);

const lightTypeEnum = z.enum([
  'direct',
  'indirect',
]);

const difficultyEnum = z.enum(['easy', 'medium', 'hard']);

const plants = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    water: waterEnum,
    lightAmount: lightAmountEnum,
    lightType: lightTypeEnum,
    difficulty: difficultyEnum.default('easy'),
  }),
});

// Component props
interface Props {
  title: string;
}
```

### Astro Component Structure

```astro
---
// Frontmatter: imports, types, logic
import Layout from '../layouts/Layout.astro';

const { prop } = Astro.props;
const computed = something();
---

<!-- Template: HTML + expressions -->
<Layout>
  <element>{computed}</element>
</Layout>
```

### Tailwind CSS

- Use Tailwind v4 with `@tailwindcss/vite` plugin
- Use semantic color palette (e.g., `text-stone-700`, `bg-stone-50`)
- Prefer utility classes over custom CSS
- Use `prose` from `@tailwindcss/typography` for markdown content

### Error Handling

- Let errors bubble up in development for visibility
- Use try/catch for async operations that might fail
- Provide fallback UI for content that might be missing

### Dynamic Routes

- Use `[slug].astro` pattern for dynamic pages
- Implement `getStaticPaths()` for SSG mode
- Access props via `Astro.props`

Example:
```astro
---
export async function getStaticPaths() {
  const plants = await getCollection('plants');
  return plants.map((plant) => ({
    params: { slug: plant.slug },
    props: { plant },
  }));
}

const { plant } = Astro.props;
---
```

---

## Content Collections

- Add new plants as markdown files in `src/content/plants/`
- Use frontmatter for metadata (title, image, water, light, difficulty)
- Use the schema defined in `src/content/config.ts`

---

## Deployment

- Build output goes to `./dist/`
- Deploy via Wrangler: `npx wrangler pages deploy dist`
- Preview deployment: `npx wrangler pages dev dist`

---

## VS Code Extensions

Recommended extensions (auto-suggested via `.vscode/extensions.json`):
- Astro VS Code (`astro-build.astro-vscode`)

---

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro configuration |
| `tsconfig.json` | TypeScript configuration |
| `wrangler.jsonc` | Cloudflare deployment config |
| `src/content/config.ts` | Content collection schemas |
| `src/layouts/*.astro` | Page layouts |
| `src/pages/*.astro` | Route pages |
| `src/styles/global.css` | Global styles |

---

## Conventions

1. **No comments** - Avoid adding comments unless explaining complex business logic
2. **No Prettier** - Code should be formatted by Astro/Vite defaults
3. **No ESLint** - Rely on TypeScript strict mode and Astro's built-in checks
4. **No test framework** - Not currently configured; add if needed
5. **Mobile-first** - Design for mobile first (max-w-md is used in layouts)
6. **Static generation** - Use SSG mode unless dynamic features require SSR
