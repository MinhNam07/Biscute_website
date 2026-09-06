"use client";

import { useLocale } from "next-intl";
import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  amount: number;
  compareAt?: number;
  className?: string;
}

export function PriceDisplay({ amount, compareAt, className }: PriceDisplayProps) {
  const locale = useLocale();

  return (
    <div className={className}>
      <span className="type-meta text-biscute-chocolate">
        {formatPrice(amount, locale)}
      </span>
      {compareAt && compareAt > amount && (
        <span className="ml-2 text-sm font-medium text-biscute-chocolate/50 line-through">
          {formatPrice(compareAt, locale)}
        </span>
      )}
    </div>
  );
}
