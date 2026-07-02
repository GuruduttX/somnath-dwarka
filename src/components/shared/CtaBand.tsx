import EnquiryForm from "./EnquiryForm";
import { waLink } from "@/src/config/site";

/** Reusable enquiry CTA band (SOP §13) — form + WhatsApp fallback. */
export default function CtaBand({
  context,
  title = "Plan this trip with us",
  subtitle = "Share your dates and we'll send a tailored itinerary and firm quote.",
}: {
  context: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-[#FFF3E8] to-[#FFE7D3] border-y border-orange-100">
      <div className="max-w-5xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{subtitle}</p>
          <a
            href={waLink(`Hi, I'm interested in: ${context}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-semibold"
          >
            <span aria-hidden="true">💬</span> Chat on WhatsApp
          </a>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100">
          <EnquiryForm context={context} />
        </div>
      </div>
    </section>
  );
}
