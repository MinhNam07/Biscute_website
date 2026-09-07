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

/** Shared ink-rough filter — soft broken edges for rubber-stamp feel */
function InkDefs({ uid }: { uid: string }) {
  return (
    <defs>
      <filter
        id={`${uid}-rough`}
        x="-8%"
        y="-8%"
        width="116%"
        height="116%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          result="noise"
          seed="4"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="1.4"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  );
}

function StampArt({ id }: { id: PassportId }) {
  const uid = `ts-${id}`;

  switch (id) {
    case "hanoi":
      return (
        <svg viewBox="0 0 100 100" className="travel-stamp__art" aria-hidden>
          <InkDefs uid={uid} />
          <g filter={`url(#${uid}-rough)`} opacity="0.94">
            {/* Outer scalloped seal */}
            <path
              d="M50 6
                 C56 6 60 10 62 14 C68 12 74 16 76 22
                 C82 22 88 28 88 34 C92 38 94 44 92 50
                 C94 56 92 62 88 66 C88 72 82 78 76 78
                 C74 84 68 88 62 86 C60 90 56 94 50 94
                 C44 94 40 90 38 86 C32 88 26 84 24 78
                 C18 78 12 72 12 66 C8 62 6 56 8 50
                 C6 44 8 38 12 34 C12 28 18 22 24 22
                 C26 16 32 12 38 14 C40 10 44 6 50 6 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
              opacity="0.88"
            />
            {/* Broken outer echo */}
            <path
              d="M50 10 C58 10 64 14 66 18 C72 16 78 20 80 26
                 C86 28 90 34 88 40 C90 48 88 56 84 60
                 C84 68 78 74 70 74 C68 80 60 84 52 82
                 C46 86 38 84 34 78 C26 78 18 72 18 64
                 C12 60 12 50 16 44 C14 36 18 28 26 26
                 C28 20 36 14 44 14 C46 12 48 10 50 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="5 3 2 4"
              opacity="0.35"
            />
            {/* Inner decorative ring */}
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeDasharray="2.2 1.8"
              opacity="0.7"
            />
            {/* Khuê Văn Các — gate + circular window + roof */}
            <g transform="translate(0,2)" stroke="currentColor" fill="none">
              <path
                d="M32 58 V42 H68 V58"
                strokeWidth="1.8"
                strokeLinejoin="round"
                opacity="0.95"
              />
              <path
                d="M28 42 L50 28 L72 42"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M34 42 L50 32 L66 42"
                strokeWidth="1.2"
                opacity="0.55"
              />
              <rect
                x="38"
                y="44"
                width="24"
                height="16"
                rx="1"
                strokeWidth="1.6"
              />
              <circle cx="50" cy="52" r="5.5" strokeWidth="1.8" />
              <path d="M50 46.5 V57.5 M44.5 52 H55.5" strokeWidth="1.1" opacity="0.7" />
              <path d="M42 58 H58 M36 62 H64" strokeWidth="1.5" strokeLinecap="round" />
              <path
                d="M48 28 L50 24 L52 28"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </g>
            {/* Integrated type */}
            <text
              x="50"
              y="20"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="6.2"
              fontWeight="700"
              letterSpacing="1.6"
              opacity="0.92"
            >
              HANOI
            </text>
            <text
              x="50"
              y="74"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="5"
              fontWeight="600"
              letterSpacing="1.2"
              opacity="0.8"
            >
              VIETNAM
            </text>
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="4.2"
              fontWeight="700"
              letterSpacing="1.8"
              opacity="0.65"
            >
              BISCUTE
            </text>
            {/* Tiny tick marks */}
            <path
              d="M18 50 H22 M78 50 H82 M50 16 V18 M50 82 V84"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.45"
            />
          </g>
        </svg>
      );

    case "food":
      return (
        <svg viewBox="0 0 100 100" className="travel-stamp__art" aria-hidden>
          <InkDefs uid={uid} />
          <g filter={`url(#${uid}-rough)`} opacity="0.94">
            {/* Rounded triangular seal */}
            <path
              d="M50 8
                 C54 10 62 18 72 34
                 C78 44 82 54 80 64
                 C76 76 64 86 50 88
                 C36 86 24 76 20 64
                 C18 54 22 44 28 34
                 C38 18 46 10 50 8 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path
              d="M50 14 C58 18 68 30 74 42 C78 52 78 60 74 68
                 C70 78 60 84 50 84 C40 84 30 78 26 68
                 C22 60 22 52 26 42 C32 30 42 18 50 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeDasharray="3.5 2.2 1.5 2.8"
              opacity="0.45"
            />
            {/* Inner frame — chopsticks break through */}
            <path
              d="M50 22 L70 56 Q50 68 30 56 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="2 1.6"
              opacity="0.55"
            />
            {/* Large phở bowl */}
            <g stroke="currentColor" fill="none">
              <ellipse cx="50" cy="54" rx="18" ry="7.5" strokeWidth="2.1" />
              <path
                d="M32 54 Q34 68 50 70 Q66 68 68 54"
                strokeWidth="2.1"
                strokeLinejoin="round"
              />
              <path
                d="M36 54 Q38 62 50 63 Q62 62 64 54"
                strokeWidth="1.2"
                opacity="0.5"
              />
              {/* Steam — breaks upper frame */}
              <path
                d="M42 46 Q40 40 44 34 Q48 28 46 22"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M50 48 Q52 42 48 36 Q44 30 50 24"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M58 46 Q60 40 56 34 Q52 28 58 22"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.75"
              />
              {/* Chopsticks break the right inner edge */}
              <path
                d="M66 30 L54 52"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.95"
              />
              <path
                d="M72 32 L58 54"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />
              {/* Noodles hint */}
              <path
                d="M42 56 Q46 58 50 56 Q54 54 58 57"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.55"
              />
            </g>
            <text
              x="50"
              y="18"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="5.5"
              fontWeight="700"
              letterSpacing="0.8"
              opacity="0.92"
            >
              PHỞ TIME
            </text>
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="4.4"
              fontWeight="600"
              letterSpacing="0.6"
              opacity="0.7"
            >
              BISCUTE • VN
            </text>
          </g>
        </svg>
      );

    case "animals":
      return (
        <svg viewBox="0 0 100 100" className="travel-stamp__art" aria-hidden>
          <InkDefs uid={uid} />
          <g filter={`url(#${uid}-rough)`} opacity="0.94">
            {/* Flower / cloud scallop */}
            <path
              d="M50 8
                 C58 8 64 14 66 20
                 C74 18 82 24 82 34
                 C90 36 94 46 90 54
                 C94 62 90 72 80 74
                 C78 84 66 90 50 88
                 C34 90 22 84 20 74
                 C10 72 6 62 10 54
                 C6 46 10 36 18 34
                 C18 24 26 18 34 20
                 C36 14 42 8 50 8 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path
              d="M50 14 C60 14 68 22 70 28 C78 28 84 36 82 44
                 C88 48 88 58 82 62 C82 72 72 78 62 78
                 C58 84 50 86 42 84 C32 86 22 78 20 68
                 C12 64 12 52 18 46 C16 36 24 28 34 28
                 C36 20 42 14 50 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeDasharray="2.5 2 1.5 2.5"
              opacity="0.4"
            />
            {/* Biscute Bunny — cute crew character */}
            <g stroke="currentColor" fill="none">
              {/* Ears */}
              <ellipse
                cx="40"
                cy="30"
                rx="5.5"
                ry="11"
                strokeWidth="1.8"
                transform="rotate(-12 40 30)"
              />
              <ellipse
                cx="60"
                cy="30"
                rx="5.5"
                ry="11"
                strokeWidth="1.8"
                transform="rotate(12 60 30)"
              />
              <ellipse
                cx="40"
                cy="31"
                rx="2.2"
                ry="6"
                strokeWidth="1"
                opacity="0.45"
                transform="rotate(-12 40 31)"
              />
              <ellipse
                cx="60"
                cy="31"
                rx="2.2"
                ry="6"
                strokeWidth="1"
                opacity="0.45"
                transform="rotate(12 60 31)"
              />
              {/* Head */}
              <circle cx="50" cy="48" r="16" strokeWidth="2" />
              {/* Cheeks */}
              <circle cx="38" cy="52" r="3.2" strokeWidth="1" opacity="0.4" />
              <circle cx="62" cy="52" r="3.2" strokeWidth="1" opacity="0.4" />
              {/* Eyes */}
              <circle cx="44" cy="46" r="2.2" fill="currentColor" stroke="none" />
              <circle cx="56" cy="46" r="2.2" fill="currentColor" stroke="none" />
              {/* Nose + smile */}
              <ellipse cx="50" cy="52" rx="2.2" ry="1.6" fill="currentColor" stroke="none" opacity="0.85" />
              <path
                d="M46 56 Q50 60 54 56"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Tiny whisker ticks */}
              <path
                d="M34 50 H38 M62 50 H66 M35 54 H38 M62 54 H65"
                strokeWidth="1"
                opacity="0.4"
              />
            </g>
            <text
              x="50"
              y="72"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="5.2"
              fontWeight="700"
              letterSpacing="0.9"
              opacity="0.9"
            >
              CUTE CREW
            </text>
            <text
              x="50"
              y="80"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="4"
              fontWeight="600"
              letterSpacing="0.7"
              opacity="0.65"
            >
              FROM VIETNAM
            </text>
          </g>
        </svg>
      );

    case "tet":
      return (
        <svg viewBox="0 0 100 100" className="travel-stamp__art" aria-hidden>
          <InkDefs uid={uid} />
          <g filter={`url(#${uid}-rough)`} opacity="0.94">
            {/* Diamond / octagonal seal */}
            <path
              d="M50 6 L68 18 L88 38 L82 58 L62 86 L38 86 L18 58 L12 38 L32 18 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path
              d="M50 12 L66 22 L82 40 L76 56 L60 80 L40 80 L24 56 L18 40 L34 22 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeDasharray="3 2 1.5 2.5"
              opacity="0.42"
            />
            <path
              d="M50 20 L62 28 L74 42 L70 54 L58 72 L42 72 L30 54 L26 42 L38 28 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              opacity="0.5"
            />
            {/* Peach / apricot blossom */}
            <g stroke="currentColor" fill="none" transform="translate(0,-2)">
              <circle cx="50" cy="40" r="3" fill="currentColor" stroke="none" opacity="0.85" />
              <ellipse cx="50" cy="30" rx="5" ry="7" strokeWidth="1.5" />
              <ellipse cx="50" cy="50" rx="5" ry="7" strokeWidth="1.5" />
              <ellipse cx="40" cy="40" rx="7" ry="5" strokeWidth="1.5" />
              <ellipse cx="60" cy="40" rx="7" ry="5" strokeWidth="1.5" />
              <ellipse
                cx="43"
                cy="33"
                rx="5.5"
                ry="4.5"
                strokeWidth="1.3"
                transform="rotate(-40 43 33)"
                opacity="0.85"
              />
              <ellipse
                cx="57"
                cy="33"
                rx="5.5"
                ry="4.5"
                strokeWidth="1.3"
                transform="rotate(40 57 33)"
                opacity="0.85"
              />
              {/* Celebratory strokes */}
              <path
                d="M28 28 L32 32 M70 26 L66 32 M26 48 L32 48 M74 48 L68 48 M32 58 L36 54 M68 58 L64 54"
                strokeWidth="1.3"
                strokeLinecap="round"
                opacity="0.55"
              />
            </g>
            {/* Lucky envelope */}
            <g stroke="currentColor" fill="none" transform="translate(0,4)">
              <rect
                x="40"
                y="54"
                width="20"
                height="14"
                rx="1.2"
                strokeWidth="1.6"
              />
              <path
                d="M40 56 L50 64 L60 56"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="60" r="2" strokeWidth="1.1" opacity="0.7" />
            </g>
            <text
              x="50"
              y="18"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="6.5"
              fontWeight="700"
              letterSpacing="1.4"
              opacity="0.95"
            >
              TẾT
            </text>
            <text
              x="50"
              y="78"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="5"
              fontWeight="700"
              letterSpacing="1.6"
              opacity="0.85"
            >
              XUÂN
            </text>
            <text
              x="50"
              y="86"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="3.8"
              fontWeight="600"
              letterSpacing="1.4"
              opacity="0.6"
            >
              BISCUTE
            </text>
          </g>
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
      </div>
      <span className="travel-stamp__label">{label}</span>
      <span className="travel-stamp__status">
        {stamped ? stampedLabel : exploreLabel}
      </span>
    </div>
  );
}
