import { faqSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";

export type FaqItem = { question: string; answer: string };

/**
 * FAQ accordion (SOP §1, §6) — uses native <details>/<summary> so the answer
 * text stays in the DOM (CSS-toggled), is always crawlable, keyboard-operable
 * and needs no JS. Emits FAQPage JSON-LD from the same data.
 */
export default function Faq({
  items,
  heading = "Frequently asked questions",
  withSchema = true,
}: {
  items: FaqItem[];
  heading?: string;
  withSchema?: boolean;
}) {
  if (!items?.length) return null;
  return (
    <section className="max-w-4xl mx-auto px-4 py-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
        {heading}
      </h2>
      <div className="space-y-3">
        {items.map((f, i) => (
          <details
            key={i}
            className="group border border-orange-100 rounded-xl bg-white overflow-hidden"
          >
            <summary className="cursor-pointer list-none px-5 py-4 font-medium text-gray-800 flex justify-between items-center gap-4">
              {f.question}
              <span
                aria-hidden="true"
                className="text-[#E87722] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-4 text-gray-600 leading-relaxed">{f.answer}</div>
          </details>
        ))}
      </div>
      {withSchema ? <JsonLd data={faqSchema(items)} /> : null}
    </section>
  );
}
