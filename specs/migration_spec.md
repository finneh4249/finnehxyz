# Neo-Brutalist Migration Specification

**Version:** 1.0.0
**Ref:** `design_guidelines.md`, `design_tokens.json`
**Date:** 2025-11-19

## 1. Token Mapping Strategy (`tailwind.config.js`)

The following configuration structure must be merged into the existing `tailwind.config.js`. This replaces hardcoded hex values with token references to ensure a Single Source of Truth (SSOT).

### required_changes

1.  Update `theme.extend.colors` to match `design_tokens.json` palette.
2.  Update `theme.extend.boxShadow` to match "Hard Depth" principle.
3.  Update `theme.extend.borderWidth` to match "Raw Functionality".
4.  Force `borderRadius: 0` globally via theme.

### tailwind_config_structure

```javascript
// tailwind.config.js merge target
module.exports = {
  theme: {
    extend: {
      // 1. Colors: Map 'neo-*' from tokens.palette
      colors: {
        neo: {
          bg: "#FAFAFA", // tokens.base.light
          dark: "#0A0A0A", // tokens.base.dark
          white: "#FFFFFF", // tokens.base.pure-white
          black: "#000000", // tokens.base.pure-black
          yellow: "#FFE600", // tokens.palette.neo-yellow
          pink: "#FF006E", // tokens.palette.neo-pink
          blue: "#00B4D8", // tokens.palette.neo-blue
          green: "#06FFA5", // tokens.palette.neo-green
          purple: "#B75CFF", // tokens.palette.neo-purple
          orange: "#FF6B35", // tokens.palette.neo-orange
        },
      },
      // 2. Shadows: Hard offsets, no blur
      boxShadow: {
        "brutal-sm": "4px 4px 0px 0px #000000",
        "brutal-md": "6px 6px 0px 0px #000000",
        "brutal-lg": "10px 10px 0px 0px #000000",
        "brutal-xl": "15px 15px 0px 0px #000000",
        // Dark mode alternatives (white outlines/shadows)
        "brutal-dark-sm": "4px 4px 0px 0px #FFFFFF",
        "brutal-dark-md": "6px 6px 0px 0px #FFFFFF",
      },
      // 3. Borders: Thick defaults
      borderWidth: {
        3: "3px", // Standard
        6: "6px", // Thick
      },
      // 4. Typography
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      // 5. Animation timings
      transitionTimingFunction: {
        brutal: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
};
```

---

## 2. CSS Refactoring Strategy (`src/index.css`)

The goal is to eliminate specificity wars caused by `!important` and move styles into the Tailwind `@layer` system.

### Logical Flow

1.  **Audit**: Identify all instances of `!important`.
2.  **Extract**: Move global resets to `@layer base`.
3.  **Componentize**: Move `.brutal-card`, `.brutal-btn` to `@layer components`.
4.  **Refactor**: Replace `style="border-radius: 0 !important"` with Tailwind config `theme.borderRadius.DEFAULT: '0px'`.

### Refactoring Pseudocode

```css
/* src/index.css REFACTOR PLAN */

/* 1. BASE LAYER */
@layer base {
  /* Enforce No-Radius Globally via wildcard if config insufficient, 
     but prefer Tailwind Config 'borderRadius: { DEFAULT: '0px' }' */
  *,
  ::before,
  ::after {
    border-radius: 0px; /* Remove !important if config is set correctly */
  }

  body {
    @apply bg-neo-bg text-neo-black;
  }

  /* Dark mode overrides using CSS variables */
  :root[class~="dark"] body {
    @apply bg-neo-dark text-neo-white;
  }
}

/* 2. COMPONENTS LAYER */
@layer components {
  .brutal-card {
    /* Remove !important by ensuring high specificity via layer */
    @apply border-3 border-neo-black bg-neo-white shadow-brutal-md transition-transform duration-200 ease-brutal;
  }

  .brutal-card:hover {
    @apply translate-x-[-2px] translate-y-[-2px] shadow-brutal-lg;
  }

  /* Handle Dark Mode in Utility Class, not separate media query block if possible */
  .dark .brutal-card {
    @apply bg-neo-dark border-neo-white shadow-brutal-dark-md; /* White borders/shadows on dark */
  }
}
```

---

## 3. Component Specifications

### 3.1 SkillCard (`src/components/skills/SkillCard.astro`)

**Problem:** Color is determined by hashing the title string (fragile, non-deterministic visual hierarchy).
**Goal:** Decouple presentation from content. Use deterministic category mapping.

#### Data Structure: CategoryMap

```typescript
const CATEGORY_COLOR_MAP = {
  Frontend: "neo-blue",
  Backend: "neo-green",
  Database: "neo-yellow",
  DevOps: "neo-purple",
  Design: "neo-pink",
  Mobile: "neo-orange",
  Default: "neo-bg",
};
```

#### Logical Flow (Pseudocode)

```astro
MODULE SkillCard
  INPUTS:
    icon: string
    title: string
    description: string
    category: string (Optional)
    colorOverride: string (Optional)

  // 1. Determine Color Class
  VAR activeColor

  IF colorOverride IS DEFINED THEN
    activeColor = colorOverride
  ELSE IF category IS DEFINED AND EXISTS IN CATEGORY_COLOR_MAP THEN
    activeColor = CATEGORY_COLOR_MAP[category]
  ELSE
    activeColor = CATEGORY_COLOR_MAP['Default']
  END IF

  // 2. Render
  RENDER <article class="brutal-card">
    <header class={`bg-${activeColor} border-b-3 border-black p-4`}>
      <icon class={icon} />
      <text>{title}</text>
    </header>
    <body class="p-6">
      <badge>{category}</badge>
      <text>{description}</text>
    </body>
  </article>
END MODULE
```

### 3.2 Hero (`src/components/sections/Hero.astro`)

**Problem:** Absolute positioning (`top-20`, `left-10`) breaks on tablets and requires manual "safe zone" management.
**Goal:** Use CSS Grid to create a "Deterministic Chaos" layout that is responsive.

#### Logical Flow (Pseudocode)

```astro
MODULE HeroSection
  // 1. Define Grid Layout
  // Use a 12-column grid for the container
  // Decorative elements occupy specific grid cells rather than absolute pixels

  STRUCTURE GridContainer
    style: "display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: auto auto;"

    // 2. Place Decorative Elements (Responsive)
    // On Mobile: Hidden or simplified to top/bottom borders
    // On Desktop: Placed in specific cells

    ELEMENT DecoShape1 (Yellow Box)
      desktop_pos: "col-start-2 col-end-3 row-start-1"
      mobile_pos: "hidden"

    ELEMENT DecoShape2 (Pink Box)
      desktop_pos: "col-start-11 col-end-12 row-start-2"

    // 3. Main Content (Centered)
    ELEMENT ContentWrapper
      pos: "col-start-2 col-end-12 md:col-start-3 md:col-end-11"
      layout: "flex flex-col md:flex-row"

      CHILD ProfileImage
        style: "brutal-border shadow-hard rotate-[-2deg]"

      CHILD TextBlock
        style: "z-index: 10"

  END STRUCTURE
END MODULE
```

---

## 4. Accessibility & Mitigation Checklist

### 4.1 Reduced Motion

Wrap all "shake", "bounce", and "hover displacement" animations in a `prefers-reduced-motion` media query check.

```css
@media (prefers-reduced-motion: no-preference) {
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
  .hover-displace:hover {
    transform: translate(-4px, -4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-shake {
    animation: none;
  }
  .hover-displace:hover {
    transform: none;
    /* Use color change or border thickness change instead of movement */
    text-decoration: underline;
  }
}
```

### 4.2 Dark Mode Shadows

In Dark Mode (`.dark`), purely black shadows (`#000`) on dark backgrounds (`#0A0A0A`) are invisible, destroying the "Hard Depth" effect.

**Logic:**
IF `theme` == `dark` THEN
Change `box-shadow` color to `rgba(255,255,255, 0.2)` OR `theme.colors.neo.white`
Keep `border` color `theme.colors.neo.white` (High Contrast)
END IF
