"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  side?: "right" | "bottom";
}

export function Sheet({
  open,
  onOpenChange,
  children,
  title,
  side = "right",
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-biscute-chocolate/50" />
        <Dialog.Content
          className={cn(
            "fixed z-50 flex flex-col border-2 border-biscute-chocolate bg-biscute-cream shadow-biscute-lg transition-transform duration-300 ease-out lg:border-4",
            side === "right" &&
              "inset-y-0 right-0 h-full w-full max-w-md",
            side === "bottom" &&
              "inset-x-0 bottom-0 max-h-[85vh] rounded-none"
          )}
        >
          <div className="flex items-center justify-between border-b-2 border-biscute-chocolate px-4 py-3 lg:border-b-4">
            {title && (
              <Dialog.Title className="font-display text-lg font-black uppercase tracking-tighter text-biscute-chocolate">
                {title}
              </Dialog.Title>
            )}
            <Dialog.Close
              className="ml-auto flex h-11 w-11 items-center justify-center border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-sm btn-press hover:bg-biscute-pale-pink"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
