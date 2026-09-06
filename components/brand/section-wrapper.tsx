import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionBg =
  | "cream"
  | "pink"
  | "pale-pink"
  | "mustard"
  | "deep-pink"
  | "white"
  | "chocolate";

type SectionSpacing = "default" | "featured" | "editorial" | "standard" | "visit";

interface SectionWrapperProps {
  children: ReactNode;
  bg?: SectionBg;
  className?: string;
  divider?: boolean;
  id?: string;
  scrollMotion?: boolean;
  spacing?: SectionSpacing;
}

const spacingMap: Record<SectionSpacing, string> = {
  default: "section-spacing-default",
  featured: "section-spacing-featured",
  editorial: "section-spacing-editorial",
  standard: "section-spacing-standard",
  visit: "section-spacing-visit",
};

const bgMap: Record<SectionBg, string> = {
  cream: "bg-biscute-cream",
  pink: "bg-biscute-pink",
  "pale-pink": "bg-biscute-pale-pink",
  mustard: "bg-biscute-mustard",
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
  scrollMotion = false,
  spacing = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        spacingMap[spacing],
        bgMap[bg],
        divider && "section-divider",
        scrollMotion && "scroll-section",
        bg === "deep-pink" || bg === "chocolate" || bg === "pink"
          ? "text-biscute-white"
          : "text-biscute-chocolate",
        className
      )}
    >
      <div className="container-biscute">{children}</div>
    </section>
  );
}
