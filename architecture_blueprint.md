# Architecture Blueprint: Google Analytics (GA4) Integration

## 1. Architectural Goal

Correctly integrate the Google Analytics 4 (GA4) tracking script into the global application layout (`BaseLayout.astro`) to ensure accurate session tracking and valid HTML structure.

## 2. Current State Analysis

- **File**: [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro)
- **Status**: The GA4 script block (Lines 90-98) is currently present but incorrectly positioned between the closing `</head>` tag and the opening `<body>` tag.
- **Impact**: This constitutes invalid HTML markup, potentially causing rendering issues or inconsistent tracking behavior across browsers.

## 3. Implementation Specification

### Component: `BaseLayout`

The `BaseLayout` serves as the root template for the application. The GA4 script acts as a "Headless Integration" that must be initialized as early as possible in the document lifecycle.

### Placement Strategy

- **Location**: Inside the `<head>` element.
- **Position**: Immediately after the critical `<meta>` tags (charset, viewport, SEO metadata) and before the Open Graph/Twitter Card metadata.
- **Reasoning**:
  - Adheres to Google's best practice of placing the tag "immediately after the `<head>` tag" (or as high as feasible).
  - Ensures the analytics library begins loading asynchronously before the body content renders.
  - Fixes the current invalid HTML structure.

### Execution Flow

1.  **Browser Parser** encounters `<head>`.
2.  **Critical Meta** is parsed.
3.  **GA4 Script** is requested (async).
4.  **Page Content** continues rendering.
5.  **GA4 Config** executes once the library loads.

### Code Directive

- **Move** the entire script block (Lines 90-98) to Line 53 (inserting before `<!-- Open Graph / Facebook -->`).
- **Verify** the script preserves the `async` attribute.

## 4. Performance Analysis (Big O)

- **Complexity**: O(1) - Constant time initialization.
- **Impact**:
  - The script is marked `async`, ensuring it does not block the Critical Rendering Path (CRP).
  - Moving it to the `<head>` may slightly increase the Time to First Paint (TTFP) theoretically compared to body-end placement, but `async` mitigates this, and early tracking is prioritized for accuracy.

## 5. Security & Compliance

- **Data Privacy**: The script is a standard Google Analytics configuration (`G-54MHDEV8X7`).
- **Content Security Policy (CSP)**: If a CSP is enforced in the future, `https://www.googletagmanager.com` and `https://www.google-analytics.com` must be whitelisted.
