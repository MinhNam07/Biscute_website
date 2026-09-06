import { collections, products } from "./products";
import type { BiscuteProduct, Collection } from "@/lib/types";

const MERCH_HANDLES = new Set([
  "best-sellers",
  "new-arrivals",
  "gifts-under-200k",
  "gifts-under-500k",
  "souvenirs",
  "apparel",
  "gifts",
]);

export function getFeaturedProducts(limit = 8): BiscuteProduct[] {
  return products.slice(0, limit);
}

export function getThematicCollections(): Collection[] {
  return collections.filter(
    (c) => !MERCH_HANDLES.has(c.handle) && c.productCount > 0
  );
}
