"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { products, switchOptions, caseOptions, keycapOptions } from "@/lib/products-data";
import { useCart } from "@/lib/cart-context";
import SegmentedControl from "@/components/segmented-control";

export default function ProductDetailClient() {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === id?.toLowerCase());
  const [switchId, setSwitchId] = useState("linear");
  const [caseId, setCaseId] = useState("aluminum");
  const [keycapId, setKeycapId] = useState("cherry");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">Product not found.</p>
      </div>
    );
  }

  const switchPrice = switchOptions.find((s) => s.id === switchId)?.price ?? 0;
  const casePrice = caseOptions.find((c) => c.id === caseId)?.price ?? 0;
  const keycapPrice = keycapOptions.find((k) => k.id === keycapId)?.price ?? 0;
  const total = product.price + switchPrice + casePrice + keycapPrice;

  function handleAdd() {
    addItem({ productId: product!.id, switchId, caseId, keycapId });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <main className="min-h-screen pt-24 section-padding">
      <div className="max-w-[1100px] mx-auto">
        <Link href="/" className="text-xs text-text-muted hover:text-text-secondary transition-colors mb-8 inline-block">
          ← {t("nav.products")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square bg-bg-surface border border-border-default rounded-xl overflow-hidden"
          >
            <Image
              src={product.image}
              alt={t(`products.${product.nameKey}.name` as never)}
              fill
              className="object-contain p-8"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">
                {t(`products.${product.nameKey}.format` as never)}
              </p>
              <h1 className="text-3xl font-bold text-text-primary">
                {t(`products.${product.nameKey}.name` as never)}
              </h1>
              <p className="text-2xl font-semibold text-text-primary mt-3">${total}</p>
              {total !== product.price && (
                <p className="text-xs text-text-muted mt-1">Base: ${product.price} + options</p>
              )}
            </div>

            {/* Product description */}
            <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
              {t(`products.${product.nameKey}.description` as never)}
            </p>

            <SegmentedControl
              name={t("customize.switchType")}
              options={switchOptions.map((s) => ({ value: s.id, label: t(s.nameKey as never) }))}
              value={switchId}
              onChange={setSwitchId}
            />
            <SegmentedControl
              name={t("customize.caseType")}
              options={caseOptions.map((c) => ({ value: c.id, label: t(c.nameKey as never) }))}
              value={caseId}
              onChange={setCaseId}
            />
            <SegmentedControl
              name={t("customize.keycapType")}
              options={keycapOptions.map((k) => ({ value: k.id, label: t(k.nameKey as never) }))}
              value={keycapId}
              onChange={setKeycapId}
            />

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 text-sm font-semibold rounded-md border transition-all duration-300 ${
                added
                  ? "bg-accent/20 border-accent text-accent"
                  : "bg-accent text-bg-primary border-accent hover:shadow-[0_0_24px_var(--accent-glow)]"
              }`}
            >
              {added ? "✓ Added" : `Add to cart — $${total}`}
            </button>
            <Link href="/cart" className="text-xs text-text-muted hover:text-accent transition-colors text-center">
              View cart →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
