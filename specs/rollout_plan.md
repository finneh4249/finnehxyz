# Component Update Strategy: Neo-Brutalist Rollout

**Objective:** Execute a batched update of the application components to enforce strict adherence to the Neo-Brutalist Design System (Design Tokens v1.0.0).

**Source of Truth:** `design_tokens.json`
**Audit Source:** `specs/rollout_spec.md`

---

## Batch 1: Shell & Layout (High Impact)
**Goal:** Establish the structural "hard shell" of the site immediately. The Navbar and Footer frame every page, so their compliance is the highest priority.

### 1.1. Global Adjustments
*   **Target:** `src/index.css` (or `tailwind.config.js`)
*   **Action:** Verify or define utility aliases if not using raw Tailwind values.
    *   `border-3` -> `border-width: 3px`
    *   `shadow-brutal-xl` -> `15px 15px 0px 0px #000`

### 1.2. Navbar
*   **Target:** `src/components/Navbar.astro`
*   **Key Changes:**
    *   **Border Width:** Replace `border-b-brutal` with `border-b-3`.
    *   **Mobile Menu:** Ensure `#mobile-menu-panel` uses `border-l-3` (replacing `border-l-brutal`) and `rounded-none`.
    *   **Z-Index:** Verify `z-50` or higher to sit above section decorations.

### 1.3. Footer (Share Dialog Overhaul)
*   **Target:** `src/components/Footer.astro`
*   **Key Changes:**
    *   **Share Dialog Container:**
        *   Remove: `rounded-xl`, `shadow-2xl`, `border-gray-*`.
        *   Apply: `rounded-none`, `border-3`, `border-black`, `shadow-brutal-xl`, `bg-base-light`.
    *   **Input Field (`#share-url-input`):**
        *   Remove: `rounded-lg`, `border-gray-300`.
        *   Apply: `rounded-none`, `border-3`, `border-black`, `focus:shadow-brutal-sm`.
    *   **Typography & Colors:**
        *   Links: Change `text-blue-600` to `text-neo-blue` (hover: `bg-black text-white` if applicable for brutality).
        *   Icons: Ensure high contrast (`text-black`).

---

## Batch 2: Content Sections (Text & Structure)
**Goal:** Standardize the "passive" content areas. Focus on typography hierarchy, container borders, and spacing consistency.

### 2.1. About Me
*   **Target:** `src/components/sections/AboutMe.astro`
*   **Key Changes:**
    *   **Container:** Ensure the main content card has `border-3` and `shadow-brutal-md` (if card-style).
    *   **Headings:** Verify `font-display` (Space Grotesk) and `font-black`.

### 2.2. Education
*   **Target:** `src/components/sections/Education.astro` (and `EducationItem.astro`)
*   **Key Changes:**
    *   **Card Styling:** Apply `border-3`, `border-black`, `rounded-none`, `shadow-brutal-sm`.
    *   **Spacing:** Ensure `p-6` internal padding for consistency.
    *   **Dates:** Use `font-mono` for date ranges.

### 2.3. Professional Experience
*   **Target:** `src/components/sections/ProfessionalExperience.astro`
*   **Target:** `src/components/professional-experience/TimelineItem.astro`
*   **Key Changes:**
    *   **Timeline Line:** Ensure the vertical line is `w-[3px]` (matching border width) and black.
    *   **Item Borders:** Ensure timeline cards/entries map `border-brutal` to `border-3`.
    *   **Connectors:** Remove rounded dots; use square markers (`w-4 h-4 bg-black`) for the timeline nodes.

---

## Batch 3: Interactive Sections (Complex UI)
**Goal:** Refactor complex interactive elements (grids, forms, modals) that require careful state or layout handling.

### 3.1. Projects
*   **Target:** `src/components/sections/Projects.astro`
*   **Key Changes:**
    *   **Tech Tags:** Change `border-2` to `border-3`. Ensure `rounded-none`.
    *   **Cards:** Verify `border-3` and `shadow-brutal-md` (or `lg` on hover).
    *   **Placeholders:** Ensure fallback colors match `neo-*` palette (e.g., `#FFE600` for missing images).

### 3.2. Contact Form
*   **Target:** `src/components/sections/Contact.astro`
*   **Key Changes:**
    *   **Inputs/Textarea:**
        *   Remove: `rounded-*`, default focus rings.
        *   Apply: `rounded-none`, `border-3`, `border-black`, `p-4`, `focus:shadow-brutal-sm`, `focus:bg-neo-yellow` (optional interaction pop).
    *   **Submit Button:**
        *   Apply: `bg-neo-green` (or primary), `border-3`, `border-black`, `shadow-brutal-sm`, `active:shadow-none`, `active:translate-x-[4px] active:translate-y-[4px]`.
    *   **Feedback Messages:**
        *   Error: Change `bg-red-500` to `bg-neo-pink` (`text-black` or `text-white`).
        *   Success: Change `bg-green-500` to `bg-neo-green`.

---

## Execution Notes
*   **Check-in:** Perform a visual check after each batch.
*   **Mobile:** Ensure `border-width` does not cause overflow on small screens (use `box-border`).
*   **Clean Up:** Remove any unused `rounded-*` utility classes found in these components.