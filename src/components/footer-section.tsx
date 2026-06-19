"use client";

import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";

export default function FooterSection() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-sm font-bold tracking-tight text-text-primary">
                ASME
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              {t("brandTagline")}
            </p>
            <p className="text-[10px] text-text-muted/60 mt-1 tracking-wider uppercase">
              {t("brandNote")}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              {t("productsCol")}
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#products" className="text-xs text-text-muted hover:text-text-primary transition-colors">S60</a>
              <a href="#products" className="text-xs text-text-muted hover:text-text-primary transition-colors">S75</a>
              <a href="#products" className="text-xs text-text-muted hover:text-text-primary transition-colors">TKL</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              {t("companyCol")}
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">{t("about")}</a>
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">{t("blog")}</a>
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">{t("contact")}</a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              {t("communityCol")}
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">{t("discord")}</a>
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">{t("twitter")}</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            {t("copyright")}
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
