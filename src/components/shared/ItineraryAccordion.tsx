export type ItineraryDay = {
  day: number;
  title: string;
  description?: string;
  stops?: string[];
};

/**
 * Day-wise itinerary accordion (SOP §6) — DOM-persistent via <details>,
 * first day open by default. Content is always in server HTML.
 */
export default function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  if (!days?.length) return null;
  return (
    <div className="space-y-3">
      {days.map((d, i) => (
        <details
          key={d.day}
          open={i === 0}
          className="border border-orange-100 rounded-xl bg-white overflow-hidden"
        >
          <summary className="cursor-pointer list-none px-5 py-4 flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E87722] text-white text-sm font-bold flex items-center justify-center">
              {d.day}
            </span>
            <span className="font-medium text-gray-800">{d.title}</span>
          </summary>
          <div className="px-5 pb-4 pl-16 text-gray-600 leading-relaxed">
            {d.description ? <p className="mb-2">{d.description}</p> : null}
            {d.stops?.length ? (
              <ul className="list-disc pl-5 space-y-1">
                {d.stops.map((s, si) => (
                  <li key={si}>{s}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
