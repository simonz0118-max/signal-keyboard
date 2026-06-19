"use client";

import { useLocale } from "next-intl";
import { localeLabels } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();

  function switchTo(nextLocale: string) {
    // Static export: navigate by URL
    window.location.assign("/" + nextLocale + "/");
  }

  return (
    <div className="glass-pill flex gap-0.5 p-0.5">
      {Object.entries(localeLabels).map(([code, label]) => (
        <button
          key={code}
          onClick={() => switchTo(code)}
          className={`rounded-full px-1.5 py-1 text-[11px] font-medium leading-none transition-colors ${
            code === locale
              ? "bg-white text-black"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
