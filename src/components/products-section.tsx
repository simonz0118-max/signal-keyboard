"use client";

import { useTranslations } from "next-intl";
import SectionHeading from "./section-heading";
import ProductCard from "./product-card";
import { products } from "@/lib/products";

export default function ProductsSection() {
  const t = useTranslations("products");

  const delays = [0, 0.1, 0.2];

  return (
    <section id="products" className="section-padding">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              name={t("products." + product.nameKey + ".name" as never)}
              format={t("products." + product.nameKey + ".format" as never)}
              specs={[
                t("products." + product.nameKey + ".spec1" as never),
                t("products." + product.nameKey + ".spec2" as never),
                t("products." + product.nameKey + ".spec3" as never),
              ]}
              switchCount={t("switchCount")}
              learnMore={t("learnMore")}
              delay={delays[i]}
              imageSrc={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
