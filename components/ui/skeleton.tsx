import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-none bg-biscute-chocolate/10", className)}
      aria-hidden="true"
    />
  );
}
