"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./locale-switcher";

const links = [
  { key: "features", href: "#technology" },
  { key: "pricing", href: "#products" },
  { key: "about", href: "#waitlist" },
] as const;

export default function NavBar() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 w-full px-4 py-5 md:px-6 md:py-6"
    >
      <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Globe className="h-6 w-6 text-white" />
            <span className="text-lg font-semibold text-white">{t("brand")}</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="transition-colors duration-300 hover:text-white"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#waitlist"
            className="cursor-pointer text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            {t("signUp")}
          </a>
          <Link
            href="/cart"
            className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("login")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-9 w-9 place-items-center rounded-full text-white md:hidden"
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="liquid-glass mx-auto mt-3 max-w-5xl rounded-[28px] px-5 py-5 md:hidden"
          >
            <div className="flex flex-col gap-4 text-sm font-medium text-white/80">
              {links.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-1 transition-colors hover:text-white"
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <LocaleSwitcher />
                <a
                  href="#waitlist"
                  onClick={() => setMenuOpen(false)}
                  className="glass-pill px-4 py-2 text-white"
                >
                  {t("signUp")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
