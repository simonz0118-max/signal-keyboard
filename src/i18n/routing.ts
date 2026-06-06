import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh", "ja", "ko", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export const localeLabels: Record<string, string> = {
  en: "EN",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  fr: "FR",
};
