"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./locale-switcher";
import { useTheme } from "./theme-provider";
import { useCart } from "@/lib/cart-context";

const links = ["products", "technology", "customize", "waitlist"] as const;

export default function NavBar() {
  const t = useTranslations("nav");
  const { theme, toggle } = useTheme();
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        backgroundColor: scrolled ? "var(--nav-bg)" : "rgba(10, 10, 14, 0)",
        borderBottomColor: scrolled ? "var(--nav-border)" : "rgba(10, 10, 14, 0)",
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="w-2 h-2 bg-accent rounded-full group-hover:shadow-[0_0_12px_var(--accent)] transition-shadow" />
          <span className="text-lg font-bold tracking-tight text-text-primary">
            SIGNAL
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {t(key)}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-3">
          <LocaleSwitcher />

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-border-default
                       text-text-muted hover:text-text-primary hover:border-text-muted transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <Link href="/cart" className="relative w-8 h-8 flex items-center justify-center rounded-md border border-border-default text-text-muted hover:text-text-primary hover:border-text-muted transition-all">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 flex items-center justify-center rounded-full bg-accent text-[9px] font-bold text-bg-primary">
                {itemCount}
              </span>
            )}
          </Link>

          <a
            href="#waitlist"
            className="text-sm font-medium px-4 py-2 border border-accent/50 text-accent rounded-md
                       hover:bg-accent/10 hover:border-accent transition-all whitespace-nowrap"
          >
            {t("joinWaitlist")}
          </a>
        </div>

        {/* Mobile right */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-border-default
                       text-text-muted hover:text-text-primary transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-px bg-text-primary transition-transform ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`w-5 h-px bg-text-primary transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-px bg-text-primary transition-transform ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-border-default overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((key) => (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  {t(key)}
                </a>
              ))}
              <div className="pt-4 flex items-center justify-between border-t border-border-default">
                <LocaleSwitcher />
                <a
                  href="#waitlist"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium px-4 py-2 border border-accent/50 text-accent rounded-md"
                >
                  {t("joinWaitlist")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
