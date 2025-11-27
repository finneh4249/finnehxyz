# Neo-Brutalist Design System Migration

**Date:** November 19, 2025
**Status:** Complete
**Context:** Phase 5 (Completion)

## 1. Overview

This document details the migration of the FinnehXYZ portfolio to a strict **Neo-Brutalist** design system. The primary goals of this migration were:

1.  **Visual Consistency:** enforcing a strict palette and geometric constraints via design tokens.
2.  **Maintainability:** Decoupling styles from components using Tailwind utility classes and a centralized configuration.
3.  **Performance & Stability:** Removing fragile `!important` overrides and absolute positioning in favor of CSS layers and Grid layouts.
4.  **Accessibility:** Ensuring high contrast and robust support for users with motion sensitivities.

## 2. Key Changes

### 2.1 Design System & Tokens

The source of truth for the design system is now located in `design_tokens.json`. This file defines:

- **Colors:** A semantic `neo-*` palette (Yellow, Pink, Blue, Green, Purple, Orange).
- **Borders:** Strict 3px (`default`) and 6px (`thick`) widths.
- **Shadows:** Hard, non-blurred shadows (`hard-sm` to `hard-xl`).

Reference: [`design_guidelines.md`](../design_guidelines.md)

### 2.2 Tailwind Configuration (`tailwind.config.js`)

The Tailwind configuration has been extended to map the design tokens directly to utility classes:

- **Colors:** `bg-neo-yellow`, `text-neo-black`, `border-neo-pink`.
- **Shadows:** `shadow-brutal-sm`, `shadow-brutal-md` (aliased to `hard-*` tokens).
- **Borders:** `border-3` (default), `border-6` (thick).
- **Radius:** `rounded-none` is enforced globally via `index.css` but configured as default in Tailwind.

### 2.3 Global CSS Refactoring (`src/index.css`)

The legacy stylesheet has been completely refactored to use Tailwind's `@layer` directives:

- **`@layer base`**: Enforces global resets (e.g., `border-radius: 0px` everywhere).
- **`@layer components`**: Defines reusable component classes like `.brutal-btn` and `.brutal-card` to keep HTML clean.
- **Specificity:** Removed `!important` tags by properly leveraging the cascade layers.

### 2.4 Component Architecture

#### SkillCard (`src/components/skills/SkillCard.astro`)

- **Change:** Logic for assigning colors to skills was brittle and hard-coded.
- **Solution:** Implemented `src/utils/colorMapping.js` to deterministically generate a Neo-Brutalist color based on the skill name string. This ensures the same skill always gets the same color without manual mapping.

#### Hero Section (`src/components/sections/Hero.astro`)

- **Change:** Previously relied on absolute positioning for decorative elements, causing overlaps on tablet screens.
- **Solution:** Refactored to use **CSS Grid**. Elements are now placed in explicit grid cells, ensuring they stack or resize correctly across all viewports while maintaining the "chaotic" aesthetic.

### 2.5 Full Component Rollout

The following sections have been fully migrated to the Neo-Brutalist design system:

- **Navbar:** Updated with high-contrast borders, sticky positioning, and neo-brutalist mobile menu.
- **Footer:** Implemented hard shadows and borders.
  - _Fix:_ resolved layout issues in the **Share Dialog**, ensuring it stays within viewport bounds on mobile.
- **AboutMe:** Refactored text containers with standardized `brutal-card` classes.
- **Education:** Converted to a vertical stack layout with consistent border widths.
- **Experience:**
  - _Improvement:_ **Standardized Timeline items** to use consistent 3px borders and hard-edged markers, replacing the previous rounded/soft style.
- **Projects:** Updated project cards to use the `SkillCard` color mapping logic for tags and consistent button styles.
- **Contact:**
  - _Improvement:_ **Hard-edged Social Buttons** with distinct hover states (shifting backgrounds) to match the primary button interaction model.

## 3. Accessibility Enhancements

### Reduced Motion

We have implemented a global `prefers-reduced-motion` media query in `src/index.css`.

- **Behavior:** If a user requests reduced motion, all layout shifts, shakes, bounces, and glitch effects are disabled immediately.
- **Implementation:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
      animation: none !important;
      transition: none !important;
    }
  }
  ```

### Dark Mode

- **Strategy:** Neo-brutalism typically relies on black shadows. In dark mode, these become invisible.
- **Solution:** Shadows automatically switch to `white` (or light gray) outlines in dark mode using the `shadow-brutal-dark-*` utilities, ensuring depth is maintained even on dark backgrounds.

## 4. Usage Guide

### Common Patterns

**Creating a Card:**

```html
<div class="brutal-card p-6 border-3 border-neo-black bg-neo-white">
  <h3 class="font-display font-bold text-xl">Card Title</h3>
  <p>Content goes here.</p>
</div>
```

**Primary Button:**

```html
<button
  class="brutal-btn bg-neo-pink text-neo-white hover:bg-neo-yellow hover:text-neo-black"
>
  Click Me
</button>
```

**Using Deterministic Colors (JS/React):**

```javascript
import { getNeoColor } from "../utils/colorMapping";

const color = getNeoColor("React"); // Returns a hex code from the palette
```

### Utility Reference

| Class              | Description                       |
| ------------------ | --------------------------------- |
| `border-3`         | Standard 3px border thickness     |
| `shadow-brutal-md` | Standard hard shadow (6px offset) |
| `bg-neo-yellow`    | Standard accent color             |
| `font-display`     | Space Grotesk font family         |

## 5. Audit Status

**Date:** November 19, 2025
**Result:** ✅ Passed

A comprehensive visual and accessibility audit was conducted following the rollout.

- **Visual Regression:** Confirmed all components adhere to `design_tokens.json` (3px borders, hard shadows).
- **Accessibility:**
  - Focus states are visible and high-contrast.
  - `prefers-reduced-motion` queries successfully disable animations.
  - Dark mode shadows remain visible (white/grey outlines).
