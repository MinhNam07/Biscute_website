# BISCUTE VIETNAM — Sitemap & Information Architecture

## Route Map

| Route | Page | Purpose |
|---|---|---|
| `/` | Homepage | Product-first landing, merchandising sections |
| `/shop` | Shop | Full catalogue entry point |
| `/collections/[slug]` | Collection | Filtered product grid by collection |
| `/products/[slug]` | Product Detail | PDP with variants, tourist attributes |
| `/gifts` | Gifts | Gift finder by price and recipient |
| `/visit` | Visit Us | Store location, map, hours, directions |
| `/search` | Search | Product/collection keyword search |
| `/cart` | Cart | Cart summary before checkout |

All routes support locale prefix: `/en/...` and `/vi/...` (default).

## Collection Taxonomy

### Top-level (navigation)
- `souvenirs` — Souvenirs
- `apparel` — Apparel
- `gifts` — Gifts

### Themed collections
- `hanoi` — Hanoi
- `food-icons` — Food Icons
- `cute-animals` — Cute Animals
- `vietnam-culture` — Vietnam Culture

### Price-based (automated)
- `gifts-under-200k` — Gifts Under 200K
- `gifts-under-500k` — Gifts Under 500K

### Merchandising
- `best-sellers` — Best Sellers
- `new-arrivals` — New Arrivals

## Product Tags
`new` · `best-seller` · `limited` · `easy-to-pack` · `gift-ready` · `vietnam-made`

## Navigation Structure

### Desktop Header
Logo | Shop | Souvenirs | Apparel | Gifts | Visit Us | Search | Cart | EN/VI

### Mobile Header
Menu | Logo (center) | Search | Cart

## Homepage Section Order
1. AnnouncementBar
2. Header (sticky)
3. Hero
4. Category shortcuts (Souvenirs, Apparel, Gifts)
5. Best Sellers
6. Shop by Collection (4 cards)
7. Gifts by price (2 cards)
8. New Arrivals
9. Store gallery
10. Visit BISCUTE
11. Footer

## Conversion Paths
- Tourist: Hero → Best Sellers → PDP → Cart → Shopify Checkout
- Local: AnnouncementBar → Visit Us → Google Maps directions
- Gift buyer: Gifts by price → Collection → PDP
