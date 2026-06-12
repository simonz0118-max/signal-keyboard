"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface ProductCardProps {
  productId: string;
  name: string;
  format: string;
  specs: string[];
  switchCount: string;
  learnMore: string;
  delay: number;
  imageSrc: string;
  price: number;
}

export default function ProductCard({
  productId,
  name,
  format,
  specs,
  switchCount,
  learnMore,
  delay,
  imageSrc,
  price,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ borderColor: "rgba(0, 255, 65, 0.5)" }}
      className="group relative bg-bg-surface border border-border-default rounded-lg p-5
                 transition-all duration-300
                 hover:shadow-[0_0_32px_var(--accent-glow)]"
    >
      <Link href={`/products/${productId}`} className="block">
        {/* Product image */}
        <div className="relative aspect-[4/3] bg-bg-primary rounded-md border border-border-default mb-5 overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-70" />
        </div>

        {/* Model badge + price */}
        <div className="flex items-center justify-between mb-3 min-w-0 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 bg-accent rounded-full opacity-60 shrink-0" />
            <span className="text-xs font-medium text-text-muted uppercase tracking-widest truncate">
              {format}
            </span>
          </div>
          <span className="text-sm font-semibold text-text-primary shrink-0">
            ${price}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-text-primary mb-3 truncate">
          {name}
        </h3>

        {/* Specs — wraps on overflow */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
          {specs.map((spec, i) => (
            <span key={i} className="font-mono text-xs text-text-muted whitespace-nowrap">
              {spec}
            </span>
          ))}
        </div>

        {/* Switch count */}
        <div className="flex items-center gap-2 mb-5 min-w-0">
          <div className="flex -space-x-1 shrink-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-bg-surface bg-bg-primary flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              </div>
            ))}
          </div>
          <span className="text-xs text-text-secondary truncate">
            {specs[0]} {switchCount}
          </span>
        </div>

        {/* Learn more */}
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent/70 group-hover:text-accent transition-colors">
          {learnMore}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1 5h8M5 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
