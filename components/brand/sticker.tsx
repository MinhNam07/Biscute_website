import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StickerProps = {
  children: ReactNode;
  className?: string;
  rotate?: number;
  pop?: boolean;
};

export function Sticker({
  children,
  className,
  rotate = -3,
  pop = false,
}: StickerProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border-2 border-biscute-chocolate",
        "rounded-[var(--radius-md)] bg-biscute-mustard px-3 py-1 type-label shadow-biscute-sm",
        pop && "animate-sticker-pop",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
