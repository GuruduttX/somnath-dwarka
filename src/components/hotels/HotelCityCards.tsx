"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Wallet, Building2, Crown, Star } from "lucide-react";

interface Tier {
  tier: string;
  area: string;
  typical_range?: string;
}

interface HotelCity {
  slug: string;
  city: string;
  near_temple: string;
  tiers?: Tier[];
}

const CITY_IMAGE: Record<string, string> = {
  Somnath: "/images/hotels/somnath.jpg",
  Dwarka: "/images/hotels/dwarka.jpg",
};

// Icon + accent per comfort tier.
function tierMeta(tier: string) {
  const t = tier.toLowerCase();
  if (t.includes("budget")) return { Icon: Wallet, cls: "text-emerald-600 bg-emerald-50 ring-emerald-100" };
  if (t.includes("premium") || t.includes("luxury")) return { Icon: Crown, cls: "text-orange-600 bg-orange-50 ring-orange-100" };
  return { Icon: Building2, cls: "text-amber-600 bg-amber-50 ring-amber-100" };
}

export function HotelCityCards({ hotels }: { hotels: HotelCity[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {hotels.map((h, idx) => (
        <motion.div
          key={h.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/hotels/${h.slug}/`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_24px_55px_rgba(234,88,12,0.16)]"
          >
            {/* Image banner */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={CITY_IMAGE[h.city] ?? "/images/hotels/hero.jpg"}
                alt={`Hotels in ${h.city} near ${h.near_temple}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent mix-blend-multiply" />

              {/* rating pill */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
                <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-[11px] font-bold text-[#3a2416]">Handpicked</span>
              </div>

              {/* title over image */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-2xl font-black text-white drop-shadow-sm">Hotels in {h.city}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-orange-100">
                  <MapPin size={13} />
                  Near {h.near_temple}
                </p>
              </div>
            </div>

            {/* Tier details */}
            <div className="flex flex-1 flex-col p-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a7358]">Choose your comfort tier</span>

              <div className="mt-3 space-y-2.5">
                {(h.tiers ?? []).map(({ tier, area }) => {
                  const { Icon, cls } = tierMeta(tier);
                  return (
                    <div key={tier} className="flex items-center gap-3 rounded-2xl border border-orange-50 bg-orange-50/30 p-2.5">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${cls}`}>
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 leading-tight">
                        <p className="text-[13px] font-bold text-[#3a2416]">{tier}</p>
                        <p className="truncate text-[11.5px] text-[#6b4c38]">{area}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA row */}
              <div className="mt-5 flex items-center justify-between border-t border-orange-50 pt-4">
                <span className="text-[13px] font-bold text-orange-700 transition-colors group-hover:text-[#E87722]">
                  Explore stays in {h.city}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
