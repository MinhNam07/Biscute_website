"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionGroupProps {
  items: AccordionItem[];
  className?: string;
}

export function AccordionGroup({ items, className }: AccordionGroupProps) {
  return (
    <Accordion.Root type="multiple" className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="overflow-hidden border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-md lg:border-4"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group type-label flex w-full items-center justify-between px-4 py-4 text-left text-biscute-chocolate transition-colors duration-200 data-[state=open]:bg-biscute-deep-pink data-[state=open]:text-biscute-white">
              {item.title}
              <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="type-body border-t-2 border-biscute-chocolate bg-biscute-pale-pink px-4 py-4 text-biscute-chocolate lg:border-t-4">
              {item.content}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
