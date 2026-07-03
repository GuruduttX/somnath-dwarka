import { ChevronDown, Sparkles } from "lucide-react";
import { faqSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";

export type FaqItem = { question: string; answer: string };

/**
 * FAQ accordion (SOP §1, §6) — uses native <details>/<summary> so the answer
 * text stays in the DOM (CSS-toggled), is always crawlable, keyboard-operable
 * and needs no JS. Emits FAQPage JSON-LD from the same data.
 *
 * Two-column card layout with a centered eyebrow + heading + subheading.
 */
export default function Faq({
  items,
  heading = "Frequently asked questions",
  eyebrow = "Frequently Asked Questions",
  subheading,
  withSchema = true,
}: {
  items: FaqItem[];
  heading?: string;
  eyebrow?: string;
  subheading?: string;
  withSchema?: boolean;
}) {
  if (!items?.length) return null;
  return (
    <section
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
      aria-labelledby="faq-heading"
    >
      {/* Header */}
      <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
            <Sparkles size={13} />
            {eyebrow}
          </span>
        ) : null}
        <h2
          id="faq-heading"
          className="mt-5 text-2xl font-bold leading-[1.15] tracking-tight text-[#111827] sm:text-3xl lg:text-[2.5rem]"
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500 sm:text-base">
            {subheading}
          </p>
        ) : null}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        {items.map((f, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-orange-100/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-200 open:shadow-[0_14px_40px_rgba(234,88,12,0.10)] hover:border-orange-200"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 sm:p-5">
              <span className="text-[15px] font-bold leading-snug text-[#1a2233] sm:text-base">
                {f.question}
              </span>
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-500 transition-transform duration-300 group-open:rotate-180"
              >
                <ChevronDown size={16} strokeWidth={2.4} />
              </span>
            </summary>
            <div className="px-4 pb-4 text-[14px] leading-relaxed text-gray-600 sm:px-5 sm:pb-5">
              {f.answer}
            </div>
          </details>
        ))}
      </div>

      {withSchema ? <JsonLd data={faqSchema(items)} /> : null}
    </section>
  );
}
