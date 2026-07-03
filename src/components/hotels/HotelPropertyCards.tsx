"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star, MapPin, Wifi, Wind, Utensils, Waves, Car, ShieldCheck, Coffee,
  Sparkles, MessageSquare, BedDouble, Wallet, Building2, Crown, Check,
} from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";

interface Property {
  id: string;
  name: string;
  image: string;
  tier: string;
  area: string;
  price_range: string;
  rating: number;
  reviews?: number;
  distance: string;
  amenities: string[];
  tags?: string[];
  description: string;
}

// amenity label → icon
function amenityIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("wi-fi") || l.includes("wifi")) return Wifi;
  if (l.includes("ac") || l.includes("air")) return Wind;
  if (l.includes("breakfast") || l.includes("coffee")) return Coffee;
  if (l.includes("restaurant") || l.includes("veg") || l.includes("food")) return Utensils;
  if (l.includes("sea") || l.includes("pool") || l.includes("view")) return Waves;
  if (l.includes("parking")) return Car;
  return ShieldCheck;
}

function tierMeta(tier: string) {
  const t = tier.toLowerCase();
  if (t.includes("budget")) return { Icon: Wallet, cls: "bg-emerald-500/90" };
  if (t.includes("premium") || t.includes("luxury")) return { Icon: Crown, cls: "bg-orange-500/95" };
  return { Icon: Building2, cls: "bg-amber-500/95" };
}

export function HotelPropertyCards({ properties, city }: { properties: Property[]; city: string }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  const tiers = useMemo(() => {
    const order = ["Budget", "Mid-range", "Premium"];
    const present = Array.from(new Set(properties.map((p) => p.tier)));
    return ["All", ...order.filter((t) => present.includes(t))];
  }, [properties]);

  const visible = filter === "All" ? properties : properties.filter((p) => p.tier === filter);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Hotel Booking" />

      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {tiers.map((t) => {
          const active = filter === t;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-[linear-gradient(135deg,#EA580C,#FB923C)] text-white shadow-[0_8px_20px_rgba(234,88,12,0.30)]"
                  : "border border-orange-200 bg-white text-[#6b4c38] hover:border-orange-400 hover:text-orange-700"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, idx) => {
          const { Icon: TierIcon, cls } = tierMeta(p.tier);
          return (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.06 }}
              viewport={{ once: true }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_24px_55px_rgba(234,88,12,0.15)]"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                {/* Tier badge */}
                <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full ${cls} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm`}>
                  <TierIcon size={11} />
                  {p.tier}
                </span>

                {/* Rating */}
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/40 bg-white/90 px-2 py-1 text-[11px] font-bold text-[#3a2416] shadow-sm backdrop-blur-sm">
                  <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
                  {p.rating.toFixed(1)}
                  {p.reviews ? <span className="font-medium text-[#9a7358]">({p.reviews})</span> : null}
                </span>

                {/* Price + distance overlaid */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[10.5px] font-semibold text-white backdrop-blur-sm">
                    <MapPin size={11} className="text-orange-300" />
                    {p.distance}
                  </span>
                  <span className="rounded-lg bg-white/95 px-2.5 py-1 text-right text-[12px] font-black text-orange-700 shadow-sm">
                    {p.price_range}
                    <span className="block text-[8.5px] font-semibold uppercase tracking-wide text-[#9a7358]">per night</span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-black leading-tight text-[#3a2416]">{p.name}</h3>
                <p className="mt-0.5 text-[12px] font-medium text-[#9a7358]">{p.area}</p>

                <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#6b4c38]">{p.description}</p>

                {/* Tags */}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-0.5 text-[10.5px] font-semibold text-orange-700">
                        <Check size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Amenities */}
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 border-t border-orange-50 pt-3">
                  {p.amenities.slice(0, 5).map((a) => {
                    const AIcon = amenityIcon(a);
                    return (
                      <span key={a} className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6b4c38]">
                        <AIcon size={13} className="text-orange-500" />
                        {a}
                      </span>
                    );
                  })}
                </div>

                {/* CTAs */}
                <div className="mt-5 flex gap-2 pt-1">
                  <button
                    onClick={() => setOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(135deg,#EA580C,#FB923C)] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:opacity-95 active:translate-y-px cursor-pointer"
                  >
                    <BedDouble size={14} />
                    Enquire &amp; Book
                  </button>
                  <a
                    href={waLink(`Hi, I'm interested in ${p.name} (${p.tier}) in ${city}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp about ${p.name}`}
                    className="inline-flex items-center justify-center rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-orange-700 transition hover:border-orange-400 hover:bg-orange-50 active:translate-y-px"
                  >
                    <MessageSquare size={15} />
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* honesty note */}
      <p className="mt-8 flex items-center justify-center gap-2 text-center text-[12.5px] text-[#9a7358]">
        <Sparkles size={14} className="text-orange-400" />
        Sample stays for guidance. Prices are indicative and confirmed when we quote a real hotel for your dates.
      </p>
    </>
  );
}
