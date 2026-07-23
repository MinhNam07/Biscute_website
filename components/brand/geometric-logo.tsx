import { BiscuteWordmark } from "@/components/brand/biscute-wordmark";
import { cn } from "@/lib/utils";

interface GeometricLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function GeometricLogo({ className, showWordmark = true }: GeometricLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {showWordmark && <BiscuteWordmark />}
    </div>
  );
}
