export type Locale = "vi" | "en";

export type ProductBadge = "new" | "best-seller" | "limited";

export type LocalizedString = {
  vi: string;
  en: string;
};

export type ProductVariant = {
  id: string;
  color: string;
  colorHex: string;
  size: string;
  available: boolean;
  price: number;
};

export type ProductImage = {
  url: string;
  alt: LocalizedString;
};

export type ProductMetafields = {
  material: LocalizedString;
  dimensions: string;
  origin: LocalizedString;
  careInstructions: LocalizedString;
  easyToPack: boolean;
  lightweight: boolean;
  giftReady: boolean;
  artworkStory: LocalizedString;
};

export type BiscuteProduct = {
  id: string;
  handle: string;
  title: LocalizedString;
  description: LocalizedString;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  badges: ProductBadge[];
  variants: ProductVariant[];
  collections: string[];
  tags: string[];
  category: "souvenirs" | "apparel" | "gifts";
  metafields: ProductMetafields;
};

export type Collection = {
  handle: string;
  title: LocalizedString;
  description: LocalizedString;
  productCount: number;
  image?: string;
};

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "best-selling";

export type ProductFilters = {
  category?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  sort?: SortOption;
};
