import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionBg =
  | "cream"
  | "pink"
  | "pale-pink"
  | "deep-pink"
  | "white"
  | "chocolate";

interface SectionWrapperProps {
  children: ReactNode;
  bg?: SectionBg;
  className?: string;
  divider?: boolean;
  id?: string;
}

const bgMap: Record<SectionBg, string> = {
  cream: "bg-biscute-cream",
  pink: "bg-biscute-pink",
  "pale-pink": "bg-biscute-pale-pink",
  "deep-pink": "bg-biscute-deep-pink",
  white: "bg-biscute-white",
  chocolate: "bg-biscute-chocolate",
};

export function SectionWrapper({
  children,
  bg = "cream",
  className,
  divider = true,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16 lg:py-24",
        bgMap[bg],
        divider && "section-divider",
        bg === "deep-pink" || bg === "chocolate" ? "text-biscute-white" : "text-biscute-chocolate",
        className
      )}
    >
      <div className="container-biscute">{children}</div>
    </section>
  );
}
