"use client";

import dynamic from "next/dynamic";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  CalendarDays, 
  ArrowRight, 
  Calendar,
  ChevronRight,
  BadgeAlert,
  Flame,
  FileText,
  CalendarClock
} from "lucide-react";
const CommonEnquiryForm = dynamic(() => import("@/src/utils/CommanEnquiryForm"), { ssr: false });

import type { CalendarCopy, CalendarEvent } from "./content";

/** Filter value meaning "no filter" (the button shows copy.allLabel / copy.allCitiesLabel). */
const ALL = "";

interface CalendarClientProps {
  /** The live calendar entries (site_festival_calendar), already merged with any published Festival CMS items by the server page. */
  events: CalendarEvent[];
  /** The page copy (CMS page "festival-calendar"). */
  copy: CalendarCopy;
}

export default function CalendarClient({ events: calendarData, copy }: CalendarClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMonth, setActiveMonth] = useState(ALL);
  const [activeCity, setActiveCity] = useState(ALL);
  const [openForm, setOpenForm] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState("");

  // Filters logic
  const filteredEvents = useMemo(() => {
    return calendarData.filter(event => {
      const matchesMonth = activeMonth === ALL || event.filterMonth === activeMonth;
      const matchesCity = activeCity === ALL || event.city === activeCity;
      const matchesSearch = 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.rituals.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tithi.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesMonth && matchesCity && matchesSearch;
    });
  }, [calendarData, activeMonth, activeCity, searchQuery]);

  const handlePlanClick = (festivalName: string) => {
    setSelectedFestival(festivalName);
    setOpenForm(true);
  };

  return (
    <div className="w-full bg-[#FFFBF7] py-10">
      <CommonEnquiryForm 
        open={openForm} 
        onClose={() => setOpenForm(false)} 
        defaultService="Tour Package"
      />

      {/* Hero header */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-700">
          <CalendarDays size={14} className="text-orange-500" />
          {copy.badge}
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-black leading-tight text-[#3a2416] tracking-tight font-playfair">
          {copy.h1Start} <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">{copy.h1Highlight} </span> {copy.h1End}
        </h1>
        <p className="mt-4 text-sm md:text-base text-[#6b4c38] leading-relaxed max-w-xl mx-auto">
          {copy.intro}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-sm space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-orange-500" />
            <input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-orange-100 pl-9 pr-4 py-2.5 rounded-2xl text-xs text-[#3a2416] placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-200/50 px-2 py-0.5 rounded-md"
              >
                {copy.clearLabel}
              </button>
            )}
          </div>

          {/* Month Filters */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a7358] w-24 shrink-0">{copy.monthLabel}</span>
            <div className="flex flex-wrap gap-1.5">
              {[ALL, ...copy.months].map(month => (
                <button
                  key={month}
                  onClick={() => setActiveMonth(month)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition transform active:scale-95 ${
                    activeMonth === month
                      ? "bg-orange-600 text-white border-transparent shadow-md shadow-orange-600/10"
                      : "bg-slate-50 text-slate-650 border-orange-50 hover:border-orange-200 hover:bg-orange-50/20"
                  }`}
                >
                  {month === ALL ? copy.allLabel : month}
                </button>
              ))}
            </div>
          </div>

          {/* City/Location Filters */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center pt-2 border-t border-dashed border-orange-50">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a7358] w-24 shrink-0">{copy.cityLabel}</span>
            <div className="flex flex-wrap gap-1.5">
              {[ALL, ...copy.cities].map(city => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition transform active:scale-95 ${
                    activeCity === city
                      ? "bg-orange-600 text-white border-transparent shadow-md shadow-orange-600/10"
                      : "bg-slate-50 text-slate-650 border-orange-50 hover:border-orange-200 hover:bg-orange-50/20"
                  }`}
                >
                  {city === ALL ? copy.allCitiesLabel : city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-5xl mx-auto px-4 space-y-8 pb-16">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {copy.foundLabel.replace("{count}", String(filteredEvents.length))}
          </p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-orange-100 p-8 shadow-sm">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-[#3a2416] mb-1">{copy.empty.title}</h3>
            <p className="text-xs text-[#6b4c38]">{copy.empty.text}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((event, idx) => {
              const isPeak = event.crowdLevel === "Very High";
              const isHigh = event.crowdLevel === "High";

              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                  key={event.slug}
                  className="bg-white rounded-3xl border border-orange-100 shadow-[0_8px_30px_rgba(234,88,12,0.03)] hover:shadow-[0_15px_45px_rgba(234,88,12,0.07)] hover:border-orange-200 transition-all duration-300 overflow-hidden"
                >
                  {/* Top Bar Accent */}
                  <div className="bg-gradient-to-r from-orange-600 to-amber-500 h-1.5 w-full" />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded uppercase tracking-wider">
                            <MapPin size={10} />
                            {event.location}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {event.deity}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-[#3a2416] font-playfair tracking-wide leading-tight">
                          {event.name}
                        </h2>
                      </div>

                      {/* Crowd Warning Badge */}
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border shrink-0 w-max ${
                        isPeak 
                          ? "bg-red-50 text-red-700 border-red-200" 
                          : isHigh 
                            ? "bg-orange-50 text-orange-700 border-orange-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        <BadgeAlert size={13} />
                        {copy.labels.crowd} {event.crowdLevel}
                      </span>
                    </div>

                    {/* Timeline Dates Box */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 rounded-2xl border border-orange-50 p-4 mb-6 text-xs">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9a7358] mb-1">
                          {copy.labels.date2026}
                        </span>
                        <span className="font-extrabold text-[#3a2416] bg-white border border-orange-100 px-2.5 py-1 rounded inline-block">
                          {event.date2026}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9a7358] mb-1">
                          {copy.labels.date2027}
                        </span>
                        <span className="font-extrabold text-[#3a2416] bg-white border border-orange-100 px-2.5 py-1 rounded inline-block">
                          {event.date2027}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9a7358] mb-1">
                          {copy.labels.tithi}
                        </span>
                        <span className="font-extrabold text-[#3a2416] bg-white border border-orange-100 px-2.5 py-1 rounded inline-block">
                          {event.tithi}
                        </span>
                      </div>
                    </div>

                    {/* Detailed info blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm border-t border-slate-100 pt-6">
                      {/* Left: Rituals */}
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-[#3a2416] text-[13px] uppercase tracking-wider flex items-center gap-1.5">
                          <Flame size={14} className="text-orange-500" />
                          {copy.labels.rituals}
                        </h4>
                        <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-dm">
                          {event.rituals}
                        </p>
                        {event.highlights && event.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {event.highlights.map(h => (
                              <span key={h} className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                                • {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Travel Advice */}
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-[#3a2416] text-[13px] uppercase tracking-wider flex items-center gap-1.5">
                          <FileText size={14} className="text-orange-500" />
                          {copy.labels.travel}
                        </h4>
                        <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-dm">
                          {event.travelAdvice}
                        </p>
                        <div className="flex items-center gap-1.5 pt-2 text-[11px] font-bold text-amber-700 bg-amber-50/50 border border-amber-100/55 p-2 rounded-xl">
                          <Clock size={12} className="shrink-0" />
                          <span>{copy.labels.bookingWindow} {event.bookingWindow}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card CTA */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-end">
                      <button
                        onClick={() => handlePlanClick(event.name)}
                        className="group inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/10 hover:shadow-orange-600/20 cursor-pointer"
                      >
                        {copy.labels.planCta}
                        <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Plan Trip Bottom Callout Banner */}
      <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-amber-50/80 border-t border-orange-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <CalendarClock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#3a2416] font-playfair mb-4">
            {copy.callout.title}
          </h2>
          <p className="text-[#6b4c38] text-xs md:text-sm mb-8 leading-relaxed max-w-xl mx-auto">
            {copy.callout.text}
          </p>
          <button
            onClick={() => setOpenForm(true)}
            className="px-6 py-3 rounded-2xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-md shadow-orange-600/15"
          >
            {copy.callout.button}
          </button>
        </div>
      </div>
    </div>
  );
}
