import { HeroSection } from "@/components/home/hero-section";
import { ProductSection } from "@/components/home/product-section";
import { CollectionCards } from "@/components/home/collection-cards";
import { CrewSection } from "@/components/home/crew-section";
import { SuitcaseGame } from "@/components/home/suitcase-game";
import { DrawnSection } from "@/components/home/drawn-section";
import { PassportSection } from "@/components/home/passport-section";
import { SpottedSection } from "@/components/home/spotted-section";
import { StoreMap } from "@/components/location/store-map";
import {
  getFeaturedProducts,
  getThematicCollections,
  getCharacters,
} from "@/lib/data";

export default async function HomePage() {
  const [featuredProducts, thematicCollections, characters] = await Promise.all([
    Promise.resolve(getFeaturedProducts(8)),
    Promise.resolve(getThematicCollections()),
    Promise.resolve(getCharacters()),
  ]);

  const heroProducts = featuredProducts.slice(0, 3);
  const catalogueProducts =
    featuredProducts.length > 4
      ? featuredProducts.slice(4, 8)
      : featuredProducts.slice(0, 4);
  const suitcaseProducts = featuredProducts.slice(0, 8);

  return (
    <>
      <HeroSection products={heroProducts} character={characters[0]} />
      <CrewSection characters={characters} />
      <CollectionCards
        collections={thematicCollections}
        characters={characters}
      />
      <ProductSection
        products={catalogueProducts}
        viewAllHref="/shop"
        priorityCount={4}
      />
      <SuitcaseGame products={suitcaseProducts} />
      <DrawnSection />
      <PassportSection />
      <SpottedSection />
      <StoreMap />
    </>
  );
}
