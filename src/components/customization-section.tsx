"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./section-heading";
import SegmentedControl from "./segmented-control";

const switchOptions = [
  { value: "linear", label: "" },
  { value: "tactile", label: "" },
  { value: "clicky", label: "" },
];

const caseOptions = [
  { value: "aluminum", label: "" },
  { value: "poly", label: "" },
  { value: "wood", label: "" },
];

const keycapOptions = [
  { value: "cherry", label: "" },
  { value: "sa", label: "" },
  { value: "dsa", label: "" },
];

export default function CustomizationSection() {
  const t = useTranslations("customize");
  const [switchType, setSwitchType] = useState("linear");
  const [caseType, setCaseType] = useState("aluminum");
  const [keycapType, setKeycapType] = useState("cherry");

  const switchLabels: Record<string, string> = {
    linear: t("switchLinear"),
    tactile: t("switchTactile"),
    clicky: t("switchClicky"),
  };
  const caseLabels: Record<string, string> = {
    aluminum: t("caseAluminum"),
    poly: t("casePoly"),
    wood: t("caseWood"),
  };
  const keycapLabels: Record<string, string> = {
    cherry: t("keycapCherry"),
    sa: t("keycapSA"),
    dsa: t("keycapDSA"),
  };

  return (
    <section id="customize" className="section-padding">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading
          title={t("heading")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-default bg-bg-surface"
          >
            <Image
              src="/images/workspace-real.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-xs text-white/80 leading-relaxed">
              {t("imageCaption")}
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            <SegmentedControl
              name={t("switchType")}
              options={switchOptions.map((o) => ({
                ...o,
                label: switchLabels[o.value],
              }))}
              value={switchType}
              onChange={setSwitchType}
            />
            <SegmentedControl
              name={t("caseType")}
              options={caseOptions.map((o) => ({
                ...o,
                label: caseLabels[o.value],
              }))}
              value={caseType}
              onChange={setCaseType}
            />
            <SegmentedControl
              name={t("keycapType")}
              options={keycapOptions.map((o) => ({
                ...o,
                label: keycapLabels[o.value],
              }))}
              value={keycapType}
              onChange={setKeycapType}
            />

            {/* Spec preview */}
            <div className="pt-4 border-t border-border-default">
              <p className="font-mono text-xs text-text-muted">
                {t("specPreview", {
                  switch: switchLabels[switchType],
                  case: caseLabels[caseType],
                  keycap: keycapLabels[keycapType],
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
