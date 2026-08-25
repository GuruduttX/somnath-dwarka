import type { Metadata } from "next";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import { CONTACT, waLink, telLink } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import JsonLd from "@/src/components/seo/JsonLd";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import EnquiryForm from "@/src/components/shared/EnquiryForm";
import Faq from "@/src/components/shared/Faq";
import { Clock, ShieldCheck, PhoneCall, MessageSquare, Mail, MapPin, Headphones } from "lucide-react";

const PATH = "/contact/";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Somnath & Dwarka Tour Planning & Cab Desk",
  description:
    "Connect with our Saurashtra pilgrimage specialists. Instant WhatsApp consultation, phone support, and 24/7 on-trip yatra assistance across Gujarat.",
  path: PATH,
});

const CONTACT_FAQS = [
  {
    question: "How quickly will I receive a customized itinerary and quotation after submitting an enquiry?",
    answer:
      "During our standard operating hours (8:00 AM to 10:00 PM IST), our pilgrimage consultants typically respond within 15 to 30 minutes via WhatsApp or phone with a detailed day-wise itinerary and clear price quotation.",
  },
  {
    question: "Can you provide airport/railway station pickup from cities outside Dwarka and Somnath?",
    answer:
      "Yes. We arrange dedicated private cab pickups and drop-offs across all major arrival hubs in Gujarat, including Ahmedabad Airport (AMD), Rajkot Airport (Hirasar), Jamnagar Airport/Station, Porbandar, Diu Airport, and Bhavnagar.",
  },
  {
    question: "What support is available if we encounter any issue during our tour?",
    answer:
      "All confirmed guests are assigned a Dedicated Trip Manager and 24/7 on-trip emergency helpline number. Whether you need an aarti queue update, vehicle assistance, or hotel coordination, our local ground team is on standby throughout your pilgrimage.",
  },
  {
    question: "Can we make changes to our itinerary after contacting you?",
    answer:
      "Yes, all our pilgrimage tour packages are fully customizable. You can add extra days for Sasan Gir Lion Safari, Diu beaches, Junagadh Girnar ropeway, or ancient temples like Madhavpur and Harshad Mata.",
  },
];

export default function ContactPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Contact Us", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Contact Our Pilgrimage Planning Desk
        </h1>
        <AnswerFirst>
          Planning a sacred journey to Somnath Jyotirlinga and Dwarkadhish Temple requires local precision.
          Connect with our Saurashtra travel coordinators via WhatsApp, phone, email, or the enquiry form below.
          We provide transparent pricing, vetted hotels near temple gates, and dedicated AC cabs with seasoned local chauffeurs.
        </AnswerFirst>

        {/* Quick Contact Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a
            href={telLink()}
            className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-md transition group"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-orange-100 text-orange-600 mb-3 group-hover:scale-110 transition">
              <PhoneCall size={22} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Call Directly</span>
            <span className="text-lg font-bold text-gray-900 mt-1">{CONTACT.phoneDisplay}</span>
            <span className="text-xs text-gray-500 mt-1">Available 8 AM – 10 PM IST</span>
          </a>

          <a
            href={waLink("Hi, I would like to plan a Somnath–Dwarka tour package.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border border-green-200 bg-green-50/50 hover:border-green-500 hover:shadow-md transition group"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-700 mb-3 group-hover:scale-110 transition">
              <MessageSquare size={22} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">Instant WhatsApp</span>
            <span className="text-lg font-bold text-gray-900 mt-1">{CONTACT.phoneDisplay}</span>
            <span className="text-xs text-green-700 mt-1">Fastest response time (~15 mins)</span>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-md transition group"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-orange-100 text-orange-600 mb-3 group-hover:scale-110 transition">
              <Mail size={22} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Official Email</span>
            <span className="text-base font-bold text-gray-900 mt-1 break-all">{CONTACT.email}</span>
            <span className="text-xs text-gray-500 mt-1">Detailed proposals &amp; vouchers</span>
          </a>
        </div>
      </div>

      {/* Enquiry Form Section */}
      <Section id="enquiry" title="Request a Tailored Yatra Itinerary & Quotation">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Share Your Travel Details</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Tell us your preferred arrival date, number of travellers, starting location, and special requests.
              Our destination specialists will craft a customized itinerary suited to your family.
            </p>
            <EnquiryForm context="Contact page comprehensive enquiry" />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
              <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                <Clock size={18} />
                <span>Operating Timings</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Planning &amp; Sales Desk:</strong><br />
                Monday to Sunday: 8:00 AM – 10:00 PM (IST)
              </p>
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                <strong>24/7 On-Trip Support:</strong><br />
                Round-the-clock emergency assistance for travelling guests.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                <MapPin size={18} />
                <span>Regional Support Network</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our local chauffeurs, airport pickup coordinators, and ground managers operate across key Saurashtra hub points:
              </p>
              <ul className="mt-2 text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                <li><strong>Ahmedabad:</strong> Airport &amp; Kalupur Station desk</li>
                <li><strong>Rajkot:</strong> Hirasar Airport &amp; Junction pickups</li>
                <li><strong>Dwarka:</strong> Temple promenade coordination</li>
                <li><strong>Somnath:</strong> Veraval station &amp; bypass desk</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Faq items={CONTACT_FAQS} heading="Frequently Asked Questions" />

      <JsonLd
        data={webPageSchema({
          type: "ContactPage",
          name: "Contact Us — Somnath Dwarka Tour Package",
          description:
            "Get in touch to plan your Somnath–Dwarka pilgrimage trip by phone, WhatsApp, or online enquiry form.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Contact Us", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}

