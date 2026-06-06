"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
          {/* Left: Animated switch visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-[400px] aspect-square bg-bg-primary border border-border-default rounded-xl p-8 flex flex-col items-center justify-center gap-6">
              <div className="w-20 h-20 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/10 flex items-center justify-center">
                  <span className="text-xs font-mono text-accent/70">N/S</span>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs font-mono text-text-muted mb-2">
                  <span>0.1mm</span>
                  <span className="text-accent/70">1.2mm</span>
                  <span>4.0mm</span>
                </div>
                <div className="relative h-2 bg-bg-primary rounded-full border border-border-default overflow-hidden">
                  <motion.div
                    animate={{ width: ["10%", "45%", "30%", "60%", "35%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-0 bg-accent/40 rounded-full"
                  />
                  <motion.div
                    animate={{ left: ["8%", "42%", "27%", "57%", "32%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_8px_#00FF41]"
                  />
                </div>
              </div>
              <p className="text-xs text-text-muted font-mono">Analog actuation curve</p>
            </div>
          </motion.div>

          {/* Right: Feature blocks */}
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
