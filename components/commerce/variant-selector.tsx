"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/lib/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  colorLabel: string;
  sizeLabel: string;
}

export function VariantSelector({
  variants,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  colorLabel,
  sizeLabel,
}: VariantSelectorProps) {
  const colors = [...new Set(variants.map((v) => v.color))];
  const sizes = [
    ...new Set(
      variants.filter((v) => v.color === selectedColor).map((v) => v.size)
    ),
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest">{colorLabel}</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const variant = variants.find((v) => v.color === color);
            return (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={cn(
                  "flex h-11 min-w-[44px] items-center gap-2 rounded-none border-2 px-3 text-sm font-bold uppercase transition-all duration-200",
                  selectedColor === color
                    ? "border-biscute-chocolate bg-biscute-pink shadow-biscute-sm"
                    : "border-biscute-chocolate/30 hover:border-biscute-chocolate"
                )}
                aria-pressed={selectedColor === color}
              >
                <span
                  className="h-5 w-5 rounded-full border-2 border-biscute-chocolate"
                  style={{ backgroundColor: variant?.colorHex }}
                />
                {color}
              </button>
            );
          })}
        </div>
      </div>

      {sizes.length > 1 && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest">{sizeLabel}</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const variant = variants.find(
                (v) => v.color === selectedColor && v.size === size
              );
              return (
                <button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  disabled={!variant?.available}
                  className={cn(
                    "flex h-11 min-w-[44px] items-center justify-center rounded-none border-2 px-4 text-sm font-bold uppercase transition-all duration-200",
                    selectedSize === size
                      ? "border-biscute-chocolate bg-biscute-deep-pink text-biscute-cream shadow-biscute-sm"
                      : "border-biscute-chocolate/30 hover:border-biscute-chocolate",
                    !variant?.available && "cursor-not-allowed opacity-40 line-through"
                  )}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
