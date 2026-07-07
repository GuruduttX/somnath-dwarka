"use client";

import { useState } from "react";
import { MessageSquare, ShieldCheck, UserCheck, CreditCard, Sparkles, Navigation, CheckCircle2, AlertCircle, Clock, Star } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";

// Helper type for crumbs
interface Crumb {
  name: string;
  path: string;
}

// Props definition
interface TaxiHeroProps {
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  badge?: string;
  ctaContext: string;
  // Metadata fields
  distance?: string;
  duration?: string;
  vehicleName?: string;
  seats?: number;
  airportName?: string;
  serves?: string;
  verified?: boolean;
}

const TRUST = [
  { icon: ShieldCheck, label: "Experienced Drivers", sub: "Verified & background-checked" },
  { icon: UserCheck, label: "24/7 Support", sub: "Assistance on every trip" },
  { icon: CreditCard, label: "Fixed Transparent Fares", sub: "No hidden surprises" },
];

export default function TaxiHero({
  title,
  description,
  breadcrumbs,
  badge = "Taxi Service",
  ctaContext,
  distance,
  duration,
  vehicleName,
  seats,
  airportName,
  serves,
  verified = false,
}: TaxiHeroProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasStats = distance || duration || vehicleName || seats || airportName || serves;

  return (
    <>
      <CommonEnquiryForm open={isOpen} onClose={() => setIsOpen(false)} defaultService={ctaContext} />

      <style>{`
        @keyframes taxiUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        .taxi-up { opacity:0; animation: taxiUp .75s cubic-bezier(.22,.7,0,1) forwards; }
        .t-d0{animation-delay:.05s}.t-d1{animation-delay:.14s}.t-d2{animation-delay:.24s}
        .t-d3{animation-delay:.34s}.t-d4{animation-delay:.46s}.t-d5{animation-delay:.58s}

        @keyframes driveTaxi {
          0% { offset-distance: 0%; opacity: 0; }
          5% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .taxi-anim {
          offset-path: path('M 55,235 C 130,290 230,285 320,205 S 470,80 545,110');
          offset-rotate: auto;
          animation: driveTaxi 8.5s infinite cubic-bezier(0.45, 0, 0.25, 1);
        }
        @keyframes dashFlow { to { stroke-dashoffset: -100; } }
        .road-flow { animation: dashFlow 3.5s linear infinite; }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.7); opacity: 0.55; }
        }
        .glow-dot { animation: pulseGlow 2.6s infinite ease-in-out; transform-origin: center; transform-box: fill-box; }
        @keyframes floatBadge { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .float-badge-1 { animation: floatBadge 5s ease-in-out infinite; }
        .float-badge-2 { animation: floatBadge 6s ease-in-out infinite; animation-delay: -2s; }

        @media (prefers-reduced-motion: reduce) {
          .taxi-up,.taxi-anim,.road-flow,.glow-dot,.float-badge-1,.float-badge-2 {
            animation: none !important; opacity: 1 !important;
          }
        }
      `}</style>

      <section id="taxi-hero" className="font-dm relative -mt-28 flex w-full flex-col overflow-hidden">

        {/* ── LIGHT WARM BACKGROUND (Matches Tours Page) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFEFE0_45%,#FFF6EC_100%)]" />
          <div className="absolute left-1/2 top-[14%] h-[60%] w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.26)_0%,transparent_62%)]" />
          <div className="absolute -left-[6%] bottom-[4%] h-[46%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.20)_0%,transparent_64%)]" />
          <div className="absolute -right-[6%] top-[18%] h-[46%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.12)_0%,transparent_64%)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)", backgroundSize: "26px 26px" }}
          />
        </div>

        {/* ── HERO INNER ── */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-5 pt-36 pb-9 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-14 lg:pt-[8.5rem] lg:pb-[3.25rem] xl:px-20">

          {/* ══ LEFT — Copy & booking ══ */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <div className="taxi-up t-d0 inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-800 shadow-sm backdrop-blur-sm">
              <Sparkles size={12} className="text-orange-500" />
              {badge}
            </div>

            {/* Title */}
            <h1 className="taxi-up t-d1 mt-4 text-4xl font-black leading-[1.1] tracking-[-0.02em] text-[#3a2416] sm:text-5xl lg:text-[3.15rem]">
              {title}
            </h1>

            {/* Description */}
            <p className="taxi-up t-d2 mt-4 max-w-xl text-[15px] leading-[1.7] text-[#6b4c38]">
              {description}
            </p>

            {/* Dynamic stats */}
            {hasStats && (
              <div className="taxi-up t-d3 mt-6 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl border border-orange-100 bg-orange-100/60 shadow-[0_10px_30px_rgba(234,88,12,0.08)]">
                {distance && (
                  <div className="flex flex-col gap-0.5 bg-white/85 p-3.5 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a7358]">Total Distance</span>
                    <span className="text-lg font-black text-[#3a2416]">{distance}</span>
                  </div>
                )}
                {duration && (
                  <div className="flex flex-col gap-0.5 bg-white/85 p-3.5 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a7358]">Drive Time</span>
                    <span className="text-lg font-black text-[#E87722]">{duration}</span>
                  </div>
                )}
                {vehicleName && (
                  <div className="flex flex-col gap-0.5 bg-white/85 p-3.5 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a7358]">Vehicle Type</span>
                    <span className="text-lg font-black text-[#3a2416]">{vehicleName}</span>
                  </div>
                )}
                {seats && (
                  <div className="flex flex-col gap-0.5 bg-white/85 p-3.5 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a7358]">Passenger Seats</span>
                    <span className="text-lg font-black text-[#E87722]">{seats} Seats Max</span>
                  </div>
                )}
                {airportName && (
                  <div className="col-span-2 flex flex-col gap-0.5 bg-white/85 p-3.5 backdrop-blur-sm sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a7358]">Airport</span>
                    <span className="truncate text-lg font-black text-[#3a2416]">{airportName}</span>
                  </div>
                )}
                {serves && (
                  <div className="col-span-2 flex flex-col gap-0.5 bg-white/85 p-3.5 backdrop-blur-sm sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a7358]">Serving Towns</span>
                    <span className="truncate text-lg font-black text-[#3a2416]">{serves}</span>
                  </div>
                )}
              </div>
            )}

            {/* Verification / Indicative stamp */}
            <div className="taxi-up t-d3 mt-4 flex items-center gap-1.5 text-xs">
              {verified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700">
                  <CheckCircle2 size={13} />
                  Verified Route Data
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1 font-medium text-amber-800">
                  <AlertCircle size={13} className="text-amber-500" />
                  Rates are indicative, confirmed at booking
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="taxi-up t-d4 mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setIsOpen(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Navigation size={15} className="transition-transform group-hover:rotate-45" />
                Book Private Cab
              </button>
              <a
                href={waLink(`Hi, I am looking to book a cab: ${ctaContext}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white active:translate-y-0 cursor-pointer"
              >
                <MessageSquare size={15} />
                WhatsApp Query
              </a>
            </div>

            {/* Trust rating strip */}
            <div className="taxi-up t-d5 mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-orange-200/60 pt-5">
              <div className="flex items-center gap-2">
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#3a2416]">4.9</span>
                <span className="text-xs text-[#9a7358]">/ 2,400+ trips</span>
              </div>
              <div className="hidden h-5 w-px bg-orange-200/70 sm:block" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6b4c38]">
                <Clock size={14} className="text-orange-500" />
                On-time pickup guarantee
              </div>
            </div>
          </div>

          {/* ══ RIGHT — Premium Journey Card ══ */}
          <div className="taxi-up t-d2 relative w-full lg:h-[540px] lg:self-center">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/55 p-5 shadow-[0_30px_70px_rgba(234,88,12,0.16)] backdrop-blur-md sm:p-6">


              {/* Card header */}
              <div className="relative z-[1] mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#EA580C,#FB923C)] text-white shadow-sm">
                    <Navigation size={15} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-black text-[#3a2416]">Saurashtra Route</p>
                    <p className="text-[10px] font-medium text-[#9a7358]">Live pilgrimage circuit</p>
                  </div>
                </div>
            
              </div>

              {/* Animated Map */}
              <div className="relative z-[1] flex-1">
                <svg className="h-full w-full" viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#EA580C" />
                      <stop offset="1" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>

                  {/* Coast line */}
                  <path
                    d="M 30,290 C 150,308 300,288 420,262 S 560,205 585,212"
                    stroke="#bfdbfe" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.7" fill="none"
                  />
                  <text x="470" y="255" fill="#93c5fd" fontSize="12" fontStyle="italic" fontFamily="system-ui" opacity="0.9">Arabian Sea</text>

                  {/* Road shadow */}
                  <path
                    d="M 55,235 C 130,290 230,285 320,205 S 470,80 545,110"
                    stroke="#ffe6d0" strokeWidth="13" strokeLinecap="round" fill="none"
                  />
                  {/* Road base */}
                  <path
                    d="M 55,235 C 130,290 230,285 320,205 S 470,80 545,110"
                    stroke="url(#roadGrad)" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" fill="none"
                  />
                  {/* Animated flowing dashes */}
                  <path
                    className="road-flow"
                    d="M 55,235 C 130,290 230,285 320,205 S 470,80 545,110"
                    stroke="url(#roadGrad)" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" fill="none"
                  />

                  {/* Somnath */}
                  <circle cx="55" cy="235" r="15" fill="#EA580C" fillOpacity="0.12" className="glow-dot" />
                  <circle cx="55" cy="235" r="6" fill="#EA580C" />
                  <circle cx="55" cy="235" r="2.5" fill="#fff" />
                  <text x="55" y="215" fill="#3a2416" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="system-ui">Somnath</text>

                  {/* Porbandar */}
                  <circle cx="320" cy="205" r="13" fill="#f59e0b" fillOpacity="0.14" className="glow-dot" style={{ animationDelay: "-0.9s" }} />
                  <circle cx="320" cy="205" r="5" fill="#f59e0b" />
                  <text x="320" y="230" fill="#7a5238" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="system-ui">Porbandar</text>

                  {/* Dwarka */}
                  <circle cx="545" cy="110" r="15" fill="#EA580C" fillOpacity="0.12" className="glow-dot" style={{ animationDelay: "-1.7s" }} />
                  <circle cx="545" cy="110" r="6" fill="#EA580C" />
                  <circle cx="545" cy="110" r="2.5" fill="#fff" />
                  <text x="545" y="90" fill="#3a2416" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="system-ui">Dwarka</text>

                  {/* Animated Cab */}
                  <g className="taxi-anim">
                    <g transform="scale(1.5)">
                      <circle cx="-5" cy="3" r="2.2" fill="#1e293b" />
                      <circle cx="5" cy="3" r="2.2" fill="#1e293b" />
                      <path d="M -9,1 C -9,-1 -7,-2 -5,-2 H 3 C 5,-2 7,-1 8,1 H 9 V 3 H -9 Z" fill="#EA580C" />
                      <path d="M -6,-2 C -6,-5 -4,-5.5 -2,-5.5 H 1 C 3,-5.5 4,-5 4,-2 Z" fill="#fb923c" />
                      <path d="M -4,-3 H -1 V -4.5 C -2.5,-4.5 -4,-4 -4,-3 Z" fill="#f8fafc" />
                      <path d="M 0.5,-3 H 2.5 C 2.5,-4 1.5,-4.5 0.5,-4.5 Z" fill="#f8fafc" />
                      <rect x="-1" y="-7.5" width="2" height="1.5" fill="#f59e0b" rx="0.3" />
                    </g>
                  </g>
                </svg>

                {/* Floating badges over map */}
                <div className="pointer-events-none absolute left-1 top-1 flex flex-col gap-1.5">
              
          
                </div>
              </div>

              {/* Card footer — trust list */}
              <div className="relative z-[1] mt-3 grid gap-2 border-t border-orange-100 pt-4">
                {TRUST.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                      <Icon size={15} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[12.5px] font-bold text-[#3a2416]">{label}</p>
                      <p className="text-[10.5px] text-[#9a7358]">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── WAVE to white (Matches Tours Page) ── */}
        <div className="relative z-10 -mb-px w-full pointer-events-none select-none" aria-hidden="true">
          <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-[60px] w-full sm:h-[80px] lg:h-[100px]">
            <path d="M0,20 C180,80 360,0 540,40 C720,80 900,10 1080,50 C1200,75 1340,30 1440,45 L1440,110 L0,110 Z" fill="rgba(234,88,12,0.10)" />
            <path d="M0,45 C120,10 300,70 480,48 C660,26 840,72 1020,52 C1160,36 1320,65 1440,55 L1440,110 L0,110 Z" fill="rgba(251,146,60,0.10)" />
            <path d="M0,65 C200,30 380,88 560,68 C740,48 920,85 1100,70 C1240,58 1360,75 1440,68 L1440,110 L0,110 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
