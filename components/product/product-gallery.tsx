"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/types";

interface ProductGalleryProps {
  images: ProductImage[];
  locale: "vi" | "en";
}

export function ProductGallery({ images, locale }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] overflow-hidden border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-lg lg:border-4">
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].alt[locale]}
          fill
          className="object-cover grayscale transition-all duration-200 hover:grayscale-0"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-sm btn-press hover:bg-biscute-pale-pink"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-sm btn-press hover:bg-biscute-pale-pink"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-14 shrink-0 overflow-hidden border-2 transition-all duration-200",
                i % 2 === 0 ? "rounded-full" : "rounded-none",
                i === activeIndex
                  ? "border-biscute-chocolate shadow-biscute-sm"
                  : "border-biscute-chocolate/30 opacity-60 hover:opacity-100"
              )}
              aria-label={`View image ${i + 1}`}
              aria-current={i === activeIndex}
            >
              <Image
                src={img.url}
                alt={img.alt[locale]}
                fill
                className="object-cover grayscale hover:grayscale-0"
                sizes="56px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
