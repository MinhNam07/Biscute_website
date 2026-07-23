# BISCUTE VIETNAM — Sitemap & Information Architecture

Showcase site — product display only, no e-commerce checkout.

## Route Map

| Route | Page | Purpose |
|---|---|---|
| `/` | Homepage | Product-first landing, featured collections |
| `/shop` | Catalogue | Full product browse |
| `/collections/[slug]` | Collection | Filtered product grid |
| `/products/[slug]` | Product Detail | Gallery, specs, visit CTA |
| `/gifts` | Gifts | Browse by price tier |
| `/visit` | Visit Us | Store location, map, hours |
| `/search` | Search | Product/collection keyword search |

All routes support locale prefix: `/en/...` and `/vi/...` (default).

## Navigation

`Shop` · `Souvenirs` · `Apparel` · `Gifts` · `Visit Us` · `Search` · `EN|VI`

## Conversion Path

Tourist discovers products online → visits physical store via `/visit`.

## Data Source

Static data in `lib/data/products.ts` — edit directly to update catalogue.
