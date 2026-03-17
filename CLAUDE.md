# CLAUDE.md — finneh.xyz Portfolio

This file provides guidance for AI assistants working in this repository.

---

## Workflow Orchestration

### 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

---

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

---

## Project Overview

**finneh.xyz** is the personal portfolio of Ethan Cornwill, an AI Engineer & Technical Lead. It is a static Astro v5 site with a Neo-Brutalist / cyberpunk aesthetic, deployed as a Multi-Page Application (MPA).

- **Live site:** https://finneh.xyz
- **Owner:** Ethan Cornwill (mail@finneh.xyz)
- **Version:** 1.4.0

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro v5 |
| UI Library | React 18 (selective, interactive islands only) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 + DaisyUI v5 |
| CSS Processing | PostCSS + Autoprefixer |
| Content | MDX (blog posts, ADRs) |
| Icons | astro-icon + @iconify-json/mdi |
| Carousel | Swiper v11 |
| Build Tool | Vite 6 (via Astro) |

---

## Development Commands

```bash
npm run dev       # Start dev server (auto-syncs data files first)
npm run build     # Production build to /dist
npm run preview   # Preview production build locally
```

The `predev` and `prebuild` hooks automatically run `scripts/ensure-data-files.cjs`, which copies JSON files from `src/data/` to `public/data/` so they are available during development.

There is no `npm test` script in `package.json`. Vitest is used for unit tests; run them directly with `npx vitest`.

---

## Repository Structure

```
finnehxyz/
├── src/
│   ├── components/          # Astro and React components
│   │   ├── cells/           # Bento grid cell components
│   │   ├── sections/        # Full-page section components
│   │   ├── ui/              # Shared UI utilities (modals, search, etc.)
│   │   ├── education/       # Education-specific components
│   │   ├── professional-experience/
│   │   ├── projects/
│   │   └── skills/
│   ├── content/             # MDX/MD content (blog posts, ADRs)
│   │   ├── blog/
│   │   └── architecture/    # Architecture Decision Records
│   ├── data/                # JSON data layer (single source of truth)
│   │   ├── experience.json
│   │   ├── education.json
│   │   ├── projects.json
│   │   ├── projects.ts      # TypeScript interfaces + extended project data
│   │   ├── skills.json
│   │   ├── heroData.ts
│   │   └── testimonials.json
│   ├── layouts/             # Page layout templates
│   ├── pages/               # File-based routing
│   ├── styles/              # Design tokens and global styles
│   ├── utils/               # Helper functions (SEO, color mapping, etc.)
│   └── index.css            # Global styles + Tailwind directives
├── public/                  # Static assets (served as-is)
├── scripts/                 # Build automation scripts
├── docs/                    # Developer documentation
├── specs/                   # Project specifications
├── astro.config.mjs         # Astro configuration
├── tailwind.config.js       # Tailwind + DaisyUI configuration
├── postcss.config.js        # PostCSS configuration
├── eslint.config.js         # ESLint rules
└── design_tokens.json       # Neo-Brutalist design token reference
```

---

## Architecture

### Islands Architecture

This site uses Astro's Islands Architecture:

- **Static components** (`.astro` files) — render to pure HTML at build time, zero JavaScript shipped.
- **Interactive components** (`.jsx`/`.tsx` files) — use React with client hydration directives only when interactivity is needed.

Hydration directives in use:
- `client:load` — hydrate immediately on page load
- `client:visible` — hydrate when the component scrolls into view

**Prefer static `.astro` components.** Only use React when user interaction is required (e.g., command palette, search filter, carousels, boot sequence animation).

### Bento Grid Layout

The home page uses a custom CSS Grid bento grid system. Grid cells live in `src/components/cells/`. The layout uses named grid areas, responsive breakpoints (1 column mobile → 4 columns desktop), and the `.bento-grid` utility class.

### Data Layer

All content is stored as JSON files in `src/data/`. There is no CMS or external API — all data is imported at build time and pre-rendered.

- To add a new project: edit `src/data/projects.json` (and optionally `src/data/projects.ts` for TypeScript-typed extended data).
- To update experience, education, or skills: edit the corresponding JSON file.
- Content changes are reflected immediately after the next `npm run dev` or `npm run build`.

---

## Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProjectCard.astro`, `HeroSection.jsx` |
| Utilities | camelCase | `getNeoColor.js`, `seo.js` |
| Directories | kebab-case | `src/professional-experience/` |
| CSS classes | Tailwind utilities + `cyber-*` prefix for custom tokens | `bg-cyber-bg`, `text-cyber-cyan` |

---

## Design System

The site uses a **Neo-Brutalist / Cyberpunk** design language.

### Color Palette (`tailwind.config.js`)

```
cyber-bg:           #0a0a0f   (primary background)
cyber-surface:      #12121a
cyber-surface-light:#1a1a2e
cyber-border:       #2a2a3a
cyber-text:         #e0e0e8
cyber-text-muted:   #8888a0

Neon accents:
cyber-cyan:         #00fff5
cyber-magenta:      #ff00ff
cyber-yellow:       #f0ff00
cyber-green:        #39ff14
cyber-orange:       #ff6600
cyber-pink:         #ff2d7b
cyber-blue:         #00b4d8
cyber-purple:       #b75cff
```

The `neo-*` color aliases are kept for backward compatibility only. Prefer `cyber-*` in all new code.

### Shadow System

```
shadow-brutal-sm  → 3px  offset, hard edge
shadow-brutal-md  → 5px  offset
shadow-brutal-lg  → 8px  offset
shadow-brutal-xl  → 12px offset
shadow-glow-cyan  → neon glow effect
shadow-glow-magenta → neon glow effect
```

### Typography

- **Display/Body:** Space Grotesk, Noto Sans JP, system-ui
- **Monospace:** JetBrains Mono, Space Mono

### Key Rules

- **No border radius** — `borderRadius.DEFAULT` is `0px`. Do not add rounded corners.
- **Hard shadows only** — Use `shadow-brutal-*` for box shadows, not soft drop shadows.
- **Dark background** — All pages use `#0a0a0f` as the base background.

---

## SEO & Metadata

SEO utilities are in `src/utils/seo.js`:

- `getBasicMeta(config)` — generates full meta tag set (description, OG, Twitter Card)
- `getSectionMeta(sectionId)` — returns section-specific meta for known page sections
- `getStructuredData(type, data)` — generates JSON-LD structured data
- `getCanonicalUrl(path)` — constructs canonical URLs from `https://finneh.xyz`

The `SEO.astro` component consumes these utilities and injects tags into `<head>`.

When adding a new page, use `getSectionMeta()` or `getBasicMeta()` and pass the result to the `<SEO>` component.

---

## Adding Content

### New Blog Post

1. Create `src/content/blog/my-post-slug.mdx`
2. Include frontmatter:
   ```yaml
   ---
   title: "Post Title"
   description: "Post description"
   pubDate: 2025-01-01
   author: "Ethan Cornwill"
   ---
   ```

### New Project

Edit `src/data/projects.json` and add an entry following the existing structure (name, description, tags, links, status, etc.).

### New Architecture Decision Record

Create `src/content/architecture/ADR-XXX-title.md` following the format in existing ADRs.

---

## Key Files Reference

| File | Purpose |
|---|---|
| `src/utils/seo.js` | SEO meta generation utilities |
| `src/utils/colorMapping.js` | Deterministic Neo-Brutalist color hash (getNeoColor) |
| `src/utils/colorMapping.test.js` | Unit tests for color mapping |
| `src/data/projects.ts` | TypeScript interfaces + extended project data |
| `src/data/heroData.ts` | Hero section copy and configuration |
| `scripts/ensure-data-files.cjs` | Pre-build: syncs JSON to public/data/ |
| `design_tokens.json` | Design token reference (do not import at runtime) |
| `docs/ARCHITECTURE.md` | Detailed system architecture documentation |
| `docs/MAINTENANCE.md` | Content update guide |
| `docs/TROUBLESHOOTING.md` | Common issues and fixes |
| `AGENTS.md` | AI agent page summaries (auto-generated by @nuasite/agent-summary) |

---

## Linting

ESLint is configured in `eslint.config.js` with React plugin rules. Run with:

```bash
npx eslint src/
```

TypeScript type checking:

```bash
npx astro check
```

---

## Deployment

This is a fully static site (`astro build` outputs to `/dist`). It can be deployed to any static host:

- **Vercel** — zero-config, recommended
- **Netlify** — zero-config
- **GitHub Pages** — requires base path configuration in `astro.config.mjs`

No environment variables are required for production deployment. All configuration is in source code.

---

## Constraints & Anti-Patterns

- Do not add border radius — it violates the Neo-Brutalist design.
- Do not add client-side data fetching — all data is pre-rendered at build time.
- Do not introduce a CMS or database — the JSON data layer is intentional.
- Do not use the `neo-*` color aliases in new code — use `cyber-*` equivalents.
- Do not skip the `scripts/ensure-data-files.cjs` pre-build step — it is required for data to be available in the browser.
- Keep JavaScript minimal on the client — prefer static `.astro` components; only use React for genuinely interactive elements.
