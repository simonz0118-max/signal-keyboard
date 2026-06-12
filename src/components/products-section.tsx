"use client";

import { useTranslations } from "next-intl";
import SectionHeading from "./section-heading";
import ProductCard from "./product-card";

export default function ProductsSection() {
  const t = useTranslations("products");

  return (
    <section id="products" className="section-padding">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            productId="s60" name={t("model60.name" as never)} format={t("model60.format" as never)}
            specs={[t("model60.spec1" as never), t("model60.spec2" as never), t("model60.spec3" as never)]}
            switchCount={t("switchCount")} learnMore={t("learnMore")} delay={0} imageSrc="/images/product-s60-real.jpg" price={219}
          />
          <ProductCard
            productId="s75" name={t("model75.name" as never)} format={t("model75.format" as never)}
            specs={[t("model75.spec1" as never), t("model75.spec2" as never), t("model75.spec3" as never)]}
            switchCount={t("switchCount")} learnMore={t("learnMore")} delay={0.1} imageSrc="/images/product-s75-real.jpg" price={269}
          />
          <ProductCard
            productId="tkl" name={t("model100.name" as never)} format={t("model100.format" as never)}
            specs={[t("model100.spec1" as never), t("model100.spec2" as never), t("model100.spec3" as never)]}
            switchCount={t("switchCount")} learnMore={t("learnMore")} delay={0.2} imageSrc="/images/product-s100-real.jpg" price={289}
          />
        </div>
      </div>
    </section>
  );
}
