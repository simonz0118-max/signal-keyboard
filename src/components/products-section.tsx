"use client";

import { useTranslations } from "next-intl";
import SectionHeading from "./section-heading";
import ProductCard from "./product-card";
import { products } from "@/lib/products-data";

const productKeys = {
  s60: "products.model60",
  s75: "products.model75",
  s100: "products.model100",
} as const;

export default function ProductsSection() {
  const t = useTranslations("products");

  const delays = [0, 0.1, 0.2];

  return (
    <section id="products" className="section-padding">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const prefix = productKeys[product.id as keyof typeof productKeys];
            return (
              <ProductCard
                key={product.id}
                productId={product.id}
                name={t((prefix + ".name") as never)}
                format={t((prefix + ".format") as never)}
                specs={[
                  t((prefix + ".spec1") as never),
                  t((prefix + ".spec2") as never),
                  t((prefix + ".spec3") as never),
                ]}
                switchCount={t("switchCount")}
                learnMore={t("learnMore")}
                delay={delays[i]}
                imageSrc={product.image}
                price={product.price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
