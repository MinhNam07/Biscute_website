import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type IdTagProps = {
  children: ReactNode;
  className?: string;
};

/** Technical inventory / dossier label — ITEM 024, 2026 / HANOI */
export function IdTag({ children, className }: IdTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 type-label font-[family-name:var(--font-label)]",
        "text-biscute-chocolate/80",
        className
      )}
    >
      {children}
    </span>
  );
}
