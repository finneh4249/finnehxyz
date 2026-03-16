# CLAUDE.md — AI Assistant Guide for finnehxyz

This file provides context for AI assistants (Claude, Copilot, etc.) working in this repository.

---

## Project Overview

**finnehxyz** is a personal portfolio website built with **Astro v5**, React, Tailwind CSS, and DaisyUI. It is a fully static site (no backend/database) that showcases projects, blog posts, work experience, and skills using a **cyberpunk/neon** design aesthetic and a **bento grid** homepage layout.

- **Version:** 1.4.0
- **Node.js requirement:** ≥ 18.14.1
- **Package manager:** npm

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Astro v5.15.7 (MPA, SSG) |
| Interactive UI | React v18.2.0 (Islands Architecture) |
| Styling | Tailwind CSS v3.3.5 + DaisyUI v5.0.6 |
| Content | Astro Content Collections (MDX) |
| Build tool | Vite v6 (via Astro) |
| Type checking | TypeScript v5.9.3 |
| Linting | ESLint v9 |
| Icons | astro-icon + @iconify-json/mdi |
| Analytics | Google Analytics 4 |

---

## Repository Structure

```
finnehxyz/
├── src/
│   ├── components/               # All UI components
│   │   ├── cells/                # 13 bento-grid cell components (.astro)
│   │   ├── sections/             # Full-page section components
│   │   ├── skills/               # Skill display components
│   │   ├── projects/             # Project card + modal components
│   │   ├── education/            # Education entry components
│   │   ├── professional-experience/
│   │   └── ui/                   # Generic utility components
│   ├── pages/                    # File-based routing (Astro)
│   │   ├── index.astro           # Homepage (bento grid)
│   │   ├── resume.astro          # Resume/CV page
│   │   ├── secret.astro          # Easter egg page
│   │   ├── blog/                 # Blog post pages
│   │   └── architecture/         # Architecture Decision Records (ADRs)
│   ├── content/                  # MDX content collections
│   │   ├── blog/                 # Blog posts (.mdx)
│   │   └── architecture/         # ADR documents (.mdx)
│   ├── data/                     # Data layer (source of truth)
│   │   ├── projects.json         # Portfolio projects
│   │   ├── skills.json           # Technical skills by category
│   │   ├── experience.json       # Work history
│   │   ├── education.json        # Academic credentials
│   │   ├── testimonials.json     # Testimonials (currently empty)
│   │   ├── heroData.ts           # Hero section typed data
│   │   └── projects.ts           # Extended project config
│   ├── layouts/
│   │   ├── BaseLayout.astro      # Root layout (SEO, GA4, structured data)
│   │   └── BlogLayout.astro      # Blog post layout
│   ├── utils/
│   │   ├── seo.js                # SEO helper functions
│   │   ├── colorMapping.js       # Color utility
│   │   └── colorMapping.test.js  # Unit tests for color mapping
│   ├── styles/                   # Additional stylesheets
│   ├── assets/images/            # Static image assets
│   ├── content.config.ts         # Content collection schemas
│   └── index.css                 # Global styles (~12,678 lines)
├── scripts/
│   └── ensure-data-files.cjs     # Copies src/data → public/data at dev/build
├── docs/                         # Extended documentation
│   ├── ARCHITECTURE.md
│   ├── INSTALLATION.md
│   ├── MAINTENANCE.md
│   └── TROUBLESHOOTING.md
├── specs/                        # Specification documents
├── design_tokens.json            # Design system tokens
├── astro.config.mjs              # Astro configuration
├── tailwind.config.js            # Tailwind + design tokens
├── postcss.config.js             # PostCSS (tailwindcss + autoprefixer)
└── eslint.config.js              # ESLint rules
```

---

## Development Workflow

### Install & Run

```bash
npm install
npm run dev        # Start dev server at http://localhost:4321
```

The `predev` script automatically copies JSON data files from `src/data/` to `public/data/` before starting.

### Build & Preview

```bash
npm run build      # Production build → dist/
npm run preview    # Preview built site locally
```

### Linting & Type Checking

```bash
npx eslint .               # Run ESLint
npx astro check            # TypeScript / Astro type checking
```

There is no `npm test` script defined. The only test file is `src/utils/colorMapping.test.js`.

---

## Key Conventions

### Component Strategy (Islands Architecture)

- **`.astro` components** — Default. Zero JavaScript shipped to the browser. Use for any content that does not require interactivity.
- **`.jsx` / `.tsx` components** — For interactive features only (modals, sliders, theme switcher). Must be hydrated with a client directive:
  - `client:load` — Hydrate immediately on page load
  - `client:visible` — Hydrate when visible in viewport (preferred for below-fold)

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Component files | PascalCase | `IdentityCell.astro` |
| Page files | kebab-case | `index.astro` |
| Utility files | camelCase | `colorMapping.js` |
| CSS classes | kebab-case | `bento-cell`, `cyber-cyan` |
| Data properties | camelCase | `typingStrings`, `heroData` |
| Design colors | `cyber-*` prefix | `cyber-bg`, `cyber-cyan` |

### File Placement

- **New UI component** → `src/components/` (or appropriate subdirectory)
- **New page/route** → `src/pages/` (file name becomes URL path)
- **New content (blog post)** → `src/content/blog/` as `.mdx`
- **New data (projects, skills, etc.)** → edit the relevant JSON in `src/data/`
- **New reusable style** → add to `src/index.css` using `@layer components` or `@layer utilities`

---

## Data Layer

All site content is driven by JSON/TypeScript data files — there is no CMS or database.

### Updating Content

| Content | File |
|---|---|
| Projects | `src/data/projects.json` |
| Skills | `src/data/skills.json` |
| Work experience | `src/data/experience.json` |
| Education | `src/data/education.json` |
| Hero section | `src/data/heroData.ts` |

Data is imported in `.astro` files at **build time** (server-side only). No client-side API calls exist.

### Project Data Shape

```json
{
  "title": "Project Name",
  "description": "Short description",
  "detailedDescription": "Full details",
  "challenges": "Technical challenges",
  "outcomes": "Results achieved",
  "image": "URL or path",
  "githubUrl": "https://github.com/... or null",
  "featured": true,
  "date": 1700000000,
  "technologies": ["Astro", "React"],
  "tags": [{ "name": "Web", "badgeClass": "badge-primary" }]
}
```

### Experience Data Shape

```json
{
  "yearRange": "2024-2025",
  "company": "Company Name",
  "category": "technology",
  "roles": [{
    "title": "Role Title",
    "period": "Jan 2024 - Present",
    "isCurrent": true,
    "description": "Role description"
  }],
  "logoSrc": "path/to/logo.png",
  "logoAlt": "Company Logo"
}
```

### Content Collections (MDX)

**Blog posts** (`src/content/blog/*.mdx`) frontmatter schema:
```yaml
title: "Post Title"
description: "Brief description"
pubDate: 2025-01-01
updatedDate: 2025-06-01  # optional
heroImage: "/path/to/image.jpg"  # optional
tags: ["tag1", "tag2"]
featured: false
```

**ADR documents** (`src/content/architecture/*.mdx`) frontmatter schema:
```yaml
title: "ADR Title"
status: "ACCEPTED"  # PROPOSED | ACCEPTED | REJECTED | DEPRECATED
date: 2025-01-01
author: "Author Name"
tags: ["tag1"]
```

---

## Design System

### Color Palette (Cyberpunk Theme)

| Token | Value | Usage |
|---|---|---|
| `cyber-bg` | `#0a0a0f` | Main background |
| `cyber-cyan` | `#00fff5` | Primary accent |
| `cyber-magenta` | `#ff00ff` | Secondary accent |
| `cyber-yellow` | `#f0ff00` | Warning / highlight |
| `cyber-text` | `#e0e0e0` | Body text |

All custom colors are defined in `tailwind.config.js` and `design_tokens.json`.

### Shadows & Borders (Neo-Brutalist)

- **No border radius** — all elements are sharp/square
- **Hard shadows** — CSS box shadows with pixel offsets, no blur
  - `shadow-hard-sm` → `2px 2px 0px`
  - `shadow-hard-md` → `4px 4px 0px`
  - `shadow-hard-lg` → `6px 6px 0px`
- **Border weight:** 3px default, 6px thick

### Typography

| Font | Usage |
|---|---|
| Space Grotesk | Display / headings |
| JetBrains Mono | Code / monospace |
| Noto Sans JP | Japanese character support |

### Animations

Custom keyframes defined in `tailwind.config.js`:
- `pulse-glow` — Neon glow pulsing effect
- `scan-line` — CRT scan-line sweep
- `flicker` — Neon flicker
- `float` — Gentle vertical float
- `blink` — Cursor blink

---

## SEO & Metadata

All SEO is handled server-side at build time via `src/utils/seo.js` and `BaseLayout.astro`.

- **Structured data:** Schema.org `Person` and `WebSite` types (JSON-LD)
- **Open Graph:** Full meta tags for social sharing
- **Twitter Cards:** Summary with large image
- **Canonical URLs:** Set per-page

When adding new pages, always pass appropriate `title`, `description`, and `image` props to `BaseLayout.astro`.

---

## Common Tasks

### Add a New Project

1. Open `src/data/projects.json`
2. Add a new entry following the project data shape above
3. Set `"featured": true` to display it prominently on the homepage

### Add a New Blog Post

1. Create `src/content/blog/your-post-slug.mdx`
2. Add required frontmatter (title, description, pubDate, tags)
3. Write content in MDX

### Add a New Bento Cell (Homepage)

1. Create `src/components/cells/YourNewCell.astro`
2. Add the component to `src/pages/index.astro`
3. Define its grid area in `src/index.css` for each breakpoint

### Update Skills / Experience / Education

Edit the relevant JSON file in `src/data/`. The site rebuilds automatically in dev mode.

---

## Architecture Notes

- **No server-side rendering at runtime** — fully static output; deploy to any CDN
- **No environment variables required** for basic operation
- **`public/data/`** is git-ignored; it is generated by `scripts/ensure-data-files.cjs` at build time
- **`dist/`** is git-ignored; it is the build output
- **`node_modules/`** and **`package-lock.json`** are git-ignored

For deeper architectural context, see `docs/ARCHITECTURE.md`.

---

## Docs Reference

| File | Purpose |
|---|---|
| `docs/ARCHITECTURE.md` | System design and component strategy |
| `docs/INSTALLATION.md` | Setup and deployment instructions |
| `docs/MAINTENANCE.md` | How to update content |
| `docs/TROUBLESHOOTING.md` | Common issues and fixes |
| `design_tokens.json` | Design system token definitions |
| `AGENTS.md` | Agent/AI summary of pages and routes |
