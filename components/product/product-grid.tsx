import { ProductCard } from "./product-card";
import type { BiscuteProduct } from "@/lib/types";

interface ProductGridProps {
  products: BiscuteProduct[];
  priorityCount?: number;
}

export function ProductGrid({ products, priorityCount = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center font-medium text-biscute-chocolate/60">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={i < priorityCount}
          index={i}
        />
      ))}
    </div>
  );
}
