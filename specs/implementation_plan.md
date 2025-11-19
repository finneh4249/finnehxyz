# Neo-Brutalist Implementation Plan

**Status:** Draft
**Source:** `specs/migration_spec.md`
**Target Phase:** Auto-Coding (A)

This plan outlines the step-by-step execution strategy to migrate the codebase to the new Neo-Brutalist design system. It is designed to be executed sequentially by the Auto-Coding agent.

---

## Phase 1: Foundation (Configuration & Tokens)

### Step 1.1: Update Tailwind Configuration
**Objective:** Establish the Single Source of Truth (SSOT) for colors, shadows, and borders in `tailwind.config.js`, ensuring strict alignment with `design_tokens.json`.

*   **Target Files:** `tailwind.config.js`
*   **Action:**
    *   Locate `theme.extend`.
    *   **Colors:** Update/Overwrite `colors.neo` object with the exact hex values from `migration_spec.md` (Section 1).
    *   **Shadows:** Update `boxShadow` to include the full `brutal-*` suite (sm, md, lg, xl) and their dark mode variants (`brutal-dark-*`).
    *   **Borders:** Ensure `borderWidth` includes `3` (3px) and `6` (6px).
    *   **Border Radius:** Add `borderRadius: { DEFAULT: '0px' }` to `theme.extend` to override defaults globally.
    *   **Fonts:** Update `fontFamily` to explicitly map `display` and `body` to 'Space Grotesk' and `mono` to 'Space Mono'.
    *   **Transitions:** Add `transitionTimingFunction.brutal`.
*   **Validation:**
    *   Run a build check or inspect the config object.
    *   Verify `theme.extend.colors.neo.yellow` is `#FFE600`.

---

## Phase 2: Global CSS Architecture

### Step 2.1: CSS Layer Refactoring
**Objective:** Eliminate `!important` specificity wars by moving styles into proper Tailwind `@layer` directives.

*   **Target Files:** `src/index.css`
*   **Action:**
    *   **Base Layer:** Move the global reset rules (html, body, headings) into `@layer base`. Implement the root dark mode variables strategy defined in `migration_spec.md`.
    *   **Global Reset:** Ensure `*, ::before, ::after { border-radius: 0px; }` is present in `@layer base` as a failsafe, but rely on the Tailwind config for the primary mechanism.
    *   **Component Layer:** Move `.brutal-card`, `.brutal-btn`, `.brutal-input` classes into `@layer components`.
    *   **Cleanup:** Remove any legacy `.brutal-*` classes that are just color utilities (e.g., `.brutal-yellow`), as these should be handled by standard Tailwind utility composition (e.g., `bg-neo-yellow text-black`) or component variants.
*   **Validation:**
    *   Check that `src/index.css` contains `@layer base`, `@layer components`, and `@layer utilities`.
    *   Search for `!important` and ensure it is only used for critical overrides (like forcing library styles), not general layout.

### Step 2.2: Accessibility & Motion Controls
**Objective:** Implement reduced motion and high-contrast dark mode supports.

*   **Target Files:** `src/index.css`
*   **Action:**
    *   Add the `@media (prefers-reduced-motion)` blocks as specified in Section 4.1 of the spec.
    *   Ensure `.dark .brutal-card` uses the white/light border and shadow strategy defined in Section 2 (`shadow-brutal-dark-md`).
*   **Validation:**
    *   Verify that `.animate-shake` is disabled/modified inside the reduced motion media query.

---

## Phase 3: Component Refactoring

### Step 3.1: Create UI Constants
**Objective:** Decouple configuration from components.

*   **Target Files:** `src/utils/ui-constants.ts` (New File)
*   **Action:**
    *   Create and export `CATEGORY_COLOR_MAP` as defined in Section 3.1 of the spec.
    *   Type it strictly if possible (e.g., `Record<string, string>`).
*   **Validation:**
    *   File exists and exports the constant.

### Step 3.2: Refactor SkillCard Logic
**Objective:** Replace non-deterministic hash coloring with explicit category mapping.

*   **Target Files:** `src/components/skills/SkillCard.astro`
*   **Action:**
    *   Import `CATEGORY_COLOR_MAP` from `src/utils/ui-constants.ts`.
    *   Remove the existing `colorIndex` / hashing logic.
    *   Implement the logic: `const activeColor = colorOverride || CATEGORY_COLOR_MAP[category] || CATEGORY_COLOR_MAP['Default'];`
    *   Update the HTML template to use `activeColor` for the header background.
*   **Validation:**
    *   Verify a "Backend" skill renders with `bg-neo-green` (or mapped color).

### Step 3.3: Refactor Hero Section Layout
**Objective:** Implement the "Deterministic Chaos" Grid Layout to fix responsive positioning issues.

*   **Target Files:** `src/components/sections/Hero.astro`
*   **Action:**
    *   **Layout:** Replace the outer `flex` or `relative` container with a CSS Grid container (`grid-cols-12`).
    *   **Decorative Elements:** Remove `absolute top-20` style positioning. Place the "Yellow Box", "Pink Box", etc., into specific grid cells (e.g., `col-start-2`, `row-start-1`) as per Spec Section 3.2.
    *   **Responsive:** Use `hidden md:block` for complex decorative elements that shouldn't appear on mobile, or adjust their grid placement for mobile.
    *   **Content:** Center the main profile and text content within the middle columns (e.g., `col-start-2 col-end-12 md:col-start-3 md:col-end-11`).
*   **Validation:**
    *   Verify that resizing the window does not cause elements to overlap text illegibly.
    *   Verify the grid structure aligns with the 12-column model.

---

## Execution Order Checklist

1.  [ ] **Foundation:** Update `tailwind.config.js`
2.  [ ] **CSS:** Refactor `src/index.css`
3.  [ ] **Utils:** Create `src/utils/ui-constants.ts`
4.  [ ] **Components:** Refactor `SkillCard.astro`
5.  [ ] **Components:** Refactor `Hero.astro`