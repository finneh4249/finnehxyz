# Architecture Documentation

## System Overview

This project is built as a **Multi-Page Application (MPA)** using **Astro v5**. Unlike the previous Single Page Application (SPA) architecture (React + Vite), this system leverages Astro's server-first approach to deliver zero-JavaScript static HTML by default, hydrating only the interactive components ("Islands").

## Core Technologies

- **Framework:** Astro v5.15.7
- **UI Library:** React v18 (used selectively for interactive components)
- **Styling:** Tailwind CSS v3.3 + DaisyUI v5
- **Content:** JSON-based data layer + MDX for blog posts

## Component Strategy: "Islands Architecture"

The codebase distinguishes strictly between static layout components and interactive islands.

### 1. Static Components (`.astro`)

- **Location:** `src/components/` (excluding specific interactive subfolders if any)
- **Purpose:** Structural layout, headers, footers, and static content sections.
- **Behavior:** Rendered to HTML at build time. No client-side JavaScript is shipped for these components.
- **Example:** `Hero.astro`, `Footer.astro`.

### 2. Interactive Islands (`.jsx` / `.tsx`)

- **Location:** `src/components/` (typically requiring client-side state)
- **Purpose:** Complex interactivity (e.g., Mobile Navbar toggles, Carousels, Theme Switchers).
- **Usage:** Imported into `.astro` files with a client directive (e.g., `client:load`, `client:visible`).

## Data Layer

Content is decoupled from presentation logic using a JSON-based data layer.

- **Source:** `src/data/`
  - `skills.json`: Definitions of technical skills and categories.
  - `projects.json`: Portfolio project details, links, and tags.
  - `education.json`: Academic history.
  - `experience.json`: Professional work history.
  - `testimonials.json`: Client or colleague recommendations.
- **Consumption:** Data is imported directly into `.astro` files (server-side) to generate HTML.

## Routing

Routing is file-based, handled by Astro:

- `src/pages/index.astro` -> `/` (Home)
- `src/pages/blog/*.mdx` -> `/blog/[post-slug]`
- `src/pages/404.astro` -> 404 Error Page

## Styling Architecture

- **Tailwind CSS:** Utility-first styling for layout and spacing.
- **DaisyUI:** Component classes (buttons, cards) used within Tailwind.
- **Design Tokens:** Defined in `tailwind.config.js` (extending `theme.colors`) to enforce the "Neo-Brutalist" aesthetic.
