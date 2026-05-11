"use client";
import { useEffect, useRef } from "react";

const stats = [
  { icon: "🛕", target: 500,  suffix: "+",  label: "Sacred Temples",   decimal: false },
  { icon: "🙏", target: 10000, suffix: "+", label: "Devotees Served",  decimal: false },
  { icon: "📿", target: 100,  suffix: "+",  label: "Pooja Rituals",    decimal: false },
  { icon: "⭐", target: 4.9,  suffix: "★",  label: "Average Rating",   decimal: true  },
];

function CountUp({ target, decimal }: { target: number; decimal: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = target * ease;
      el.textContent = decimal ? val.toFixed(1) : Math.round(val).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else {
        el.textContent = decimal
          ? target.toFixed(1)
          : target >= 1000
          ? `${(target / 1000).toFixed(0)}K`
          : `${target}`;
      }
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 300);
    return () => clearTimeout(t);
  }, [target, decimal]);

  return <span ref={ref}>{decimal ? "0.0" : "0"}</span>;
}

export default function StatsStrip() {
  return (
    <section className="absolute left-1/2 -translate-x-1/2 max-w-6xl w-full 
bg-gradient-to-r from-[#FB8C00]/90 via-[#FFA726]/90 to-[#FFD54F]/90 
backdrop-blur-md rounded-2xl px-6 py-3 -mt-20 z-35 hidden md:block 
shadow-[0_10px_40px_rgba(255,140,0,0.35)]">

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {stats.map((s) => (
      <div
        key={s.label}
        className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-5 text-center 
        border border-white/20 hover:bg-white/15 transition duration-300"
      >
        <div className="text-3xl font-bold text-white leading-none">
          <CountUp target={s.target} decimal={s.decimal} />
          <span className="text-[#e2e2e2]">{s.suffix}</span>
        </div>

        <p className="text-[10px] text-[#FFF3E0] mt-2 tracking-widest uppercase font-medium">
          {s.label}
        </p>
      </div>
    ))}
  </div>
</section>
  );
}