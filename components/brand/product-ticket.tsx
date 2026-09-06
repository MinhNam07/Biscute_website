import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ProductTicketProps = {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
};

/** Collectible ticket / dossier frame for product info. */
export function ProductTicket({
  children,
  className,
  header,
}: ProductTicketProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)]",
        "border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-md",
        className
      )}
    >
      {header ? (
        <div className="flex items-center justify-between gap-2 border-b-2 border-dashed border-biscute-chocolate/30 bg-biscute-cream px-4 py-2">
          {header}
        </div>
      ) : null}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
