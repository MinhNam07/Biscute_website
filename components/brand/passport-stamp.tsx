import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import "./passport-stamp.css";

type PassportStampProps = {
  children?: ReactNode;
  className?: string;
  stamped?: boolean;
  label?: string;
  /** Second line on the stamp (collection-specific). Defaults to brand mark. */
  subtitle?: string;
  /** Ink tilt in degrees — vary per slot for a stamped-page feel. */
  rotate?: number;
};

export function PassportStamp({
  children,
  className,
  stamped = true,
  label = "BISCUTE",
  subtitle = "VIETNAM",
  rotate = -8,
}: PassportStampProps) {
  return (
    <div
      className={cn("passport-stamp-wrap inline-flex", className)}
      style={stamped ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <div
        className={cn(
          "passport-stamp type-label",
          stamped ? "passport-stamp--inked" : "passport-stamp--blank"
        )}
        aria-hidden={!children}
        data-stamped={stamped ? "true" : "false"}
      >
        {children ?? (
          <>
            <span className="passport-stamp__line">{label}</span>
            <span className="passport-stamp__line">{subtitle}</span>
          </>
        )}
      </div>
    </div>
  );
}
