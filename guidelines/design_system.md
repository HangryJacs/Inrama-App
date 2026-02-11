# Inrama Design System (MRDS)

This document defines the design tokens and component specifications for the **Inrama** fashion application. It is designed to be machine-readable for AI code generation agents.

## 1. Brand Identity
- **Name**: Inrama
- **Core Aesthetic**: Modern, Minimalist, High-Contrast, Premium.
- **Font Face**: `Roboto Condensed` (Google Fonts).

## 2. Design Tokens

### 2.1 Color Palette

| Token Name | Hex Value | CSS Variable Reference | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** |
| `color-primary` | `#0b0b0b` | `--COLOR-PRIMARY-OPPOSITE` (inverted), used as BG for primary buttons | Main brand color, buttons, headings |
| `color-secondary` | `#ffffff` | `--COLOR-SECONDARY-OPPOSITE` (inverted) | Backgrounds, text on primary |
| **Backgrounds** |
| `bg-primary` | `#ffffff` | `--COLOR-BG` | Main page background |
| `bg-secondary` | `#e6e6e6` | `--COLOR-BG-DARKEN` | Secondary sections, panels |
| `bg-overlay` | `rgba(255, 255, 255, 0.75)` | `--COLOR-BG-OVERLAY` | Modals, overlays |
| **Text** |
| `text-primary` | `#0b0b0b` | `--COLOR-TEXT` | Body, Headings |
| `text-light` | `#3e3e3e` | `--COLOR-TEXT-LIGHTEN` | Subtitles, less emphasized text |
| `text-inverted` | `#ffffff` | N/A | Text on dark backgrounds |
| **Accents & UI** |
| `color-accent` | `#6A6A6A` | `--COLOR-ACCENT` | Borders, secondary icons |
| `border-color` | `#6A6A6A` | `--COLOR-BORDER` | Input borders, dividers |
| `border-hairline`| `#f7f7f7` | `--COLOR-BORDER-HAIRLINE`| Subtle borders |
| **Status** |
| `color-sale` | `#e62f2f` | `--COLOR-SALE-BG` | Sale badges, price highlights |
| `color-error` | `#D02E2E` | `--COLOR-ERROR` | Error states |
| `color-success` | `#56AD6A` | `--COLOR-SUCCESS` | Success messages |

### 2.2 Typography

**Font Family**: `Roboto Condensed`, sans-serif

| Role | Font Family | Weight | Style | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Body** | `Roboto Condensed` | 400 (Regular) | Normal | Main content, descriptions |
| **Heading** | `Roboto Condensed` | 700 (Bold) | Normal | H1-H6, Section Titles |
| **Navigation** | `Roboto Condensed` | 700 (Bold) | Normal | Menu items |
| **Buttons** | `Roboto Condensed` | 700 (Bold) | Normal | Call to action text |
| **Subheading**| `Roboto Condensed` | 400 (Regular) | Normal | Subtitles |

**Weights Available**: 100 (Thin), 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold), 800 (Extra Bold), 900 (Black).

**Letter Spacing**:
- Navigation: `0.025em`
- Subheading: `0.05em`
- Buttons: `-0.025em` (Tight)

**Text Transform**:
- Buttons: `uppercase`
- Navigation: `uppercase` (inferred from style commonality)

### 2.3 Layout & Spacing

| Token | Value | Description |
| :--- | :--- | :--- |
| `site-width` | `1440px` | Maximum width for main container |
| `site-width-narrow` | `840px` | Maximum width for text-heavy content |
| `gutter` | `60px` | Standard horizontal padding |
| `gutter-mobile` | `20px` | Horizontal padding on mobile |
| `grid-gutter` | `20px` | Gap between grid items |
| `scrollbar-width` | `0px` | Hidden scrollbars style |

### 2.4 Breakpoints
- `mobile`: 480px
- `small`: 768px
- `large`: 1024px
- `widescreen`: 1440px

### 2.5 Borders & Effects
- `border-width`: `1px`
- `radius`: `0px` (Sharp corners for everything: buttons, inputs, badges)
- `radius-pill`: `25px` (Available but unused in primary tokens, system defaults to 0px)

---

## 3. UI Components

### 3.1 Buttons

**Primary Button**
- **Background**: `#0b0b0b` (Black)
- **Text**: `#ffffff` (White)
- **Border**: `#0b0b0b`
- **Hover**: Lighten/Darken variant `#252525`
- **Typography**: Bold, Uppercase, Tight tracking
- **Shape**: Sharp corners (0px radius)

**Secondary Button**
- **Background**: `#ffffff` (White)
- **Text**: `#000000` (Black)
- **Border**: `#ffffff`
- **Hover**: Transparent white overlay

**Outline Button**
- **Background**: Transparent
- **Text**: `#0b0b0b`
- **Border**: `#0b0b0b` (1px solid)
- **Hover**: Background `rgba(37, 37, 37, 0.2)`

### 3.2 Inputs & Forms
- **Background**: `#ffffff`
- **Text**: `1.15rem` size
- **Border**: `#6A6A6A` (Accent color)
- **Shape**: Sharp corners (0px radius)

### 3.3 Product Cards
- **Image Aspect Ratio**: 1.5 (Portrait)
- **Hover Effect**: Image swap
- **Grid Layout**:
    - Desktop: 4 columns
    - Tablet: 3 columns
    - Mobile: 2 columns

### 3.4 Badges
- **Sale**: Background `#e62f2f`, Text `#ffffff`
- **Sold Out**: Background `#e62f2f`, Text `#ffffff`
- **Saving**: Background `#000000`, Text `#ffffff`
- **Shape**: Sharp corners (0px radius)

---

## 4. Implementation Guidelines (CSS/Tailwind)

For the new app implementation:

1.  **Global Styles**: Apply `Roboto Condensed` to `body` and `html`. Set base text color to `#0b0b0b`.
2.  **Reset**: Use a modern reset. Remove scrollbars if adhering strictly to reference (`--scrollbar-width: 0px`).
3.  **Tailwind Config**:
    - Extend `colors` with `primary: '#0b0b0b'`, `secondary: '#ffffff'`, `accent: '#6A6A6A'`, `sale: '#e62f2f'`.
    - Extend `fontFamily` with `sans: ['Roboto Condensed', 'sans-serif']`.
    - Set `borderRadius` defaults to `0`.
4.  **Icons**: Use generic icons (plus, minus, close, chevron-right) styled with thin strokes (`stroke-width: 12px` scaled down, effectively roughly 1-2px in view).
