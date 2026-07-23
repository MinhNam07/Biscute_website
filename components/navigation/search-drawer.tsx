"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Search } from "lucide-react";
import Image from "next/image";
import { Sheet } from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { searchProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface SearchDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDrawer({ open, onOpenChange }: SearchDrawerProps) {
  const t = useTranslations("search");
  const locale = useLocale() as "vi" | "en";
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (query.length >= 2) return searchProducts(query);
    return [];
  }, [query]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title={t("title")}>
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-biscute-chocolate/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full rounded-none border-2 border-biscute-chocolate bg-biscute-white py-3 pl-10 pr-4 text-base font-medium focus:border-biscute-pink focus:outline-none lg:border-4"
            autoFocus
          />
        </div>

        {query.length >= 2 && results.length === 0 && (
          <p className="py-8 text-center font-medium text-biscute-chocolate/60">{t("noResults")}</p>
        )}

        {results.length > 0 && (
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-biscute-chocolate/60">
            {t("results", { count: results.length })}
          </p>
        )}

        <div className="flex flex-col gap-2">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 border-2 border-biscute-chocolate bg-biscute-white p-2 shadow-biscute-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-biscute-pale-pink"
            >
              <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-none bg-biscute-white">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt[locale]}
                  fill
                  className="object-cover grayscale transition-all duration-200 hover:grayscale-0"
                  sizes="44px"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{product.title[locale]}</p>
                <p className="text-sm font-bold uppercase">{formatPrice(product.price, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
