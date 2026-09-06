import { cn } from "@/lib/utils";

type ShapeType = "circle" | "square" | "triangle";

interface GeometricDecorationProps {
  shape?: ShapeType;
  color?: "pink" | "pale" | "deep" | "red" | "mustard";
  size?: "sm" | "md" | "lg";
  className?: string;
  rotate?: boolean;
}

const colorMap = {
  pink: "bg-biscute-pink",
  pale: "bg-biscute-pale-pink",
  deep: "bg-biscute-deep-pink",
  red: "bg-biscute-accent-red",
  mustard: "bg-biscute-mustard",
};

const sizeMap = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export function GeometricDecoration({
  shape = "circle",
  color = "pink",
  size = "md",
  className,
  rotate = false,
}: GeometricDecorationProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute block",
        sizeMap[size],
        colorMap[color],
        shape === "circle" && "rounded-full",
        shape === "square" && "rounded-none",
        rotate && "rotate-45",
        className
      )}
      style={
        shape === "triangle"
          ? { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }
          : undefined
      }
    />
  );
}

interface CardCornerDecorationsProps {
  index?: number;
  className?: string;
}

const shapes: ShapeType[] = ["circle", "square", "triangle"];
const colors: Array<"pink" | "pale" | "deep"> = ["pink", "pale", "deep"];

export function CardCornerDecorations({ index = 0, className }: CardCornerDecorationsProps) {
  const shape = shapes[index % 3];
  const color = colors[index % 3];

  return (
    <GeometricDecoration
      shape={shape}
      color={color}
      size="md"
      className={cn("right-2 top-2", className)}
      rotate={index % 3 === 1}
    />
  );
}
