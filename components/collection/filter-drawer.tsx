"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "type-label rounded-none border-2 px-4 py-2 transition-all duration-200",
        active
          ? "border-biscute-chocolate bg-biscute-deep-pink text-biscute-cream shadow-biscute-sm"
          : "border-biscute-chocolate/30 hover:border-biscute-chocolate"
      )}
    >
      {children}
    </button>
  );
}

export function FilterDrawer({ open, onOpenChange }: FilterDrawerProps) {
  const t = useTranslations("filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "featured";
  const currentColor = searchParams.get("color") ?? "";
  const currentSize = searchParams.get("size") ?? "";
  const currentCategory = searchParams.get("category") ?? "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title={t("title")} side="bottom">
      <div className="space-y-6 p-4">
        <div>
          <p className="type-label mb-2">{t("sort")}</p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "featured", label: t("sortFeatured") },
              { value: "price-asc", label: t("sortPriceAsc") },
              { value: "price-desc", label: t("sortPriceDesc") },
              { value: "newest", label: t("sortNewest") },
              { value: "best-selling", label: t("sortBestSelling") },
            ].map((opt) => (
              <FilterChip
                key={opt.value}
                active={currentSort === opt.value}
                onClick={() => updateParam("sort", opt.value)}
              >
                {opt.label}
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="type-label mb-2">{t("category")}</p>
          <div className="flex flex-wrap gap-2">
            {["souvenirs", "apparel", "gifts"].map((cat) => (
              <FilterChip
                key={cat}
                active={currentCategory === cat}
                onClick={() =>
                  updateParam("category", currentCategory === cat ? "" : cat)
                }
              >
                {cat}
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="type-label mb-2">{t("color")}</p>
          <div className="flex flex-wrap gap-2">
            {["Pink", "Cream", "Deep Pink"].map((color) => (
              <FilterChip
                key={color}
                active={currentColor === color}
                onClick={() =>
                  updateParam("color", currentColor === color ? "" : color)
                }
              >
                {color}
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="type-label mb-2">{t("size")}</p>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "One Size"].map((size) => (
              <FilterChip
                key={size}
                active={currentSize === size}
                onClick={() =>
                  updateParam("size", currentSize === size ? "" : size)
                }
              >
                {size}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={clearFilters}>
            {t("clear")}
          </Button>
          <Button variant="primary" className="flex-1" onClick={() => onOpenChange(false)}>
            {t("apply")}
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
