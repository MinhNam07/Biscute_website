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
  "rounded-full bg-biscute-pink",
  "rounded-none bg-biscute-pale-pink rotate-45",
  "bg-biscute-deep-pink",
];

export function CategoryCountLink({
  href,
  label,
  count,
  index = 0,
  className,
}: CategoryCountLinkProps) {
  const shapeClass = shapeStyles[index % 3];

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center bg-biscute-white p-6 text-center transition-colors duration-200 hover:bg-biscute-pink/30",
        className
      )}
    >
      <span
        className={cn(
          "mb-3 flex h-12 w-12 items-center justify-center border-2 border-biscute-chocolate text-lg font-black shadow-biscute-sm",
          shapeClass
        )}
        style={
          index % 3 === 2
            ? { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }
            : undefined
        }
      >
        <span className={index % 3 === 1 ? "-rotate-45" : ""}>{count}</span>
      </span>
      <span className="font-display text-base font-black uppercase tracking-tighter text-biscute-chocolate sm:text-lg">
        {label}
      </span>
    </Link>
  );
}
