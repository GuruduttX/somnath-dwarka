"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Users, Flame, ArrowRight, Check, Sparkles } from "lucide-react";

export interface FestivalItem {
  slug: string;
  festival: string;
  h1: string;
  answer_first: string;
  event_venue: string;
  image: string;
  deity: string;
  city: string;
  season: string;
  crowd: string;
  highlights: string[];
}

const FALLBACK = "/images/festivals/hero.jpg";

function crowdCls(crowd: string) {
  const c = crowd.toLowerCase();
  if (c.includes("very")) return "bg-rose-500/95";
  if (c.includes("high")) return "bg-orange-500/95";
  return "bg-emerald-500/95";
}

export function FestivalCards({ festivals }: { festivals: FestivalItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {festivals.map((f, idx) => (
        <motion.article
          key={f.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: (idx % 3) * 0.06 }}
          viewport={{ once: true }}
          className="group flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_24px_55px_rgba(234,88,12,0.15)]"
        >
          {/* Image */}
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={f.image || FALLBACK}
              alt={`${f.festival} at ${f.city}`}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/25 to-transparent mix-blend-multiply" />

            {/* season badge */}
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-orange-700 shadow-sm backdrop-blur-sm">
              <CalendarDays size={11} />
              {f.season}
            </span>

            {/* crowd badge */}
            <span className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full ${crowdCls(f.crowd)} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm`}>
              <Users size={11} />
              {f.crowd} crowd
            </span>

            {/* title */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-xl font-black leading-tight text-white drop-shadow-sm">{f.festival}</h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] font-medium text-orange-100">
                <MapPin size={12} />
                {f.event_venue}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-5">
            {/* deity */}
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-700">
              <Flame size={12} />
              {f.deity}
            </span>

            <p className="mt-3 line-clamp-3 text-[12.5px] leading-relaxed text-[#6b4c38]">{f.answer_first}</p>

            {/* highlights */}
            {f.highlights?.length > 0 && (
              <ul className="mt-4 grid grid-cols-1 gap-1.5 border-t border-orange-50 pt-3 sm:grid-cols-2">
                {f.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-center gap-1.5 text-[11.5px] text-[#6b4c38]">
                    <Check size={12} className="shrink-0 text-orange-500" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <Link
              href={`/festivals/${f.slug}/`}
              className="mt-5 inline-flex items-center justify-between gap-2 rounded-xl border border-orange-100 bg-orange-50/40 px-4 py-2.5 text-[13px] font-bold text-orange-700 transition hover:border-orange-300 hover:bg-orange-50"
            >
              Festival guide &amp; travel tips
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
