
const pillars = [
  {
    emoji: "",
    title: "Gujarat-Born Team",
    desc: "Our team grew up in Dwarka and Somnath. These are not destinations — they are home.",
  },
  {
    emoji: "🤝",
    title: "No Third-Party Handoffs",
    desc: "We handle every aspect in-house. No outsourcing, no middlemen, no surprises.",
  },
  {
    emoji: "🛕",
    title: "Temple-First Planning",
    desc: "Every itinerary is designed around the spiritual rhythm of the Gujarat circuit.",
  },
  {
    emoji: "🌿",
    title: "Seva Bhav Approach",
    desc: "This is not a business transaction. It is an act of service — the way Gurudutt built it.",
  },
];

const delays = ["80", "160", "280", "400"] as const;

export default function AboutWhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-white py-5 md:py-20">

      {/* Decorative blob */}
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-orange-50 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-48 w-48 rounded-full bg-amber-50 blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="mb-2 text-center">
          <span data-reveal="scale" className="mb-4 inline-block rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-600">
            Our Identity
          </span>
          <h2 data-reveal="up" data-delay="80" className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Who We <span className="text-orange-500">Are</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — text */}
          <div className="space-y-5 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p data-reveal="left">
              <strong className="text-gray-900">Somnath Dwarka Guide</strong> is a dedicated
              pilgrimage travel platform created and operated by{" "}
              <a href="https://experiencemyindia.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-500 underline decoration-orange-300 underline-offset-2 transition hover:text-orange-600">Experience My India</a> — a travel
              organization with deep roots in India&apos;s most sacred destinations.
            </p>

            <p data-reveal="left" data-delay="120">
              While Experience My India serves travellers across the country, Somnath Dwarka
              Guide was built for one specific purpose: to be the most trusted, most accurate, and
              most human resource for anyone travelling to the{" "}
              <strong className="text-gray-900">Gujarat Spiritual Circuit</strong> — Dwarka, Somnath,
              Nageshwar, Bet Dwarka, and the larger Saurashtra pilgrimage circuit.
            </p>

            <p data-reveal="left" data-delay="220">
              We are not a content aggregator. We are not a booking portal that outsources your
              yatra to third parties. We are a team of people who were born here, live here, and
              have spent years understanding what a pilgrim truly needs — not just which temples to
              visit, but how to visit them with peace, preparation, and spiritual clarity.
            </p>

            {/* Pull quote — slides in from left with left-border accent */}
            <div
              data-reveal="left"
              data-delay="340"
              className="rounded-r-2xl border-l-4 border-orange-500 bg-orange-50 p-5 italic text-gray-800"
            >
              When you plan your Somnath Dwarka yatra with us, you are in the hands of people
              who know the sound of Dwarkadhish&apos;s aarti at dawn, the feeling of walking the
              Somnath shore at dusk, and the exact time the light &amp; sound show begins to glow. That
              is not information we researched.{" "}
              <strong className="not-italic">That is our daily life.</strong>
            </div>
          </div>

          {/* Right — pillar cards stagger in */}
          <div className="space-y-4">
            {pillars.map((item, i) => (
              <div
                key={i}
                data-reveal="right"
                data-delay={delays[i]}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all duration-300 hover:border-orange-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-2xl transition-transform duration-300 hover:scale-110">
                  {item.emoji}
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
