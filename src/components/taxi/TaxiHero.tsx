"use client";

import { useState, useEffect } from "react";
import { 
  MessageSquare, ShieldCheck, UserCheck, CreditCard, Sparkles, 
  Navigation, CheckCircle2, AlertCircle, Clock, Star, 
  Map, Calculator, Users, Info, ChevronRight, Car, Briefcase 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";
import Image from "next/image";

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

// Routing distance/duration database
const ROUTE_DATA: Record<string, Record<string, { distance: string; duration: string; km: number }>> = {
  somnath: {
    dwarka: { distance: "233 km", duration: "4.5 hrs", km: 233 },
    porbandar: { distance: "130 km", duration: "2.5 hrs", km: 130 },
    rajkot: { distance: "190 km", duration: "3.5 hrs", km: 190 },
    diu: { distance: "85 km", duration: "2.0 hrs", km: 85 },
    ahmedabad: { distance: "400 km", duration: "7.5 hrs", km: 400 },
    jamnagar: { distance: "220 km", duration: "4.5 hrs", km: 220 },
  },
  dwarka: {
    somnath: { distance: "233 km", duration: "4.5 hrs", km: 233 },
    porbandar: { distance: "105 km", duration: "2.0 hrs", km: 105 },
    rajkot: { distance: "225 km", duration: "4.5 hrs", km: 225 },
    jamnagar: { distance: "130 km", duration: "2.5 hrs", km: 130 },
    ahmedabad: { distance: "440 km", duration: "8.0 hrs", km: 440 },
    diu: { distance: "310 km", duration: "6.0 hrs", km: 310 },
  },
  ahmedabad: {
    somnath: { distance: "400 km", duration: "7.5 hrs", km: 400 },
    dwarka: { distance: "440 km", duration: "8.0 hrs", km: 440 },
    rajkot: { distance: "215 km", duration: "4.0 hrs", km: 215 },
    jamnagar: { distance: "310 km", duration: "5.5 hrs", km: 310 },
    diu: { distance: "360 km", duration: "7.5 hrs", km: 360 },
  },
  rajkot: {
    somnath: { distance: "190 km", duration: "3.5 hrs", km: 190 },
    dwarka: { distance: "225 km", duration: "4.5 hrs", km: 225 },
    diu: { distance: "175 km", duration: "3.5 hrs", km: 175 },
    jamnagar: { distance: "90 km", duration: "2.0 hrs", km: 90 },
  },
  jamnagar: {
    dwarka: { distance: "130 km", duration: "2.5 hrs", km: 130 },
    somnath: { distance: "220 km", duration: "4.5 hrs", km: 220 },
  },
  diu: {
    somnath: { distance: "85 km", duration: "2.0 hrs", km: 85 },
    dwarka: { distance: "310 km", duration: "6.0 hrs", km: 310 },
  }
};

const CITY_OPTIONS = [
  { value: "somnath", label: "Somnath" },
  { value: "dwarka", label: "Dwarka" },
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "rajkot", label: "Rajkot" },
  { value: "jamnagar", label: "Jamnagar" },
  { value: "diu", label: "Diu" },
];

const VEHICLE_OPTIONS = [
  { value: "sedan", label: "Sedan (Dzire / Etios)", seats: 4, bags: "2 bags", rate: 12.5, image: "/images/taxi/sedan.jpg" },
  { value: "suv", label: "Ertiga (SUV)", seats: 6, bags: "3 bags", rate: 16.0, image: "/images/taxi/mpv.jpg" },
  { value: "innova", label: "Innova Crysta (Premium)", seats: 7, bags: "4 bags", rate: 21.0, image: "/images/taxi/suv.jpg" },
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
  const [activeTab, setActiveTab] = useState<"calc" | "map" | "fleet">("calc");
  
  // Interactive Calculator State
  const [origin, setOrigin] = useState("somnath");
  const [destination, setDestination] = useState("dwarka");
  const [selectedVehicle, setSelectedVehicle] = useState("sedan");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [calcResult, setCalcResult] = useState({
    distance: "233 km",
    duration: "4.5 hrs",
    fare: 4500,
    note: ""
  });

  // Hotspot hover details for Map Tab
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Context-aware initialization
  useEffect(() => {
    // If vehicleName is passed via props, preselect it in the calculator
    if (vehicleName) {
      const vLower = vehicleName.toLowerCase();
      if (vLower.includes("innova")) {
        setSelectedVehicle("innova");
      } else if (vLower.includes("ertiga")) {
        setSelectedVehicle("suv");
      } else {
        setSelectedVehicle("sedan");
      }
    }

    // If airportName is passed, preselect the pickup origin
    if (airportName) {
      const aLower = airportName.toLowerCase();
      if (aLower.includes("diu")) setOrigin("diu");
      else if (aLower.includes("rajkot")) setOrigin("rajkot");
      else if (aLower.includes("jamnagar")) setOrigin("jamnagar");
      else if (aLower.includes("ahmedabad")) setOrigin("ahmedabad");
    }

    if (serves) {
      const sLower = serves.toLowerCase();
      if (sLower.includes("dwarka")) setDestination("dwarka");
      else if (sLower.includes("somnath")) setDestination("somnath");
    }
  }, [vehicleName, airportName, serves]);

  // Recalculate estimates when parameters change
  useEffect(() => {
    if (origin === destination) {
      const baseFare = selectedVehicle === "sedan" ? 3500 : selectedVehicle === "suv" ? 4800 : 6500;
      setCalcResult({
        distance: "Local sightseeing",
        duration: "Full day (8h/80km)",
        fare: isRoundTrip ? baseFare * 1.8 : baseFare,
        note: "Ideal for temples & local stops. Tolls/parking extra."
      });
      return;
    }

    const route = ROUTE_DATA[origin]?.[destination] || ROUTE_DATA[destination]?.[origin];
    let km = 200;
    let distStr = "≈ 200 km";
    let durStr = "~ 4 hours";

    if (route) {
      km = route.km;
      distStr = route.distance;
      durStr = route.duration;
    }

    const vObj = VEHICLE_OPTIONS.find(v => v.value === selectedVehicle);
    const rate = vObj ? vObj.rate : 12.5;

    let fare = 0;
    if (isRoundTrip) {
      // Round trip: minimum 250km per day, or actual double distance
      const totalKm = Math.max(km * 2, 250);
      fare = totalKm * rate;
    } else {
      // One way has a multiplier to cover return run expenses
      const multiplier = origin === "ahmedabad" || destination === "ahmedabad" ? 1.25 : 1.35;
      fare = km * rate * multiplier;
    }

    // Round to nearest ₹50
    const roundedFare = Math.round(fare / 50) * 50;

    setCalcResult({
      distance: distStr,
      duration: durStr,
      fare: roundedFare,
      note: "Estimated base fare. Tolls, state tax & parking charged extra."
    });
  }, [origin, destination, selectedVehicle, isRoundTrip]);

  const hasStats = distance || duration || vehicleName || seats || airportName || serves;

  // Generate dynamic WhatsApp Message
  const getWhatsAppMessage = () => {
    const origLabel = CITY_OPTIONS.find(c => c.value === origin)?.label || origin;
    const destLabel = CITY_OPTIONS.find(c => c.value === destination)?.label || destination;
    const vehLabel = VEHICLE_OPTIONS.find(v => v.value === selectedVehicle)?.label || selectedVehicle;
    const tripType = isRoundTrip ? "Round Trip" : "One-Way";
    
    return `Hi, I am looking to book a taxi:
• Route: ${origLabel} to ${destLabel}
• Journey: ${tripType}
• Vehicle: ${vehLabel}
• Estimated Base Fare: ₹${calcResult.fare}
Please confirm availability and final pricing.`;
  };

  return (
    <>
      <CommonEnquiryForm open={isOpen} onClose={() => setIsOpen(false)} defaultService={ctaContext} />

      <style>{`
        @keyframes taxiUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .taxi-up { opacity:0; animation: taxiUp .6s cubic-bezier(.16,1,0.3,1) forwards; }
        .t-d0{animation-delay:.02s}.t-d1{animation-delay:.08s}.t-d2{animation-delay:.15s}
        .t-d3{animation-delay:.22s}.t-d4{animation-delay:.30s}.t-d5{animation-delay:.38s}

        @keyframes driveTaxi {
          0% { offset-distance: 0%; opacity: 0; }
          4% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .taxi-anim {
          offset-path: path('M 55,235 C 130,290 230,285 320,205 S 470,80 545,110');
          offset-rotate: auto;
          animation: driveTaxi 9s infinite linear;
        }
        @keyframes dashFlow { to { stroke-dashoffset: -80; } }
        .road-flow { animation: dashFlow 4s linear infinite; }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.6); opacity: 0.6; }
        }
        .glow-dot { animation: pulseGlow 2.4s infinite ease-in-out; transform-origin: center; transform-box: fill-box; }
      `}</style>

      <section id="taxi-hero" className="font-dm relative -mt-28 flex w-full flex-col overflow-hidden bg-gradient-to-br from-orange-50/20 via-amber-50/15 to-orange-50/10 pt-10">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-100/50 via-amber-50/40 to-orange-50/30" />
          {/* Glowing blobs */}
          <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-200/35 blur-[100px]" />
          <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] translate-x-1/2 rounded-full bg-amber-200/35 blur-[90px]" />
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: "radial-gradient(#ea580c 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} 
          />
        </div>

        {/* Hero Container */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-4 pt-32 pb-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:px-8 lg:pt-36 lg:pb-12 xl:px-12">
          
          {/* LEFT COLUMN: Header & Info */}
          <div className="flex flex-col">
            {/* Tag Badge */}
            <div className="taxi-up t-d0 inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-800 shadow-xs backdrop-blur-xs">
              <Sparkles size={11} className="text-orange-500 animate-pulse" />
              {badge}
            </div>

            {/* Main H1 Title */}
            <h1 className="taxi-up t-d1 mt-4 text-3.5xl font-black leading-[1.15] tracking-tight bg-gradient-to-r from-[#2d1b10] via-orange-600 to-amber-600 bg-clip-text text-transparent sm:text-4.5xl lg:text-[3.25rem] xl:text-[3.5rem] pb-1">
              {title}
            </h1>

            {/* Description Paragraph */}
            <p className="taxi-up t-d2 mt-4 max-w-xl text-[15px] leading-relaxed text-[#5F4535] sm:text-base">
              {description}
            </p>

            {/* Dynamic context Stats (if visible and no custom parameters are selected yet) */}
            {hasStats && (
              <div className="taxi-up t-d3 mt-6 grid max-w-lg grid-cols-2 gap-[1px] overflow-hidden rounded-xl border border-orange-100 bg-orange-100/50 shadow-sm">
                {distance && (
                  <div className="flex flex-col gap-0.5 bg-white/90 p-3.5 backdrop-blur-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700/70">Segment Distance</span>
                    <span className="text-lg font-extrabold text-[#2d1b10]">{distance}</span>
                  </div>
                )}
                {duration && (
                  <div className="flex flex-col gap-0.5 bg-white/90 p-3.5 backdrop-blur-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700/70">Estimated Time</span>
                    <span className="text-lg font-extrabold text-[#EA580C]">{duration}</span>
                  </div>
                )}
                {vehicleName && (
                  <div className="flex flex-col gap-0.5 bg-white/90 p-3.5 backdrop-blur-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700/70">Vehicle Offered</span>
                    <span className="text-lg font-extrabold text-[#2d1b10]">{vehicleName}</span>
                  </div>
                )}
                {seats && (
                  <div className="flex flex-col gap-0.5 bg-white/90 p-3.5 backdrop-blur-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700/70">Seating Capacity</span>
                    <span className="text-lg font-extrabold text-[#EA580C]">{seats} Seater</span>
                  </div>
                )}
                {airportName && (
                  <div className="col-span-2 flex flex-col gap-0.5 bg-white/90 p-3.5 backdrop-blur-xs sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700/70">Terminal Service</span>
                    <span className="truncate text-base font-extrabold text-[#2d1b10]">{airportName}</span>
                  </div>
                )}
                {serves && (
                  <div className="col-span-2 flex flex-col gap-0.5 bg-white/90 p-3.5 backdrop-blur-xs sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700/70">Serving Region</span>
                    <span className="truncate text-base font-extrabold text-[#2d1b10]">{serves}</span>
                  </div>
                )}
              </div>
            )}

            {/* Rates validation pill */}
            <div className="taxi-up t-d3 mt-4 flex items-center gap-1.5 text-xs">
              {verified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                  <CheckCircle2 size={13} />
                  Verified Fleet & Fares
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1 font-medium text-amber-800">
                  <AlertCircle size={13} className="text-amber-500" />
                  Prices are dynamic & include driver allowance
                </span>
              )}
            </div>

            {/* Left CTAs (Standard fallback trigger) */}
            <div className="taxi-up t-d4 mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3 text-sm font-bold text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer font-dm"
              >
                <Navigation size={14} className="rotate-45" />
                Book Pilgrim Cab
              </button>
              <a
                href={waLink(`Hi, I am looking to book a taxi service: ${ctaContext}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-700 shadow-xs hover:border-orange-300 hover:bg-orange-50/10 transition-transform hover:-translate-y-0.5 font-dm"
              >
                <MessageSquare size={14} />
                WhatsApp Details
              </a>
            </div>

            {/* Trust rating footer */}
            <div className="taxi-up t-d5 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-orange-200/50 pt-5">
              <div className="flex items-center gap-2">
                <div className="flex gap-[1px]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#2d1b10]">4.9 / 5</span>
                <span className="text-xs text-[#8c674e]">(2,400+ trips completed)</span>
              </div>
              <div className="hidden h-4 w-px bg-orange-200/60 sm:block" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5f4535]">
                <Clock size={13} className="text-orange-500" />
                Airport pick-up guarantee
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Dashboard Widget */}
          <div className="taxi-up t-d2 relative w-full lg:min-h-[500px] flex flex-col">
            <div className="w-full h-[515px] rounded-2xl border border-white/60 bg-white/70 shadow-[0_20px_50px_rgba(234,88,12,0.12)] backdrop-blur-lg flex flex-col overflow-hidden">
              
              {/* Tab Navigation Headers */}
              <div className="flex border-b border-orange-100 bg-orange-50/50">
                <button
                  onClick={() => setActiveTab("calc")}
                  className={`flex-1 py-3.5 px-3 flex items-center justify-center gap-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === "calc" 
                      ? "border-orange-500 text-orange-950 bg-white" 
                      : "border-transparent text-gray-500 hover:text-orange-800"
                  }`}
                >
                  <Calculator size={14} />
                  <span>Fare Estimate</span>
                </button>
                <button
                  onClick={() => setActiveTab("map")}
                  className={`flex-1 py-3.5 px-3 flex items-center justify-center gap-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === "map" 
                      ? "border-orange-500 text-orange-950 bg-white" 
                      : "border-transparent text-gray-500 hover:text-orange-800"
                  }`}
                >
                  <Map size={14} />
                  <span>Pilgrimage Map</span>
                </button>
                <button
                  onClick={() => setActiveTab("fleet")}
                  className={`flex-1 py-3.5 px-3 flex items-center justify-center gap-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === "fleet" 
                      ? "border-orange-500 text-orange-950 bg-white" 
                      : "border-transparent text-gray-500 hover:text-orange-800"
                  }`}
                >
                  <Car size={14} />
                  <span>Fleet Class</span>
                </button>
              </div>

              {/* Tab Contents with Framer Motion AnimatePresence */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {activeTab === "calc" && (
                    <motion.div
                      key="calc-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4 flex-1 justify-between animate-fade-in"
                    >
                      {/* Pickers Grid */}
                      <div className="grid grid-cols-2 gap-3.5">
                        {/* Origin Pick */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-orange-800/80">Pickup Town</label>
                          <div className="relative">
                            <select
                              value={origin}
                              onChange={(e) => setOrigin(e.target.value)}
                              className="w-full bg-white border border-orange-100 rounded-lg p-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none shadow-xs"
                            >
                              {CITY_OPTIONS.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</span>
                          </div>
                        </div>

                        {/* Destination Pick */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-orange-800/80">Destination</label>
                          <div className="relative">
                            <select
                              value={destination}
                              onChange={(e) => setDestination(e.target.value)}
                              className="w-full bg-white border border-orange-100 rounded-lg p-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none shadow-xs"
                            >
                              {CITY_OPTIONS.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</span>
                          </div>
                        </div>

                        {/* Vehicle Choice */}
                        <div className="flex flex-col gap-1.5 col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-orange-800/80">Vehicle Fleet Option</label>
                          <div className="relative">
                            <select
                              value={selectedVehicle}
                              onChange={(e) => setSelectedVehicle(e.target.value)}
                              className="w-full bg-white border border-orange-100 rounded-lg p-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none shadow-xs"
                            >
                              {VEHICLE_OPTIONS.map(v => (
                                <option key={v.value} value={v.value}>{v.label} — Max {v.seats} seats</option>
                              ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</span>
                          </div>
                        </div>
                      </div>

                      {/* Journey Type Toggle */}
                      <div className="flex items-center justify-between bg-orange-50/50 p-2.5 rounded-lg border border-orange-100/50 mt-1">
                        <span className="text-xs font-bold text-orange-950">Journey Booking Type</span>
                        <div className="flex items-center bg-white border border-orange-100 rounded-md p-0.5 shadow-inner">
                          <button
                            type="button"
                            onClick={() => setIsRoundTrip(false)}
                            className={`px-3 py-1 text-[11px] font-bold rounded transition-colors cursor-pointer ${
                              !isRoundTrip ? "bg-orange-500 text-white" : "text-gray-600 hover:text-orange-800"
                            }`}
                          >
                            One Way
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsRoundTrip(true)}
                            className={`px-3 py-1 text-[11px] font-bold rounded transition-colors cursor-pointer ${
                              isRoundTrip ? "bg-orange-500 text-white" : "text-gray-600 hover:text-orange-800"
                            }`}
                          >
                            Round Trip
                          </button>
                        </div>
                      </div>

                      {/* Estimates Output Panel */}
                      <div className="mt-3.5 bg-gradient-to-br from-orange-50/65 to-amber-50/60 rounded-xl p-4 border border-orange-100/70 shadow-inner flex flex-col justify-center h-[115px]">
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="text-[11px] font-bold text-[#8c674e] uppercase tracking-wider">Estimated Base Fare</span>
                          <span className="text-2xl font-black text-orange-600">₹{calcResult.fare.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-3.5 text-xs text-[#5f4535] font-semibold border-t border-orange-200/40 pt-2 mb-1.5">
                          <div className="flex items-center gap-1">
                            <Navigation size={13} className="text-orange-500 rotate-45" />
                            <span>{calcResult.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={13} className="text-orange-500" />
                            <span>{calcResult.duration}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">
                          * {calcResult.note || "Fare is base pricing for this segment. Includes driver charges."}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <a
                          href={waLink(getWhatsAppMessage())}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 px-3 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-green-500 hover:shadow-md rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:-translate-y-0.5 font-dm"
                        >
                          <MessageSquare size={13} />
                          <span>WhatsApp Book</span>
                        </a>
                        <button
                          onClick={() => setIsOpen(true)}
                          className="flex-1 py-3 px-3 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:shadow-md rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-transform hover:-translate-y-0.5 font-dm"
                        >
                          <span>Request Callback</span>
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "map" && (
                    <motion.div
                      key="map-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between animate-fade-in"
                    >
                      {/* Animated Map Panel */}
                      <div className="relative w-full h-[260px] bg-slate-50 border border-orange-100 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                        <svg className="h-full w-full" viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                          <defs>
                            <linearGradient id="mapRoadGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0" stopColor="#EA580C" />
                              <stop offset="1" stopColor="#F59E0B" />
                            </linearGradient>
                          </defs>

                          {/* Coast line */}
                          <path
                            d="M 30,290 C 150,308 300,288 420,262 S 560,205 585,212"
                            stroke="#dbeafe" strokeWidth="2.5" strokeDasharray="6 6" fill="none"
                          />
                          <text x="470" y="275" fill="#93c5fd" fontSize="11" fontStyle="italic" fontFamily="system-ui" opacity="0.8">Arabian Sea</text>

                          {/* Road shadow */}
                          <path
                            d="M 55,235 C 130,290 230,285 320,205 S 470,80 545,110"
                            stroke="#ffeada" strokeWidth="12" strokeLinecap="round" fill="none"
                          />
                          {/* Road base */}
                          <path
                            d="M 55,235 C 130,290 230,285 320,205 S 470,80 545,110"
                            stroke="url(#mapRoadGrad)" strokeOpacity="0.25" strokeWidth="5" strokeLinecap="round" fill="none"
                          />
                          {/* Animated flowing dashes */}
                          <path
                            className="road-flow"
                            d="M 55,235 C 130,290 230,285 320,205 S 470,80 545,110"
                            stroke="url(#mapRoadGrad)" strokeWidth="3.5" strokeDasharray="3 15" strokeLinecap="round" fill="none"
                          />

                          {/* Somnath Hotspot */}
                          <g 
                            onMouseEnter={() => setHoveredLocation("somnath")}
                            onMouseLeave={() => setHoveredLocation(null)}
                            className="cursor-pointer"
                          >
                            <circle cx="55" cy="235" r="18" fill="#EA580C" fillOpacity="0.1" className="glow-dot" />
                            <circle cx="55" cy="235" r="7" fill="#EA580C" stroke="#fff" strokeWidth="1.5" />
                            <text x="55" y="213" fill="#2d1b10" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="system-ui">Somnath</text>
                          </g>

                          {/* Porbandar Hotspot */}
                          <g 
                            onMouseEnter={() => setHoveredLocation("porbandar")}
                            onMouseLeave={() => setHoveredLocation(null)}
                            className="cursor-pointer"
                          >
                            <circle cx="320" cy="205" r="16" fill="#f59e0b" fillOpacity="0.1" className="glow-dot" style={{ animationDelay: "-0.8s" }} />
                            <circle cx="320" cy="205" r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                            <text x="320" y="228" fill="#7a5238" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="system-ui">Porbandar</text>
                          </g>

                          {/* Dwarka Hotspot */}
                          <g 
                            onMouseEnter={() => setHoveredLocation("dwarka")}
                            onMouseLeave={() => setHoveredLocation(null)}
                            className="cursor-pointer"
                          >
                            <circle cx="545" cy="110" r="18" fill="#EA580C" fillOpacity="0.1" className="glow-dot" style={{ animationDelay: "-1.6s" }} />
                            <circle cx="545" cy="110" r="7" fill="#EA580C" stroke="#fff" strokeWidth="1.5" />
                            <text x="545" y="88" fill="#2d1b10" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="system-ui">Dwarka</text>
                          </g>

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

                        {/* Quick guidance floating tooltip */}
                        <div className="absolute top-2 right-2 text-[9px] font-bold text-orange-900 bg-orange-100/90 border border-orange-200 px-2 py-0.5 rounded shadow-sm">
                          Hover points for details
                        </div>
                      </div>

                      {/* Tooltip Description Panel */}
                      <div className="mt-3 bg-orange-50/50 border border-orange-100 rounded-xl p-3 flex-1 flex flex-col justify-center h-[130px]">
                        {hoveredLocation === "somnath" && (
                          <div>
                            <h4 className="text-xs font-extrabold text-[#2d1b10] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Somnath Pilgrim Center
                            </h4>
                            <p className="text-[11px] text-[#5f4535] mt-1 leading-relaxed">
                              Famous for the first of twelve Jyotirlinga temples. Anchors the southern end of the Saurashtra coastal pilgrimage corridor.
                            </p>
                          </div>
                        )}
                        {hoveredLocation === "porbandar" && (
                          <div>
                            <h4 className="text-xs font-extrabold text-[#2d1b10] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Porbandar (Midway Stop)
                            </h4>
                            <p className="text-[11px] text-[#5f4535] mt-1 leading-relaxed">
                              Perfect rest-stop located midway (130km from Somnath, 105km to Dwarka). Tour highlights include Sudama Mandir and Kirti Mandir.
                            </p>
                          </div>
                        )}
                        {hoveredLocation === "dwarka" && (
                          <div>
                            <h4 className="text-xs font-extrabold text-[#2d1b10] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Dwarka Devbhumi
                            </h4>
                            <p className="text-[11px] text-[#5f4535] mt-1 leading-relaxed">
                              Kingdom of Lord Krishna, home to the sacred Dwarkadhish Temple. Gateway to Bet Dwarka island, Nageshwar, and Rukmini Devi temple.
                            </p>
                          </div>
                        )}
                        {!hoveredLocation && (
                          <div className="text-center py-2">
                            <h4 className="text-xs font-extrabold text-[#8c674e] flex items-center justify-center gap-1">
                              <Info size={13} className="text-orange-400" />
                              Saurashtra Highway Corridor
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-1">
                              Approx. 233 km road distance. Major road segments run alongside the scenic Arabian sea shoreline via NH-51.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "fleet" && (
                    <motion.div
                      key="fleet-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between animate-fade-in"
                    >
                      {/* Compact Fleet List */}
                      <div className="space-y-3">
                        {VEHICLE_OPTIONS.map((veh) => (
                          <div
                            key={veh.value}
                            onClick={() => {
                              setSelectedVehicle(veh.value);
                              setActiveTab("calc");
                            }}
                            className={`flex border rounded-xl overflow-hidden hover:border-orange-400 transition-colors cursor-pointer bg-white ${
                              selectedVehicle === veh.value ? "border-orange-400 shadow-xs" : "border-orange-100"
                            }`}
                          >
                            {/* Photo Thumbnail */}
                            <div className="relative w-20 h-16 shrink-0 bg-gray-100">
                              <Image
                                src={veh.image}
                                alt={veh.label}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>
                            
                            {/* Stats */}
                            <div className="p-2.5 flex-1 flex items-center justify-between gap-2">
                              <div className="leading-tight">
                                <h4 className="text-xs font-extrabold text-gray-900">{veh.label}</h4>
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 font-semibold">
                                  <span className="flex items-center gap-0.5">
                                    <Users size={10} className="text-orange-400" /> {veh.seats} Seats
                                  </span>
                                  <span className="flex items-center gap-0.5">
                                    <Briefcase size={10} className="text-orange-400" /> {veh.bags}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-[10px] font-bold text-orange-800 uppercase tracking-wider">Starts At</p>
                                <p className="text-xs font-extrabold text-orange-600">₹{veh.rate.toFixed(1)}/km</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Small trust band */}
                      <div className="mt-4 bg-orange-50/50 border border-orange-100/50 rounded-xl p-3 flex items-center gap-3.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                          <ShieldCheck size={14} />
                        </span>
                        <div className="leading-tight">
                          <p className="text-[11px] font-bold text-[#2d1b10]">All-inclusive Pilgrimage Circuit Rates</p>
                          <p className="text-[9.5px] text-gray-500">Chauffeur allowance & driver food costs are fully covered.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom features strip */}
              <div className="bg-orange-50/40 border-t border-orange-100 p-3.5 grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-[#8c674e] uppercase tracking-wider">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck size={12} className="text-orange-500" />
                  <span>GPS Tracking</span>
                </div>
                <div className="flex items-center justify-center gap-1 border-x border-orange-100">
                  <UserCheck size={12} className="text-orange-500" />
                  <span>AC Comfort</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CreditCard size={12} className="text-orange-500" />
                  <span>No Hidden Fees</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Wavy transition divider to white page body */}
        <div className="relative z-10 -mb-px w-full pointer-events-none select-none" aria-hidden="true">
          <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-[50px] w-full sm:h-[70px] lg:h-[90px]">
            <path d="M0,25 C180,85 360,5 540,45 C720,85 900,15 1080,55 C1200,80 1340,35 1440,50 L1440,110 L0,110 Z" fill="rgba(234,88,12,0.04)" />
            <path d="M0,50 C120,15 300,75 480,53 C660,31 840,77 1020,57 C1160,41 1320,70 1440,60 L1440,110 L0,110 Z" fill="rgba(251,146,60,0.06)" />
            <path d="M0,70 C200,35 380,93 560,73 C740,53 920,90 1100,75 C1240,63 1360,80 1440,73 L1440,110 L0,110 Z" fill="white" />
          </svg>
        </div>

      </section>
    </>
  );
}
