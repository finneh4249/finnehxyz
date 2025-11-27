# Specification: Website Audit & Documentation Overhaul

## 1. Executive Summary

This specification outlines the roadmap to synchronize the project's documentation with its actual architectural state. The project has evolved from a "React with Vite" Single Page Application (SPA) structure to an **Astro v5** Multi-Page Application (MPA) using React for specific interactive islands.

## 2. Audit Specification

### 2.1. Identified Discrepancies

The following table maps the outdated documentation claims to the actual project state:

| Category          | README.md Claim (Legacy) | Actual Project State (Astro v5)                                       |
| :---------------- | :----------------------- | :-------------------------------------------------------------------- |
| **Framework**     | React with Vite          | Astro v5.15.7 (static site generation + partial hydration)            |
| **Entry Point**   | `App.jsx`, `main.jsx`    | `src/pages/index.astro`, `src/layouts/BaseLayout.astro`               |
| **Component Ext** | `.jsx`                   | `.astro` (structural), `.jsx` (interactive islands), `.mdx` (content) |
| **Routing**       | React Router (implied)   | Astro File-based Routing (`src/pages/`)                               |
| **Styling**       | Tailwind + DaisyUI       | Tailwind + DaisyUI + Custom CSS (`src/index.css`)                     |

### 2.2. Audit Logic (Pseudocode)

This logic defines the automated or manual process to clean up the codebase.

#### Module: File Extension & Usage Audit

```pseudocode
FUNCTION AuditFileUsage(directory):
    FOR EACH file IN directory RECURSIVELY:

        // 1. Identify Legacy Artifacts
        IF extension IS ".jsx" AND path DOES NOT CONTAIN "components/interactive":
            LOG "WARNING: Potential legacy React component found outside interactive folder: " + file.path

        // 2. Identify Unused Components
        IF extension IS ".astro" OR extension IS ".jsx":
            SET isImported = FALSE
            FOR EACH sourceFile IN GetAllSourceFiles():
                IF sourceFile.content CONTAINS GetFileName(file):
                    isImported = TRUE
                    BREAK

            IF NOT isImported AND file.name != "index.astro":
                LOG "WARNING: Orphaned component detected: " + file.path

        // 3. Verify CSS Strategy
        IF file.name == "tailwind.config.js":
            IF content DOES NOT CONTAIN "daisyui":
                LOG "CRITICAL: DaisyUI dependency exists but config missing plugin"
```

## 3. Documentation Specification

### 3.1. New Documentation Structure

The documentation will be split into modular files within a `docs/` directory to maintain clarity.

#### 3.1.1. `README.md` (Root)

- **Project Title & Description**: Updated to reflect "Astro Portfolio".
- **Tech Stack Badges**: Astro, React, Tailwind, DaisyUI.
- **Quick Start**: Minimal commands (`npm install`, `npm run dev`).
- **Project Structure Tree**: Accurate tree reflecting `src/pages`, `src/layouts`, `src/components`.
- **Links**: Pointers to detailed docs in `docs/`.

#### 3.1.2. `docs/ARCHITECTURE.md`

- **Astro Islands**: Explanation of how React is used only for interactive bits (e.g., Navbar, Carousel) while Astro handles static markup.
- **Layout System**: Documentation of `BaseLayout.astro` and how slots are used.
- **Data Layer**: How JSON files in `src/data/` drive the content (e.g., `skills.json`, `projects.json`).

#### 3.1.3. `docs/INSTALLATION.md`

- **Prerequisites**: Node.js version requirements.
- **Environment Variables**: Example `.env` file (if applicable).
- **Build & Deploy**: Steps for building static assets and deploying to hosts (Netlify/Vercel).

#### 3.1.4. `docs/MAINTENANCE.md`

- **Content Updates**: How to add a new project or skill via JSON modification.
- **Blog Workflow**: How to create new `.mdx` posts in `src/pages/blog/`.
- **Dependency Management**: Guidelines for upgrading Astro and Tailwind.

## 4. Implementation Plan

1.  **Phase 1: Execution of Audit**: Run the audit logic to list files for deletion/refactor.
2.  **Phase 2: Cleanup**: Remove confirmed legacy files and fix identified config issues.
3.  **Phase 3: Documentation Write-up**: Generate the markdown files defined in section 3.
