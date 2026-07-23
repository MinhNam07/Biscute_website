import { cn } from "@/lib/utils";

interface BiscuteWordmarkProps {
  className?: string;
  text?: string;
}

export function BiscuteWordmark({ className, text = "BISCUTE" }: BiscuteWordmarkProps) {
  return (
    <span className={cn("biscute-wordmark logo-wordmark", className)}>
      {text}
    </span>
  );
}
