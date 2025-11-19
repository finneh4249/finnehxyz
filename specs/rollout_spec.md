# Rollout Specification: Neo-Brutalist Design System

## 1. Executive Summary
This specification details the required updates to bring the remaining application components (`Navbar`, `Footer`, and Sections) into full compliance with the Neo-Brutalist Design System.

**Key Principles Applied:**
*   **Hard Geometry:** `border-radius: 0` globally.
*   **Thick Borders:** `border-width: 3px` (default) or `6px` (thick).
*   **Hard Shadows:** `box-shadow: Xpx Ypx 0px 0px #000`.
*   **Neo-Colors:** Strict adherence to `neo-*` palette; no Tailwind default grays/blues.
*   **Typography:** `Space Grotesk` for all UI text.

---

## 2. Component Audit & Required Changes

### 2.1. Global CSS (`src/index.css`)
*   **Status:** Mostly compliant.
*   **Action:** Ensure `border-brutal` and `border-brutal-thick` utility classes exist or refactor components to use `border-3` and `border-6`.
    *   *Recommendation:* Add these aliases to `tailwind.config.js` or `src/index.css` if missing, to support the existing markup.

### 2.2. Navbar (`src/components/Navbar.astro`)
*   **Issues:**
    *   `border-b-brutal` class usage needs verification (should be `border-b-3`).
    *   `bg-white` / `bg-base-200` is acceptable, but ensure high contrast.
    *   Mobile Menu: The `translate-x-full` animation is standard.
*   **Changes:**
    1.  Replace `border-b-brutal` with `border-b-3`.
    2.  Ensure the mobile menu panel (`#mobile-menu-panel`) uses `border-l-3` (currently `border-l-brutal`).

### 2.3. Footer (`src/components/Footer.astro`)
*   **Issues:**
    *   **CRITICAL:** `#share-dialog` uses `rounded-xl` and `shadow-2xl`. This violates the core design rules.
    *   **CRITICAL:** `#share-url-input` uses `border-gray-300`, `bg-gray-100`, `rounded-lg`.
    *   **Color:** Uses `text-blue-600`, `text-gray-600`, `bg-gray-800`.
*   **Changes:**
    1.  **Dialog Container:**
        *   Remove `rounded-xl`, `shadow-2xl`.
        *   Add `border-3 border-black shadow-brutal-xl`.
    2.  **Share Input:**
        *   Replace classes with `.brutal-input` (defined in CSS).
        *   Remove `rounded-lg`.
    3.  **Icons/Text:**
        *   Change `text-blue-600` to `text-neo-blue`.
        *   Change `text-gray-600` to `text-base-content` (or `font-bold`).

### 2.4. Sections: About Me (`src/components/sections/AboutMe.astro`)
*   **Issues:**
    *   Generally compliant.
    *   Decorations use `absolute` positioning which is fine due to `overflow-hidden` on parent section.
*   **Changes:**
    1.  Verify `border-brutal` classes map to `border-3`.

### 2.5. Sections: Projects (`src/components/sections/Projects.astro`)
*   **Issues:**
    *   **Border Width:** Tech tags use `border-2` (Lines 71, 134).
    *   **Placeholders:** `onerror` placeholder uses hardcoded hex `#FFE600`.
*   **Changes:**
    1.  Update all `border-2` instances to `border-3` to match the 3px standard.
    2.  (Optional) Abstract the placeholder color to use the token if possible, but hex is fine for inline JS.

### 2.6. Sections: Professional Experience (`src/components/sections/ProfessionalExperience.astro`)
*   **Issues:**
    *   Relies on `TimelineItem`.
*   **Changes:**
    1.  *Action Item:* Audit `src/components/professional-experience/TimelineItem.astro` (outside current scope, but critical dependency).
    2.  Ensure `border-brutal` in decorations maps to `border-3`.

### 2.7. Sections: Contact (`src/components/sections/Contact.astro`)
*   **Issues:**
    *   **Error Message:** Uses `bg-red-500` (Line 113).
    *   **Success Message:** Uses `bg-neo-blue`.
*   **Changes:**
    1.  Change `bg-red-500` to `bg-neo-pink` (the system's error/danger color).
    2.  Ensure `border-brutal` maps to `border-3`.

---

## 3. Layout & Spacing Strategy

### 3.1. Decorative Elements (Chaos Strategy)
All sections use a similar pattern for "chaotic" backgrounds:
```html
<div class="absolute top-10 left-10 ..."></div>
```
*   **Risk:** Overlap with text on resizing.
*   **Mitigation:**
    *   Ensure `z-index` is strictly managed: Backgrounds `z-0`, Content `z-10`.
    *   Keep `relative overflow-hidden` on the `<section>` container.
    *   *Refactor:* No immediate grid refactor needed for decorations as long as they are purely visual and behind content.

### 3.2. Component Layouts
*   **Projects Grid:** Uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. This is robust.
*   **Contact Form:** Uses `grid-cols-1 md:grid-cols-2`. Robust.

---

## 4. Token Application Checklist

| Component | CSS Property | Current Value | Target Token/Class |
| :--- | :--- | :--- | :--- |
| **Navbar** | Border Bottom | `border-b-brutal` | `border-b-3` |
| **Footer** | Dialog Radius | `rounded-xl` | `rounded-none` |
| **Footer** | Dialog Shadow | `shadow-2xl` | `shadow-brutal-xl` |
| **Footer** | Link Color | `text-blue-600` | `text-neo-blue` |
| **Projects** | Tag Border | `border-2` | `border-3` |
| **Contact** | Error BG | `bg-red-500` | `bg-neo-pink` |

## 5. Implementation Plan
1.  **Update `src/index.css`:** (If needed) Define `border-brutal` as an alias for `border-3` to avoid changing every file, OR perform a Find/Replace in all files. *Preference: Find/Replace to be explicit.*
2.  **Refactor Footer:** Complete overhaul of the Share Dialog styling.
3.  **Refactor Projects:** Update border widths.
4.  **Refactor Contact:** Update error colors.