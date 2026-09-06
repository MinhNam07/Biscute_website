import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import type { BiscuteProduct } from "@/lib/types";

interface ProductGridProps {
  products: BiscuteProduct[];
  priorityCount?: number;
  className?: string;
  presentation?: "default" | "catalogue";
  layout?: "default" | "homepage";
}

export function ProductGrid({
  products,
  priorityCount = 4,
  className,
  presentation = "default",
  layout = "default",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="type-meta py-12 text-center text-biscute-chocolate/60">
        No products found.
      </p>
    );
  }

  return (
    <div
      className={cn(
        layout === "homepage"
          ? "product-grid-homepage"
          : "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6",
        className
      )}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={i < priorityCount}
          index={i}
          presentation={presentation}
        />
      ))}
    </div>
  );
}
