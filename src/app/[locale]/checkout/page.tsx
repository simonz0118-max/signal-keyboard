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
      <main className="min-h-screen pt-24 section-padding">
        <div className="max-w-[500px] mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-accent bg-accent/10 flex items-center justify-center mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">Order confirmed</h1>
          <p className="text-sm text-text-secondary mb-2">We\'ll email you with tracking once your keyboard ships.</p>
          <p className="text-xs text-text-muted mb-8">Order total: ${total}</p>
          <Link href="/" className="text-sm text-accent hover:underline underline-offset-4">
            \u2190 Back to store
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 section-padding">
        <div className="max-w-[500px] mx-auto text-center">
          <p className="text-text-muted mb-6">Nothing to check out.</p>
          <Link href="/" className="text-sm text-accent hover:underline underline-offset-4">\u2190 Browse keyboards</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 section-padding">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Shipping</h2>
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="First name" className="col-span-2 sm:col-span-1 px-4 py-3 text-sm bg-bg-primary border border-border-default rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-accent transition-colors" />
              <input required placeholder="Last name" className="col-span-2 sm:col-span-1 px-4 py-3 text-sm bg-bg-primary border border-border-default rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-accent transition-colors" />
            </div>
            <input required type="email" placeholder="Email" className="px-4 py-3 text-sm bg-bg-primary border border-border-default rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-accent transition-colors" />
            <input required placeholder="Address" className="px-4 py-3 text-sm bg-bg-primary border border-border-default rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-accent transition-colors" />
            <div className="grid grid-cols-3 gap-4">
              <input required placeholder="City" className="px-4 py-3 text-sm bg-bg-primary border border-border-default rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-accent transition-colors" />
              <input required placeholder="State" className="px-4 py-3 text-sm bg-bg-primary border border-border-default rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-accent transition-colors" />
              <input required placeholder="ZIP" className="px-4 py-3 text-sm bg-bg-primary border border-border-default rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-accent transition-colors" />
            </div>
            <button type="submit" className="mt-4 w-full py-3.5 text-sm font-semibold bg-accent text-bg-primary rounded-md hover:shadow-[0_0_24px_var(--accent-glow)] transition-all">
              Place order \u2014 ${total}
            </button>
          </motion.form>

          <div className="p-6 bg-bg-surface border border-border-default rounded-lg h-fit">
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Order summary</h2>
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
            <div className="border-t border-border-default mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-text-secondary"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-accent">Free</span> : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-text-primary pt-2 border-t border-border-default">
                <span>Total</span><span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
