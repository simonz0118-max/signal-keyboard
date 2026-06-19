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
      className="liquid-glass group relative rounded-[28px] p-4 transition-all duration-300 hover:bg-white/[0.025]"
    >
      <Link href={`/products/${productId}`} className="block">
        {/* Product image */}
        <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[22px] bg-white/[0.03]">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80" />
        </div>

        {/* Model badge + price */}
        <div className="flex items-center justify-between mb-3 min-w-0 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
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
                className="flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
              </div>
            ))}
          </div>
          <span className="text-xs text-text-secondary truncate">
            {specs[0]} {switchCount}
          </span>
        </div>

        {/* Learn more */}
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors group-hover:text-white">
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
