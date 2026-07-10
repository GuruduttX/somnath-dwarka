"use client";

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
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

// ==========================================
// HIGHLY COMPREHENSIVE STATIC CALENDAR EVENTS
// ==========================================
const CALENDAR_EVENTS = [
  {
    slug: "maha-shivratri-somnath",
    name: "Maha Shivratri",
    deity: "Lord Shiva (Somnath Jyotirlinga)",
    location: "Somnath Temple",
    city: "Somnath",
    date2026: "February 15, 2026",
    date2027: "March 6, 2027",
    tithi: "Falgun Krishna Chaturdashi",
    crowdLevel: "Very High",
    bookingWindow: "6-10 weeks prior",
    rituals: "Night-long Shiva worship, Bilva leaf offerings, continuous four-phase aartis (Char Prahar Pooja), and beach-side light-and-sound show.",
    travelAdvice: "Darshan queues inside the temple can stretch up to 4-6 hours. Stays along the Somnath Promenade and Triveni Road are completely booked months in advance. Cab rates increase slightly during this peak period.",
    highlights: ["Maha Prahar Puja", "Trishul Shobha Yatra", "Somnath Temple night lighting"],
    filterMonth: "Feb – Mar",
  },
  {
    slug: "holi-dhuleti-dwarka",
    name: "Holi & Dhuleti (Phool Dol Utsav)",
    deity: "Lord Krishna (Ranchhodrai / Dwarkadhish)",
    location: "Dwarka & Dakor Temples",
    city: "Dwarka",
    date2026: "March 3-4, 2026",
    date2027: "March 22-23, 2027",
    tithi: "Falgun Purnima",
    crowdLevel: "High",
    bookingWindow: "4-6 weeks prior",
    rituals: "Splashing of dry organic gulal colors, special decorated flower swings (Dol), and massive groups of foot pilgrims (padyatris) arriving at Dakor and Dwarka.",
    travelAdvice: "Dakor Ranchhodrai Temple sees unprecedented crowds of 500,000+ devotees. If traveling to Dakor, arrive early morning. In Dwarka, booking a hotel near the temple is recommended as city traffic is restricted.",
    highlights: ["Phool Dol Darshan", "Devotional dance", "Padyatri reception"],
    filterMonth: "Feb – Mar",
  },
  {
    slug: "ram-navami-dwarka",
    name: "Ram Navami",
    deity: "Lord Rama (Krishna Incarnation)",
    location: "Dwarkadhish Temple, Dwarka",
    city: "Dwarka",
    date2026: "March 27, 2026",
    date2027: "April 15, 2027",
    tithi: "Chaitra Shukla Navami",
    crowdLevel: "Moderate",
    bookingWindow: "2-4 weeks prior",
    rituals: "Grand midday celebration at 12:00 PM marking Rama's birth, special customized flag changes (Dhwaja Arohan), and distribution of panchamrit prasad.",
    travelAdvice: "A very auspicious day to visit Dwarkadhish. The midday temple hall becomes heavily packed. Stays are manageable, but booking cabs in advance is advised.",
    highlights: ["Midday birth Aarti", "Special Shringar Darshan", "Bhajans"],
    filterMonth: "Apr – May",
  },
  {
    slug: "hanuman-jayanti-salangpur",
    name: "Hanuman Jayanti",
    deity: "Lord Hanuman (Kashtbhanjan Dev)",
    location: "Salangpur Hanuman Temple",
    city: "Salangpur",
    date2026: "April 2, 2026",
    date2027: "April 21, 2027",
    tithi: "Chaitra Purnima",
    crowdLevel: "Very High",
    bookingWindow: "4-6 weeks prior",
    rituals: "Special tail-oil abhishek, continuous chanting of Hanuman Chalisa, Maruti yagna (sacrificial fire), and grand distribution of Boondi prasad.",
    travelAdvice: "Salangpur Hanuman Temple receives over 200,000 pilgrims on Hanuman Jayanti. Ensure you start from Ahmedabad or Rajkot by 5:00 AM to beat the highway traffic jam.",
    highlights: ["Maruti Yagna", "Continuous Hanuman Chalisa", "Swaminarayan Saints assembly"],
    filterMonth: "Apr – May",
  },
  {
    slug: "shravan-maas-somnath",
    name: "Shravan Maas Mondays",
    deity: "Lord Shiva (Somnath Mahadev)",
    location: "Somnath Temple",
    city: "Somnath",
    date2026: "August 10, 17, 24, 31, 2026",
    date2027: "July 30, Aug 6, 13, 20, 27, 2027",
    tithi: "Holy Month of Shravan",
    crowdLevel: "High",
    bookingWindow: "4-6 weeks prior",
    rituals: "Jal-abhishek (water offerings), special theme shringars (ornamental decoration of the Shivlinga), and chanting of Shiv Tandav Stotra.",
    travelAdvice: "Every Monday of Shravan is highly crowded. VIP Darshan passes are recommended for families with elderly members. Plan to stay overnight Sunday to attend the early morning 6:00 AM darshan.",
    highlights: ["Linga decorations", "Special Monday Aarti", "Somnath Promenade security"],
    filterMonth: "Aug – Sep",
  },
  {
    slug: "janmashtami-dwarka-calendar",
    name: "Krishna Janmashtami",
    deity: "Lord Krishna (Dwarkadhish)",
    location: "Dwarkadhish Temple, Dwarka",
    city: "Dwarka",
    date2026: "September 4, 2026",
    date2027: "September 23, 2027",
    tithi: "Shravan Vad Ashtami",
    crowdLevel: "Very High",
    bookingWindow: "8-12 weeks prior",
    rituals: "Midnight birth celebrations with conch blowing, grand Panchamrit bathing of the deity (Abhishek), and raising the sacred flag (Dhwaja).",
    travelAdvice: "This is the single largest event in Dwarka. Stays near the temple charge premium tariffs. Traffic is completely diverted. Plan to walk 1-2 km to reach the temple steps.",
    highlights: ["Midnight Abhishek", "Dhwaja changes", "Janmashtami Yatra"],
    filterMonth: "Aug – Sep",
  },
  {
    slug: "navratri-mata-no-madh",
    name: "Sharad Navratri (9 Nights)",
    deity: "Ashapura Mata & Chamunda Mata",
    location: "Mata No Madh (Kutch) & Chotila",
    city: "Kutch",
    date2026: "October 12 – 21, 2026",
    date2027: "September 30 – October 9, 2027",
    tithi: "Ashwin Shukla Pratipada to Navami",
    crowdLevel: "Very High",
    bookingWindow: "6-8 weeks prior",
    rituals: "Nine nights of traditional Garba devotion, special Maha Havan on Ashtami night, and offering coconuts and red chunris to the mother goddesses.",
    travelAdvice: "Millions of padyatris walk to Mata No Madh from all across India. Highway traffic around Bhuj-Mata No Madh is packed. Book Kutch taxis weeks in advance.",
    highlights: ["Ashtami Havan", "Garba devotion", "Foot pilgrimage queues"],
    filterMonth: "Oct – Nov",
  },
  {
    slug: "dev-diwali-somnath",
    name: "Dev Diwali & Kartik Purnima",
    deity: "Lord Shiva (Somnath) & Lord Krishna (Dwarka)",
    location: "Somnath Temple & Triveni Sangam",
    city: "Somnath",
    date2026: "November 24, 2026",
    date2027: "November 14, 2027",
    tithi: "Kartik Purnima",
    crowdLevel: "Moderate",
    bookingWindow: "3-5 weeks prior",
    rituals: "Auspicious holy bathing dip at Triveni Sangam during sunrise, lighting thousands of clay lamps (deep-daan), and the Somnath Mahadev Mela.",
    travelAdvice: "A very scenic and peaceful spiritual time. Crowds are moderate. Perfect for families looking for quiet darshan paired with holy baths.",
    highlights: ["Triveni Sangam dip", "Lamps offering (Deep Daan)", "Somnath Mela"],
    filterMonth: "Oct – Nov",
  }
];

const MONTHS = ["All", "Feb – Mar", "Apr – May", "Aug – Sep", "Oct – Nov"];
const CITIES = ["All", "Somnath", "Dwarka", "Salangpur", "Kutch"];

interface CalendarClientProps {
  dbFestivals: {
    slug: string;
    festival: string;
    date_this_year?: string;
    date_verified?: boolean;
    rituals?: string;
    travel_advice?: string;
    event_venue?: string;
    deity?: string;
    city?: string;
    season?: string;
    crowd?: string;
    highlights?: string[];
  }[];
}

export default function CalendarClient({ dbFestivals }: CalendarClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMonth, setActiveMonth] = useState("All");
  const [activeCity, setActiveCity] = useState("All");
  const [openForm, setOpenForm] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState("");

  // Merge static calendar events with DB fields if any exist dynamically (as fallback/extension)
  const calendarData = useMemo(() => {
    const data = [...CALENDAR_EVENTS];

    // If there is dynamic data loaded from CMS DB, map it into calendar shape
    dbFestivals.forEach(db => {
      const matchIdx = data.findIndex(item => item.slug === db.slug);
      if (matchIdx !== -1) {
        // override matching fields
        if (db.date_this_year && db.date_verified) {
          data[matchIdx].date2026 = db.date_this_year;
        }
        if (db.rituals) data[matchIdx].rituals = db.rituals;
        if (db.travel_advice) data[matchIdx].travelAdvice = db.travel_advice;
        if (db.event_venue) data[matchIdx].location = db.event_venue;
        if (db.deity) data[matchIdx].deity = db.deity;
        if (db.crowd) data[matchIdx].crowdLevel = db.crowd;
      }
    });

    return data;
  }, [dbFestivals]);

  // Filters logic
  const filteredEvents = useMemo(() => {
    return calendarData.filter(event => {
      const matchesMonth = activeMonth === "All" || event.filterMonth === activeMonth;
      const matchesCity = activeCity === "All" || event.city === activeCity;
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
          Pilgrimage Calendar
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-black leading-tight text-[#3a2416] tracking-tight font-playfair">
          Gujarat <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">Festival Calendar </span> 2026 &amp; 2027
        </h1>
        <p className="mt-4 text-sm md:text-base text-[#6b4c38] leading-relaxed max-w-xl mx-auto">
          Explore the exact lunar tithis, verified calendar dates, crowd advisory metrics, and local logistics tips to plan your yatra safely.
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
              placeholder="Search festivals by name, deity, or rituals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-orange-100 pl-9 pr-4 py-2.5 rounded-2xl text-xs text-[#3a2416] placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-200/50 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Month Filters */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a7358] w-24 shrink-0">By Month:</span>
            <div className="flex flex-wrap gap-1.5">
              {MONTHS.map(month => (
                <button
                  key={month}
                  onClick={() => setActiveMonth(month)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition transform active:scale-95 ${
                    activeMonth === month
                      ? "bg-orange-600 text-white border-transparent shadow-md shadow-orange-600/10"
                      : "bg-slate-50 text-slate-650 border-orange-50 hover:border-orange-200 hover:bg-orange-50/20"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* City/Location Filters */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center pt-2 border-t border-dashed border-orange-50">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a7358] w-24 shrink-0">By City:</span>
            <div className="flex flex-wrap gap-1.5">
              {CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition transform active:scale-95 ${
                    activeCity === city
                      ? "bg-orange-600 text-white border-transparent shadow-md shadow-orange-600/10"
                      : "bg-slate-50 text-slate-650 border-orange-50 hover:border-orange-200 hover:bg-orange-50/20"
                  }`}
                >
                  {city === "All" ? "All Cities" : city}
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
            Found {filteredEvents.length} festivals
          </p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-orange-100 p-8 shadow-sm">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-[#3a2416] mb-1">No Festivals Match Your Filters</h3>
            <p className="text-xs text-[#6b4c38]">Try adjusting the month, city, or search text.</p>
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
                        Crowd: {event.crowdLevel}
                      </span>
                    </div>

                    {/* Timeline Dates Box */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 rounded-2xl border border-orange-50 p-4 mb-6 text-xs">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9a7358] mb-1">
                          2026 Calendar Date
                        </span>
                        <span className="font-extrabold text-[#3a2416] bg-white border border-orange-100 px-2.5 py-1 rounded inline-block">
                          {event.date2026}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9a7358] mb-1">
                          2027 Calendar Date
                        </span>
                        <span className="font-extrabold text-[#3a2416] bg-white border border-orange-100 px-2.5 py-1 rounded inline-block">
                          {event.date2027}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9a7358] mb-1">
                          Hindu Lunar Tithi
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
                          Rituals &amp; Celebrations
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
                          Logistics &amp; Travel Advice
                        </h4>
                        <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-dm">
                          {event.travelAdvice}
                        </p>
                        <div className="flex items-center gap-1.5 pt-2 text-[11px] font-bold text-amber-700 bg-amber-50/50 border border-amber-100/55 p-2 rounded-xl">
                          <Clock size={12} className="shrink-0" />
                          <span>Booking window: {event.bookingWindow}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card CTA */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-end">
                      <button
                        onClick={() => handlePlanClick(event.name)}
                        className="group inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/10 hover:shadow-orange-600/20 cursor-pointer"
                      >
                        Plan Trip Around This Festival
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
            Booking Stays and Cabs for Peak Festivals?
          </h2>
          <p className="text-[#6b4c38] text-xs md:text-sm mb-8 leading-relaxed max-w-xl mx-auto">
            During Janmashtami and Maha Shivratri, tariffs near Dwarkadhish and Somnath increase significantly. 
            We secure direct local inventory for rooms and cabs, keeping tariffs locked and transparent.
          </p>
          <button
            onClick={() => setOpenForm(true)}
            className="px-6 py-3 rounded-2xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-md shadow-orange-600/15"
          >
            Submit Festival Query
          </button>
        </div>
      </div>
    </div>
  );
}
