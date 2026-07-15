import { Sparkles } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Section frame for destination pillars: eyebrow + h2 so heading order stays
 * h1 → h2 → h3. Shared by DestinationPillar (Somnath, Dwarka) and GirPillar so
 * the pillars read as one family rather than two designs.
 */
export default function DPSection({
  id,
  eyebrow,
  title,
  children,
  wide = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${wide ? "max-w-[88rem]" : "max-w-7xl"} mx-auto scroll-mt-24 px-4 py-8 sm:px-6 lg:px-10 xl:px-12`}
      aria-labelledby={`${id}-h`}
    >
      <Reveal className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-800">
          <Sparkles size={11} className="text-orange-500" />
          {eyebrow}
        </span>
        <h2
          id={`${id}-h`}
          className="mt-3.5 flex items-center gap-3 text-2.5xl font-black tracking-tight text-[#2D1B10] sm:text-3xl"
        >
          <span className="h-6 w-1 rounded-full bg-gradient-to-b from-orange-600 to-amber-500 animate-pulse" />
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
