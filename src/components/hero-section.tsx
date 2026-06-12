"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100svh] flex items-center md:items-end px-6 md:px-12 lg:px-24 pt-28 pb-12 md:pb-24 overflow-hidden">
      <Image
        src="/images/hero-keyboard-real.jpg"
        alt=""
        fill
        className="object-cover"
        preload
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,14,0.92)_0%,rgba(10,10,14,0.72)_38%,rgba(10,10,14,0.24)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 max-w-2xl text-left"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent mb-5">
          {t("eyebrow")}
        </p>
        <h1 className="text-[clamp(34px,10vw,78px)] font-bold leading-[1.02] text-text-primary">
          {t("tagline")}
        </h1>

        <p className="mt-7 text-[16px] md:text-[18px] text-text-secondary max-w-xl leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-accent text-bg-primary rounded-md hover:shadow-[0_0_24px_var(--accent-glow)] transition-all duration-300"
          >
            {t("cta")}
          </a>
          <a
            href="#technology"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-white/20 text-text-primary rounded-md hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            {t("secondaryCta")}
          </a>
        </div>

        <div className="mt-10 hidden md:grid grid-cols-3 gap-4 max-w-xl">
          {["proof1", "proof2", "proof3"].map((key) => (
            <div key={key} className="border-l border-white/20 pl-4">
              <p className="text-xs text-text-muted leading-relaxed">{t(key)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 right-6 md:right-12 lg:right-24 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted tracking-widest uppercase">{t("scrollHint")}</span>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-text-muted">
          <path d="M1 1l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
