"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
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

const caseColors: Record<string, string> = {
  aluminum: "from-zinc-500 to-zinc-700",
  poly: "from-zinc-300/30 to-zinc-500/30",
  wood: "from-amber-700/40 to-amber-900/40",
};

const keycapShapes: Record<string, string> = {
  cherry: "rounded-t-[3px]",
  sa: "rounded-t-xl",
  dsa: "rounded-full",
};

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
          {/* Preview */}
          <div className="flex justify-center">
            <div className="w-full max-w-[480px] aspect-[2/1] bg-bg-surface border border-border-default rounded-xl p-6 flex flex-col gap-4">
              {/* Case */}
              <div
                className={`flex-1 rounded-lg bg-gradient-to-b ${caseColors[caseType]} border border-border-default p-4 flex items-end justify-center`}
              >
                {/* Keyboard visualization */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${switchType}-${keycapType}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="w-full max-w-[360px] bg-bg-primary/80 rounded-lg border border-border-default p-2"
                  >
                    <div className="grid grid-cols-[repeat(14,1fr)] gap-[1px]">
                      {Array.from({ length: 56 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-[3/4] ${keycapShapes[keycapType]} bg-bg-surface border border-border-default/40`}
                        >
                          <div
                            className={`w-full h-[30%] mt-auto ${
                              switchType === "linear"
                                ? "bg-accent/10"
                                : switchType === "tactile"
                                ? "bg-amber-500/10"
                                : "bg-sky-400/10"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Controls */}
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
