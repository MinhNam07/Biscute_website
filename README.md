# BISCUTE VIETNAM

Product showcase website — cute souvenirs from Vietnam.

**Concept:** Cute memories from Vietnam.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- next-intl (VI/EN)
- Static product data in `lib/data/`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/vi`.

## Project Structure

```
app/[locale]/          # Localized routes
components/            # UI, product, navigation
lib/data/              # Product & collection data
messages/              # i18n strings (vi, en)
docs/                  # Sitemap, wireframes, asset spec
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage with featured products |
| `/shop` | Full product catalogue |
| `/collections/[slug]` | Collection grid |
| `/products/[slug]` | Product detail |
| `/gifts` | Gifts by price |
| `/visit` | Store location & map |
| `/search` | Product search |

## Adding Products

Edit `lib/data/products.ts` to add or update products and collections.

## Docs

- [Sitemap](docs/sitemap.md)
- [Asset Spec](docs/asset-spec.md)
- [Wireframes](docs/wireframes/)

## Deploy

Deploy to Vercel — no backend or API keys required.
