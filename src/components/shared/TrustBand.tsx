/**
 * Trust band (SOP §6) — reusable strip of trust signals. Shows only genuine,
 * non-fabricated claims (no invented ratings — SOP §12 gate).
 */
const SIGNALS = [
  { icon: "🛕", label: "Temple-first itineraries" },
  { icon: "🚗", label: "Verified cab partners" },
  { icon: "📞", label: "Real human support" },
  { icon: "🧾", label: "Transparent pricing" },
];

export default function TrustBand() {
  return (
    <section className="bg-orange-50/60 border-y border-orange-100" aria-label="Why travellers choose us">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {SIGNALS.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center gap-2">
            <span aria-hidden="true" className="text-3xl">
              {s.icon}
            </span>
            <span className="text-sm font-medium text-gray-700">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
