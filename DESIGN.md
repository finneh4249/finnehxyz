---
name: The Signal Terminal
description: A high-stakes diagnostic terminal inspired by aviation, rail infrastructure, and analog music gear.
colors:
  primary: "#FF6B00"
  neutral-bg: "#0A0A0A"
  neutral-surface: "#1A1816"
  neutral-text: "#F0F0F0"
  success: "#00FF41"
  warning: "#FFD700"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.5
  mono:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.875rem"
    letterSpacing: "0.05em"
rounded:
  none: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  card-terminal:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
---

# Design System: The Signal Terminal

## 1. Overview

**Creative North Star: "The Signal Terminal"**

This system is an uncompromising professional interface that bridges the gap between infrastructure and art. It draws its soul from the high-stakes environments of aviation flight decks, railway signaling systems, and the tactile precision of analog recording studios. It rejects "boring" minimalism in favor of "Aggressive Expertise"—a dense, efficient, and physically present layout that implies a mind capable of running circles around standard IT departments.

**Key Characteristics:**
- **Infrastructural Weight**: Everything is built with 0px radius corners and thick borders, feeling as solid as a steel rail.
- **High-Visibility Commitment**: A single "Signal" color carries the weight, used not just as an accent but as a primary surface to demand attention.
- **Terminal Precision**: Typography is used to simulate data readouts, using monospaced fonts for labels and massive, unapologetic display weights for headlines.
- **Choreographed Velocity**: Motion is orchestrated to feel like mechanical signal flaps or hydraulic systems engaging.

## 2. Colors

The palette is built on "Committed" saturation, using high-visibility industrial tones against deep, "greased" charcoal neutrals.

### Primary
- **Signal Orange** (#FF6B00 / oklch(60% 0.2 45)): The core of the identity. Used for primary actions, critical headings, and "Committed" surfaces. It signals urgency, confidence, and expertise.

### Neutral
- **Terminal Void** (#0A0A0A): The base background. Deep, absolute, and stable.
- **Greased Charcoal** (#1A1816): Used for cards and surfaces to create subtle, hard-edged depth.
- **Paper White** (#F0F0F0): High-contrast text color for maximum legibility.

**The Committed Rule.** Signal Orange is never just a "pop" of color. It must carry at least 30% of the visual weight on primary landing sections to establish brand dominance.

## 3. Typography

**Display Font:** Space Grotesk (700, 900)
**Body Font:** Space Grotesk (400, 500)
**Mono Font:** Space Mono (400, 700)

**Character:** A pairing that feels like an engineering manual met a concert poster. Space Grotesk provides "Quiet Confidence" through its geometric clarity, while Space Mono provides the "Terminal" feel of a diagnostic tool.

### Hierarchy
- **Display** (900, 6rem, 0.9): Reserved for hero statements and section identifiers. It should feel massive and physically imposing.
- **Body** (400, 1rem, 1.5): Clean, legible, and spaced for technical documentation.
- **Mono/Label** (700, 0.875rem, 0.05em): Used for all metadata, labels, and "system status" messages.

## 4. Elevation

The system rejects blurs and shadows. Depth is conveyed through **Hard Offsets** and **Layered Contrast**.

**The Hard Depth Rule.** Depth is created by offsetting a surface by an exact pixel value (e.g., 4px, 8px) with a solid fill background, simulating a physically layered object like a switchboard.

## 5. Components

### Buttons
- **Shape:** Rigid (0px)
- **Primary:** Signal Orange background with Terminal Void text. No hover state transitions to soft colors; instead, use a 4px physical displacement (translate-x/y) to simulate a physical button press.

### Cards / Terminal Containers
- **Style:** Greased Charcoal background with a 2px Greased Charcoal border.
- **Shadow Strategy:** 8px Hard Offset using Signal Orange or Terminal Void depending on the background.

## 6. Do's and Don'ts

### Do:
- **Do** use `border-radius: 0` on every single element without exception.
- **Do** use Space Mono for any text that describes a status, category, or technical detail.
- **Do** use massive contrast ratios (target WCAG AAA).

### Don't:
- **Don't** use "SaaS-cream" pastels or rounded corners. "Anything boring" is the primary enemy.
- **Don't** use blurs or soft shadows. If it's not a solid block of color, it doesn't belong.
- **Don't** use em dashes—use semicolons or periods to maintain "Terminal" brevity.
