export default function PoojaIncludesStrip() {
  const includes = [
    { label: "Experienced Pandit", icon: "👳" },
    { label: "Pooja Samagri", icon: "🪔" },
    { label: "Temple Arrangement", icon: "🛕" },
    { label: "Guided Rituals", icon: "📿" },
    { label: "Sacred Mantras", icon: "🕉️" },
  ];

  return (
    <section className="relative py-14 mb-3 px-6 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600">

      {/* Decorative blurred orbs */}
      <div className="absolute -top-10 -left-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Label */}
        <p className="text-center text-white/70 text-xs uppercase tracking-[0.2em] font-semibold mb-8">
          Everything Included In Every Booking
        </p>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {includes.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full 
                bg-white/15 backdrop-blur-sm border border-white/25
                hover:bg-white hover:border-white
                transition-all duration-200 cursor-pointer"
            >
              <span className="text-xl leading-none group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="text-white group-hover:text-amber-700 font-semibold text-sm tracking-wide transition-colors duration-200">
                {item.label}
              </span>

              {/* Tick on hover */}
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-[10px] font-bold
                flex items-center justify-center opacity-0 group-hover:opacity-100 -ml-1
                transition-opacity duration-200">
                ✓
              </span>
            </div>
          ))}
        </div>

        {/* Divider dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all ${i === 2 ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35"}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}