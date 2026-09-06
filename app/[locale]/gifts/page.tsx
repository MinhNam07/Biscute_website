import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CardCornerDecorations } from "@/components/brand/geometric-decoration";

export default async function GiftsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gifts" });

  const tiers = [
    {
      href: "/collections/gifts-under-200k",
      title: t("under200k"),
      description: "Perfect small gifts and souvenirs",
      bg: "bg-biscute-mustard",
    },
    {
      href: "/collections/gifts-under-500k",
      title: t("under500k"),
      description: "Special gift sets and apparel",
      bg: "bg-biscute-pink text-biscute-white",
    },
  ];

  return (
    <div className="bg-biscute-cream">
      <div className="section-divider container-biscute py-12 md:py-16 lg:py-24">
        <div className="mb-8 text-center">
          <h1 className="type-page-title">
            {t("title")}
          </h1>
          <p className="type-body-lg mt-3 text-biscute-chocolate/80">{t("subtitle")}</p>
        </div>
        <div className="mx-auto grid max-w-2xl gap-4">
          {tiers.map((tier, i) => (
            <Link
              key={tier.href}
              href={tier.href}
              className={`group relative flex flex-col items-center justify-center border-2 border-biscute-chocolate p-12 text-center shadow-biscute-lg transition-transform duration-200 hover:-translate-y-1 lg:border-4 ${tier.bg}`}
            >
              <CardCornerDecorations index={i} />
              <span className="type-subsection-title">
                {tier.title}
              </span>
              <span className="type-meta mt-2 text-biscute-chocolate/80">
                {tier.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
