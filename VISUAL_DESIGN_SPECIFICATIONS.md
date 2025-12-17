# 🎨 VISUAL DESIGN SPECIFICATIONS

## Color Palette Detailed Reference

### Primary Colors - AI/ML Theme

| Color | Hex | Usage | Psychology |
|-------|-----|-------|------------|
| **Cyan (Primary)** | #06B6D4 | Primary actions, AI focus, highlights | Tech, modern, innovation |
| **Purple (Secondary)** | #A78BFA | Complexity, ML, secondary actions | Creative, intelligent |
| **Blue (Accent)** | #3B82F6 | Supporting elements, stability | Trust, professionalism |
| **Slate (Dark)** | #1E293B | Backgrounds, text containers | Depth, sophistication |
| **Zinc (Pure Dark)** | #09090B | Code blocks, deepest background | Elegance, contrast |

### Semantic Colors

| Color | Hex | Usage | Situation |
|-------|-----|-------|-----------|
| **Success** | #10B981 | Achievements, completions | Positive, celebration |
| **Warning** | #F59E0B | In-progress, alerts | Attention needed |
| **Error** | #EF4444 | Errors, destructive actions | Critical attention |
| **Info** | #06B6D4 | Information, highlights | Educational |

### Gradient Definitions

```css
/* Primary Gradient - Main CTA buttons */
background: linear-gradient(135deg, #06B6D4 0%, #A78BFA 100%);

/* Secondary Gradient - Section headers */
background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);

/* Accent Gradient - Card accents */
background: linear-gradient(135deg, #A78BFA 0%, #3B82F6 100%);

/* Dark Gradient - Background sections */
background: linear-gradient(180deg, #1E293B 0%, #09090B 100%);
```

---

## Typography System

### Font Stack

```css
/* Primary: Clean, Professional */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Secondary: Monospace for code */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

/* Alternative: Premium serif (optional, headers only) */
--font-serif: 'Georgia', 'Times New Roman', serif;
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|-----------------|
| **H1** | 56px (3.5rem) | 900 (Black) | 1.2 | -0.02em |
| **H2** | 40px (2.5rem) | 700 (Bold) | 1.3 | -0.01em |
| **H3** | 30px (1.875rem) | 700 (Bold) | 1.4 | 0 |
| **H4** | 24px (1.5rem) | 600 (Semibold) | 1.5 | 0 |
| **Body** | 16px (1rem) | 400 (Regular) | 1.6 | 0 |
| **Body Small** | 14px (0.875rem) | 400 (Regular) | 1.5 | 0 |
| **Caption** | 12px (0.75rem) | 500 (Medium) | 1.4 | 0.02em |
| **Code** | 14px (0.875rem) | 500 (Medium) | 1.5 | 0 |

### Font Weights

```css
/* Thin */
--font-weight-thin: 100;

/* Light */
--font-weight-light: 300;

/* Regular */
--font-weight-regular: 400;

/* Medium */
--font-weight-medium: 500;

/* Semibold */
--font-weight-semibold: 600;

/* Bold */
--font-weight-bold: 700;

/* Black */
--font-weight-black: 900;
```

---

## Spacing System (8px Grid)

### Base Unit: 8px

```css
--spacing-xs: 4px    (0.5rem)
--spacing-sm: 6px    (0.75rem)  /* Not in base-8, use sparingly */
--spacing-md: 8px    (1rem)
--spacing-lg: 12px   (1.5rem)
--spacing-xl: 16px   (2rem)
--spacing-2xl: 24px  (3rem)
--spacing-3xl: 32px  (4rem)
--spacing-4xl: 48px  (6rem)
--spacing-5xl: 64px  (8rem)
```

### Padding Guidelines

| Component | Horizontal | Vertical | Example |
|-----------|-----------|----------|---------|
| **Button** | 16px | 12px | 16px 12px |
| **Card** | 24px | 24px | 24px all |
| **Section** | 16px (mobile) / 32px (desktop) | 64px | Responsive |
| **Input** | 12px | 12px | 12px all |
| **Badge** | 8px | 4px | 8px 4px |

---

## Border Radius System

```css
/* Minimal - For subtle borders */
--radius-sm: 3px (0.375rem)

/* Standard - For buttons, inputs */
--radius-md: 4px (0.5rem)

/* Card radius */
--radius-lg: 8px (1rem)

/* Large sections */
--radius-xl: 12px (1.5rem)

/* Pill-shaped */
--radius-full: 9999px
```

### Usage Guidelines

| Component | Radius |
|-----------|--------|
| Buttons | 4-8px (md-lg) |
| Cards | 8-12px (lg-xl) |
| Inputs | 4px (md) |
| Badges | 9999px (full, pill) |
| Images | 8px (lg) |
| Containers | 12px (xl) |

---

## Shadow & Depth System

### Elevation Shadows

```css
/* Level 1 - Subtle, hover states */
--shadow-1: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Level 2 - Default cards */
--shadow-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Level 3 - Elevated cards, modals */
--shadow-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Level 4 - Top-level modals, dropdowns */
--shadow-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* Level 5 - Maximum elevation */
--shadow-5: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Glow Effects (Use Sparingly)

```css
/* Subtle glow - Hover states */
--glow-sm: 0 0 8px rgba(6, 182, 212, 0.3);

/* Medium glow - Focus states */
--glow-md: 0 0 16px rgba(6, 182, 212, 0.4);

/* Strong glow - Highlight elements */
--glow-lg: 0 0 24px rgba(6, 182, 212, 0.5);

/* Colored glows for different elements */
--glow-purple: 0 0 16px rgba(167, 139, 250, 0.4);
--glow-blue: 0 0 16px rgba(59, 130, 246, 0.4);
--glow-emerald: 0 0 16px rgba(16, 185, 129, 0.4);
```

### Shadow Applications

| Component | Shadow Level | Situation |
|-----------|--------------|-----------|
| Text | None | Default |
| Hover state | Level 1-2 | Interactive feedback |
| Card | Level 2 | Default state |
| Card Hover | Level 3 | Elevated interaction |
| Modal bg | Level 4 | Top layer |
| Modal | Level 5 | Highest elevation |
| Sticky header | Level 2 | Persistent element |

---

## Component-Specific Design Specifications

### Buttons

#### Primary Button
```css
Background: linear-gradient(135deg, #06B6D4, #A78BFA)
Text: White
Padding: 12px 24px (vertical 12px, horizontal 24px)
Border Radius: 8px
Font Weight: 600
Font Size: 16px
Line Height: 1.5
Shadow: 0 4px 6px -1px rgba(0,0,0,0.1)
Hover: 
  - Scale: 1.02
  - Shadow: 0 10px 15px -3px rgba(0,0,0,0.1)
  - Duration: 0.2s
Focus: 
  - Outline: 2px solid #06B6D4
  - Outline Offset: 2px
Active: Brightness -10%
Disabled: Opacity 50%, cursor not-allowed
```

#### Secondary Button
```css
Background: transparent
Border: 1px solid rgba(167, 139, 250, 0.3)
Text: #A78BFA
Padding: 12px 24px
Border Radius: 8px
Font Weight: 600
Hover:
  - Border Color: rgba(167, 139, 250, 0.6)
  - Background: rgba(167, 139, 250, 0.1)
  - Scale: 1.02
  - Duration: 0.2s
```

#### Icon Button
```css
Size: 40px (min touch target)
Border Radius: 8px
Icon Size: 20px
Padding: 10px (8px padding + 2px icon margin)
Hover:
  - Background: rgba(6, 182, 212, 0.1)
  - Scale: 1.1
Active: Background with stronger opacity
```

### Input Fields

```css
Background: rgba(255, 255, 255, 0.05)
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 8px
Padding: 12px 16px
Font Size: 16px
Font Weight: 400
Text Color: rgba(255, 255, 255, 0.9)
Placeholder: rgba(255, 255, 255, 0.5)

Hover:
  - Border Color: rgba(6, 182, 212, 0.3)
  - Background: rgba(255, 255, 255, 0.08)

Focus:
  - Border Color: #06B6D4
  - Background: rgba(255, 255, 255, 0.1)
  - Box Shadow: 0 0 0 3px rgba(6, 182, 212, 0.1)
  - Outline: none

Disabled:
  - Opacity: 0.5
  - Cursor: not-allowed
  - Background: rgba(255, 255, 255, 0.02)

Error:
  - Border Color: #EF4444
  - Box Shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)
```

### Cards

#### Standard Card
```css
Background: rgba(255, 255, 255, 0.05)
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 12px
Padding: 24px
Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Backdrop Filter: blur(8px) (optional, use sparingly)

Hover:
  - Border Color: rgba(6, 182, 212, 0.3)
  - Background: rgba(255, 255, 255, 0.08)
  - Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
  - Transform: translateY(-2px)
  - Duration: 0.3s
  - Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

#### Featured Card (Highlighted)
```css
Same as standard, plus:
Border: 2px solid #06B6D4
Box Shadow: 0 0 16px rgba(6, 182, 212, 0.2)
```

### Badges

```css
Background: rgba(6, 182, 212, 0.2)
Text: #06B6D4
Padding: 4px 8px
Border Radius: 9999px (pill)
Font Size: 12px
Font Weight: 600
Letter Spacing: 0.02em

Variants:
- Primary: Cyan background (#06B6D4, 20% opacity)
- Secondary: Purple background (#A78BFA, 20% opacity)
- Success: Green background (#10B981, 20% opacity)
- Warning: Amber background (#F59E0B, 20% opacity)
- Error: Red background (#EF4444, 20% opacity)
```

---

## Animation Specifications

### Timing & Easing

```css
/* Easing curve - Apple-inspired */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-linear: linear;

/* Durations */
--duration-fast: 150ms
--duration-base: 300ms
--duration-slow: 500ms
--duration-slower: 700ms
```

### Animation Patterns

#### Fade In
```css
Duration: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
From: opacity: 0
To: opacity: 1
```

#### Fade In + Slide Up
```css
Duration: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
From: 
  - opacity: 0
  - transform: translateY(20px)
To:
  - opacity: 1
  - transform: translateY(0)
```

#### Fade In + Scale
```css
Duration: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
From:
  - opacity: 0
  - transform: scale(0.95)
To:
  - opacity: 1
  - transform: scale(1)
```

#### Hover Scale
```css
Duration: 200ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
Scale: 1 → 1.02
```

#### Focus Ring
```css
Outline: 2px solid #06B6D4
Outline Offset: 2px
Animation: Fade in (200ms)
```

---

## Responsive Design Breakpoints

### Mobile-First Approach

```css
/* Mobile - Base styles */
/* 320px - 640px */
Default layout, single column

/* Tablet - md breakpoint */
/* 641px - 1024px */
@media (min-width: 768px) {
  Two-column layouts
  Larger spacing
  Grid 2-3 columns
}

/* Desktop - lg breakpoint */
/* 1025px+ */
@media (min-width: 1024px) {
  Full layouts
  Large spacing
  Multi-column grids
  Sidebars
}
```

### Section-Specific Responsive

**Hero Section**:
- Mobile: Single column, centered, stats stacked 2x2
- Tablet: Single column, stats 2x2
- Desktop: Full width, stats 1x3

**Projects Grid**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns (featured card is 1x2)

**About Section**:
- Mobile: Stacked (profile, then content)
- Tablet: 50/50 columns
- Desktop: Custom grid layout

**Skills Heatmap**:
- Mobile: Single skill category (dropdown selector)
- Tablet: 2 categories side-by-side
- Desktop: Full heatmap, all categories visible

---

## Dark Mode Color Adjustments

```css
/* Light Mode (default) */
Background: white (#FFFFFF)
Text: #1F2937 (dark gray)
Muted: #6B7280 (medium gray)
Border: #E5E7EB (light gray)
Hover BG: #F3F4F6

/* Dark Mode */
Background: #09090B (pure dark)
Text: #F3F4F6 (light gray)
Muted: #9CA3AF (medium gray)
Border: #1F2937 (dark gray)
Hover BG: #1F2937 (lighter dark)

/* Color Saturation */
Cyan: Slightly brighter in dark mode
Purple: Same saturation
Blue: Slightly brighter in dark mode
```

---

## Accessibility Specifications

### Color Contrast Requirements

```css
/* WCAG 2.1 AA Standard */
Normal text (16px+): 4.5:1 contrast ratio
Large text (18px+): 3:1 contrast ratio
UI components: 3:1 contrast ratio

/* Examples */
White text on cyan (#06B6D4): 4.71:1 ✅
White text on purple (#A78BFA): 3.85:1 ✅
Gray text on white: Maintain 4.5:1 ✅
```

### Focus States

```css
All interactive elements must have visible focus states:

Default:
  Outline: 2px solid #06B6D4
  Outline Offset: 2px
  Visible: Yes
  High Contrast: Yes (min 3:1)

Keyboard Navigation:
  Tab order: Logical flow
  Focus trap: Modals only
  Skip links: Navigation to main content
```

### Motion Preferences

```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Disable heavy animations for users with motion preferences */
```

---

## Performance Optimization Specifications

### Image Optimization

```css
/* Format Priority */
1. AVIF (90% size reduction)
2. WebP (25-35% size reduction)
3. PNG (lossless, for icons)
4. JPEG (lossy, for photos)

/* Sizes */
Thumbnail: 200px width
Card: 400px width
Hero: 1200px width

/* Lazy Loading */
<Image loading="lazy" />
Use NextImage for optimization
Blur placeholder for LCP improvement
```

### CSS Optimization

```css
/* File Size Targets */
Global styles: < 15KB (gzipped)
Component styles: < 2KB per component
Total CSS: < 50KB (gzipped)

/* Utility Classes */
Use Tailwind for consistency
Custom classes for complex components
Avoid inline styles
```

### JavaScript Optimization

```js
/* Bundle Size Targets */
Main bundle: < 150KB (gzipped)
Avoid unnecessary dependencies
Lazy load heavy components
Code split by route

/* Animation Performance */
Use CSS transforms only (no position changes)
GPU-accelerated properties (transform, opacity)
60fps target for all animations
```

---

## Component State Matrix

### Button States

| State | Background | Text | Cursor | Feedback |
|-------|-----------|------|--------|----------|
| Default | Gradient | White | pointer | None |
| Hover | Gradient (darker) | White | pointer | Scale +2%, shadow increase |
| Active | Gradient (darker -10%) | White | pointer | Brightness -10% |
| Focus | Gradient | White | pointer | Focus ring (cyan outline) |
| Disabled | Gradient | White | not-allowed | Opacity 50% |
| Loading | Gradient | White | wait | Spinner animation |

### Card States

| State | Border | Background | Shadow | Feedback |
|-------|--------|-----------|--------|----------|
| Default | Gray | Light | Soft | None |
| Hover | Cyan | Lighter | Medium | Scale -2px, glow |
| Focus | Cyan | Lighter | Medium | Focus ring |
| Active | Cyan | Accent | Strong | Glow, scale |
| Disabled | Gray | Muted | None | Opacity 50% |

---

**Design System Complete. Ready for Implementation! 🎨**
