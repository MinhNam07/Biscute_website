import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PassportStampProps = {
  children?: ReactNode;
  className?: string;
  stamped?: boolean;
  label?: string;
};

export function PassportStamp({
  children,
  className,
  stamped = true,
  label = "BISCUTE",
}: PassportStampProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center gap-0.5",
        "aspect-square min-w-[4.5rem] rounded-full border-[3px] border-dashed",
        "px-3 py-2 text-center type-label",
        stamped
          ? "border-biscute-red text-biscute-red -rotate-[8deg] opacity-90"
          : "border-biscute-chocolate/30 text-biscute-chocolate/30",
        className
      )}
      aria-hidden={!children}
    >
      {children ?? (
        <>
          <span className="leading-none">{label}</span>
          <span className="leading-none tracking-widest">HANOI</span>
        </>
      )}
    </div>
  );
}
