"use client";

import { motion } from "framer-motion";

/**
 * Lightweight scroll-reveal wrapper used across the destination pillar
 * sections. Content is server-rendered inside (crawlable); framer-motion only
 * animates it into view. Respects prefers-reduced-motion via framer defaults.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.7, 0, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
