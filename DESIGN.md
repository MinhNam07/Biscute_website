---
name: BISCUTE Vietnam
description: BISCUTE Souvenir Club — playable souvenir world with toy packaging, character IDs, and passport energy.
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
---

# Design System: BISCUTE Souvenir Club

## Overview

**Creative North Star: "BISCUTE Souvenir Club"**

BISCUTE is a playable souvenir world — toy packaging UI, character IDs, passport stamps, tickets, and stickers — that happens to sell gifts you can take home from Hanoi. The old neo-brutalist square catalogue look is **anti-reference**. Soft radii (12–40px), hard offset shadows only on playful cards, and section-dominant color blocking replace flat white e-commerce stacks.

**Play layer ≠ shop layer.** Characters, stamps, and minigames are optional delight. Product, price, and Visit / Directions always remain clear.

**Key Characteristics:**
- Metaphor objects: CharacterCard, PassportStamp, ProductTicket, Sticker, ToyPanel, IDTag, Postcard
- Milk cream ground `#FFF8E9` with Blue / Egg / Tomato brand triad
- Pink and green only as secondary character colors
- One section = one dominant color + 1–2 accents
- Display Outfit 800–900 vs monospace technical labels (`ITEM 024`)
- The Funy Time wordmark only

## Colors

### Primary
- **Biscute Blue** (#3EA9F5): Brand, hero panels, primary buttons
- **Deep Blue** (#2B8FD9): Hover / weight

### Secondary
- **Egg Yolk** (#FFD940): Announcement, secondary CTAs
- **Soft Egg** (#FFE99A): Pale panels

### Tertiary
- **Tomato** (#EF4136): Energy, limited cues
- **Deep Tomato** (#C4342C): Emphasis

### Character-only
- **Bubble Pink** (#FF8FB3)
- **Leaf** (#72C85B)

### Neutral
- **Milk** (#FFF8E9): Page background
- **Ink** (#25211E): Text, borders, hard shadows
- **White** (#ffffff): Cards, panels

### Named Rules
**Section Dominant Rule.** Each major band picks one dominant color; accents stay secondary.

**Character Color Rule.** Pink/green appear on character surfaces, not global chrome.

## Typography

Outfit for display + UI. Monospace (or compact tracking) for inventory labels. The Funy Time = wordmark only.

Selective uppercase on display/nav/CTA. Body stays sentence case and clean — not childish.

## Shapes & Elevation

- Radii: sm 12 / md 20 / lg 28 / xl 40 / pill 999
- Playful cards: `border: 2px solid ink` + `box-shadow: 5px 6px 0 ink`
- Shop grid: softer lift (blurred or smaller offset) so conversion stays calm
- Product images: radius 28–32px

## Motion

| Primitive | Spec |
|-----------|------|
| Hover lift | y -6px, rotate ±1deg |
| Sticker pop | scale .85 → 1.08 → 1 |
| Character idle | translateY ±5px, 5–7s |
| Card flip | 350–450ms |
| Reduced motion | disable idle/pop |

No scroll hijack. No animation blocking purchase/browse CTAs.

## Components (mindset)

Implement as React, design as: ToyPanel, Sticker, IdTag, PassportStamp, ProductTicket, CharacterCard, Postcard, Suitcase.

## Do's and Don'ts

### Do
- Lead with characters, then culture, then product
- Keep Visit / Directions as primary conversion
- Use soft radii and toy-panel nesting
- Alternate section atmospheres without rainbow chaos

### Don't
- Clone CULCAT meme tone or copy Gói Gém layouts
- Add cart/checkout
- Rainbow one viewport
- Animate every button
- Make shop grid into an arcade
