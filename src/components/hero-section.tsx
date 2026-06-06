"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background keyboard image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-full max-w-[900px] aspect-[16/9] opacity-50">
          <Image
            src="/images/hero-keyboard.png"
            alt=""
            fill
            className="object-contain"
            priority
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-[clamp(36px,8vw,72px)] font-bold tracking-tight leading-[1.05] text-text-primary">
          {t("tagline")}
        </h1>

        {/* Accent underline */}
        <div className="mt-6 mx-auto w-[min(40%,280px)] h-px bg-accent opacity-60" />

        <p className="mt-8 text-[16px] md:text-[18px] text-text-secondary max-w-lg mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        <a
          href="#waitlist"
          className="mt-10 inline-flex items-center gap-2 px-6 py-3 text-sm font-medium
                     border border-accent text-accent rounded-md
                     hover:bg-accent/10 hover:shadow-[0_0_24px_var(--accent-glow)]
                     transition-all duration-300"
        >
          {t("cta")}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-accent">
            <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted tracking-widest uppercase">{t("scrollHint")}</span>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-text-muted">
          <path d="M1 1l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
