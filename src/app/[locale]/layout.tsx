import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Inter, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import ThemeProvider from "@/components/theme-provider";
import CartProvider from "@/lib/cart-context";
import "../globals.css";

const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const inter = Inter({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const notoSansJP = Noto_Sans_JP({ variable: "--font-ja", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const notoSansKR = Noto_Sans_KR({ variable: "--font-ko", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });

const localeFonts: Record<string, { heading: string; body: string }> = {
  en: { heading: "var(--font-display)", body: "var(--font-sans)" },
  fr: { heading: "var(--font-display)", body: "var(--font-sans)" },
  zh: { heading: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", var(--font-sans)', body: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", var(--font-sans)' },
  ja: { heading: "var(--font-ja)", body: "var(--font-ja)" },
  ko: { heading: "var(--font-ko)", body: "var(--font-ko)" },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://neovora.com"),
  title: "SIGNAL — Precision Reimagined",
  description: "Magnetic-switch keyboards engineered for the 0.1mm difference. Analog input. Instant response. No compromises.",
  keywords: ["keyboard", "magnetic switch", "analog", "hall effect", "gaming keyboard", "custom keyboard", "clavier", "magnétique"],
  icons: { icon: "/images/og-image.png" },
  openGraph: { title: "SIGNAL — Precision Reimagined", description: "Magnetic-switch keyboards engineered for the 0.1mm difference.", type: "website", images: [{ url: "/images/og-image.png", width: 1200, height: 630 }] },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  const fonts = localeFonts[locale] ?? localeFonts.en;
  return (
    <html lang={locale} data-theme="dark" data-scroll-behavior="smooth">
      <head><style>{`
        html[lang="zh"] body { font-family: ${fonts.body}; }
        html[lang="zh"] h1, html[lang="zh"] h2, html[lang="zh"] h3 { font-family: ${fonts.heading}; font-weight: 600; }
        html[lang="en"] h1, html[lang="en"] h2, html[lang="en"] h3 { font-family: ${fonts.heading}; font-weight: 600; letter-spacing: -0.01em; }
        html[lang="fr"] h1, html[lang="fr"] h2, html[lang="fr"] h3 { font-family: ${fonts.heading}; font-weight: 600; letter-spacing: -0.01em; }
        html[lang="ja"] h1, html[lang="ja"] h2, html[lang="ja"] h3 { font-family: ${fonts.heading}; font-weight: 600; }
        html[lang="ko"] h1, html[lang="ko"] h2, html[lang="ko"] h3 { font-family: ${fonts.heading}; font-weight: 600; }
      `}</style></head>
      <body className={`${geistMono.variable} ${playfair.variable} ${inter.variable} ${notoSansJP.variable} ${notoSansKR.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider><CartProvider>{children}</CartProvider></ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
