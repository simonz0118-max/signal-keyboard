"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-16 md:mb-24"
    >
      <h2
        className="text-[clamp(30px,5vw,54px)] font-medium leading-[1.04] tracking-[-0.01em] text-text-primary"
        style={{ fontFamily: "var(--font-instrument-serif), serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] text-text-secondary max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
