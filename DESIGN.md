---
name: BISCUTE Vietnam
description: Perforated cream post-office sheet — collect Little Vietnam as inked seals; shop stays clear.
colors:
  primary-blue: "#3EA9F5"
  deep-blue: "#2B8FD9"
  mustard-yellow: "#FFD940"
  soft-yellow: "#FFE99A"
  accent-red: "#EF4136"
  deep-red: "#C4342C"
  warm-cream: "#FFF8E9"
  dark-ink: "#25211E"
  white: "#ffffff"
  bubble-pink: "#FF8FB3"
  leaf: "#72C85B"
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
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
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
  sm: "12px"
  md: "20px"
  lg: "28px"
  xl: "40px"
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
    rounded: "{rounded.md}"
    padding: "0 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.deep-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0 32px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.mustard-yellow}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.md}"
    padding: "0 32px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.md}"
    padding: "0 32px"
    height: "48px"
  badge-best-seller:
    backgroundColor: "{colors.primary-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "2px 10px"
  stamp-sheet:
    backgroundColor: "{colors.warm-cream}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.none}"
    padding: "16px"
  travel-stamp-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.deep-blue}"
    rounded: "{rounded.none}"
    padding: "0"
  travel-stamp-inked:
    backgroundColor: "transparent"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.none}"
    padding: "0"
  special-delivery-locked:
    backgroundColor: "{colors.warm-cream}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.none}"
    padding: "0.4rem 1.1rem"
---

# Design System: BISCUTE Post Office

## Overview

**Creative North Star: "Oversized Souvenir Postage Stamp"**

BISCUTE's play surface reads as one perforated cream postal sheet — paper grain, Vietnam watermarks at print opacity, Outfit ink titles, monospace air-mail chrome — where collections become rubber seals you ink, not a 2×2 card grid or toy-arcade dashboard. Shop conversion (product, price, Visit / Directions) stays outside that sheet grammar and remains calm and clear.

The Post Office sheet is the durable visual authority for collectible / passport energy. Soft shop radii and soft product lift remain on catalogue surfaces; they do not redefine the stamp sheet. Hard ink drop-shadow belongs to the sheet as a single oversized stamp object (`10px 11px 0` dark ink), not as a default card treatment across the site.

**Key Characteristics:**
- One composition: perforated cream sheet with tear-off Special Delivery parcel
- Paper grain texture + low-opacity lotus / tower / map watermarks under content
- Ghost pastel seals vs saturated ink + multiply cancel when collected
- Masthead: AIR MAIL · BISCUTE · HANOI + waves; red ISSUE vs gray Hanoi cancel mark
- Outfit ink titles; monospace postal chrome; deep-blue product line
- 2×2 stamps on mobile → 4-across from 640px; progress → perforated tear → LOCKED / unlock

## Colors

Milk cream ground with Blue / Egg / Tomato triad; Post Office uses the same brand inks as postal pigment.

### Primary
- **Biscute Blue** (#3EA9F5): Brand, primary buttons, Hanoi stamp ink base
- **Deep Blue** (#2B8FD9): Product line on the sheet, ghost-status “VISIT COLLECTION”, button hover

### Secondary
- **Egg Yolk** (#FFD940): Warm cream tint in sheet gradient; animals / Tết stamp mixes
- **Soft Egg** (#FFE99A): Pale panels elsewhere on the site

### Tertiary
- **Tomato** (#EF4136): Food stamp ink, cancel slash energy
- **Deep Tomato** (#C4342C): ISSUE number, SPECIAL DELIVERY seal, unlocked claim copy

### Character-only
- **Bubble Pink** (#FF8FB3): Character surfaces only
- **Leaf** (#72C85B): Character surfaces only

### Neutral
- **Milk Cream** (#FFF8E9): Sheet fill and page ground
- **Dark Ink** (#25211E): Titles, perforation edge, LOCKED mark, cancel rings, hard sheet shadow
- **White** (#ffffff): Shop cards / panels

### Named Rules
**The Postal Ink Rule.** On the stamp sheet, color is ink on paper: multiply blend, off-register cancels, ghost pastels for uncollected seals — never grayed-out disabled cards.

**The Section Dominant Rule.** Each major band picks one dominant color; accents stay secondary.

**The Character Color Rule.** Pink and green appear on character surfaces, not global chrome or postal mastheads.

## Typography

**Display Font:** Outfit (sans-serif)
**Body Font:** Outfit (sans-serif)
**Label/Mono Font:** ui-monospace / SFMono / Menlo
**Wordmark:** The Funy Time — brand mark only

**Character:** Heavy Outfit for postal titles and reward headlines; monospace for air-mail chrome, ISSUE, progress, cancel copy, and LOCKED. Selective uppercase on sheet chrome and lede; shop body stays sentence case.

### Hierarchy
- **Display** (900, clamp ~2.25–5.75rem, lh 0.9): Site heroes only
- **Page title** (800, `--type-page-title`, lh ~0.98): “BISCUTE POST OFFICE” on the sheet
- **Section** (800, `--type-section`): Unlocked reward headline
- **Subsection / lede** (700, `--type-body-lg` uppercase on sheet): Short hunt instruction under the product line
- **Body** (500, 1rem / body-lg): Locked parcel copy; unlocked claim uses subsection size + deep red stroke treatment
- **Label** (600–700 mono, 0.75rem, wide tracking): AIR MAIL, ISSUE, product line, progress `00 / 04`, stamp status, cancel rings

### Named Rules
**The Two-Voice Rule.** Outfit carries narrative ink; monospace carries postal apparatus. Do not set ISSUE / LOCKED / progress in Outfit.

## Layout

The Post Office artifact is a single centered sheet (`max-width` 42rem → 58rem @640px → 64rem @900px → 68rem @1024px), slightly rotated (`0.45deg`, removed under reduced motion). Face padding grows with perforation radius (`--perf-r` 0.5–0.62rem; `--perf-gap` 0.95–1.15rem).

Vertical order is fixed: masthead + waves → title → blue product line → lede → stamp board → progress → perforated tear → Special Delivery. Stamp board is `2×2` below 640px and `4-across` from 640px; slots get 1–5px translation only (labels stay upright). Spacing uses the site scale (notably space-2 / 3 / 4 / 6 / 8).

Shop catalogue layout (soft cards, container padding) is separate; do not force catalogue grids into the sheet.

### Named Rules
**The One Sheet Rule.** The first Post Office viewport is one perforated object, not a dashboard of cards, stats, or promo chips.

## Elevation & Depth

Depth is paper and ink, not soft UI shadow stacks. The sheet lifts with a hard ink drop-shadow (`filter: drop-shadow(10px 11px 0 #25211E)`) plus a `2.5px` inset ink edge. Texture layers (grain webp, CSS grain, fiber wash) sit at multiply / ~0.18–0.28 opacity. Watermarks print at roughly 12–20% opacity with multiply. Stamp cancels use multiply + contrast, overlapping ~15–25% of the seal.

Shop playful cards may keep the site’s hard offset shadows (`3px/5px/8px 0 ink`); product grids prefer softer lift. Do not apply card-stack shadows inside the stamp board.

### Shadow Vocabulary
- **Sheet lift** (`drop-shadow(10px 11px 0 #25211E)`): Oversized stamp sheet only
- **Inset edge** (`inset 0 0 0 2.5px #25211E`): Sheet face border
- **Play card** (`5px 6px 0 #25211E`): Toy / play panels outside Post Office
- **Soft shop** (`0 8px 24px rgba(37,33,30,0.1)`): Calm product lift

### Named Rules
**The Paper Depth Rule.** Post Office depth = perforation mask + grain + watermarks + ink cancel. Blur stacks and floating glass are out of world.

## Shapes

The sheet silhouette is defined by a radial perforation mask on all four edges (`--perf-r` / `--perf-gap`), not by rounded corners. Tear divider is a dotted radial repeat across the width. Travel stamps are freeform SVG seal silhouettes (scalloped, circular cancel rings), not rounded rectangles. LOCKED and SPECIAL DELIVERY seals are rectangular ink frames with slight rotation (`-0.5deg` / `-1.5deg`), zero radius.

Shop radii (12 / 20 / 28 / 40 / pill) remain for buttons, product media, and toy panels — not for the stamp sheet face.

### Named Rules
**The Perforation Rule.** If it lives on the Post Office sheet, edge language is punched paper or rubber seal — not soft UI radius.

## Components

### Buttons
- **Shape:** Soft shop radius (20px)
- **Primary:** Biscute Blue fill, white type, height 48px, horizontal padding 32px
- **Hover:** Deep Blue fill
- **Secondary / Outline:** Egg yolk + ink / white + ink outline — catalogue and Visit flows

### Cards / Containers
- **Shop:** Soft radii, optional hard or soft shadow; calm conversion
- **Post Office sheet:** No card chrome; cream gradient face, perforation mask, hard sheet lift only

### TravelStamp (signature)
- **Ghost:** Pastel `--stamp-ghost` ink (~28–48% mix into cream / tint), status in deep blue (“VISIT COLLECTION”)
- **Inked:** Full saturated `--stamp-ink` per collection (Hanoi blue, food tomato, animals mustard-ink, Tết mustard-red), contrast/saturate boost, multiply cancel ring with BISCUTE / POST OFFICE / HANOI / VIETNAM + date
- **Press:** ~480ms scale/rotate land + cancel-in; respect `prefers-reduced-motion`
- **Size:** Ink face 7rem → 8.25rem @640 → 9.25rem @1024

### Special Delivery parcel
- **Locked:** Red “SPECIAL DELIVERY” mono label, ink-bordered “LOCKED” mark, body + remaining-stamp hint
- **Unlocked:** Bordered delivery seal, Outfit headline, deep-red claim with cream text-shadow halo, footer tags (NOT FOR SALE · …)
- **Motion:** Shake (~160ms) then peel (~280ms) on unlock; skip under reduced motion

### Navigation
Site nav stays Outfit/label tracking; not part of the sheet masthead. Sheet masthead is postal chrome only (AIR MAIL · brand · ISSUE).

## Do's and Don'ts

### Do:
- **Do** treat Post Office as one oversized perforated stamp sheet with grain (`/textures/post-office-paper-grain.webp`) and watermarks (`post-office-wm-lotus.webp`, `post-office-wm-lotus-sm.webp`, `post-office-wm-tower.webp` + SVG map/clouds/cancel).
- **Do** keep ghost pastel vs inked+multiply cancel as the only collectible states.
- **Do** keep ISSUE in deep red and the decorative Hanoi cancel watermark in gray ink so they never compete.
- **Do** use 2×2 → 4-across stamp hunt, then progress, tear, and LOCKED / Special Delivery.
- **Do** keep Visit / Directions as primary conversion outside the play sheet.

### Don't:
- **Don't** present collections as a neo-brutalist 2×2 card grid or generic souvenir-club dashboard on this surface.
- **Don't** replace perforation / grain / postal watermarks with flat cream panels or soft card stacks.
- **Don't** gray-wash uncollected stamps; use ghost pastel ink.
- **Don't** put cart, checkout, or scarcity pressure on the sheet.
- **Don't** animate every control or block browse/Visit CTAs with play motion.
