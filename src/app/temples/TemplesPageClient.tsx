"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Car, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Tv, 
  Map, 
  AlertTriangle,
  Info,
  Calendar
} from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

// ==========================================
// STATIC ENRICHMENT DATA FOR CARD DISPLAY
// ==========================================
const TEMPLE_DETAILS_MAPPING: Record<string, {
  deity: string;
  town: string;
  district: string;
  significance: string;
  distance: string;
  dressCode: string;
  category: string;
  timingsFallback: { label: string; open: string; close: string }[];
}> = {
  "dakor-ranchhodrai-temple": {
    deity: "Lord Krishna (Ranchhodrai)",
    town: "Dakor",
    district: "Kheda",
    significance: "The center of Central Gujarat's Krishna devotion. Legend says the deity of Ranchhodrai walked from Dwarka with a devotee, Bodana, in the 12th century.",
    distance: "94 km",
    dressCode: "Modest traditional attire. Avoid shorts and tank tops.",
    category: "Krishna & Vishnu",
    timingsFallback: [
      { label: "Mangla Darshan", open: "06:45", close: "07:30" },
      { label: "Shangar Darshan", open: "08:30", close: "12:00" },
      { label: "Evening Darshan", open: "16:00", close: "19:00" }
    ]
  },
  "virpur-jalaram-temple": {
    deity: "Saint Jalaram Bapa",
    town: "Virpur",
    district: "Rajkot",
    significance: "Dedicated to the revered 19th-century saint Jalaram Bapa. It is globally unique for accepting no monetary or material donations since the year 2000, while serving free food to all.",
    distance: "235 km",
    dressCode: "Simple, conservative clothing. Head covering recommended.",
    category: "Saint Yatras",
    timingsFallback: [
      { label: "Morning Darshan", open: "07:00", close: "13:00" },
      { label: "Sadavrat (Prasad)", open: "11:30", close: "15:00" },
      { label: "Evening Darshan", open: "15:00", close: "20:00" }
    ]
  },
  "salangpur-hanuman-temple": {
    deity: "Lord Hanuman (Kashtbhanjan Dev)",
    town: "Salangpur",
    district: "Botad",
    significance: "Under the Swaminarayan Sampraday, this powerful temple is dedicated to Hanumanji as Kashtbhanjan (remover of difficulties). Features a massive, historic black stone deity.",
    distance: "150 km",
    dressCode: "Traditional and modest attire.",
    category: "Saint Yatras",
    timingsFallback: [
      { label: "Mangla Aarti", open: "05:30", close: "06:00" },
      { label: "Shangar Darshan", open: "07:00", close: "12:00" },
      { label: "Evening Darshan", open: "15:15", close: "21:00" }
    ]
  },
  "chotila-chamunda-mata-temple": {
    deity: "Chamunda Mata",
    town: "Chotila",
    district: "Surendranagar",
    significance: "A sacred hilltop shrine located on the Chotila Hill. Devotees climb approximately 600 stone steps to reach the top. It is a highly revered seat of Shakti worship.",
    distance: "170 km",
    dressCode: "Modest and flexible clothing suitable for climbing steps.",
    category: "Shakti/Mata",
    timingsFallback: [
      { label: "Morning Aarti", open: "05:30", close: "06:00" },
      { label: "Temple Open", open: "05:00", close: "19:30" },
      { label: "Evening Aarti", open: "19:00", close: "19:30" }
    ]
  },
  "live-darshan-online-aarti": {
    deity: "Virtual Darshan Streams",
    town: "Digital Portal",
    district: "Gujarat",
    significance: "A specialized online portal linking pilgrims to verified live video darshan feeds and daily aarti webcasts from major temple trusts in Gujarat.",
    distance: "0 km (Online)",
    dressCode: "None (Digital Access)",
    category: "Virtual Portal",
    timingsFallback: [
      { label: "Somnath Stream", open: "06:00", close: "21:30" },
      { label: "Dwarka Stream", open: "06:30", close: "21:45" },
      { label: "Dakor Stream", open: "06:45", close: "19:00" }
    ]
  },
  "mata-no-madh-ashapura-temple": {
    deity: "Ashapura Mata",
    town: "Mata no Madh",
    district: "Kutch",
    significance: "The ancestral seat of Ashapura Mata, the patron goddess of Kutch rulers. Revered for fulfilling wishes, it sees millions of foot-pilgrims (padyatris) during Navratri.",
    distance: "435 km",
    dressCode: "Traditional Indian clothing. Avoid modern western wear.",
    category: "Kutch & Border",
    timingsFallback: [
      { label: "Morning Aarti", open: "05:00", close: "05:30" },
      { label: "General Darshan", open: "05:30", close: "20:30" },
      { label: "Sandhya Aarti", open: "19:00", close: "19:30" }
    ]
  },
  "narayan-sarovar": {
    deity: "Lord Vishnu (Trivikramraiji)",
    town: "Narayan Sarovar",
    district: "Kutch",
    significance: "One of India's five sacred lakes (Panch Sarovar) mentioned in the Shrimad Bhagavata. Houses a beautiful complex of temples built by the Queen of Kutch.",
    distance: "450 km",
    dressCode: "Modest clothes. Swimwear restricted to designated ghats.",
    category: "Kutch & Border",
    timingsFallback: [
      { label: "Morning Darshan", open: "06:00", close: "12:00" },
      { label: "Afternoon Darshan", open: "14:00", close: "19:00" }
    ]
  },
  "koteshwar": {
    deity: "Lord Shiva (Koteshwar Mahadev)",
    town: "Koteshwar",
    district: "Kutch",
    significance: "Marking India's westernmost boundary, this historic seaside stone temple overlooks the Arabian Sea. It is linked to the mythology of Ravana and the Koti Lingas.",
    distance: "452 km",
    dressCode: "Traditional wear. Shoulders and knees must be covered.",
    category: "Shiva & Jyotirlinga",
    timingsFallback: [
      { label: "Morning Darshan", open: "06:00", close: "13:00" },
      { label: "Afternoon Darshan", open: "15:00", close: "20:00" },
      { label: "Evening Aarti", open: "19:00", close: "19:30" }
    ]
  },
  "bagdana-temple-bajrangdas-bapa": {
    deity: "Saint Bajrangdas Bapa",
    town: "Bagdana",
    district: "Bhavnagar",
    significance: "A peaceful spiritual ashram dedicated to Bapa Sitaram. Renowned for its massive volunteer base and community kitchens serving breakfast, lunch, and dinner daily.",
    distance: "230 km",
    dressCode: "Modest attire. Covering head during darshan is customary.",
    category: "Saint Yatras",
    timingsFallback: [
      { label: "Morning Aarti", open: "05:00", close: "05:30" },
      { label: "Darshan Hours", open: "06:00", close: "21:00" },
      { label: "Evening Aarti", open: "19:00", close: "19:30" }
    ]
  },
  "akshardham-gandhinagar": {
    deity: "Lord Swaminarayan",
    town: "Gandhinagar",
    district: "Gandhinagar",
    significance: "A monumental 23-acre cultural complex constructed from 6,000 tons of pink sandstone. Showcases traditional architecture, spiritual exhibition halls, and musical water shows.",
    distance: "25 km",
    dressCode: "Strict modest dress code. Short clothing and cellphones not permitted inside.",
    category: "Monuments & Heritage",
    timingsFallback: [
      { label: "Complex Timings", open: "10:00", close: "20:00" },
      { label: "Exhibition Shows", open: "11:00", close: "18:00" },
      { label: "Sat-Chit-Anand Water Show", open: "19:00", close: "19:45" }
    ]
  }
};

// ==========================================
// DYNAMIC SVG ICONS FOR DEITIES/CATEGORIES
// ==========================================
const ShivaIcon = () => (
  <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Trishul (Trident) */}
    <path d="M12 3v18M8 6c2 1 6 1 8 0M7 8c2 2 8 2 10 0M10 3s.5 2 2 2 2-2 2-2M9 13.5h6" strokeLinecap="round" />
    <circle cx="12" cy="11" r="1.5" className="fill-blue-500" />
    {/* Damru shape */}
    <path d="M10 12c0 2 4 1.5 4 3.5s-4 1.5-4 3.5M14 12c0 2-4 1.5-4 3.5s4 1.5 4 3.5" />
    <path d="M8 21h8" strokeLinecap="round" />
  </svg>
);

const KrishnaIcon = () => (
  <svg className="w-12 h-12 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Flute (Bansuri) */}
    <path d="M4 18L18 4" strokeLinecap="round" strokeWidth="2" />
    {/* Finger holes */}
    <circle cx="7" cy="15" r="0.5" className="fill-teal-500" />
    <circle cx="9.5" cy="12.5" r="0.5" className="fill-teal-500" />
    <circle cx="12" cy="10" r="0.5" className="fill-teal-500" />
    <circle cx="14.5" cy="7.5" r="0.5" className="fill-teal-500" />
    {/* Peacock Feather (Mor Pankh) outline */}
    <path d="M14 6c1-3 5-4 6-1s-3 5-6 4c-1 0-2-1-2-2z" strokeLinecap="round" />
    <path d="M16 6.5c.5-1 2-1.5 2-.5s-1 1.5-2 1" strokeLinecap="round" className="fill-amber-400" />
    {/* Hanging tassels */}
    <path d="M4 18c-1 0-2 .5-2 1.5s1 1 2 .5M5 19c-.5.5-.5 1.5.5 1.5s1-.5 1-1.5" strokeLinecap="round" />
  </svg>
);

const ShaktiIcon = () => (
  <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Sacred Flame (Jyot) / Lotus */}
    <path d="M12 2C9 7 7 9 7 13a5 5 0 0 0 10 0c0-4-2-6-5-11z" fill="url(#flame-grad)" stroke="none" />
    <path d="M12 4c-2 3-3 4.5-3 7a3 3 0 0 0 6 0c0-2.5-1-4-3-7z" fill="#FBBF24" stroke="none" />
    {/* Base Lotus petals */}
    <path d="M4 18c3-1 5 1 8 0s5-1 8 0M3 20c4-1.5 6 1.5 9 0s5-1.5 9 0" strokeLinecap="round" />
    <defs>
      <linearGradient id="flame-grad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#DC2626" />
        <stop offset="50%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
  </svg>
);

const SaintIcon = () => (
  <svg className="w-12 h-12 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Holy footprints (Paduka) inside circle */}
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
    {/* Left Foot */}
    <path d="M9.5 11c-.5 0-1 1-1 2s.5 2 1 2c.7 0 1-1 1-2s-.3-2-1-2z" className="fill-amber-600/10" />
    <circle cx="9" cy="9.5" r="0.8" className="fill-amber-600" />
    <circle cx="10" cy="9.5" r="0.6" className="fill-amber-600" />
    <circle cx="8" cy="10.2" r="0.5" className="fill-amber-600" />
    <circle cx="7.2" cy="11.2" r="0.4" className="fill-amber-600" />
    {/* Right Foot */}
    <path d="M14.5 11c-.7 0-1 1-1 2s.3 2 1 2c.5 0 1-1 1-2s-.5-2-1-2z" className="fill-amber-600/10" />
    <circle cx="14" cy="9.5" r="0.8" className="fill-amber-600" />
    <circle cx="13" cy="9.5" r="0.6" className="fill-amber-600" />
    <circle cx="15" cy="10.2" r="0.5" className="fill-amber-600" />
    <circle cx="15.8" cy="11.2" r="0.4" className="fill-amber-600" />
    {/* Lotus seat */}
    <path d="M7 17.5c2 1 8 1 10 0" strokeLinecap="round" />
  </svg>
);

const MonumentIcon = () => (
  <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Gopuram / Spire outline */}
    <path d="M12 2l-3 4h6l-3-4zM8 7l-2 5h12l-2-5H8zM5 13l-1.5 6h17l-1.5-6H5zM2 21h20" strokeLinecap="round" strokeLinejoin="round" />
    {/* Kalash / Spire tip */}
    <path d="M12 2V1M11 1h2" />
    {/* Flag on top */}
    <path d="M12 3h4l-2 1.5-2 1.5" className="fill-orange-500" />
    {/* Archway */}
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
  </svg>
);

const LakeIcon = () => (
  <svg className="w-12 h-12 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Holy waves & Lotus */}
    <path d="M4 17c2-1 4 1 6 0s4-1 6 0 4 1 6 0" strokeLinecap="round" />
    <path d="M2 19.5c2.5-1 5 1 7.5 0s5-1 7.5 0 5 1 7.5 0" strokeLinecap="round" />
    {/* Lotus flower */}
    <path d="M12 7c-1 0-2.5 1-2.5 3.5s2.5 4.5 2.5 4.5 2.5-2 2.5-4.5S13 7 12 7z" fill="none" />
    <path d="M12 10c.5-.5 1.5-2 1-3.5S10 6 10 6s-1.5 1.5-1 3c.3.8.5 1 1 1" strokeLinecap="round" />
    <path d="M12 10c-.5-.5-1.5-2-1-3.5S14 6 14 6s1.5 1.5 1 3c-.3.8-.5 1-1 1" strokeLinecap="round" />
  </svg>
);

const LiveStreamIcon = () => (
  <motion.svg 
    className="w-12 h-12 text-rose-500" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    {/* Video camera / TV */}
    <rect x="2" y="5" width="14" height="12" rx="2" />
    <path d="M16 9.5l5.2-3.1a1 1 0 0 1 1.5.8v9.6a1 1 0 0 1-1.5.8l-5.2-3.1" strokeLinecap="round" strokeLinejoin="round" />
    {/* Signal pulse circles */}
    <motion.circle 
      cx="9" 
      cy="11" 
      r="2" 
      stroke="none"
      fill="currentColor"
      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.4, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
);

const getTempleIcon = (category: string) => {
  switch (category) {
    case "Shiva & Jyotirlinga": return <ShivaIcon />;
    case "Krishna & Vishnu": return <KrishnaIcon />;
    case "Shakti/Mata": return <ShaktiIcon />;
    case "Saint Yatras": return <SaintIcon />;
    case "Monuments & Heritage": return <MonumentIcon />;
    case "Kutch & Border": return <LakeIcon />;
    case "Virtual Portal": return <LiveStreamIcon />;
    default: return <MonumentIcon />;
  }
};

const CATEGORIES = [
  "All",
  "Shiva & Jyotirlinga",
  "Krishna & Vishnu",
  "Shakti/Mata",
  "Saint Yatras",
  "Kutch & Border",
  "Monuments & Heritage",
];

// ==========================================
// INTERFACE TYPES
// ==========================================
interface TempleDoc {
  _id: string;
  slug: string;
  title: string;
  temple: string;
  deity?: string;
  town?: string;
  district?: string;
  significance?: string;
  timings_verified?: boolean;
  distance_from_ahmedabad?: string;
  dress_code?: string;
  status?: string;
  timings_table?: { label: string; open: string; close: string }[];
}

interface HubDoc {
  title: string;
  h1: string;
  answer_first: string;
  body: string;
}

interface TemplesPageClientProps {
  temples: TempleDoc[];
  hub: HubDoc | null;
}

export default function TemplesPageClient({ temples, hub }: TemplesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Split title dynamically to apply gradient only to the main heading part
  const [mainTitle, subTitle] = useMemo(() => {
    const rawH1 = hub?.h1 || "Famous Temples In Gujarat";
    if (rawH1.includes(" — ")) {
      const idx = rawH1.indexOf(" — ");
      return [rawH1.substring(0, idx), rawH1.substring(idx + 3)];
    }
    return [rawH1, ""];
  }, [hub]);

  // 1. MERGE DATABASE RECORDS WITH LOCAL ENRICHED CONTENT
  const enrichedTemples = useMemo(() => {
    return temples
      .filter(t => t.slug !== "live-darshan-online-aarti")
      .map(t => {
      const enrichment = TEMPLE_DETAILS_MAPPING[t.slug] || {
        deity: t.deity || "Deity",
        town: t.town || "Gujarat",
        district: t.district || "",
        significance: t.significance || "Revered temple yatra in Gujarat.",
        distance: t.distance_from_ahmedabad || "Contact us",
        dressCode: t.dress_code || "Modest attire",
        category: t.slug === "live-darshan-online-aarti" ? "Virtual Portal" : "Monuments & Heritage",
        timingsFallback: t.timings_table || []
      };

      return {
        ...t,
        deity: t.deity || enrichment.deity,
        town: t.town || enrichment.town,
        district: t.district || enrichment.district,
        significance: t.significance || enrichment.significance,
        distance_from_ahmedabad: t.distance_from_ahmedabad || enrichment.distance,
        dress_code: t.dress_code || enrichment.dressCode,
        category: enrichment.category,
        timings: t.timings_table && t.timings_table.length > 0 ? t.timings_table : enrichment.timingsFallback
      };
    });
  }, [temples]);

  // 2. FILTER & SEARCH FILTERING LOGIC
  const filteredTemples = useMemo(() => {
    return enrichedTemples.filter(t => {
      const matchesCategory = activeCategory === "All" || t.category === activeCategory;
      const matchesSearch = 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.temple.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.town.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.significance.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [enrichedTemples, activeCategory, searchQuery]);

  const toggleExpand = (slug: string) => {
    if (expandedCard === slug) {
      setExpandedCard(null);
    } else {
      setExpandedCard(slug);
    }
  };

  return (
    <div className="w-full">
      <CommonEnquiryForm open={isFormOpen} onClose={() => setIsFormOpen(false)} />
      {/* ==========================================
          SUN/CHAKRA GLOWING HERO SECTION (LIGHT WEBSITE THEME)
          ========================================== */}
      <section className="relative bg-gradient-to-b from-[#FFF9F2] via-[#FFEFE0] to-[#FFFBF7] py-20 px-4 md:px-8 overflow-hidden border-b border-orange-100/60">
        {/* Soft Background Spotlight Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-amber-300/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Ambient Moving Star Particles or Dot Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Chakra Spinning Background Layer (Subtle Light Outline) */}
        <div className="absolute -top-10 -right-10 md:top-6 md:right-10 opacity-[0.07] pointer-events-none">
          <svg className="w-64 h-64 md:w-96 md:h-96 text-orange-600 animate-[spin_100s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Concentric spiritual geometric ring */}
            <circle cx="50" cy="50" r="45" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="35" strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
            {/* 24 rays / spokes representing cosmic order */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              const x2 = (50 + 45 * Math.cos(angle)).toFixed(4);
              const y2 = (50 + 45 * Math.sin(angle)).toFixed(4);
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={x2}
                  y2={y2}
                  strokeWidth="0.3"
                />
              );
            })}
            {/* Inner mandala flowers */}
            <circle cx="50" cy="50" r="8" className="fill-orange-600/25" />
          </svg>
        </div>

        {/* Temple silhouette, bottom-left — balances the chakra top-right.
            Same treatment: low-opacity orange line art, purely ornamental. */}
        <div className="pointer-events-none absolute -bottom-4 -left-4 opacity-[0.12] md:-bottom-6 md:left-0 lg:left-4" aria-hidden="true">
          <svg
            className="h-52 w-48 text-orange-600 md:h-80 md:w-72 lg:h-[24rem] lg:w-[21rem]"
            viewBox="0 0 220 280"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Flag over the central spire */}
            <path d="M110 12 L110 44" />
            <path d="M111.5 14 L136 21 L111.5 28 Z" fill="currentColor" fillOpacity="0.35" stroke="none" />

            {/* Kalash and amalaka */}
            <circle cx="110" cy="48" r="6" />
            <ellipse cx="110" cy="59" rx="13" ry="5" />

            {/* Central shikhara with rib lines */}
            <path d="M110 61 C 90 104, 88 152, 82 198 L 138 198 C 132 152, 130 104, 110 61 Z" />
            <path d="M110 74 L110 198" strokeOpacity="0.5" />
            <path d="M99 112 L95 198" strokeOpacity="0.4" />
            <path d="M121 112 L125 198" strokeOpacity="0.4" />

            {/* Flanking shikharas */}
            <circle cx="64" cy="122" r="4" />
            <path d="M64 126 C 54 150, 53 176, 50 198 L 78 198 C 75 176, 74 150, 64 126 Z" />
            <circle cx="156" cy="122" r="4" />
            <path d="M156 126 C 146 150, 145 176, 142 198 L 170 198 C 167 176, 166 150, 156 126 Z" />

            {/* Entablature, mandapa pillars and doorway */}
            <rect x="44" y="198" width="132" height="12" rx="2" />
            <rect x="52" y="210" width="10" height="46" rx="2" />
            <rect x="82" y="210" width="10" height="46" rx="2" />
            <rect x="128" y="210" width="10" height="46" rx="2" />
            <rect x="158" y="210" width="10" height="46" rx="2" />
            <path d="M100 256 L100 226 Q110 214 120 226 L120 256 Z" />

            {/* Steps */}
            <rect x="46" y="256" width="128" height="7" rx="2" />
            <rect x="38" y="263" width="144" height="7" rx="2" />
            <rect x="30" y="270" width="160" height="8" rx="2" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto text-center relative z-10 mt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Gujarat Devotion Silo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-playfair leading-tight text-slate-900"
          >
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent pb-1 inline-block">
              {mainTitle}
            </span>
            {subTitle && (
              <span className="text-slate-900 block md:inline md:ml-3">
                <span className="hidden md:inline"> — </span>
                {subTitle}
              </span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-700 text-base md:text-lg mb-10 leading-relaxed font-dm"
          >
            {hub?.answer_first || 
              "Gujarat is home to some of India's most ancient and powerful holy shrines. Beyond Somnath and Dwarka, explore these highly revered temples, complete with verified darshan schedules, dress guidelines, and pilgrim travel logistics."}
          </motion.p>

          {/* ==========================================
              SEARCH BAR
              ========================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto relative mb-12 shadow-lg shadow-orange-950/[0.04] rounded-2xl overflow-hidden"
          >
            <div className="flex items-center bg-white border border-orange-100 px-4 py-3.5 rounded-2xl transition-all duration-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10">
              <Search className="w-5.5 h-5.5 text-orange-500 mr-3" />
              <input
                type="text"
                placeholder="Search temples by name, deity, town or significance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-slate-850 placeholder-slate-400 text-sm focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-slate-500 hover:text-slate-700 text-xs bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>

          {/* ==========================================
              FILTER BADGES
              ========================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setExpandedCard(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 transform active:scale-95 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white border-transparent shadow-lg shadow-orange-500/20"
                    : "bg-white text-slate-700 border-orange-100 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 shadow-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          TEMPLES GRID SECTION
          ========================================== */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 -mt-8 relative z-20">
        {/* Results indicator */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Showing {filteredTemples.length} of {enrichedTemples.length} Sacred Sites
          </p>
          {searchQuery && (
            <span className="text-xs text-orange-600 font-semibold">
              Filter active
            </span>
          )}
        </div>

        {filteredTemples.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white border border-orange-50 rounded-2xl shadow-sm p-8"
          >
            <Info className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Temples Found</h3>
            <p className="text-sm text-slate-600">
              Try adjusting your search criteria or category filter.
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTemples.map((temple, index) => {
                const isExpanded = expandedCard === temple.slug;
                const cardGradient = 
                  temple.category === "Shiva & Jyotirlinga" ? "from-blue-600 to-indigo-900" :
                  temple.category === "Krishna & Vishnu" ? "from-teal-600 to-cyan-900" :
                  temple.category === "Shakti/Mata" ? "from-red-600 to-rose-950" :
                  temple.category === "Saint Yatras" ? "from-amber-500 to-orange-850" :
                  temple.category === "Kutch & Border" ? "from-cyan-500 to-blue-800" :
                  temple.category === "Virtual Portal" ? "from-rose-500 to-purple-800" :
                  "from-orange-600 to-amber-900";

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                    key={temple._id}
                    className="group bg-white rounded-3xl border border-orange-50 shadow-md hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Gradient Strip with Deity Icon Overlay */}
                      <div className={`h-36 bg-gradient-to-br ${cardGradient} p-5 relative overflow-hidden flex items-end justify-between`}>
                        {/* Background light ring */}
                        <div className="absolute -right-4 -top-4 w-28 h-28 bg-white/5 rounded-full border border-white/10 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full w-max backdrop-blur-sm mb-1.5">
                            {temple.category}
                          </span>
                          <h3 className="text-xl font-bold text-white font-playfair tracking-wide leading-tight">
                            {temple.temple}
                          </h3>
                        </div>

                        {/* Deity SVG Icon */}
                        <div className="bg-white/95 p-2 rounded-2xl shadow-md border border-white/20 transform group-hover:scale-110 transition duration-300 flex items-center justify-center">
                          {getTempleIcon(temple.category)}
                        </div>
                      </div>

                      {/* Card Content body */}
                      <div className="p-6">
                        {/* Deity Badge */}
                        <div className="flex items-center gap-1.5 mb-4">
                          <span className="text-xs font-semibold text-slate-800 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
                            Deity: {temple.deity}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-slate-650 text-sm leading-relaxed mb-6 font-dm line-clamp-3">
                          {temple.significance}
                        </p>

                        {/* Location Details */}
                        <div className="space-y-2.5 border-t border-slate-100 pt-4 mb-4">
                          <div className="flex items-center text-xs text-slate-700">
                            <MapPin className="w-4 h-4 text-orange-500 mr-2 shrink-0" />
                            <span className="font-semibold text-slate-900 mr-1">Location:</span>
                            {temple.town}{temple.district ? `, ${temple.district} Dist.` : ""}
                          </div>

                          <div className="flex items-center text-xs text-slate-700">
                            <Car className="w-4 h-4 text-orange-500 mr-2 shrink-0" />
                            <span className="font-semibold text-slate-900 mr-1">Distance (from Ahmedabad):</span>
                            {temple.distance_from_ahmedabad}
                          </div>

                          {temple.dress_code && (
                            <div className="flex items-start text-xs text-slate-700">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mr-2 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-slate-900 mr-1">Dress Code:</span>
                                <span className="text-slate-650">{temple.dress_code}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Timings Section */}
                    <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50 flex flex-col gap-3">
                      <div>
                        <button
                          onClick={() => toggleExpand(temple.slug)}
                          className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-orange-600 transition"
                        >
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            {temple.timings_verified ? (
                              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                                Timings Verified
                              </span>
                            ) : (
                              <span>Darshan & Aarti Timings</span>
                            )}
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {/* Collapsible Timing List */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-3 pt-3 border-t border-slate-150"
                            >
                              <div className="space-y-2 text-xs">
                                {temple.timings && temple.timings.length > 0 ? (
                                  temple.timings.map((row, rIdx) => (
                                    <div key={rIdx} className="flex justify-between items-center py-1 border-b border-dashed border-slate-100 last:border-0">
                                      <span className="font-semibold text-slate-800">{row.label}</span>
                                      <span className="text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-100">
                                        {row.open && row.close ? `${row.open} – ${row.close}` : row.open || row.close || "Contact Trust"}
                                      </span>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-slate-500 italic text-center py-1">Timings pending trust verification.</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Card Action Button */}
                      <div className="flex items-center gap-2 mt-2">
                        {temple.slug === "live-darshan-online-aarti" ? (
                          <Link
                            href={`/temples/${temple.slug}/`}
                            className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md shadow-rose-600/10 hover:shadow-rose-600/25 flex items-center justify-center gap-1.5"
                          >
                            <Tv className="w-3.5 h-3.5" />
                            Access Live Darshan
                          </Link>
                        ) : (
                          <>
                            <Link
                              href={`/temples/${temple.slug}/`}
                              className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                            >
                              Details
                            </Link>
                            <button
                              onClick={() => setIsFormOpen(true)}
                              className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/15 hover:shadow-orange-600/30 flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Map className="w-3.5 h-3.5" />
                              Plan Trip
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ==========================================
          PILGRIMAGE TRIP PLANNING CALLOUT
          ========================================== */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-50/20 py-16 px-4 border-t border-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-playfair mb-4">
            Need Help Arranging a Temple Circuit?
          </h2>
          <p className="text-slate-650 text-sm md:text-base mb-8 max-w-2xl mx-auto font-dm leading-relaxed">
            Planning a pilgrimage to multiple cities in Gujarat like Somnath, Dwarka, Dakor, or Kutch? 
            Our expert local travel team designs custom, temple-sequenced itineraries with verified timings, 
            private cabs, and hand-selected hotels near temple areas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/somnath-dwarka-tour-package/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-lg shadow-orange-600/20"
            >
              Explore Tour Packages
            </Link>
            <Link
              href="/somnath-dwarka-taxi-service/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
            >
              Book Private Cab & Driver
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
