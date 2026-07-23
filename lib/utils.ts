import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, locale: string): string {
  if (locale === "vi") {
    return `${amount.toLocaleString("vi-VN")}₫`;
  }
  return `₫${amount.toLocaleString("en-US")}`;
}
