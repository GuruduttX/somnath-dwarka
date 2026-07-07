"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix = "+", label, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const incrementTime = 16;
    const totalSteps = duration / incrementTime;
    const stepValue = value / totalSteps;

    const counter = setInterval(() => {
      start += stepValue;
      if (start >= value) {
        clearInterval(counter);
        setCount(value);
      } else {
        setCount(Math.ceil(start));
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="min-w-[240px] snap-start rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-amber-200 p-6 sm:p-8 text-center hover:shadow-amber-200/50 transition sm:min-w-0"
    >
      <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
        {count}
        {suffix}
      </h3>
      <p className="mt-3 text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-16 md:py-24 bg-amber-50 overflow-hidden">
      {/* Soft Decorative Blur */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Our Journey in Numbers
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="-mx-6 flex gap-4 overflow-x-auto overflow-y-hidden px-6 pb-2 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 sm:overflow-visible sm:pb-0 sm:gap-8 lg:grid-cols-4">
          <StatItem
            value={5000}
            label="Happy Travelers"
            delay={0}
          />
          <StatItem
            value={300}
            label="Hotels Connected"
            delay={0.1}
          />
          <StatItem
            value={100}
            label="Taxi Drivers"
            delay={0.2}
          />
          <StatItem
            value={1000}
            label="Pooja Arranged"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
