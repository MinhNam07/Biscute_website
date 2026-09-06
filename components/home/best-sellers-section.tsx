"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/product/product-card";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import type { BiscuteProduct } from "@/lib/types";
import "./best-sellers-section.css";

interface BestSellersSectionProps {
  products: BiscuteProduct[];
  viewAllHref: string;
  priorityCount?: number;
}

export function BestSellersSection({
  products,
  viewAllHref,
  priorityCount = 4,
}: BestSellersSectionProps) {
  const t = useTranslations("sections");
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollBack(scrollLeft > 8);
    setCanScrollForward(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const gap = 16;
    const distance = (card?.offsetWidth ?? 280) + gap;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollByCard(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollByCard(1);
      }
    },
    [scrollByCard]
  );

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, products.length]);

  return (
    <SectionWrapper bg="cream">
      <div className="scroll-section__title mb-6 flex items-center justify-between gap-4">
        <h2 className="type-section-title">
          {t("bestSellers")}
        </h2>
        <Link
          href={viewAllHref}
          className="type-label shrink-0 text-biscute-chocolate/70 transition-colors hover:text-biscute-pink"
        >
          {t("viewAll")} →
        </Link>
      </div>

      <div className="scroll-section__body best-sellers-carousel relative">
        <div className="best-sellers-edge best-sellers-edge--start" aria-hidden />
        <div className="best-sellers-edge best-sellers-edge--end" aria-hidden />

        <div
          ref={trackRef}
          className="best-sellers-track"
          role="list"
          aria-label={t("bestSellers")}
          tabIndex={0}
          onScroll={updateScrollState}
          onKeyDown={handleKeyDown}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              role="listitem"
              data-carousel-card
              className="best-sellers-card"
            >
              <ProductCard
                product={product}
                priority={i < priorityCount}
                index={i}
              />
            </div>
          ))}
        </div>

        <div className="best-sellers-progress" aria-hidden>
          <div className="best-sellers-progress__bar" />
        </div>

        <div className="best-sellers-nav">
          <button
            type="button"
            className="best-sellers-nav__btn btn-press"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollBack}
            aria-label="Previous best seller"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className="best-sellers-nav__btn btn-press"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollForward}
            aria-label="Next best seller"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="scroll-section__body best-sellers-fallback">
        <ProductGrid products={products} priorityCount={priorityCount} />
      </div>
    </SectionWrapper>
  );
}
