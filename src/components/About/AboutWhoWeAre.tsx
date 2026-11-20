import { rich, type RichBold, type RichLink } from "@/src/lib/pages/rich";
import type { AboutPageContent } from "@/src/app/about/content";

const delays = ["80", "160", "280", "400"] as const;
const paraDelays = [undefined, "120", "220"] as const;

/* Copy comes from the CMS-editable about page (src/app/about/content.ts). */

const AboutLink: RichLink = ({ href, children }) => {
  const outside = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      {...(outside ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-bold text-orange-500 underline decoration-orange-300 underline-offset-2 transition hover:text-orange-600"
    >
      {children}
    </a>
  );
};
const DarkBold: RichBold = ({ children }) => <strong className="text-gray-900">{children}</strong>;
const PlainBold: RichBold = ({ children }) => <strong className="not-italic">{children}</strong>;

export default function AboutWhoWeAre({ content }: { content: AboutPageContent["whoWeAre"] }) {
  const c = content;
  return (
    <section id="who-we-are" className="relative overflow-hidden bg-white py-5 md:py-20">

      {/* Decorative blob */}
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-orange-50 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-48 w-48 rounded-full bg-amber-50 blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="mb-2 text-center">
          <span data-reveal="scale" className="mb-4 inline-block rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-600">
            {c.eyebrow}
          </span>
          <h2 data-reveal="up" data-delay="80" className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            {c.headingLead} <span className="text-orange-500">{c.headingHighlight}</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — text */}
          <div className="space-y-5 text-base leading-relaxed text-gray-700 sm:text-lg">
            {c.paragraphs.map((p, i) => (
              <p key={i} data-reveal="left" {...(paraDelays[i] ? { "data-delay": paraDelays[i] } : {})}>
                {rich(p, AboutLink, DarkBold)}
              </p>
            ))}

            {/* Pull quote — slides in from left with left-border accent */}
            {c.quote && (
              <div
                data-reveal="left"
                data-delay="340"
                className="rounded-r-2xl border-l-4 border-orange-500 bg-orange-50 p-5 italic text-gray-800"
              >
                {rich(c.quote, AboutLink, PlainBold)}
              </div>
            )}
          </div>

          {/* Right — pillar cards stagger in */}
          <div className="space-y-4">
            {c.pillars.map((item, i) => (
              <div
                key={i}
                data-reveal="right"
                data-delay={delays[i % delays.length]}
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
