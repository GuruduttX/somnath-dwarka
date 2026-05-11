"use client";

interface BlogHeroProps {
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

export default function BlogHero({
  title,
  category,
  date,
  author,
  image,
}: BlogHeroProps) {
  return (
    <header className="relative pt-28 sm:pt-32 md:pt-36 pb-16 px-4 sm:px-8 lg:px-16 bg-linear-to-br from-orange-600 via-orange-400 to-amber-500 overflow-hidden">

      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-300 opacity-30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-20"
        >
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* LEFT */}
        <div className="space-y-4 text-white text-center md:text-left">

          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full border border-white/30">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            {category}
          </span>

          {/* Title — clamp prevents overflow on any screen size */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold leading-snug tracking-tight">
            {title}
          </h1>

          <div className="w-12 h-[2px] bg-white/60 mx-auto md:mx-0" />

          <p className="text-white/85 text-sm max-w-sm mx-auto md:mx-0 leading-relaxed">
            Discover history, darshan timings, aarti schedule, location details,
            and helpful travel tips for devotees.
          </p>

          {/* Author */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center font-bold text-sm shrink-0">
              {author.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">{author}</p>
              <p className="text-xs text-white/70">
                {new Date(date).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1">
            <button className="bg-white text-orange-600 px-5 py-2.5 rounded-full font-semibold text-sm shadow hover:shadow-lg transition">
              Plan Your Visit
            </button>
            <button className="text-white/90 hover:text-white flex items-center gap-1 text-sm">
              Learn More →
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full mt-2 md:mt-0">

          {/* Image Card — aspect-ratio keeps image fully visible without fixed crop */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-[16/10] w-full">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-white text-xs font-bold uppercase">Temple Darshan</p>
                <p className="text-white/70 text-xs">Open Daily</p>
              </div>
              <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                ● Live
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { value: "500+", label: "Heritage" },
              { value: "10K+", label: "Visitors" },
              { value: "365", label: "Days Open" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/20 backdrop-blur rounded-xl py-2.5"
              >
                <p className="text-white font-bold text-sm sm:text-base">{s.value}</p>
                <p className="text-white/70 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}