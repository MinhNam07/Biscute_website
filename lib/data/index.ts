export {
  products,
  collections,
  getProductByHandle,
  getProductsByCollection,
  getBestSellers,
  getNewArrivals,
  getGiftsUnderPrice,
  getCollectionByHandle,
  getCategoryCounts,
  searchProducts,
  filterProducts,
  getRelatedProducts,
} from "./products";

export async function fetchProducts() {
  const { products } = await import("./products");
  return products;
}

export async function fetchProduct(handle: string) {
  const { getProductByHandle } = await import("./products");
  return getProductByHandle(handle) ?? null;
}

export async function fetchCollectionProducts(handle: string) {
  const { getProductsByCollection } = await import("./products");
  return getProductsByCollection(handle);
}

export async function fetchCollections() {
  const { collections } = await import("./products");
  return collections;
}

export async function fetchCollection(handle: string) {
  const { getCollectionByHandle } = await import("./products");
  return getCollectionByHandle(handle) ?? null;
}
