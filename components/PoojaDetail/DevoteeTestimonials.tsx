export default function DevoteeTestimonials() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      location: "Delhi",
      initials: "RS",
      rating: 5,
      text: "The pooja arrangement in Vrindavan was truly divine. Everything was organized perfectly and the pandit guided us throughout the ritual.",
      pooja: "Rukmini Vivah Pooja",
    },
    {
      name: "Anjali Verma",
      location: "Mumbai",
      initials: "AV",
      rating: 5,
      text: "A wonderful spiritual experience! The entire process was smooth and the team ensured that every ritual was performed properly.",
      pooja: "Satyanarayan Katha",
    },
    {
      name: "Suresh Gupta",
      location: "Jaipur",
      initials: "SG",
      rating: 5,
      text: "Performing pooja in Mathura was a dream come true. Highly recommended for anyone seeking blessings and peace.",
      pooja: "Mathura Darshan Pooja",
    },
  ];

  return (
    <section className="py-12 md:py-24 px-6 mb-0 rounded-2xl relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-200 inline-block" />
            <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
              Devotee Stories
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            What Our <span className="text-amber-200">Devotees Say</span>
          </h2>

          <div className="flex items-center justify-center gap-2 mt-4 mb-5">
            <div className="h-px w-10 bg-white/30 rounded-full" />
            <div className="h-0.5 w-16 bg-white/70 rounded-full" />
            <div className="h-px w-10 bg-white/30 rounded-full" />
          </div>

          <p className="text-white/70 max-w-xl mx-auto text-[15px] leading-relaxed">
            Hear what devotees say about their spiritual experience in Mathura
            and Vrindavan.
          </p>
        </div>

        {/* Cards */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative flex-none w-[85vw] max-w-[320px] md:w-auto md:max-w-none snap-center md:snap-align-none
                bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-7
                hover:bg-white/20 hover:border-white/35 hover:-translate-y-1.5
                transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Quote icon */}
                <div
                  className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center
                  text-amber-200 text-xl font-serif leading-none"
                >
                  "
                </div>

                {/* Star rating */}
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-300 text-sm">
                      ★
                    </span>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-white/85 text-sm leading-relaxed">
                  {item.text}
                </p>

                {/* Pooja tag */}
                <div
                  className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full
                  bg-white/15 border border-white/20"
                >
                  <span className="text-[10px]">🛕</span>
                  <span className="text-white/70 text-[11px] font-medium tracking-wide">
                    {item.pooja}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/15" />

                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-400
                      flex items-center justify-center text-white font-bold text-sm shadow-md"
                    >
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-none">
                        {item.name}
                      </p>
                      <p className="text-white/55 text-xs mt-1 leading-none">
                        📍 {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Verified badge */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-400/20 border border-green-300/30">
                    <span className="text-green-300 text-[10px]">✓</span>
                    <span className="text-green-300 text-[10px] font-semibold">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust row */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
          {[
            { value: "10,000+", label: "Happy Devotees" },
            { value: "4.9 ★", label: "Average Rating" },
            { value: "50+", label: "Temples Covered" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <p className="text-white font-extrabold text-2xl leading-none">
                {stat.value}
              </p>
              <p className="text-white/60 text-xs uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
