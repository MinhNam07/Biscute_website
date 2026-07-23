import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface CategoryCountLinkProps {
  href: string;
  label: string;
  count: number;
  index?: number;
  className?: string;
}

const shapeStyles = [
  "rounded-full bg-biscute-pink text-biscute-white",
  "rounded-none bg-biscute-pale-pink rotate-45",
  "bg-biscute-deep-pink text-biscute-white",
];

const TRIANGLE_CLIP = "polygon(50% 0%, 0% 100%, 100% 100%)";

function CategoryShape({ index, count }: { index: number; count: number }) {
  const shapeIndex = index % 3;

  if (shapeIndex === 2) {
    return (
      <span className="relative mb-3 block h-12 w-12">
        <span
          aria-hidden
          className="absolute inset-0 bg-biscute-chocolate"
          style={{ clipPath: TRIANGLE_CLIP, transform: "translate(3px, 3px)" }}
        />
        <span
          className="absolute inset-0 flex items-center justify-center border-2 border-biscute-chocolate bg-biscute-deep-pink text-lg font-black text-biscute-white"
          style={{ clipPath: TRIANGLE_CLIP }}
        >
          <span className="flex w-full translate-y-2 items-center justify-center leading-none tabular-nums">
            {count}
          </span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "mb-3 flex h-12 w-12 items-center justify-center border-2 border-biscute-chocolate text-lg font-black shadow-biscute-sm",
        shapeStyles[shapeIndex]
      )}
    >
      <span className={shapeIndex === 1 ? "-rotate-45" : ""}>{count}</span>
    </span>
  );
}

export function CategoryCountLink({
  href,
  label,
  count,
  index = 0,
  className,
}: CategoryCountLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center bg-biscute-white p-6 text-center transition-colors duration-200 hover:bg-biscute-pink/30",
        className
      )}
    >
      <CategoryShape index={index} count={count} />
      <span className="font-display text-base font-black uppercase tracking-tighter text-biscute-chocolate sm:text-lg">
        {label}
      </span>
    </Link>
  );
}
