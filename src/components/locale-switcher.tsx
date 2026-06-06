"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex gap-0.5 bg-bg-surface border border-border-default rounded-md p-0.5">
      {Object.entries(localeLabels).map(([code, label]) => (
        <button
          key={code}
          onClick={() => switchTo(code)}
          className={`px-1.5 py-1 text-[11px] rounded font-medium transition-colors leading-none ${
            code === locale
              ? "bg-accent/15 text-accent"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
