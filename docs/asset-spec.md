# BISCUTE VIETNAM — Asset Specification

Souvenir Club visual world. Phase 0 uses structured placeholders until final assets land.

## Concept

**BISCUTE Souvenir Club** — toy packaging × character select × passport / sticker metaphor.

## Directory layout

```
public/
  characters/{slug}/portrait.png|front.png|back.png|sticker.png
  products/{handle}/01.jpg … (4:5)
  store/exterior.jpg|interior.jpg
  ugc/01.jpg …
  fonts/  (The Funy Time)
```

## Characters (seed crew)

| Slug | Primary | Role |
|------|---------|------|
| bunny | #3EA9F5 | Food / Hanoi chaos |
| bear | #FFD940 | Culture / apparel |
| duck | #EF4136 | Cute animals / hype |
| cat | #FF8FB3 | Tourist / maps |

Per character: portrait (main), front, back, sticker PNG with transparency preferred.

## Product photography

- Ratio: **4:5** mandatory
- Background: Milk `#FFF8E9` or white
- Per SKU minimum: front, back (optional detail)
- Resolution: 1200×1500px minimum
- Placeholder label pattern until delivery: `ITEM 001` (never raw `BV-001` on homepage)

## Store

- exterior.jpg — shopfront Old Quarter
- interior.jpg — in-store atmosphere
- Visit page uses `/store/exterior.jpg` with copy fallback if missing

## Logo

- Wordmark: The Funy Time
- Geometric mark optional
- Colors: Ink `#25211E` on Milk; reversed on Blue / Tomato

## Color palette (Souvenir Club)

| Token | Hex | Usage |
|-------|-----|-------|
| Biscute Blue | #3EA9F5 | Primary brand, section A |
| Egg Yolk | #FFD940 | Secondary, section accents |
| Tomato | #EF4136 | CTA / energy |
| Milk | #FFF8E9 | Page background |
| Ink | #25211E | Text, borders, hard shadows |
| Bubble Pink | #FF8FB3 | Character secondary only |
| Leaf | #72C85B | Character secondary only |

Rule: one section = one dominant color + 1–2 accents. No rainbow viewport.

## Typography

- Display / UI: **Outfit** 500–900
- Wordmark: **The Funy Time**
- Labels: monospace / compact tracking (`ITEM 024`, `2026 / HANOI`)

## Radius

```
--radius-sm: 12px
--radius-md: 20px
--radius-lg: 28px
--radius-xl: 40px
--radius-pill: 999px
```

## Shadows

- Playful cards: `5px 6px 0 ink` hard offset
- Shop grid: soft shadow (no neo-brutalism everywhere)

## Delivery checklist

- [ ] Character PNG set (4 crew × 4 files)
- [ ] Product photos (4:5) per SKU
- [ ] Store exterior + interior
- [ ] UGC mosaic (6–8)
- [ ] Logo SVG if updated
- [ ] Replace placehold.co URLs in data once files land
