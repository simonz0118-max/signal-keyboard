import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Inter, Instrument_Serif, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import ThemeProvider from "@/components/theme-provider";
import CartProvider from "@/lib/cart-context";
import "../globals.css";

const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const notoSansJP = Noto_Sans_JP({ variable: "--font-ja", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const notoSansKR = Noto_Sans_KR({ variable: "--font-ko", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });

const localeFonts: Record<string, { heading: string; body: string }> = {
  en: { heading: "var(--font-instrument-serif)", body: "var(--font-inter)" },
  fr: { heading: "var(--font-instrument-serif)", body: "var(--font-inter)" },
  zh: { heading: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", var(--font-inter)', body: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", var(--font-inter)' },
  ja: { heading: "var(--font-ja)", body: "var(--font-ja)" },
  ko: { heading: "var(--font-ko)", body: "var(--font-ko)" },
};

export const dynamic = "force-static";
export const metadata: Metadata = {
  metadataBase: new URL("https://signal.neovora.co"),
  title: "Asme — Build a no-code AI app in minutes",
  description: "A fullscreen AI app creation workspace for designing, testing, and shipping no-code workflows quickly.",
  keywords: ["AI app builder", "no-code AI", "workflow builder", "AI workspace", "early access"],
  icons: { icon: "/images/og-image-real.jpg" },
  openGraph: {
    title: "Asme — Build a no-code AI app in minutes",
    description: "Think, create, and ship AI-powered workflows from one dark fullscreen workspace.",
    type: "website",
    images: [{ url: "/images/og-image-real.jpg", width: 1200, height: 630 }],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // Explicitly set request locale for static export
  const { setRequestLocale } = await import("next-intl/server");
  setRequestLocale(locale);
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
      <body className={`${geistMono.variable} ${playfair.variable} ${inter.variable} ${instrumentSerif.variable} ${notoSansJP.variable} ${notoSansKR.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider><CartProvider>{children}</CartProvider></ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
