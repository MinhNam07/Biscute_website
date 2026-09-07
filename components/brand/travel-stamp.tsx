import type { PassportId } from "@/lib/passport";
import { cn } from "@/lib/utils";
import "./travel-stamp.css";

type TravelStampProps = {
  id: PassportId;
  stamped: boolean;
  animate?: boolean;
  label: string;
  exploreLabel: string;
  stampedLabel: string;
  className?: string;
};

function StampArt({ id }: { id: PassportId }) {
  switch (id) {
    case "hanoi":
      return (
        <svg viewBox="0 0 80 80" className="travel-stamp__art" aria-hidden>
          {/* Scalloped postal circle + Khue Van Cac simplified */}
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeDasharray="3 2.5"
            opacity="0.85"
          />
          <path
            d="M40 18 L40 22 M28 28 H52 M30 28 V48 H50 V28 M34 48 V56 H46 V48 M36 34 H44 M36 40 H44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 28 L40 22 L48 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="36" r="2.2" fill="currentColor" />
        </svg>
      );
    case "food":
      return (
        <svg viewBox="0 0 80 80" className="travel-stamp__art" aria-hidden>
          {/* Rounded triangle + pho bowl */}
          <path
            d="M40 12 L68 62 Q40 72 12 62 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeDasharray="4 2.2"
            opacity="0.9"
          />
          <ellipse
            cx="40"
            cy="48"
            rx="16"
            ry="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M24 48 Q26 58 40 58 Q54 58 56 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M30 42 Q34 36 38 42 M42 42 Q46 36 50 42"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M58 28 L52 46 M62 30 L54 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "animals":
      return (
        <svg viewBox="0 0 80 80" className="travel-stamp__art" aria-hidden>
          {/* Flower / cloud scallop + simple animal face */}
          <path
            d="M40 10
               C48 10 52 16 54 20
               C60 18 66 22 66 30
               C72 32 74 40 70 46
               C74 52 70 60 62 60
               C60 68 50 72 40 70
               C30 72 20 68 18 60
               C10 60 6 52 10 46
               C6 40 8 32 14 30
               C14 22 20 18 26 20
               C28 16 32 10 40 10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="35" cy="38" r="1.8" fill="currentColor" />
          <circle cx="45" cy="38" r="1.8" fill="currentColor" />
          <path
            d="M36 45 Q40 48 44 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="28" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="52" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "tet":
      return (
        <svg viewBox="0 0 80 80" className="travel-stamp__art" aria-hidden>
          {/* Rounded diamond / octagonal seal + blossom + envelope */}
          <path
            d="M40 8 L58 22 L72 40 L58 58 L40 72 L22 58 L8 40 L22 22 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeDasharray="3.5 2"
            opacity="0.9"
          />
          <path
            d="M40 24
               C36 30 30 34 30 40
               C30 46 34 50 40 50
               C46 50 50 46 50 40
               C50 34 44 30 40 24 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="38" r="2" fill="currentColor" />
          <rect
            x="32"
            y="52"
            width="16"
            height="12"
            rx="1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M32 54 L40 60 L48 54"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function TravelStamp({
  id,
  stamped,
  animate = false,
  label,
  exploreLabel,
  stampedLabel,
  className,
}: TravelStampProps) {
  return (
    <div
      className={cn(
        "travel-stamp",
        `travel-stamp--${id}`,
        stamped ? "travel-stamp--inked" : "travel-stamp--ghost",
        animate && "travel-stamp--press",
        className
      )}
      data-stamped={stamped ? "true" : "false"}
    >
      <div className="travel-stamp__ink" aria-hidden>
        <StampArt id={id} />
        {!stamped ? (
          <span className="travel-stamp__mark">?</span>
        ) : null}
      </div>
      <span className="travel-stamp__label">{label}</span>
      <span className="travel-stamp__status">
        {stamped ? stampedLabel : exploreLabel}
      </span>
    </div>
  );
}
