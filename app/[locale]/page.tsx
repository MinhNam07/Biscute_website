import { HeroSection } from "@/components/home/hero-section";
import { ProductSection } from "@/components/home/product-section";
import { Differentiators } from "@/components/home/differentiators";
import { CollectionCards } from "@/components/home/collection-cards";
import { StoreMap } from "@/components/location/store-map";
import { VisitStickyCta } from "@/components/navigation/visit-sticky-cta";
import { getFeaturedProducts, getThematicCollections } from "@/lib/data";

export default async function HomePage() {
  const [featuredProducts, thematicCollections] = await Promise.all([
    Promise.resolve(getFeaturedProducts(8)),
    Promise.resolve(getThematicCollections()),
  ]);

  const heroProducts = featuredProducts.slice(0, 4);
  const catalogueProducts =
    featuredProducts.length > 4
      ? featuredProducts.slice(4, 8)
      : featuredProducts.slice(0, 4);

  return (
    <>
      <HeroSection products={heroProducts} />
      <ProductSection products={catalogueProducts} viewAllHref="/shop" priorityCount={4} />
      <Differentiators products={featuredProducts.slice(0, 3)} />
      <CollectionCards collections={thematicCollections} />
      <StoreMap />
      <VisitStickyCta />
      <div className="h-16 lg:hidden" aria-hidden />
    </>
  );
}
