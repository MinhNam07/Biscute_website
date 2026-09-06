"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { ToyPanel } from "@/components/brand/toy-panel";
import { STORE_MAPS_URL } from "@/lib/constants/store";
import {
  addToVietnamBag,
  clearVietnamBag,
  getVietnamBag,
  removeFromVietnamBag,
} from "@/lib/vietnam-bag";
import type { BiscuteProduct } from "@/lib/types";

type SuitcaseGameProps = {
  products: BiscuteProduct[];
};

export function SuitcaseGame({ products }: SuitcaseGameProps) {
  const t = useTranslations("suitcase");
  const locale = useLocale() as "vi" | "en";
  const [packed, setPacked] = useState<string[]>([]);
  const options = products.slice(0, 6);

  useEffect(() => {
    setPacked(getVietnamBag());
  }, []);

  const toggle = (handle: string) => {
    if (packed.includes(handle)) {
      setPacked(removeFromVietnamBag(handle));
      return;
    }
    if (packed.length >= 3) return;
    setPacked(addToVietnamBag(handle));
  };

  const onDragStart = (e: React.DragEvent, handle: string) => {
    e.dataTransfer.setData("text/plain", handle);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const handle = e.dataTransfer.getData("text/plain");
    if (handle) toggle(handle);
  };

  const ready = packed.length >= 3;

  return (
    <SectionWrapper bg="mustard" spacing="featured" id="suitcase">
        <h2 className="type-section-title">{t("title")}</h2>
        <p className="type-body-lg mt-2 max-w-xl">{t("prompt")}</p>
        <p className="type-meta mt-1 opacity-70">{t("hint")}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="flex flex-wrap gap-3">
            {options.map((product) => {
              const selected = packed.includes(product.handle);
              return (
                <button
                  key={product.id}
                  type="button"
                  draggable
                  onDragStart={(e) => onDragStart(e, product.handle)}
                  onClick={() => toggle(product.handle)}
                  className={`flex w-[140px] flex-col overflow-hidden rounded-[var(--radius-md)] border-2 border-biscute-chocolate bg-biscute-white text-left shadow-biscute-sm transition-transform ${
                    selected ? "ring-4 ring-biscute-pink" : "hover-lift"
                  }`}
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt[locale]}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  </div>
                  <span className="type-meta line-clamp-2 p-2">
                    {product.title[locale]}
                  </span>
                </button>
              );
            })}
          </div>

          <ToyPanel tint="white" className="min-h-[220px]">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 rounded-[var(--radius-md)] border-2 border-dashed border-biscute-chocolate/40 p-4 text-center"
            >
              <p className="type-label">{t("slots", { count: packed.length })}</p>
              <ul className="type-meta space-y-1">
                {packed.map((handle) => {
                  const p = options.find((o) => o.handle === handle);
                  return <li key={handle}>{p?.title[locale] ?? handle}</li>;
                })}
              </ul>
              {ready ? (
                <>
                  <p className="type-subsection-title">{t("ready")}</p>
                  <Button variant="primary" asChild>
                    <a
                      href={STORE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("ctaVisit")}
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      clearVietnamBag();
                      setPacked([]);
                    }}
                  >
                    {t("ctaClear")}
                  </Button>
                </>
              ) : null}
            </div>
          </ToyPanel>
        </div>
    </SectionWrapper>
  );
}
