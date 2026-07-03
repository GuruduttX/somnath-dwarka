import { ChevronDown, MapPin, Clock } from "lucide-react";

export type ItineraryDay = {
  day: number;
  title: string;
  description?: string;
  stops?: string[];
};

/**
 * Helper to generate realistic metadata matching the sleek screenshot layout
 */
function getMetadataForDay(dayNum: number, title: string, stops?: string[]) {
  const t = title.toLowerCase();
  let duration = "Full Day";
  let activity = "Temple Visits";

  if (t.includes("arrival") || t.includes("arrive")) {
    duration = "Full Day";
    activity = "Arrival Transfer";
  } else if (t.includes("departure") || t.includes("depart") || t.includes("drop")) {
    duration = "Full Day";
    activity = "Departure Transfer";
  } else if (t.includes("somnath")) {
    duration = "Full Day";
    activity = "Temple Visits";
  } else if (t.includes("dwarka")) {
    duration = "Full Day";
    activity = "Temple Visits";
  }

  return { duration, activity };
}

/**
 * Day-wise itinerary accordion (SOP §6) — DOM-persistent via <details>,
 * first day open by default. Content is always in server HTML.
 */
export default function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  if (!days?.length) return null;
  return (
    <div className="space-y-4">
      {days.map((d, i) => {
        const meta = getMetadataForDay(d.day, d.title, d.stops);
        return (
          <details
            key={d.day}
            open={i === 0}
            className="group border border-[#FFE4CC] rounded-2xl bg-white overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.02)] transition-all duration-300 open:shadow-[0_12px_35px_rgba(234,88,12,0.03)]"
          >
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 select-none">
              <div className="flex items-center gap-4">
                {/* Sleek Squircle Day Badge - dynamic orange on open, peach on close */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold transition-all duration-200 bg-[#FFF0E0] group-open:bg-orange-500 shadow-sm">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold leading-none mb-0.5 text-orange-600 group-open:text-orange-100 transition-colors">
                    Day
                  </span>
                  <span className="text-lg font-black leading-none text-orange-600 group-open:text-white transition-colors">
                    {d.day}
                  </span>
                </div>
                
                {/* Title & Metadata info */}
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-bold text-slate-800 text-[15px] sm:text-[17px] tracking-tight leading-tight">
                    {d.title}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-500">
                    <span className="flex items-center gap-1 opacity-90">
                      <Clock size={11} className="text-orange-500" />
                      {meta.duration}
                    </span>
                    <span className="text-orange-200 select-none">|</span>
                    <span className="flex items-center gap-1 opacity-90">
                      <MapPin size={11} className="text-orange-500" />
                      {meta.activity}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown size={20} strokeWidth={2.2} className="text-orange-500 transition-transform duration-300 group-open:rotate-180 mr-1 shrink-0" />
            </summary>

            <div className="h-px bg-[#FFE4CC] mx-5" />

            <div className="px-5 pb-5 pt-4 text-slate-600 text-sm sm:text-base leading-relaxed bg-white">
              <div className="pl-0 sm:pl-[64px]">
                {d.description ? (
                  <p className="text-slate-600 leading-relaxed font-medium">{d.description}</p>
                ) : null}
                {d.stops?.length ? (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600 mb-2">Stops en route</p>
                    <div className="flex flex-wrap gap-2">
                      {d.stops.map((s, si) => (
                        <span
                          key={si}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-50/60 border border-orange-100/30 text-orange-700 text-xs font-semibold shadow-sm shadow-orange-500/2 hover:scale-[1.02] transition-transform cursor-default"
                        >
                          <MapPin size={11} className="text-orange-500" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Decorative timeline dashes at bottom */}
                <div className="flex items-center gap-1 mt-5">
                  <span className="w-10 h-1 rounded-full bg-orange-500" />
                  <span className="w-4.5 h-1 rounded-full bg-[#FFEAD6]" />
                  <span className="w-2.5 h-1 rounded-full bg-[#FFF5EB]" />
                </div>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
