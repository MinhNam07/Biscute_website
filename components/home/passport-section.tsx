"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { PassportStamp } from "@/components/brand/passport-stamp";
import { ToyPanel } from "@/components/brand/toy-panel";
import {
  getStamps,
  isPassportComplete,
  PASSPORT_COLLECTIONS,
  type PassportHandle,
} from "@/lib/passport";

const LABELS: Record<PassportHandle, string> = {
  hanoi: "HANOI",
  "food-icons": "FOOD",
  "cute-animals": "ANIMALS",
  "vietnam-culture": "TẾT",
};

export function PassportSection() {
  const t = useTranslations("passport");
  const [stamps, setStamps] = useState<PassportHandle[]>([]);

  useEffect(() => {
    setStamps(getStamps());
  }, []);

  const complete = isPassportComplete(stamps);

  return (
    <SectionWrapper bg="cream" spacing="standard" id="passport">
      <ToyPanel tint="white" className="max-w-3xl">
        <h2 className="type-section-title">{t("title")}</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          {PASSPORT_COLLECTIONS.map((handle) => {
            const stamped = stamps.includes(handle);
            return (
              <Link key={handle} href={`/collections/${handle}`}>
                <PassportStamp stamped={stamped} label={LABELS[handle]} />
              </Link>
            );
          })}
        </div>
        <p className="type-meta mt-6 text-biscute-chocolate/70">
          {complete ? t("complete") : t("locked")}
        </p>
        {complete ? (
          <p className="type-body mt-2 font-semibold">{t("secret")}</p>
        ) : null}
      </ToyPanel>
    </SectionWrapper>
  );
}
