import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/lib/types";

const badgeStyles: Record<ProductBadge, string> = {
  new: "bg-biscute-pale-pink text-biscute-chocolate",
  "best-seller": "bg-biscute-pink text-biscute-white",
  limited: "bg-biscute-deep-pink text-biscute-white",
};

interface BadgeProps {
  variant: ProductBadge;
  label: string;
  className?: string;
}

export function Badge({ variant, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none border-2 border-biscute-chocolate px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider shadow-biscute-sm",
        badgeStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
