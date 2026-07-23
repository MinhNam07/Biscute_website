import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pale" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  shape?: "square" | "pill";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      shape = "square",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center border-2 border-biscute-chocolate font-bold uppercase tracking-wider transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-biscute-chocolate disabled:pointer-events-none disabled:opacity-50",
          shape === "pill" ? "rounded-full" : "rounded-none",
          variant !== "ghost" && "shadow-biscute-md btn-press",
          {
            "bg-biscute-pink text-biscute-white hover:bg-biscute-deep-pink":
              variant === "primary",
            "bg-biscute-mustard text-biscute-chocolate hover:bg-biscute-mustard/90":
              variant === "secondary",
            "bg-biscute-pale-pink text-biscute-chocolate hover:bg-biscute-pale-pink/90":
              variant === "pale",
            "bg-biscute-white text-biscute-chocolate hover:bg-biscute-white/90":
              variant === "outline",
            "border-none bg-transparent text-biscute-chocolate shadow-none hover:bg-biscute-pale-pink":
              variant === "ghost",
            "h-9 min-w-[44px] px-4 text-xs": size === "sm",
            "h-11 min-w-[44px] px-6 text-sm": size === "md",
            "h-12 min-w-[44px] px-8 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
