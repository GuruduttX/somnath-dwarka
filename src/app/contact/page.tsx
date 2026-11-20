import type { Metadata } from "next";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import { CONTACT, waLink, telLink } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import JsonLd from "@/src/components/seo/JsonLd";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import EnquiryForm from "@/src/components/shared/EnquiryForm";
import Faq from "@/src/components/shared/Faq";
import { Clock, PhoneCall, MessageSquare, Mail, MapPin } from "lucide-react";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { CONTACT_PAGE } from "./content";

const PATH = CONTACT_PAGE.path;

/* Copy lives in ./content.ts and is editable through the CMS; a save refreshes this page at once. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(CONTACT_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
}

export default async function ContactPage() {
  const c = await getPageContent(CONTACT_PAGE);
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Contact Us", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{c.h1}</h1>
        <AnswerFirst>{c.answerFirst}</AnswerFirst>

        {/* Quick Contact Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a
            href={telLink()}
            className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-md transition group"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-orange-100 text-orange-600 mb-3 group-hover:scale-110 transition">
              <PhoneCall size={22} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{c.callCard.label}</span>
            <span className="text-lg font-bold text-gray-900 mt-1">{CONTACT.phoneDisplay}</span>
            <span className="text-xs text-gray-500 mt-1">{c.callCard.note}</span>
          </a>

          <a
            href={waLink(c.whatsappCard.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border border-green-200 bg-green-50/50 hover:border-green-500 hover:shadow-md transition group"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-700 mb-3 group-hover:scale-110 transition">
              <MessageSquare size={22} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">{c.whatsappCard.label}</span>
            <span className="text-lg font-bold text-gray-900 mt-1">{CONTACT.phoneDisplay}</span>
            <span className="text-xs text-green-700 mt-1">{c.whatsappCard.note}</span>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-md transition group"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-orange-100 text-orange-600 mb-3 group-hover:scale-110 transition">
              <Mail size={22} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{c.emailCard.label}</span>
            <span className="text-base font-bold text-gray-900 mt-1 break-all">{CONTACT.email}</span>
            <span className="text-xs text-gray-500 mt-1">{c.emailCard.note}</span>
          </a>
        </div>
      </div>

      {/* Enquiry Form Section */}
      <Section id="enquiry" title={c.enquiry.heading}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{c.enquiry.formTitle}</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{c.enquiry.formText}</p>
            <EnquiryForm context="Contact page comprehensive enquiry" />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
              <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                <Clock size={18} />
                <span>{c.timingsTitle}</span>
              </div>
              {c.timings.map((t, i) => (
                <p key={i} className={`text-sm text-gray-700 leading-relaxed${i ? " mt-3" : ""}`}>
                  <strong>{t.label}</strong>
                  <br />
                  {t.value}
                </p>
              ))}
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                <MapPin size={18} />
                <span>{c.networkTitle}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{c.networkIntro}</p>
              <ul className="mt-2 text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                {c.network.map((n, i) => (
                  <li key={i}>
                    <strong>{n.place}</strong> {n.detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Faq items={c.faqs} heading={c.faqHeading} />

      <JsonLd
        data={webPageSchema({
          type: "ContactPage",
          name: c.schema.name,
          description: c.schema.description,
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

