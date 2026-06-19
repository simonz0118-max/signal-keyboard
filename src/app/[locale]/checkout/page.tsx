"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import { products, switchOptions, caseOptions, keycapOptions } from "@/lib/products-data";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const t = useTranslations();
  const { items, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const p = products.find((x) => x.id === item.productId);
    const s = switchOptions.find((x) => x.id === item.switchId);
    const c = caseOptions.find((x) => x.id === item.caseId);
    const k = keycapOptions.find((x) => x.id === item.keycapId);
    return sum + ((p?.price ?? 0) + (s?.price ?? 0) + (c?.price ?? 0) + (k?.price ?? 0)) * item.quantity;
  }, 0);
  const shipping = subtotal > 300 ? 0 : 25;
  const total = subtotal + shipping;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <main className="page-shell min-h-screen pt-24 section-padding">
        <div className="max-w-[500px] mx-auto text-center">
          <div className="liquid-glass mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">{t("checkout.confirmedTitle")}</h1>
          <p className="text-sm text-text-secondary mb-2">{t("checkout.confirmedMessage")}</p>
          <p className="text-xs text-text-muted mb-8">{t("checkout.orderTotal", { total })}</p>
          <Link href="/" className="text-sm text-white hover:underline underline-offset-4">
            {t("checkout.backToStore")}
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="page-shell min-h-screen pt-24 section-padding">
        <div className="max-w-[500px] mx-auto text-center">
          <p className="text-text-muted mb-6">{t("checkout.empty")}</p>
          <Link href="/" className="text-sm text-white hover:underline underline-offset-4">{t("checkout.browse")}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell min-h-screen pt-24 section-padding">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-10">{t("checkout.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">{t("checkout.shipping")}</h2>
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder={t("checkout.firstName")} className="col-span-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/35 sm:col-span-1" />
              <input required placeholder={t("checkout.lastName")} className="col-span-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/35 sm:col-span-1" />
            </div>
            <input required type="email" placeholder={t("checkout.email")} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/35" />
            <input required placeholder={t("checkout.address")} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/35" />
            <div className="grid grid-cols-3 gap-4">
              <input required placeholder={t("checkout.city")} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/35" />
              <input required placeholder={t("checkout.state")} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/35" />
              <input required placeholder={t("checkout.zip")} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/35" />
            </div>
            <button type="submit" className="mt-4 w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/90">
              {t("checkout.placeOrder", { total })}
            </button>
          </motion.form>

          <div className="liquid-glass h-fit rounded-[28px] p-6">
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">{t("checkout.orderSummary")}</h2>
            <div className="flex flex-col gap-3">
              {items.map((item, i) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                const itemPrice = product.price +
                  (switchOptions.find((s) => s.id === item.switchId)?.price ?? 0) +
                  (caseOptions.find((c) => c.id === item.caseId)?.price ?? 0) +
                  (keycapOptions.find((k) => k.id === item.keycapId)?.price ?? 0);
                return (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-text-secondary truncate max-w-[200px]">
                      {t(`products.${product.nameKey}.name` as never)} \u00d7 {item.quantity}
                    </span>
                    <span className="text-text-primary font-mono">${itemPrice * item.quantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
              <div className="flex justify-between text-sm text-text-secondary"><span>{t("cart.subtotal")}</span><span>${subtotal}</span></div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>{t("cart.shipping")}</span>
                <span>{shipping === 0 ? <span className="text-white">{t("checkout.free")}</span> : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-semibold text-text-primary">
                <span>{t("cart.total")}</span><span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
