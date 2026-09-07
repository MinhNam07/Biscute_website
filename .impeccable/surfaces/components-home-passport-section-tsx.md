---
version: 1
slug: "components-home-passport-section-tsx"
primary_target: "components/home/passport-section.tsx"
related_targets: ["components/brand/travel-stamp.tsx","components/brand/travel-stamp.css","components/home/passport-section.css","components/brand/postal-frame.tsx","components/brand/postal-frame.css","components/brand/postal-watermarks.tsx"]
---

# Surface: homepage Post Office / passport stamp hunt

## Scope & mode
Homepage section `#passport` — Experience (collectible stamp hunt) with Persuade undertone (drive collection → store visit for sticker).

## Audience / job / action
Tourists collect 4 collection stamps by visiting collection pages; unlock free sticker claim at 3A Đinh Liệt.

## Constraints
- Keep passport progress hook, reward unlock sequence, i18n keys, TravelStamp IDs, Link-to-collection UX.
- No ecommerce.
- Desktop: single-row stamps; mobile: 2×2.

## Direction
Live perforated PostalFrame (helo.html chrome: AIR MAIL waves, ISSUE line, Hanoi postmark) with SVG lotus/tower print plates — not a full-sheet raster.

## Approved comp
`.impeccable/mocks/post-office-user-comp.jpg`

## Component grammar
- Corners: CSS perforation mask (PostalFrame)
- Borders: navy punch edge; dotted tear divider
- Elevation: hard ink drop-shadow under sheet
- Type: Outfit titles; postal chrome labels; blue product line; red ISSUE + Special Delivery
- States: pastel ghost vs saturated ink + circular cancel; LOCKED vs unlocked
- Watermarks: SVG lotus / lotus-sm / tower elements + SVG drum/clouds/cancel

## Asset inventory
| Element | Medium |
| Paper grain | `public/textures/post-office-paper-grain.webp` |
| Lotus large/small | `components/brand/postal-watermarks.tsx` (`WmLotus`, `WmLotusSm`) + `public/textures/post-office-wm-lotus.svg` |
| Turtle Tower | `WmTower` + `public/textures/post-office-wm-tower.svg` |
| Four stamp arts | TravelStamp SVG |
| Cancel / Food slash | CSS |
| Tear / LOCKED / perforations | CSS + PostalFrame |
