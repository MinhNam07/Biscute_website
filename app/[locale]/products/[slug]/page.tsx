import { notFound } from "next/navigation";
import { ProductPageClient } from "@/components/product/product-page-client";
import { fetchProduct, getRelatedProducts } from "@/lib/data";
import { products } from "@/lib/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);

  return <ProductPageClient product={product} related={related} />;
}
