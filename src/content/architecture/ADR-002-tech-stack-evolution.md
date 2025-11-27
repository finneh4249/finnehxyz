---
title: "ADR-002: Tech Stack Evolution (HTML -> React -> Astro)"
status: "ACCEPTED"
date: "2025-11-27"
author: "Ethan Cornwill"
tags: ["Architecture", "Tech Stack", "React", "Astro", "Migration"]
---

## Context

The portfolio project has undergone significant evolution since its inception. Understanding this history is crucial for current maintenance and future architectural decisions.

### Phase 1: Static HTML/CSS/JS (2024)

**Initial State:** The project started as a simple, static website built with vanilla HTML, CSS, and JavaScript.
**Pros:** Extremely fast, zero build step, simple deployment.
**Cons:** Hard to maintain as the site grew, code duplication (header/footer), lack of component reusability.

### Phase 2: React Integration (Early 2025)

**Transition:** To address maintainability and enable more complex interactions, the project was refactored to use React.
**Pros:** Component-based architecture, rich ecosystem, declarative UI state management.
**Cons:** Introduced a heavy JavaScript bundle, client-side rendering (CSR) impact on SEO and initial load performance, complex build configuration.

### Phase 3: Astro Migration (Late 2025)

**Current State:** The project was migrated to Astro to combine the best of both worlds.
**Pros:**

- **Islands Architecture:** Zero JavaScript by default, hydrating only interactive components (React) when needed.
- **Performance:** Static Site Generation (SSG) ensures optimal performance and SEO.
- **Flexibility:** Ability to use React components (`<ProjectModal />`, `<SearchFilter />`) alongside static Astro components (`<Hero />`, `<SEO />`).
- **Content Collections:** Type-safe content management for blog posts and architectural records.

## Decision

We have standardized on **Astro** as the core framework, with **React** used selectively for interactive islands.

**Key Architectural Principles:**

1.  **Static First:** Default to static HTML generation (`.astro` components).
2.  **Interactive Islands:** Use React only for components requiring complex state or user interaction (e.g., filtering, modals).
3.  **Type Safety:** Enforce TypeScript across all data layers (Content Collections, Props).
4.  **Asset Optimization:** Leverage Astro's built-in asset processing.

## Consequences

### Positive

- **Best-in-Class Performance:** Near-perfect Lighthouse scores due to minimal JS payload.
- **Maintainability:** Clear separation of concerns between content (Markdown/MDX) and presentation.
- **Scalability:** The architecture supports adding new sections (like this Architecture log) without increasing bundle size.

### Negative

- **Learning Curve:** Requires understanding the "Islands" mental model (server vs. client execution).
- **Complexity:** Managing communication between islands can be more complex than a single-page app (SPA).

## Status

Accepted and Implemented.
