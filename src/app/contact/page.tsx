import type { Metadata } from "next";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import { CONTACT, waLink, telLink } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import JsonLd from "@/src/components/seo/JsonLd";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import EnquiryForm from "@/src/components/shared/EnquiryForm";

const PATH = "/contact/";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Somnath Dwarka Tour Package",
  description:
    "Get in touch to plan your Somnath–Dwarka trip. Call, WhatsApp or send an enquiry and our team will respond with a tailored itinerary and quote.",
  path: PATH,
});

export default function ContactPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: PATH }]}>
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Contact us</h1>
        <AnswerFirst>
          Reach us by phone, WhatsApp or the enquiry form below to plan your Somnath–Dwarka
          pilgrimage. Share your dates, group size and starting city and we&apos;ll send a
          tailored itinerary and firm quote.
        </AnswerFirst>
      </div>

      <Section id="details" title="Reach us">
        <div className="grid gap-4 sm:grid-cols-2">
          <a href={telLink()} className="p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722]">
            <span className="block text-sm text-gray-500">Call</span>
            <span className="block font-semibold text-gray-800">{CONTACT.phoneDisplay}</span>
          </a>
          <a href={waLink("Hi, I'd like to plan a Somnath–Dwarka trip.")} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722]">
            <span className="block text-sm text-gray-500">WhatsApp</span>
            <span className="block font-semibold text-gray-800">{CONTACT.phoneDisplay}</span>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] sm:col-span-2">
            <span className="block text-sm text-gray-500">Email</span>
            <span className="block font-semibold text-gray-800">{CONTACT.email}</span>
          </a>
        </div>
      </Section>

      <Section id="enquiry" title="Send an enquiry">
        <div className="max-w-xl rounded-2xl border border-orange-100 bg-white p-5">
          <EnquiryForm context="Contact page enquiry" />
        </div>
      </Section>

      <JsonLd
        data={webPageSchema({
          type: "ContactPage",
          name: "Contact — Somnath Dwarka Tour Package",
          description:
            "Get in touch to plan your Somnath–Dwarka trip by call, WhatsApp or enquiry form.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Contact", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}
