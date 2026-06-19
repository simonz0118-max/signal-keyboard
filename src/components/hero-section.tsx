"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import BackgroundVideo from "./background-video";

type CtaState = "button" | "form" | "submitted";

export default function HeroSection() {
  const t = useTranslations("hero");
  const [ctaState, setCtaState] = useState<CtaState>("button");
  const [email, setEmail] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  const targetPlaceholder = useMemo(() => {
    return ctaState === "submitted" ? t("submittedPlaceholder") : t("emailPlaceholder");
  }, [ctaState, t]);

  useEffect(() => {
    if (ctaState === "button") return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedPlaceholder(targetPlaceholder.slice(0, index));
      if (index >= targetPlaceholder.length) window.clearInterval(interval);
    }, 60);

    return () => window.clearInterval(interval);
  }, [ctaState, targetPlaceholder]);

  useEffect(() => {
    if (ctaState !== "submitted") return;

    const timeout = window.setTimeout(() => {
      setCtaState("button");
      setEmail("");
      setTypedPlaceholder("");
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, [ctaState]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTypedPlaceholder("");
    setCtaState("submitted");
  }

  return (
    <section className="relative flex min-h-[100svh] flex-1 flex-col items-center justify-center overflow-hidden px-6">
      <BackgroundVideo />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-7 pt-20 text-center md:gap-9 md:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 md:text-[11px]"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-5 max-w-4xl bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-transparent md:text-[clamp(52px,5.5vw,64px)]"
            style={{ fontFamily: "var(--font-instrument-serif), serif" }}
          >
            {t("headingLine1")}
            <br className="hidden md:block" />
            {t("headingLine2")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-xl text-sm leading-6 text-white/58 md:text-[15px]"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex min-h-[50px] w-full justify-center"
        >
          <AnimatePresence mode="wait">
            {ctaState === "button" ? (
              <motion.button
                key="early-access-button"
                type="button"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setTypedPlaceholder("");
                  setCtaState("form");
                }}
                className="cursor-pointer rounded-full border border-white/10 px-10 py-3 text-[14px] font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.02]"
              >
                {t("cta")}
              </motion.button>
            ) : (
              <motion.form
                key="early-access-form"
                data-testid="hero-email-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="flex w-full max-w-[320px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.02] py-1.5 pl-5 pr-1.5 text-[14px] font-medium backdrop-blur-sm transition-colors duration-300 focus-within:border-white/40"
              >
                <input
                  data-testid="hero-email-input"
                  autoFocus
                  type="email"
                  value={email}
                  disabled={ctaState === "submitted"}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={typedPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/45 disabled:cursor-default"
                />
                <button
                  data-testid="hero-email-submit"
                  type="submit"
                  disabled={ctaState === "submitted"}
                  aria-label={ctaState === "submitted" ? t("submittedAria") : t("submitAria")}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-105 disabled:hover:scale-100"
                >
                  {ctaState === "submitted" ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.a
          href="#technology"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[13px] font-medium tracking-wide text-white/80 transition-colors duration-300 hover:text-white/40"
        >
          {t("demoLink")}
        </motion.a>
      </div>
    </section>
  );
}
