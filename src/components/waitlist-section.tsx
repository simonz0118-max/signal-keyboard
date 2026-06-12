"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./section-heading";

export default function WaitlistSection() {
  const t = useTranslations("waitlist");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "focused" | "submitting" | "success" | "error">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
      return;
    }
    setState("submitting");
    setTimeout(() => setState("success"), 1200);
  }

  return (
    <section id="waitlist" className="section-padding bg-bg-surface/20">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <AnimatePresence mode="wait">
          {state === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-start text-left gap-6"
            >
              <div className="w-12 h-12 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10l4 4 8-8"
                    stroke="#00FF41"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-text-primary">
                {t("success.title")}
              </h2>
              <div className="text-sm text-text-secondary leading-relaxed space-y-1">
                <p>{t("success.line1")}</p>
                <p>{t("success.line2")}</p>
                <p>{t("success.line3")}</p>
              </div>
              <button
                onClick={() => setState("idle")}
                className="mt-4 text-xs text-text-muted hover:text-text-secondary transition-colors underline underline-offset-4"
              >
                {t("success.back")}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-left"
            >
              <SectionHeading
                title={t("heading")}
                subtitle={t("subtitle")}
              />

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setState("focused")}
                  onBlur={() => state !== "error" && setState("idle")}
                  placeholder={t("emailPlaceholder")}
                  className={`flex-1 px-4 py-3 text-sm bg-bg-primary border rounded-md outline-none transition-all
                             text-text-primary placeholder:text-text-muted
                             ${
                               state === "error"
                                 ? "border-red-500/50 focus:border-red-500"
                                 : state === "focused"
                                 ? "border-accent focus:border-accent shadow-[0_0_12px_rgba(0,255,65,0.06)]"
                                 : "border-border-default hover:border-text-muted focus:border-accent"
                             }`}
                />
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="px-6 py-3 text-sm font-medium border border-accent text-accent rounded-md
                             hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.12)]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300 whitespace-nowrap"
                >
                  {state === "submitting" ? t("submitting") : t("cta")}
                </button>
              </form>

              <AnimatePresence>
                {state === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="mt-3 text-xs text-red-400"
                  >
                    {t("error")}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-default bg-bg-primary">
          <Image
            src="/images/product-s75-real.jpg"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-xs text-white/80 leading-relaxed">
            {t("imageCaption")}
          </p>
        </div>
      </div>
    </section>
  );
}
