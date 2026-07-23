# BISCUTE VIETNAM — Shopify Schema

## Collections

### Manual collections
| Handle | Title (EN) | Title (VI) |
|---|---|---|
| `souvenirs` | Souvenirs | Quà lưu niệm |
| `apparel` | Apparel | Thời trang |
| `gifts` | Gifts | Quà tặng |
| `hanoi` | Hanoi | Hà Nội |
| `food-icons` | Food Icons | Ẩm thực Việt |
| `cute-animals` | Cute Animals | Thú cưng dễ thương |
| `vietnam-culture` | Vietnam Culture | Văn hóa Việt |
| `best-sellers` | Best Sellers | Bán chạy |
| `new-arrivals` | New Arrivals | Hàng mới |

### Automated collections
| Handle | Rule |
|---|---|
| `gifts-under-200k` | Price < 200,000 VND |
| `gifts-under-500k` | Price < 500,000 VND |

## Product Tags
- `new`
- `best-seller`
- `limited`
- `easy-to-pack`
- `gift-ready`
- `vietnam-made`

## Metafields (namespace: `biscute`)

| Key | Type | Description |
|---|---|---|
| `material` | single_line_text_field | Product material |
| `dimensions` | single_line_text_field | L x W x H |
| `origin` | single_line_text_field | e.g. Made in Vietnam |
| `care_instructions` | multi_line_text_field | Care guide |
| `easy_to_pack` | boolean | Tourist badge |
| `lightweight` | boolean | Tourist badge |
| `gift_ready` | boolean | Tourist badge |
| `artwork_story` | rich_text_field | Artwork narrative |
| `store_availability` | json | Store stock status |

### store_availability JSON shape
```json
{
  "stores": [
    { "name": "Old Quarter", "inStock": true },
    { "name": "Hoan Kiem", "inStock": false }
  ]
}
```

## Locales
- Vietnamese (default)
- English

## Checkout
Shopify hosted checkout — redirect from cart drawer via Cart API `checkoutUrl`.

## Environment Variables
```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
SHOPIFY_REVALIDATION_SECRET=...
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=...
```
