import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/src/components/shared/PageShell";
import { waLink } from "@/src/config/site";
import {
  Home,
  Compass,
  Car,
  MapPin,
  Calendar,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found — Somnath Dwarka Tour Package",
  description: "The page you are looking for does not exist or has moved. Explore our Somnath–Dwarka tour packages, taxi services, and travel guides.",
  robots: {
    index: false,
    follow: false,
  },
};

const POPULAR_PAGES = [
  {
    title: "Somnath Dwarka Tour Packages",
    desc: "3, 4 & 5-day all-inclusive pilgrimage packages with hotel & cab.",
    href: "/somnath-dwarka-tour-package/",
    icon: Compass,
  },
  {
    title: "Dedicated Cab & Taxi Service",
    desc: "Door-to-door AC taxi for Dwarka, Somnath, Diu, and Rajkot.",
    href: "/somnath-dwarka-taxi-service/",
    icon: Car,
  },
  {
    title: "Dwarkadhish Temple & Sightseeing",
    desc: "Darshan timings, aarti schedules, and Bet Dwarka guides.",
    href: "/dwarka/",
    icon: MapPin,
  },
  {
    title: "Somnath Jyotirlinga & Aarti Guide",
    desc: "Daily temple timings, light & sound show, and nearby spots.",
    href: "/somnath/",
    icon: Sparkles,
  },
  {
    title: "Trip Planner & Fare Calculator",
    desc: "Free tools to estimate cab fares and craft day-wise itineraries.",
    href: "/tools/",
    icon: Calendar,
  },
  {
    title: "Compare Packages & Routes",
    desc: "Side-by-side comparison tables to find the best route.",
    href: "/compare/",
    icon: ArrowRight,
  },
];

export default function NotFound() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Page Not Found", path: "/404/" }]}>
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-6">
          <span>Error 404</span>
          <span className="h-1 w-1 rounded-full bg-orange-400" />
          <span>Page Not Found</span>
        </div>

        {/* Big visual number */}
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight text-gray-900">
          <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
          Looks Like You Took a Detour on the Pilgrimage Trail
        </h2>

        <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
          The page or sacred destination you are looking for might have been moved, renamed, or is temporarily unavailable.
          Let us help you find the right path for your yatra.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600 transition"
          >
            <Home size={18} />
            <span>Return to Home</span>
          </Link>

          <a
            href={waLink("Hi, I was browsing your website and need help finding a package or guide.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 px-6 py-3.5 text-sm font-bold text-green-800 hover:bg-green-100 hover:border-green-400 transition"
          >
            <MessageSquare size={18} className="text-green-600" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-700 hover:border-orange-300 hover:bg-orange-50/50 transition"
          >
            <PhoneCall size={18} className="text-orange-500" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Popular Destinations & Shortcuts */}
        <div className="mt-16 text-left">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center sm:text-left">
            Popular Pilgrimage Guides &amp; Tour Packages
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_PAGES.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-orange-100 bg-white p-5 shadow-sm hover:border-[#E87722] hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600 mb-3 group-hover:bg-orange-500 group-hover:text-white transition">
                      <Icon size={20} />
                    </span>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-600 group-hover:translate-x-1 transition">
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
