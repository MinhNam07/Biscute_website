import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CollectionPageClient } from "@/components/collection/collection-page-client";
import { fetchCollection, fetchCollectionProducts } from "@/lib/data";
import { collections } from "@/lib/data/products";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.handle }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const collection = await fetchCollection(slug);

  if (!collection) notFound();

  const products = await fetchCollectionProducts(slug);
  const t = await getTranslations({ locale, namespace: "collections" });

  const collectionTitle =
    collection.title[locale as "vi" | "en"] ?? collection.title.vi;
  const title = t.has(slug as "hanoi") ? t(slug as "hanoi") : collectionTitle;
  const description =
    collection.description[locale as "vi" | "en"] ?? collection.description.vi;

  return (
    <CollectionPageClient
      products={products}
      title={title}
      description={description}
    />
  );
}
