"use client";

import { Suspense } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { searchProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

function SearchResults() {
  const t = useTranslations("search");
  const locale = useLocale() as "vi" | "en";
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const results = query.length >= 2 ? searchProducts(query) : [];

  return (
    <div className="bg-biscute-cream">
      <div className="section-divider container-biscute py-12 md:py-16 lg:py-24">
        <h1 className="mb-8 font-display text-3xl font-black uppercase tracking-tighter sm:text-4xl">
          {t("title")}
        </h1>

        {query.length < 2 && (
          <p className="font-medium text-biscute-chocolate/60">{t("placeholder")}</p>
        )}

        {query.length >= 2 && results.length === 0 && (
          <p className="py-12 text-center font-medium text-biscute-chocolate/60">{t("noResults")}</p>
        )}

        {results.length > 0 && (
          <>
            <p className="mb-6 text-sm font-bold uppercase tracking-wider text-biscute-chocolate/60">
              {t("results", { count: results.length })}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="flex items-center gap-4 border-2 border-biscute-chocolate bg-biscute-white p-3 shadow-biscute-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-biscute-pale-pink lg:border-4"
                >
                  <div
                    className={cn(
                      "relative h-20 w-16 shrink-0 overflow-hidden border-2 border-biscute-chocolate",
                      i % 2 === 0 ? "rounded-full" : "rounded-none"
                    )}
                  >
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt[locale]}
                      fill
                      className="object-cover grayscale transition-all duration-200 hover:grayscale-0"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="font-bold uppercase">{product.title[locale]}</p>
                    <p className="font-bold">{formatPrice(product.price, locale)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-biscute py-12 font-bold uppercase">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
