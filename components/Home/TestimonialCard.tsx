"use client";

import { useRef, useEffect } from "react";
import { Star, MapPin, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    location: "Delhi, India",
    tour: "Dwarka Divine Escape",
    destination: "Dwarka",
    rating: 5,
    date: "March 2024",
    initials: "RS",
    color: "bg-orange-100 text-orange-800",
    review:
      "An absolutely soul-stirring experience. The Dwarkadhish temple darshan at sunrise was something I will carry in my heart forever. The team arranged everything flawlessly — from the hotel to the evening aarti. Truly divine.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    location: "Mumbai, Maharashtra",
    tour: "Somnath Jyotirlinga Tour",
    destination: "Somnath",
    rating: 5,
    date: "January 2024",
    initials: "PM",
    color: "bg-amber-100 text-amber-800",
    review:
      "The Somnath temple light and sound show in the evening gave me goosebumps. Our guide was incredibly knowledgeable about the history and significance of each spot. Hotel was right by the sea — woke up to the sound of waves every morning.",
  },
  {
    id: 3,
    name: "Ankit & Sunita Patel",
    location: "Ahmedabad, Gujarat",
    tour: "Dwarka Somnath Premium Yatra",
    destination: "Sacred Gujarat",
    rating: 5,
    date: "February 2024",
    initials: "AP",
    color: "bg-rose-100 text-rose-800",
    review:
      "We celebrated our 25th anniversary on this tour and it couldn't have been more perfect. The premium package meant zero stress — every detail was taken care of. Bet Dwarka ferry ride was the highlight. Will come back every year.",
  },
  {
    id: 4,
    name: "Kavitha Nair",
    location: "Bengaluru, Karnataka",
    tour: "Somnath Coastal Retreat",
    destination: "Somnath",
    rating: 5,
    date: "December 2023",
    initials: "KN",
    color: "bg-orange-100 text-orange-800",
    review:
      "I was traveling solo as a woman and felt completely safe and well taken care of throughout. The coastal walk near Somnath beach at dusk is pure magic. The prasad thali arranged by the team was a lovely personal touch.",
  },
  {
    id: 5,
    name: "Suresh Iyer",
    location: "Chennai, Tamil Nadu",
    tour: "Dwarkadhish Temple Yatra",
    destination: "Dwarka",
    rating: 5,
    date: "November 2023",
    initials: "SI",
    color: "bg-amber-100 text-amber-800",
    review:
      "From the moment we landed in Gujarat, everything was seamless. The driver knew every temple and legend by heart. Rukmini Devi temple visit was unexpectedly moving. Highly recommend this for families with elders — very comfortable pace.",
  },
  {
    id: 6,
    name: "Meena & Ramesh Gupta",
    location: "Jaipur, Rajasthan",
    tour: "Bet Dwarka Spiritual Journey",
    destination: "Bet Dwarka",
    rating: 5,
    date: "October 2023",
    initials: "MG",
    color: "bg-rose-100 text-rose-800",
    review:
      "Bet Dwarka is something most people miss and we are so glad we didn't. The boat ride, the smaller temples, the quieter energy — it felt like stepping back 5,000 years. Our guide recited shlokas at the ghat. Absolutely unforgettable.",
  },
  {
    id: 7,
    name: "Deepak Verma",
    location: "Pune, Maharashtra",
    tour: "Dwarka Premium Sacred Tour",
    destination: "Dwarka",
    rating: 5,
    date: "September 2023",
    initials: "DV",
    color: "bg-orange-100 text-orange-800",
    review:
      "Booked the premium package for my parents' 60th birthday pilgrimage. The team went above and beyond — special seating arrangements at the temple, wheelchair assistance, personalised itinerary. My parents were in tears of joy. Thank you.",
  },
  {
    id: 8,
    name: "Archana Joshi",
    location: "Nagpur, Maharashtra",
    tour: "Somnath Jyotirlinga Tour",
    destination: "Somnath",
    rating: 5,
    date: "August 2023",
    initials: "AJ",
    color: "bg-amber-100 text-amber-800",
    review:
      "I had visited Somnath 15 years ago on my own. This time with a proper tour was a completely different and far richer experience. Learning the history, standing at the shore pillar pointing all the way to the South Pole — it puts things in perspective.",
  },
  {
    id: 9,
    name: "Vikram Singh",
    location: "Lucknow, Uttar Pradesh",
    tour: "Dwarka Coastal Darshan",
    destination: "Dwarka",
    rating: 5,
    date: "July 2023",
    initials: "VS",
    color: "bg-rose-100 text-rose-800",
    review:
      "Came with a group of 12 and the coordination was impeccable. Nageshwar Jyotirlinga and Gopi Talav were spots I hadn't even known about. The team curated hidden gems alongside the main temples. Entire group is already planning a return trip.",
  },
];

function StarRating({ rating }: { rating: number }) {
  const validRating = Math.max(0, Math.min(5, Math.floor(rating || 0)));
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < validRating
              ? "fill-amber-400 text-amber-400"
              : "fill-stone-200 text-stone-200"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  if (!t) return null;
  return (
    <div className="group relative shrink-0 w-[340px] rounded-2xl bg-white border border-stone-200 p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(234,88,12,0.10)] hover:border-orange-200">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 ${t.color}`}
          >
            {t.initials || "?"}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-slate-800 leading-tight">
              {t.name || "Anonymous"}
            </p>
            <p className="flex items-center gap-1 text-[11px] text-stone-400 mt-0.5">
              <MapPin size={10} />
              {t.location || "Unknown"}
            </p>
          </div>
        </div>
        {/* Quote icon */}
        <Quote
          size={28}
          className="text-orange-200 flex-shrink-0 mt-0.5 fill-orange-100"
        />
      </div>

      {/* Stars + date */}
      <div className="flex items-center justify-between">
        <StarRating rating={t.rating || 0} />
        <span className="text-[11px] text-stone-400">{t.date || ""}</span>
      </div>

      {/* Review text */}
      <p className="text-[13.5px] leading-[1.75] text-slate-600 flex-1">
        "{t.review || "No review provided."}"
      </p>

      {/* Tour badge */}
      <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
        <span className="text-[10px] font-bold uppercase tracking-wide text-orange-700 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-lg">
          {t.destination || "Tour"}
        </span>
        <span className="text-[11px] text-stone-400 truncate">{t.tour || ""}</span>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const animRef1 = useRef<number>(0);
  const animRef2 = useRef<number>(0);
  const pos1 = useRef(0);
  const pos2 = useRef(0);
  const paused1 = useRef(false);
  const paused2 = useRef(false);

  const SPEED = 0.45;

  useEffect(() => {
    const el1 = row1Ref.current;
    const el2 = row2Ref.current;
    if (!el1 || !el2) return;

    const half1 = el1.scrollWidth / 2;
    const half2 = el2.scrollWidth / 2;

    if (half1 === 0 || half2 === 0) return;

    const tick = () => {
      try {
        if (!paused1.current && row1Ref.current) {
          pos1.current += SPEED;
          if (pos1.current >= half1) pos1.current = 0;
          row1Ref.current.style.transform = `translateX(-${pos1.current}px)`;
        }
        if (!paused2.current && row2Ref.current) {
          pos2.current -= SPEED;
          if (pos2.current <= -half2) pos2.current = 0;
          row2Ref.current.style.transform = `translateX(${Math.abs(pos2.current)}px)`;
        }
      } catch (error) {
        console.error("Animation error:", error);
      }
      animRef1.current = requestAnimationFrame(tick);
    };

    animRef1.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef1.current);
  }, []);

  if (!testimonials || testimonials.length === 0) return null;

  const row1 = [...testimonials.slice(0, 5), ...testimonials.slice(0, 5)];
  const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

  return (
    <section className="relative py-20 md:py-28 bg-[#FAF7F2] overflow-hidden">
      {/* Subtle top fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />

      {/* Left + right edge fades */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700 shadow-sm mb-5">
            <Star size={12} className="fill-orange-400 text-orange-400" />
            Pilgrim Stories
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.05]">
            Blessings from our{" "}
            <span className="text-orange-500">Yatris</span>
          </h2>

          <p className="mt-5 text-[15px] md:text-[17px] leading-8 text-slate-600">
            Thousands have walked these sacred paths with us. Here is
            what they carry back — beyond just memories.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-10">
            {[
              { value: "4,800+", label: "Happy Yatris" },
              { value: "4.9 / 5", label: "Average Rating" },
              { value: "98%", label: "Would Recommend" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-orange-500">
                  {s.value}
                </p>
                <p className="text-[12px] text-stone-500 mt-1 font-medium uppercase tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite scroll rows */}
      <div className="flex flex-col gap-5 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-5 will-change-transform"
            style={{ width: "max-content" }}
            onMouseEnter={() => (paused1.current = true)}
            onMouseLeave={() => (paused1.current = false)}
          >
            {row1.map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-5 will-change-transform"
            style={{ width: "max-content" }}
            onMouseEnter={() => (paused2.current = true)}
            onMouseLeave={() => (paused2.current = false)}
          >
            {row2.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 mt-14 text-center">
        <p className="text-[14px] text-stone-500 mb-5">
          Join thousands of devotees who found peace and divinity on
          their sacred journey.
        </p>
        <a
          href="#packages"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 text-[14px] font-semibold transition-all duration-300 shadow-[0_8px_24px_rgba(234,88,12,0.28)] hover:shadow-[0_12px_32px_rgba(234,88,12,0.35)] hover:-translate-y-0.5"
        >
          Start Your Yatra
          <MapPin size={15} />
        </a>
      </div>
    </section>
  );
}