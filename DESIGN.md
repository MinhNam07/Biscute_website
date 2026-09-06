---
name: BISCUTE Vietnam
description: Cute memories from Vietnam — neo-brutalist souvenir shop with bold geometry and playful color.
colors:
  primary-blue: "#1857c8"
  deep-blue: "#103a8c"
  mustard-yellow: "#FFD831"
  soft-yellow: "#ffee8c"
  accent-red: "#d93a32"
  deep-red: "#a92724"
  warm-cream: "#f8f3e7"
  dark-ink: "#2c2f36"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.025em"
    fontSize: "clamp(2.25rem, 4vw + 1rem, 5.75rem)"
  page-title:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontSize: "clamp(2rem, 2.5vw + 1rem, 3.5rem)"
  section:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontSize: "clamp(1.75rem, 2vw + 0.75rem, 2.75rem)"
  subsection:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontSize: "clamp(1.25rem, 1vw + 0.75rem, 1.75rem)"
  card-title:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.03em"
    fontSize: "0.875rem"
  body-lg:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 500
    lineHeight: 1.625
    fontSize: "clamp(1rem, 0.5vw + 0.9rem, 1.25rem)"
  body:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 500
    lineHeight: 1.625
    fontSize: "1rem"
  meta:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 500
    lineHeight: 1.5
    fontSize: "0.875rem"
  label:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.06em"
    fontSize: "0.75rem"
  nav:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
    fontSize: "0.75rem"
  cta:
    fontFamily: "Outfit, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
    fontSize: "0.875rem"
  wordmark:
    fontFamily: "The Funy Time, sans-serif"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
rounded:
  none: "0px"
  pill: "9999px"
  swatch: "9999px"
spacing:
  scale-1: "4px"
  scale-2: "8px"
  scale-3: "12px"
  scale-4: "16px"
  scale-6: "24px"
  scale-8: "32px"
  scale-12: "48px"
  scale-16: "64px"
  scale-24: "96px"
  scale-32: "128px"
  section-sm: "48px"
  section-md: "64px"
  section-lg: "96px"
  section-xl: "128px"
  container-sm: "16px"
  container-md: "24px"
  container-lg: "32px"
  container-xl: "48px"
  grid-gap: "8px"
  grid-gap-relaxed: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.deep-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.mustard-yellow}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  badge-best-seller:
    backgroundColor: "{colors.primary-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "2px 10px"
---

# Design System: BISCUTE Vietnam

## Overview

**Creative North Star: "The Playful Passport Stamp"**

BISCUTE Vietnam is a souvenir shop that feels like a collectible you picked up on your trip — bold, graphic, and unapologetically cute. The visual language borrows from neo-brutalism: hard offset shadows instead of soft blur, square corners as the default, thick ink borders that scale up on desktop, and a palette anchored in Vietnam's national colors (blue, yellow, red) on a warm cream ground. Geometry is a recurring motif — circles, squares, and triangles appear as corner decorations on cards and as hero accents, giving every surface a handmade-sticker quality.

The system is built for **Persuade** mode: this is an e-commerce storefront where design is the product. Every section alternates saturated color blocks (pink/blue header, mustard announcement, deep-blue footer) against cream and white breathing room. Typography is loud where it matters — display weight on the hero, extrabold section titles — while body copy, descriptions, and metadata stay friendly at medium weight in sentence case. Product photography starts grayscale and reveals color on hover, a deliberate "unwrap the gift" moment.

**Key Characteristics:**
- Neo-brutalist hard shadows (offset, zero blur) on every elevated surface
- Square-by-default geometry; pills reserved for CTAs inside product cards
- Vietnam-flag palette: ~55% cream/white, ~25% blue, ~12% yellow, ~8% red
- Thick ink borders (2px mobile → 4px desktop) as the primary depth cue
- Geometric corner decorations rotate across card index (circle / square / triangle)
- "The Funy Time" display font reserved exclusively for the BISCUTE wordmark
- Legacy token names (`biscute-pink`) map to blue — do not reintroduce actual pink

## Colors

A warm, patriotic palette that reads instantly as Vietnamese without being literal — blue carries brand authority, mustard draws the eye to announcements and secondary actions, red punctuates urgency, and cream keeps the shop feeling approachable rather than institutional.

### Primary
- **Royal Biscute Blue** (#1857c8): Header background, primary buttons, best-seller badges, hero accent panels. The dominant brand color — used on ~25% of any screen.
- **Deep Passport Blue** (#103a8c): Hover states on primary buttons, open accordion triggers, footer background, deep accent panels. Adds weight without competing with primary blue.

### Secondary
- **Mustard Announcement** (#FFD831): Announcement bar, secondary buttons, wordmark fill. High-visibility accent for time-sensitive or promotional content.
- **Soft Butter Yellow** (#ffee8c): Pale accent backgrounds, accordion content panels, nav hover highlights on blue surfaces, footer link color. The gentle counterweight to mustard.

### Tertiary
- **Souvenir Red** (#d93a32): Accent highlights, limited-edition badges, icon accents on product detail chips. Used sparingly for urgency and delight.
- **Deep Stamp Red** (#a92724): Reserved for future emphasis; defined but rarely surfaced in current components.

### Neutral
- **Warm Cream** (#f8f3e7): Default page background, sheet/drawer backgrounds, mascot fill. The "~55%" base that everything sits on.
- **Dark Ink** (#2c2f36): All text, borders, shadow color, focus outlines. Every border and shadow resolves to this single ink tone.
- **Clean White** (#ffffff): Card backgrounds, button outlines, icon-button fills, product image containers.

### Named Rules
**The One Ink Rule.** All borders, shadows, focus rings, and outlines use Dark Ink (#2c2f36). Never introduce a second border color or a blurred shadow.

**The Ratio Rule.** Respect the documented usage ratio: ~55% cream/white · 25% blue · 12% yellow · 8% red. Red never dominates a viewport; blue never fills more than one major band per scroll depth.

## Typography

**Display Font:** Outfit (Google Fonts, weights 400/500/600/700/800/900)
**Body Font:** Outfit (same family — display and body are unified)
**Wordmark Font:** The Funy Time (local TTF, display only)

**Character:** Outfit carries the full interface. Weight 900 is reserved for hero display type. Section headings use 800; card titles and subsections use 700. Body and metadata use 500 in sentence case. Labels, nav, and CTAs use 600 with moderate tracking and uppercase. The Funy Time wordmark is a striped yellow fill with deep-blue stroke — never used outside the logo.

**Implementation:** Semantic roles live in `app/typography.css` as `.type-*` classes backed by `--type-*` CSS custom properties. Components apply a role class rather than ad-hoc Tailwind size/weight stacks.

### Hierarchy
- **Display** `.type-display` (900, clamp(2.25rem–5.75rem), lh 0.9, uppercase): Hero headlines only. One per viewport.
- **Page title** `.type-page-title` (800, clamp(2rem–3.5rem), lh 0.95, uppercase): Inner-page h1 (shop, product, collection).
- **Section title** `.type-section-title` (800, clamp(1.75rem–2.75rem), lh 1, uppercase): Homepage and content section h2.
- **Subsection** `.type-subsection-title` (700, clamp(1.25rem–1.75rem), lh 1.15, uppercase): In-section h3, gift tiers, drawer titles.
- **Card title** `.type-card-title` (700, 0.875rem, 0.03em tracking, uppercase): Product and collection names.
- **Body large** `.type-body-lg` (500, clamp(1rem–1.25rem), lh 1.625, sentence case): Hero subtitle, brand intro, lead paragraphs.
- **Body** `.type-body` (500, 1rem, lh 1.625, sentence case): Descriptions, accordion content, addresses. Max ~65ch for long-form.
- **Metadata** `.type-meta` (500, 0.875rem, lh 1.5, sentence case): Prices, counts, footer links, location lines.
- **Label** `.type-label` (600, 0.75rem, 0.06em tracking, uppercase): Badges, filter groups, footer column headers, "View all" links.
- **Nav** `.type-nav` (600, 0.75rem, 0.05em tracking, uppercase): Header and mobile navigation links.
- **CTA** `.type-cta` (600, 0.875rem, 0.04em tracking, uppercase): Buttons and sticky action links.

### Named Rules
**The Selective Caps Rule.** Uppercase is for headings, short labels, nav, badges, and CTAs. Body copy, descriptions, and metadata use sentence case. Do not uppercase paragraphs to create hierarchy.

**The Weight Ladder Rule.** Only `.type-display` uses 900. Section headings use 800. Card titles use 700. Do not default all headings to black weight.

**The Wordmark Exclusivity Rule.** "The Funy Time" appears only in `.biscute-wordmark`. No other text uses this font.

## Layout

Layout tokens live in `app/layout.css` as `--space-*` (4–128px scale), semantic section spacing, gutter tiers, and grid gaps. Typography roles remain in `app/typography.css`.

**Containers:** Content lives inside `.container-biscute` (max-width 1280px, centered) with token-driven horizontal padding: 16px (mobile) → 24px (640px+) → 32px (1024px+) → 48px (1280px+). Full-bleed surfaces (hero collage panel, section background bands) span edge-to-edge outside the container. Optional outer cap `--container-outer: 1440px` reserved for future full-bleed bands.

**Section rhythm:** `SectionWrapper` accepts a `spacing` prop with narrative variants instead of uniform padding:
- `default` — 48 / 64 / 96px (inner pages, backward compatible)
- `featured` — 48 / 64 / 64px (Featured Products)
- `editorial` — 48 / 64 / 96px (The BISCUTE Way)
- `standard` — 48 / 64 / 64px (Collections)
- `visit` — 64 / 96 / 128px (Visit BISCUTE — largest homepage section)

Section header gaps: `.section-header-gap` (32px) for standard sections; `.section-header-gap-lg` (48px) for Visit and BISCUTE Way.

**Homepage grids:** Featured products use `.product-grid-homepage` (2 cols mobile/tablet → 4 cols desktop, 16/24px gaps, max 4 products). Collections use `.collections-grid` (2 cols → 4 cols at md, 16/24px gaps). Default sticker-collage density uses `--grid-gap` (8px).

Hero sections split 50/50 at lg with minimum height 400px (mobile) / 480px (desktop). Sticky header at z-40 with 56px (mobile) / 64px (desktop) height. Mobile homepage uses a fixed bottom Visit CTA bar (z-30) with `h-16` clearance spacer. Section dividers are 4px solid Dark Ink bottom borders (`.section-divider`).

## Elevation & Depth

This system is **flat-by-default with hard offset shadows** — no blurred box-shadows anywhere. Depth is communicated through three mechanisms: (1) offset ink shadows that simulate a print/sticker lift, (2) thick ink borders that thicken from 2px to 4px at lg, and (3) color-block alternation between sections.

### Shadow Vocabulary
- **Small lift** (`3px 3px 0px 0px #2c2f36`): Icon buttons, badges, gallery nav arrows, locale switcher.
- **Medium lift** (`4px 4px 0px 0px #2c2f36`): Buttons, accordion panels, default interactive elements.
- **Large lift** (`8px 8px 0px 0px #2c2f36`): Product cards, collection cards, sheets/drawers, mobile sticky bars.

### Named Rules
**The Press Rule.** Interactive elements with shadows use `.btn-press`: on `:active`, translate(2px, 2px) and remove shadow. The element physically "presses into" the surface.

**The No-Blur Rule.** Shadows are always `0px` blur with a solid ink offset. Soft ambient shadows are forbidden.

## Shapes

The default corner radius is **zero** (`rounded-none`). This is a deliberate neo-brutalist choice — cards, inputs, accordions, sheets, and skeletons are all square. The only exceptions are pill-shaped CTAs inside product cards (`rounded-full` on `shape="pill"` buttons) and circular color swatches on product cards. Geometric decorations use three primitive shapes (circle, square, triangle via clip-path) as absolute-positioned accents, rotated 45° on alternating card indices.

Borders are always solid Dark Ink: 2px on mobile, scaling to 4px at lg breakpoint for major containers (cards, accordions, sheets, header/footer edges).

## Components

### Buttons
- **Character:** Tactile stamp buttons — bold, uppercase, with a physical press-down.
- **Shape:** Square corners by default (0px radius); pill variant for in-card CTAs only.
- **Primary:** Royal Biscute Blue fill, white text, 2px ink border, medium shadow, h-11/h-12 with px-6/px-8.
- **Secondary:** Mustard fill, ink text. **Pale:** Soft Butter Yellow fill. **Outline:** White fill, ink text. **Ghost:** No border, no shadow, pale-pink hover.
- **Hover / Focus:** Primary deepens to Deep Passport Blue; others reduce opacity to 90%. Focus: 2px ink outline, 2px offset.
- **Active:** `.btn-press` — translate(2px, 2px), shadow removed.

### Badges
- **Style:** Square, 2px ink border, small shadow, uppercase bold text at xs size with wide tracking.
- **Variants:** New (pale yellow bg), Best Seller (primary blue bg, white text), Limited (deep blue bg, white text).

### Cards / Containers
- **Corner Style:** Square (0px radius).
- **Background:** White on cream sections; inherits section bg on colored sections.
- **Shadow Strategy:** Large lift (8px offset) on product and collection cards; medium on accordions.
- **Border:** 2px ink (4px at lg).
- **Signature:** `CardCornerDecorations` — a geometric shape (circle/square/triangle) in the top-right corner, cycling by card index.
- **Hover:** Cards lift `-translate-y-1` (4px) with 200ms transition. Product images desaturate at rest, full color on hover; second image crossfades on hover.

### Inputs / Fields
- **Style:** Not yet implemented as a standalone component. When built: square corners, 2px ink border, cream or white background, no shadow at rest.
- **Focus:** 2px ink outline with 2px offset (global `:focus-visible` rule).

### Navigation
- **Header:** Sticky, primary blue background, white text, 2px/4px bottom ink border. Desktop nav links at xs size, bold uppercase, wide tracking. Active link: pale yellow text with 4px underline offset. Mobile: collapsible panel below header with hover border-white + deep-blue bg.
- **Icon buttons:** 44×44px square, white fill, ink border, small shadow, pale-yellow hover.
- **Footer:** Deep blue background, cream/pale-yellow text, 4-column grid at lg.

### Accordion
- **Closed:** White background, ink border (2px/4px), medium shadow, bold uppercase trigger text.
- **Open:** Trigger inverts to deep blue bg + white text; content panel in pale yellow with ink top border.

### Announcement Bar
- **Style:** Mustard background, ink text, centered bold uppercase, 2px/4px bottom border. Single line with dot separator and underlined link.

### Geometric Decorations
- **Shapes:** Circle (rounded-full), square (rounded-none, optionally rotate-45), triangle (clip-path polygon).
- **Colors:** pink (primary blue), pale (soft yellow), deep (deep blue).
- **Usage:** Hero accents, card corner stamps. Always `aria-hidden`.

## Do's and Don'ts

### Do:
- **Do** use hard offset shadows (`3px 3px 0`, `4px 4px 0`, `8px 8px 0`) with Dark Ink — never blur.
- **Do** keep corners square (`rounded-none`) on all structural elements; reserve `rounded-full` for pill CTAs and color swatches only.
- **Do** scale borders from 2px to 4px at the lg breakpoint on major containers.
- **Do** alternate section backgrounds via `SectionWrapper` (cream, pink/blue, pale-yellow, mustard, deep-blue, white).
- **Do** apply `.btn-press` active state on all shadowed interactive elements.
- **Do** start product images in grayscale and reveal color on hover.
- **Do** respect the color usage ratio and keep red as a punctual accent.

### Don't:
- **Don't** use soft/blurred box-shadows or gradient shadows — they break the print-sticker metaphor.
- **Don't** use "The Funy Time" font outside the BISCUTE wordmark.
- **Don't** introduce rounded corners on cards, accordions, sheets, or inputs.
- **Don't** use actual pink anywhere — legacy `biscute-pink` tokens map to blue.
- **Don't** add a second border or outline color beyond Dark Ink (#2c2f36).
- **Don't** sentence-case headlines — all headings are uppercase by system default.
