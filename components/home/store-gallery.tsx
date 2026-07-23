"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { cn } from "@/lib/utils";

const galleryImages = [
  { id: 1, color: "FD9DAA", label: "Store 1" },
  { id: 2, color: "FDE3E7", label: "Store 2" },
  { id: 3, color: "FCF5D4", label: "Store 3" },
  { id: 4, color: "C9366B", label: "Store 4" },
  { id: 5, color: "FD9DAA", label: "Store 5" },
  { id: 6, color: "FDE3E7", label: "Store 6" },
];

export function StoreGallery() {
  const t = useTranslations("sections");

  return (
    <SectionWrapper bg="pink">
      <h2 className="mb-6 font-display text-2xl font-black uppercase tracking-tighter sm:text-3xl lg:text-4xl">
        {t("storeGallery")}
      </h2>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
        {galleryImages.map((img, i) => (
          <div
            key={img.id}
            className={cn(
              "relative aspect-square overflow-hidden border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-md transition-transform duration-200 hover:-translate-y-1 lg:border-4",
              i % 2 === 0 ? "rounded-full" : "rounded-none"
            )}
          >
            <Image
              src={`https://placehold.co/400x400/${img.color}/4A3535?text=${img.label}`}
              alt={`BISCUTE store gallery ${img.id}`}
              fill
              className="object-cover grayscale transition-all duration-200 hover:grayscale-0"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
