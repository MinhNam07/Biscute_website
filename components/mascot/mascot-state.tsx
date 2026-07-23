import { cn } from "@/lib/utils";

interface MascotStateProps {
  variant?: "loader" | "empty" | "error";
  className?: string;
}

export function MascotState({ variant = "loader", className }: MascotStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)} aria-hidden="true">
      <svg
        viewBox="0 0 80 60"
        className={cn("h-16 w-20", variant === "loader" && "animate-bounce-gentle")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bear */}
        <circle cx="25" cy="22" r="14" fill="#1857C8" />
        <circle cx="18" cy="12" r="5" fill="#1857C8" />
        <circle cx="32" cy="12" r="5" fill="#1857C8" />
        <circle cx="21" cy="20" r="2" fill="#2C2F36" />
        <circle cx="29" cy="20" r="2" fill="#2C2F36" />
        <ellipse cx="25" cy="26" rx="3" ry="2" fill="#2C2F36" />
        {/* Rabbit */}
        <ellipse cx="58" cy="30" rx="12" ry="14" fill="#F8F3E7" stroke="#2C2F36" strokeWidth="1.5" />
        <ellipse cx="52" cy="10" rx="4" ry="12" fill="#F8F3E7" stroke="#2C2F36" strokeWidth="1.5" />
        <ellipse cx="64" cy="10" rx="4" ry="12" fill="#F8F3E7" stroke="#2C2F36" strokeWidth="1.5" />
        <circle cx="54" cy="28" r="2" fill="#2C2F36" />
        <circle cx="62" cy="28" r="2" fill="#2C2F36" />
        <ellipse cx="58" cy="34" rx="2" ry="1.5" fill="#D9A61E" />
      </svg>
    </div>
  );
}
