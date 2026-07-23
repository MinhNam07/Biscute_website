import { HeroSection } from "@/components/home/hero-section";
import { CategoryShortcuts } from "@/components/home/category-shortcuts";
import { ProductSection } from "@/components/home/product-section";
import { CollectionCards } from "@/components/home/collection-cards";
import { GiftsByPrice } from "@/components/home/gifts-by-price";
import { StoreGallery } from "@/components/home/store-gallery";
import { StoreMap } from "@/components/location/store-map";
import {
  getBestSellers,
  getNewArrivals,
  getCategoryCounts,
} from "@/lib/data";

export default async function HomePage() {
  const [bestSellers, newArrivals, counts] = await Promise.all([
    Promise.resolve(getBestSellers()),
    Promise.resolve(getNewArrivals()),
    Promise.resolve(getCategoryCounts()),
  ]);

  return (
    <>
      <HeroSection />
      <CategoryShortcuts counts={counts} />
      <ProductSection
        titleKey="bestSellers"
        products={bestSellers.slice(0, 8)}
        viewAllHref="/collections/best-sellers"
        priorityCount={4}
      />
      <CollectionCards />
      <GiftsByPrice />
      <ProductSection
        titleKey="newArrivals"
        products={newArrivals.slice(0, 8)}
        viewAllHref="/collections/new-arrivals"
      />
      <StoreGallery />
      <StoreMap />
    </>
  );
}
