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
      <div className="flex bg-bg-primary border border-border-default rounded-md p-0.5">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative flex-1 px-4 py-2 text-sm rounded-sm transition-colors ${
              value === option.value
                ? "text-accent"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {value === option.value && (
              <motion.div
                layoutId={`seg-bg-${name}`}
                className="absolute inset-0.5 bg-accent/10 border border-accent/30 rounded-sm"
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
