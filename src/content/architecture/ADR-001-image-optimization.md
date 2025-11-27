---
title: "ADR-001: Migrate to Astro Image Component"
status: "ACCEPTED"
date: "2025-11-27"
author: "Ethan Cornwill"
tags: ["Architecture", "Performance", "Images", "Astro"]
---

## Context

The portfolio website previously used standard HTML `<img>` tags for displaying images, including the main profile image in the Hero section. This approach lacked automatic optimization features such as:

- **Format conversion:** Serving modern formats like WebP or AVIF based on browser support.
- **Responsive sizing:** Generating multiple resolutions for different device pixel ratios (DPR) and screen sizes.
- **Lazy loading:** Deferring off-screen images to improve initial page load time.
- **Layout Shift Prevention:** Explicitly defining dimensions to prevent Cumulative Layout Shift (CLS).

The profile image (`ethan.jpg`) was a static asset that was not optimized for performance, potentially impacting Core Web Vitals.

## Decision

We decided to migrate the image handling strategy to use **Astro's built-in `<Image />` component** (`astro:assets`).

Specifically, we:

1.  Moved the source image from `public/` to `src/assets/images/` to enable build-time processing.
2.  Replaced the `<img>` tag in `src/components/sections/Hero.astro` with the `<Image />` component.
3.  Configured the component with explicit `width` and `height` attributes.
4.  Utilized the `densities` prop to generate 1.5x and 2x variants for high-DPI displays.

## Consequences

### Positive

- **Improved Performance:** Images are now automatically optimized and served in the most efficient format (WebP/AVIF).
- **Better UX:** High-DPI support ensures crisp images on Retina displays without serving unnecessarily large files to standard screens.
- **Reduced CLS:** Explicit dimensions prevent layout shifts during loading.
- **Developer Experience:** Astro handles the complexity of generating `srcset` and `sizes` attributes automatically.

### Negative

- **Build Time:** Image processing happens at build time, which may slightly increase the build duration, though this is negligible for the current number of assets.
- **Migration Effort:** Requires moving assets to `src/` and updating import paths.

## Status

Accepted and Implemented.
