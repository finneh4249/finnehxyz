# Neo-Brutalist Design System & Audit Report

## 1. Executive Summary & Audit Findings
The current implementation of the `FinnehXYZ` portfolio successfully captures the core aesthetic of **Neo-Brutalism**: high contrast, unpolished "raw" geometry, and vibrant saturation. However, the technical implementation relies heavily on `!important` overrides and absolute positioning, which creates fragility in responsiveness and maintenance.

### Key Issues Identified:
*   **Specificity Wars:** Excessive use of `!important` in `index.css` (lines 46, 187, 193) overrides Tailwind's utility classes, making it difficult to create variations without writing more custom CSS.
*   **Accessibility Risks:** While contrast is generally high, the reliance on pure black shadows on dark mode backgrounds needs careful checking. The "shaking" animations and flashing text could trigger vestibular disorders; `prefers-reduced-motion` queries are missing.
*   **Layout Fragility:** The `Hero.astro` component uses absolute positioning for decorative elements without clear responsive bounds, risking overlap on intermediate screen sizes (tablets).
*   **Component Coupling:** Components like `SkillCard` have business logic (color calculation based on char codes) mixed with presentation.

## 2. Core Design Principles

### I. Unapologetic Boldness
*   **Definition:** High saturation colors and pure black/white are the only options. No pastels, no gradients.
*   **Implementation:** Use the defined `neo-*` palette.
*   **Constraint:** Text must always be `#000000` on neo-colors, or `#FFFFFF` on black backgrounds.

### II. Raw Functionality (The "Brutal" Aspect)
*   **Definition:** Exposed structure. Borders are thick and omnipresent.
*   **Implementation:** `border-width: 3px` is the minimum. `border-radius: 0` is non-negotiable.
*   **Constraint:** No rounding. Ever. Even for avatars or buttons.

### III. Deterministic Chaos
*   **Definition:** Elements should look "tossed" but be rigorously grid-aligned.
*   **Implementation:** Use strict rotation steps (`1deg`, `2deg`, `3deg`, `6deg`). Avoid random arbitrary numbers.
*   **Constraint:** Rotations should alternate (positive/negative) to maintain optical balance.

### IV. Hard Depth
*   **Definition:** Depth is conveyed through hard, solid shadows, not blurs.
*   **Implementation:** `box-shadow: Xpx Ypx 0px 0px #000`.
*   **Constraint:** No `blur` radius on shadows.

### V. Accessible Aggression
*   **Definition:** The design shouts, but it speaks clearly.
*   **Implementation:** Typography must be high-contrast and legible (`Space Grotesk`).
*   **Constraint:** Minimum font size `16px` (1rem). Interactive elements must have distinct hover states that involve physical displacement (translate).

## 3. Component Library Strategy (Shadcn/UI Adaptation)
To stabilize the codebase, we recommend adopting **Shadcn/UI** but heavily customizing the `theme.css` variables to enforce the brutalist constraints.

*   **Radius Token:** Set `--radius: 0rem;` globally in the Shadcn config.
*   **Card Component:** Override the default `Card` to include `border-3 border-black shadow-hard-md`.
*   **Button Component:** Override variants to use the `neo-*` colors and remove all rounded corners.

## 4. Technical Specifications (See `design_tokens.json`)

### Typography
*   **Display:** Space Grotesk (Weights: 700, 900)
*   **Body:** Space Grotesk (Weights: 400, 500)
*   **Code:** Space Mono (Weights: 400)

### Spacing System
*   Use a `4px` baseline grid.
*   `p-4` (16px) is the standard padding for inputs and buttons.
*   `p-6` (24px) is the standard padding for cards.

### Mitigation Strategies
1.  **Remove `!important`:** Refactor `index.css` to use Tailwind's `@layer base` and `@layer components` properly with higher specificity selectors if needed, or rely on Tailwind's configuration.
2.  **Reduced Motion:** Wrap animations in `@media (prefers-reduced-motion: no-preference)`.
3.  **Dark Mode Shadows:** In dark mode, switch hard shadows to `white` or a lighter gray to ensure visibility against the dark background, or use a "glow" effect with 0 blur (solid outline).