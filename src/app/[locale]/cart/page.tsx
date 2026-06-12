"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import { products, switchOptions, caseOptions, keycapOptions } from "@/lib/products-data";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CartPage() {
  const t = useTranslations();
  const { items, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce((sum, item) => {
    const p = products.find((x) => x.id === item.productId);
    const s = switchOptions.find((x) => x.id === item.switchId);
    const c = caseOptions.find((x) => x.id === item.caseId);
    const k = keycapOptions.find((x) => x.id === item.keycapId);
    return sum + ((p?.price ?? 0) + (s?.price ?? 0) + (c?.price ?? 0) + (k?.price ?? 0)) * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 section-padding">
        <div className="max-w-[500px] mx-auto text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-6">{t("cart.title")}</h1>
          <p className="text-text-muted mb-6">{t("cart.empty")}</p>
          <Link href="/" className="text-sm text-accent hover:underline underline-offset-4">
            {t("cart.browse")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 section-padding">
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{t("cart.title")}</h1>
            <p className="text-sm text-text-muted mt-1">{t("cart.itemCount", { count: items.length })}</p>
          </div>
          <Link href="/" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
            {t("cart.continueShopping")}
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            const itemPrice = product.price +
              (switchOptions.find((s) => s.id === item.switchId)?.price ?? 0) +
              (caseOptions.find((c) => c.id === item.caseId)?.price ?? 0) +
              (keycapOptions.find((k) => k.id === item.keycapId)?.price ?? 0);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 bg-bg-surface border border-border-default rounded-lg"
              >
                <div className="relative w-20 h-20 bg-bg-primary rounded-md border border-border-default overflow-hidden shrink-0">
                  <Image
                    src={product.image}
                    alt={t(`products.${product.nameKey}.name` as never)}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary truncate">
                    {t(`products.${product.nameKey}.name` as never)}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {t(switchOptions.find((s) => s.id === item.switchId)?.nameKey as never)} ·{" "}
                    {t(caseOptions.find((c) => c.id === item.caseId)?.nameKey as never)} ·{" "}
                    {t(keycapOptions.find((k) => k.id === item.keycapId)?.nameKey as never)}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(i, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded border border-border-default text-xs text-text-muted hover:text-text-primary transition-colors"
                      >−</button>
                      <span className="text-sm text-text-primary w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(i, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded border border-border-default text-xs text-text-muted hover:text-text-primary transition-colors"
                      >+</button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-text-primary">${itemPrice * item.quantity}</span>
                      <button
                        onClick={() => removeItem(i)}
                        className="text-xs text-text-muted hover:text-red-400 transition-colors"
                      >{t("cart.remove")}</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-bg-surface border border-border-default rounded-lg">
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>{t("cart.subtotal")}</span><span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-text-secondary mb-4">
            <span>{t("cart.shipping")}</span><span className="text-text-muted">{t("cart.shippingCalculated")}</span>
          </div>
          <div className="border-t border-border-default pt-4 flex justify-between text-lg font-semibold text-text-primary">
            <span>{t("cart.total")}</span><span>${subtotal}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full text-center py-3 text-sm font-semibold bg-accent text-bg-primary rounded-md hover:shadow-[0_0_24px_var(--accent-glow)] transition-all"
          >
            {t("cart.checkout")}
          </Link>
        </div>
      </div>
    </main>
  );
}
