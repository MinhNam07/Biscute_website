import { cn } from "@/lib/utils";

interface GeometricLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function GeometricLogo({ className, showWordmark = true }: GeometricLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-biscute-pink" />
        <span className="h-3 w-3 rounded-none bg-biscute-pale-pink" />
        <span
          className="h-3 w-3 bg-biscute-deep-pink"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
      </div>
      {showWordmark && (
        <span className="logo-wordmark font-display text-xl font-black uppercase tracking-tighter text-biscute-chocolate lg:text-2xl">
          BISCUTE
        </span>
      )}
    </div>
  );
}
