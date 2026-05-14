"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";


const testimonials = [
  {
    id: 1, name: "Rajesh Sharma", location: "Delhi, India", destination: "Dwarka",
    rating: 5, initials: "RS", bg: "#FFF3EA", color: "#C2410C",
    review: "An absolutely soul-stirring experience. The Dwarkadhish temple darshan at sunrise was something I will carry in my heart forever. The team arranged everything flawlessly — from the hotel to the evening aarti. Truly divine.",
  },
  {
    id: 2, name: "Priya Mehta", location: "Mumbai, Maharashtra", destination: "Somnath",
    rating: 5, initials: "PM", bg: "#FFFBEB", color: "#B45309",
    review: "The Somnath temple light and sound show in the evening gave me goosebumps. Our guide was incredibly knowledgeable about the history and significance of each spot. Hotel was right by the sea — woke up to the sound of waves every morning.",
  },
  {
    id: 3, name: "Ankit & Sunita Patel", location: "Ahmedabad, Gujarat", destination: "Sacred Gujarat",
    rating: 5, initials: "AP", bg: "#FFF0F3", color: "#9D174D",
    review: "We celebrated our 25th anniversary on this tour and it couldn't have been more perfect. The premium package meant zero stress — every detail was taken care of. Bet Dwarka ferry ride was the highlight. Will come back every year.",
  },
  {
    id: 4, name: "Kavitha Nair", location: "Bengaluru, Karnataka", destination: "Somnath",
    rating: 5, initials: "KN", bg: "#FFF3EA", color: "#C2410C",
    review: "I was traveling solo as a woman and felt completely safe and well taken care of throughout. The coastal walk near Somnath beach at dusk is pure magic. The prasad thali arranged by the team was a lovely personal touch.",
  },
  {
    id: 5, name: "Suresh Iyer", location: "Chennai, Tamil Nadu", destination: "Dwarka",
    rating: 5, initials: "SI", bg: "#FFFBEB", color: "#B45309",
    review: "From the moment we landed in Gujarat, everything was seamless. The driver knew every temple and legend by heart. Rukmini Devi temple visit was unexpectedly moving. Highly recommend for families with elders — very comfortable pace.",
  },
  {
    id: 6, name: "Meena & Ramesh Gupta", location: "Jaipur, Rajasthan", destination: "Bet Dwarka",
    rating: 5, initials: "MG", bg: "#FFF0F3", color: "#9D174D",
    review: "Bet Dwarka is something most people miss and we are so glad we didn't. The boat ride, the smaller temples, the quieter energy — it felt like stepping back 5,000 years. Our guide recited shlokas at the ghat. Absolutely unforgettable.",
  },
  {
    id: 7, name: "Deepak Verma", location: "Pune, Maharashtra", destination: "Dwarka",
    rating: 5, initials: "DV", bg: "#FFF3EA", color: "#C2410C",
    review: "Booked the premium package for my parents' 60th birthday pilgrimage. The team went above and beyond — special seating arrangements, wheelchair assistance, personalised itinerary. My parents were in tears of joy. Thank you.",
  },
  {
    id: 8, name: "Archana Joshi", location: "Nagpur, Maharashtra", destination: "Somnath",
    rating: 5, initials: "AJ", bg: "#FFFBEB", color: "#B45309",
    review: "I had visited Somnath 15 years ago on my own. This time with a proper tour was a completely different and far richer experience. Learning the history, standing at the shore pillar pointing to the South Pole — it puts things in perspective.",
  },
  {
    id: 9, name: "Vikram Singh", location: "Lucknow, Uttar Pradesh", destination: "Dwarka",
    rating: 5, initials: "VS", bg: "#FFF0F3", color: "#9D174D",
    review: "Came with a group of 12 and the coordination was impeccable. Nageshwar Jyotirlinga and Gopi Talav were spots I hadn't even known about. The team curated hidden gems alongside the main temples. Entire group is already planning a return.",
  },
];

const VISIBLE_DESKTOP = 2;
const AUTO_INTERVAL = 3400;
const PAUSE_AFTER_INTERACTION = 6000;

function StarRow({ count, size = 13, color = "#FBBF24" }: { count: number; size?: number; color?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} style={{ color: i < count ? color : "#E5D6C8", fill: i < count ? color : "#E5D6C8" }} />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [featFading, setFeatFading] = useState(false);
  const [displayedT, setDisplayedT] = useState(testimonials[0]);

  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userPausedRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // ── FIX 1: touch tracking refs to detect horizontal vs vertical intent ──
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef(false);
  const touchDetermined = useRef(false);

  const swapFeatured = useCallback((t: typeof testimonials[0]) => {
    setFeatFading(true);
    setTimeout(() => {
      setDisplayedT(t);
      setFeatFading(false);
    }, 220);
  }, []);

  const activate = useCallback((idx: number, fromUser = false) => {
    setActiveIdx(idx);
    swapFeatured(testimonials[idx]);

    if (fromUser) {
      userPausedRef.current = true;
      if (pauseRef.current) clearTimeout(pauseRef.current);
      pauseRef.current = setTimeout(() => {
        userPausedRef.current = false;
      }, PAUSE_AFTER_INTERACTION);
    }
  }, [swapFeatured]);

  // Auto-scroll (desktop only — pause entirely on mobile)
  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (!userPausedRef.current) {
        setActiveIdx((prev) => {
          const next = (prev + 1) % testimonials.length;
          swapFeatured(testimonials[next]);
          return next;
        });
      }
    }, AUTO_INTERVAL);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [swapFeatured]);

  // Desktop track scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardH = (track.firstChild as HTMLElement)?.offsetHeight ?? 140;
    const gap = 10;
    const maxScroll = Math.max(0, (testimonials.length - VISIBLE_DESKTOP) * (cardH + gap));
    const targetScroll = Math.max(0, Math.min((activeIdx - 0.3) * (cardH + gap), maxScroll));
    track.style.transform = `translateY(-${targetScroll}px)`;
  }, [activeIdx]);

  // ── FIX 2: Replace scrollIntoView with manual scrollLeft — no page scroll side effects ──
  useEffect(() => {
    const container = mobileTrackRef.current;
    if (!container) return;
    const card = container.children[activeIdx] as HTMLElement | undefined;
    if (!card) return;
    // Only scroll if it was a user dot-tap (not auto), checked via userPausedRef
    // We use scrollLeft directly — no scrollIntoView which can affect page scroll
    const cardLeft = card.offsetLeft;
    const containerLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const cardWidth = card.offsetWidth;
    const targetScroll = cardLeft - (containerWidth - cardWidth) / 2;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeIdx]);

  // ── FIX 3: Touch handlers — only intercept clearly horizontal swipes ──
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = false;
    touchDetermined.current = false;
    // Pause auto-rotation while touching
    userPausedRef.current = true;
    if (pauseRef.current) clearTimeout(pauseRef.current);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchDetermined.current) {
      // Already determined: if vertical, do nothing (let page scroll)
      if (!isHorizontalSwipe.current) return;
      // If horizontal, prevent page scroll
      e.preventDefault();
      return;
    }

    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);

    // Need at least 8px movement to determine intent
    if (dx < 8 && dy < 8) return;

    touchDetermined.current = true;
    // Horizontal only if clearly more horizontal than vertical (2:1 ratio)
    isHorizontalSwipe.current = dx > dy * 1.5;

    if (!isHorizontalSwipe.current) {
      // Vertical scroll — release control immediately
      return;
    }
    e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Resume auto after pause period
    pauseRef.current = setTimeout(() => {
      userPausedRef.current = false;
    }, PAUSE_AFTER_INTERACTION);
    touchDetermined.current = false;
    isHorizontalSwipe.current = false;
  }, []);

  const t = displayedT;

  return (
    <section className="relative py-6 md:py-16 overflow-hidden">

      {/* Dot bg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle,rgba(234,88,12,.065) 1px,transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-orange-200 text-[#C2410C] text-[11px] font-bold tracking-[0.14em] uppercase px-4 py-1.5 rounded-full mb-4">
              <Star size={11} className="fill-[#EA580C] text-[#EA580C]" />
              Pilgrim Stories
            </div>
            <h2 className="text-4xl md:text-[42px] font-extrabold text-[#1a1a1a] leading-[1.1] mb-2">
              Blessings from our <span className="text-[#EA580C]">Yatris</span>
            </h2>
            <p className="text-[15px] text-[#888] leading-[1.7] max-w-[420px]">
              Thousands have walked these sacred paths with us. Here is what they carry back.
            </p>
          </div>
          <div className="hidden md:flex gap-7 flex-shrink-0 border-l-2 border-orange-100 pl-8">
            {[{ value: "4,800+", label: "Happy Yatris" }, { value: "4.9 / 5", label: "Avg Rating" }, { value: "98%", label: "Recommend" }].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[22px] font-extrabold text-[#EA580C] leading-none">{s.value}</p>
                <p className="text-[10px] text-[#bbb] font-bold uppercase tracking-wider mt-1.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:grid gap-5" style={{ gridTemplateColumns: "1fr 310px", alignItems: "stretch" }}>

          {/* Featured panel */}
          <div
            className="relative rounded-[20px] flex flex-col justify-between p-10 overflow-hidden"
            style={{ background: "#EA580C", minHeight: "340px" }}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="absolute -bottom-8 -left-5 w-32 h-32 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.05)" }} />
            <span aria-hidden="true" className="absolute top-3 left-7 text-[80px] leading-none pointer-events-none select-none" style={{ color: "rgba(255,255,255,0.16)", fontFamily: "Georgia,serif" }}>"</span>

            <div className="relative z-10">
              <StarRow count={t.rating} size={15} color="#FDE68A" />
              <p
                className="mt-4 text-[16px] leading-[1.85] text-white/95 italic transition-all duration-200"
                style={{ opacity: featFading ? 0 : 1, transform: featFading ? "translateY(8px)" : "translateY(0)" }}
              >
                "{t.review}"
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between flex-wrap gap-3 mt-7 pt-5 border-t border-white/15">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.32)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-[14px] font-bold text-white leading-tight transition-all duration-200"
                    style={{ opacity: featFading ? 0 : 1, transform: featFading ? "translateY(6px)" : "translateY(0)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-[11px] text-white/55 mt-0.5 flex items-center gap-1">
                    <MapPin size={9} /> {t.location}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff" }}>
                {t.destination}
              </span>
            </div>
          </div>

          {/* Right scroll column — desktop, unchanged */}
          <div>
            <div className="relative overflow-hidden" style={{ height: "340px" }}>
              <div
                ref={trackRef}
                className="flex flex-col gap-[10px]"
                style={{ transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}
              >
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => activate(i, true)}
                    className="text-left rounded-[14px] p-4 w-full"
                    style={{
                      background: "#fff",
                      border: i === activeIdx ? "1.5px solid #EA580C" : "1px solid #F0E8DF",
                      opacity: i === activeIdx ? 1 : 0.62,
                      transform: i === activeIdx ? "scale(1)" : "scale(0.97)",
                      boxShadow: i === activeIdx ? "0 4px 20px rgba(234,88,12,0.12)" : "none",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: item.bg, color: item.color }}>
                          {item.initials}
                        </div>
                        <div>
                          <p className="text-[12.5px] font-bold text-[#1a1a1a] leading-tight">{item.name}</p>
                          <p className="text-[10px] text-[#aaa] mt-0.5 flex items-center gap-1">
                            <MapPin size={8} /> {item.location}
                          </p>
                        </div>
                      </div>
                      <StarRow count={item.rating} size={10} />
                    </div>
                    <p className="text-[11.5px] text-[#666] leading-[1.65] line-clamp-2">"{item.review}"</p>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mt-2" style={{ background: item.bg, color: item.color }}>
                      {item.destination}
                    </span>
                  </button>
                ))}
              </div>
              <div className="absolute top-0 inset-x-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to bottom,#FAF5EE,transparent)" }} />
              <div className="absolute bottom-0 inset-x-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to top,#FAF5EE,transparent)" }} />
            </div>

            <div className="flex justify-center gap-1.5 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => activate(i, true)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIdx ? "20px" : "6px",
                    height: "6px",
                    background: i === activeIdx ? "#EA580C" : "#E5D6C8",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "100px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET LAYOUT ── */}
        <div className="lg:hidden">

          {/* Featured card */}
          <div className="relative rounded-[18px] p-6 sm:p-8 mb-5 overflow-hidden" style={{ background: "#EA580C" }}>
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span aria-hidden="true" className="absolute top-2 left-5 text-[60px] leading-none pointer-events-none select-none" style={{ color: "rgba(255,255,255,0.14)", fontFamily: "Georgia,serif" }}>"</span>

            <div className="relative z-10">
              <StarRow count={t.rating} size={14} color="#FDE68A" />
              <p
                className="mt-3 text-[14px] sm:text-[15px] leading-[1.8] text-white/95 italic transition-all duration-200"
                style={{ opacity: featFading ? 0 : 1, transform: featFading ? "translateY(6px)" : "translateY(0)" }}
              >
                "{t.review}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3 mt-5 pt-4 border-t border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)" }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white leading-tight">{t.name}</p>
                    <p className="text-[10px] text-white/55 mt-0.5 flex items-center gap-1"><MapPin size={8} />{t.location}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>
                  {t.destination}
                </span>
              </div>
            </div>
          </div>

          {/* ── FIX 4: Horizontal scroll container — passive touch, no scroll-snap on page axis ── */}
          <div
            ref={mobileTrackRef}
            className="flex gap-3 pb-3"
            style={{
              overflowX: "auto",
              overflowY: "hidden",          // prevent vertical scroll capture
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              // FIX: no scroll-snap on the PAGE axis — only x
              msOverflowStyle: "none",      // hide scrollbar IE
              scrollbarWidth: "none",       // hide scrollbar Firefox
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => activate(i, true)}
                className="text-left rounded-[14px] p-4 flex-shrink-0"
                style={{
                  width: "calc(85vw - 40px)",
                  maxWidth: "300px",
                  scrollSnapAlign: "start",
                  background: "#fff",
                  border: i === activeIdx ? "1.5px solid #EA580C" : "1px solid #F0E8DF",
                  boxShadow: i === activeIdx ? "0 4px 16px rgba(234,88,12,0.12)" : "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: item.bg, color: item.color }}>
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#1a1a1a] leading-tight">{item.name}</p>
                      <p className="text-[10px] text-[#aaa] mt-0.5 flex items-center gap-1"><MapPin size={8} />{item.location}</p>
                    </div>
                  </div>
                  <StarRow count={item.rating} size={10} />
                </div>
                <p className="text-[11.5px] text-[#666] leading-[1.65] line-clamp-3">"{item.review}"</p>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mt-2" style={{ background: item.bg, color: item.color }}>
                  {item.destination}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => activate(i, true)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === activeIdx ? "20px" : "6px", height: "6px", background: i === activeIdx ? "#EA580C" : "#E5D6C8", border: "none", cursor: "pointer", borderRadius: "100px" }}
              />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-12">
          <Link
            href="/tour-packages"
            className="inline-flex items-center gap-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white px-8 py-3.5 text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: "0 8px 24px rgba(234,88,12,0.28)" }}
          >
            Start Your Yatra
            <ArrowRight size={15} />
          </Link>
          <p className="text-[13px] text-[#aaa] mt-3">Join thousands of devotees on their sacred journey</p>
        </div>

      </div>
    </section>
  );
}