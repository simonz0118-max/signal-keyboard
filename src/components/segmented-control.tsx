"use client";

import { motion } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function SegmentedControl({
  name,
  options,
  value,
  onChange,
}: SegmentedControlProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
        {name}
      </span>
      <div className="liquid-glass flex rounded-full p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative flex-1 rounded-full px-4 py-2 text-sm transition-colors ${
              value === option.value
                ? "text-black"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {value === option.value && (
              <motion.div
                layoutId={`seg-bg-${name}`}
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
