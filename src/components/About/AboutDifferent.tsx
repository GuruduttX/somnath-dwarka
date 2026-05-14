
const facts = [
  "We visit the temples ourselves — every season, not once",
  "We verify the darshan timings before publishing",
  "We know when Dwarkadhish's aarti gets crowded during festivals",
  "We know the best coastal routes to avoid seasonal traffic",
  "We know which hotels have accessible rooms for elderly pilgrims",
  "We know exactly how long the ferry takes from Okha to Bet Dwarka on a busy Sunday",
  "Every vehicle we send is our vehicle — not a third-party contractor",
  "Every guide we assign knows the Gujarat spiritual circuit the way we know it",
];

export default function AboutDifferent() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-orange-50 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-48 w-48 rounded-full bg-amber-50 blur-3xl opacity-50" />
      
      {/* subtle dot pattern */}
      <div
        className="
          absolute inset-0 opacity-[0.035]
          bg-[radial-gradient(circle,#c2410c_1px,transparent_1px)]
          bg-[size:28px_28px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="mb-2 text-center">
          <span data-reveal="scale" className="mb-4 inline-block rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-600">
            Our Difference
          </span>
          <h2 data-reveal="up" data-delay="80" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Why Somnath Dwarka Guide Is{" "}
            <span className="text-orange-500">Different</span>
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — text */}
          <div className="space-y-5 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p data-reveal="left" className="text-gray-600">
              Most travel websites covering Dwarka and Somnath are built at a desk, sourcing
              information from other websites that source from other websites. Timings are copied
              without verification. Itineraries are built without any understanding of crowd
              patterns or temple rhythms. Accommodation is recommended without being visited.
            </p>

            {/* Bold "we are here" statement — breathes after reveal */}
            <div
              data-reveal="scale"
              data-delay="160"
              className="about-breathe rounded-2xl bg-orange-500 px-7 py-7 text-2xl font-bold text-white shadow-xl sm:text-3xl"
            >
              We are different for one simple reason:{" "}
              <span className="italic text-orange-100">we are here.</span>
            </div>

            <p data-reveal="left" data-delay="280">
              Our team maintains an active physical presence on the{" "}
              <strong className="text-gray-900">Dwarka–Somnath Highway, Gujarat</strong>.
              That is not research. That is{" "}
              <strong className="text-gray-900">residence.</strong>
            </p>

            <p data-reveal="left" data-delay="340">
              This is also why we do not work with third-party operators.{" "}
              <strong className="text-gray-900">
                No handoffs, no outsourcing, no surprises.
              </strong>
            </p>
          </div>

          {/* Right — fact checklist, slides in from right */}
          <div
            data-reveal="right"
            data-delay="120"
            className="rounded-3xl border border-orange-100 bg-white p-8 shadow-lg"
          >
            <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-500">
                ✓
              </span>
              What &ldquo;We Are Here&rdquo; Actually Means
            </h3>

            <ul className="space-y-3.5">
              {facts.map((fact, i) => (
                <li
                  key={i}
                  className="about-check-item flex items-start gap-3 text-sm text-gray-700 sm:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <svg
                      className="h-3 w-3 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
