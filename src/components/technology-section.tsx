"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./section-heading";

const featureKeys = ["feature1", "feature2", "feature3"] as const;

export default function TechnologySection() {
  const t = useTranslations("tech");

  return (
    <section id="technology" className="section-padding bg-bg-surface/30">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading
          title={t("heading")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-default bg-bg-primary">
              <Image
                src="/images/build-bench-real.jpg"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-xs text-white/80 leading-relaxed">
                {t("imageCaption")}
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            {featureKeys.map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className="relative pl-6 border-l border-border-default hover:border-accent/30 transition-colors"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[32px] font-bold font-mono text-accent tracking-tight">
                    {t(`${k}.value`)}
                  </span>
                  <span className="text-sm font-medium text-text-muted">
                    {t(`${k}.unit`)}
                  </span>
                  <h3 className="text-sm font-semibold text-text-primary ml-3">
                    {t(`${k}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                  {t(`${k}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
