# Implementation Plan: Audit & Documentation Overhaul

**Status:** Draft
**Source:** `specs/audit_and_docs_spec.md`
**Target Phase:** Auto-Coding (A)

This plan outlines the step-by-step execution strategy to audit the codebase for legacy React SPA artifacts and establish a comprehensive documentation structure. This plan focuses on **cleanup and documentation** and should be executed alongside (or before) the Neo-Brutalist migration.

---

## Phase 1: Audit & Cleanup

### Step 1.1: Legacy Artifact Removal

**Objective:** Remove files that belonged to the previous "React + Vite" SPA architecture but are no longer used in the Astro MPA.

- **Target Files:**
  - `src/App.jsx` (if exists)
  - `src/main.jsx` (if exists)
  - `index.html` (root level - verify if it's the Astro one or legacy Vite one. Astro usually keeps `src/pages/index.astro` or `index.html` in public/root depending on config, but mostly `src/pages`). _Note: Astro projects usually have `index.html` built, but source is `src/pages/index.astro`._
- **Action:**
  - Check for existence of legacy React entry points: `src/App.jsx`, `src/main.jsx`. **Delete if found.**
  - Scan `src/` for any `.jsx` files that are _not_ in `src/components/`.
  - **Constraint:** Do NOT delete `.jsx` files inside `src/components/` indiscriminately. Only delete them if they are **orphaned** (not imported by any `.astro` or `.jsx` file).
- **Validation:**
  - Run `grep -r "App.jsx" .` to ensure no imports remain.

### Step 1.2: Config & Dependencies Audit

**Objective:** Ensure configuration files match the active stack (Astro + Tailwind + DaisyUI).

- **Target Files:** `tailwind.config.js`, `package.json`
- **Action:**
  - **Tailwind Config:** Read `tailwind.config.js`. Verify `plugins` array includes `require('daisyui')`. If missing, add it.
  - **Package.json:** Verify `astro`, `react`, `react-dom`, `tailwindcss`, `daisyui` are present in dependencies.
- **Validation:**
  - Run `npm list daisyui` (or check `node_modules`) to confirm installation.

---

## Phase 2: Documentation Architecture

### Step 2.1: Initialize Documentation Directory

**Objective:** Create the dedicated folder for project documentation to declutter the root.

- **Action:**
  - Create directory: `docs/` (if not exists).

### Step 2.2: Create ARCHITECTURE.md

**Objective:** Document the high-level system design for future maintainers.

- **Target File:** `docs/ARCHITECTURE.md`
- **Content Requirements:**
  - **System Overview:** Define project as **Astro v5 MPA**.
  - **Component Strategy:** Explain the "Islands Architecture" - `.astro` files for static layout, `.jsx` (React) only for interactive state (e.g., Navbar toggles, Carousels).
  - **Data Layer:** Explain usage of `src/data/*.json` as the CMS/Content source.
  - **Routing:** Explain Astro's file-based routing in `src/pages/`.

### Step 2.3: Create INSTALLATION.md

**Objective:** Document setup instructions for new developers.

- **Target File:** `docs/INSTALLATION.md`
- **Content Requirements:**
  - **Prerequisites:** Node.js (specify v18+ for Astro v5).
  - **Setup:** `npm install`.
  - **Development:** `npm run dev`.
  - **Build:** `npm run build`.
  - **Environment:** Document any necessary `.env` variables (or state "None currently required").

### Step 2.4: Create MAINTENANCE.md

**Objective:** Guide authors on how to update content without touching code.

- **Target File:** `docs/MAINTENANCE.md`
- **Content Requirements:**
  - **Adding Skills/Projects:** Instructions to edit `src/data/skills.json` or `projects.json`.
  - **Writing Blog Posts:** Instructions to add `.mdx` files to `src/pages/blog/`.
  - **Updating Design:** Reference `design_tokens.json` and `tailwind.config.js`.

---

## Phase 3: Root README Overhaul

### Step 3.1: Rewrite README.md

**Objective:** Replace the outdated "React App" README with a modern entry point.

- **Target File:** `README.md`
- **Action:** Overwrite with completely new content.
- **Content Structure:**
  - **Title:** Project Name / Portfolio.
  - **Badges:** Astro, React, Tailwind, DaisyUI.
  - **Introduction:** Brief 1-2 sentences.
  - **Quick Start:**
    ```bash
    npm install
    npm run dev
    ```
  - **Project Structure:** ASCII tree showing key directories (`src/pages`, `src/data`, `docs/`).
  - **Documentation Links:** Explicit table linking to:
    - [Architecture Guide](./docs/ARCHITECTURE.md)
    - [Installation Guide](./docs/INSTALLATION.md)
    - [Maintenance Guide](./docs/MAINTENANCE.md)
- **Constraint:** Ensure no mention of "Vite SPA template" or "Create React App" remains.

---

## Phase 4: Validation

### Step 4.1: Link Verification

**Objective:** Ensure all relative links in the new `README.md` work.

- **Action:** Verify file paths (`./docs/...`) match the created files.

### Step 4.2: Build Verification

**Objective:** Ensure file deletions didn't break the build.

- **Action:** Run `npm run build`.
  - _Note: If build fails due to missing components (that were deleted), restore them or fix the import._

---

## Execution Checklist

1.  [ ] **Audit:** Remove legacy `App.jsx` / `main.jsx`
2.  [ ] **Audit:** Verify `tailwind.config.js` has DaisyUI
3.  [ ] **Docs:** Create `docs/` folder
4.  [ ] **Docs:** Write `ARCHITECTURE.md`
5.  [ ] **Docs:** Write `INSTALLATION.md`
6.  [ ] **Docs:** Write `MAINTENANCE.md`
7.  [ ] **Root:** Rewrite `README.md`
8.  [ ] **Verify:** Successful Build
