"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface BadgeProps {
  icon: LucideIcon;
  text: string;
  delay?: number;
}

export function Badge({ icon: Icon, text, delay = 0 }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="inline-flex items-center gap-2 bg-dark-lighter/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-dark-border"
    >
      <Icon className="w-4 h-4 text-forest" />
      <span className="text-sm font-medium text-charcoal">{text}</span>
    </motion.div>
  );
}
