import { getTranslations } from "next-intl/server";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { ToyPanel } from "@/components/brand/toy-panel";

export async function DrawnSection() {
  const t = await getTranslations("drawn");

  const steps = [
    { key: "stepSketch", tint: "cream" as const },
    { key: "stepArt", tint: "yellow" as const },
    { key: "stepMerch", tint: "blue" as const },
  ];

  return (
    <SectionWrapper bg="white" spacing="editorial" id="drawn">
      <h2 className="type-section-title max-w-2xl">{t("title")}</h2>
      <p className="type-body-lg mt-3 max-w-xl text-biscute-chocolate/80">
        {t("subtitle")}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <ToyPanel key={step.key} tint={step.tint} hardShadow>
            <p className="type-label opacity-70">0{i + 1}</p>
            <p className="type-subsection-title mt-2">{t(step.key)}</p>
          </ToyPanel>
        ))}
      </div>
    </SectionWrapper>
  );
}
