import { ProductGrid } from "@/components/product/product-grid";
import { fetchProducts } from "@/lib/data";

export default async function ShopPage() {
  const products = await fetchProducts();

  return (
    <div className="bg-biscute-cream">
      <div className="section-divider container-biscute py-12 md:py-16 lg:py-24">
        <h1 className="type-page-title mb-8">
          Shop
        </h1>
        <ProductGrid products={products} priorityCount={4} />
      </div>
    </div>
  );
}
