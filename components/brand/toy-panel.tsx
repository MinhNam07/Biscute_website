import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ToyPanelProps = {
  children: ReactNode;
  className?: string;
  tint?: "cream" | "blue" | "yellow" | "red" | "white" | "pink";
  padded?: boolean;
  hardShadow?: boolean;
};

const tintClass: Record<NonNullable<ToyPanelProps["tint"]>, string> = {
  cream: "bg-biscute-cream",
  blue: "bg-biscute-pink text-biscute-white",
  yellow: "bg-biscute-mustard",
  red: "bg-biscute-red text-biscute-white",
  white: "bg-biscute-white",
  pink: "bg-biscute-bubble",
};

export function ToyPanel({
  children,
  className,
  tint = "white",
  padded = true,
  hardShadow = true,
}: ToyPanelProps) {
  return (
    <div
      className={cn(
        "border-2 border-biscute-chocolate overflow-hidden",
        "rounded-[var(--radius-lg)]",
        tintClass[tint],
        padded && "p-4 sm:p-6",
        hardShadow ? "shadow-biscute-md" : "shadow-biscute-soft",
        className
      )}
    >
      {children}
    </div>
  );
}
