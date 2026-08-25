import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import { SEED_TOOLS } from "@/src/lib/seed/destinations";
import { Calculator, Calendar, MapPin, Navigation, IndianRupee, ShieldAlert } from "lucide-react";

const PATH = "/tools/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Trip Planning Tools — Itinerary Builder & Fare Calculator",
  description:
    "Free online pilgrimage planning tools: calculate cab fares, build day-wise Saurashtra itineraries, check highway distances, and plan your Gujarat yatra budget.",
  path: PATH,
});

const TOOLS_FAQS = [
  {
    question: "How accurate is the online cab fare calculator?",
    answer:
      "Our cab fare calculator uses exact Saurashtra highway route distances and current commercial vehicle fuel/toll baselines. The computed estimate covers total vehicle rental, fuel, driver night allowances, and highway toll taxes with zero hidden extras.",
  },
  {
    question: "Can I customize the generated day-wise itinerary for elder family members?",
    answer:
      "Yes. The itinerary builder provides a realistic, time-tested framework that accounts for 2-hour darshan buffers, meal breaks, and coastal highway driving speeds (average 50–60 km/h). You can share the plan directly with our team to add wheelchair assistance or ground-floor hotel preferences.",
  },
  {
    question: "Are toll taxes and parking charges included in Gujarat cab estimates?",
    answer:
      "All dedicated tour package bookings and outstation cab quotes provided by Somnath Dwarka Tour Package include toll taxes, state permits, and temple parking charges, so you never have to make out-of-pocket cash payments on the highway.",
  },
];

export default function ToolsHubPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Planning Tools", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Trip Planning Tools for Somnath &amp; Dwarka
        </h1>
        <AnswerFirst>
          Planning a Gujarat pilgrimage requires balancing temple aarti schedules, coastal highway distances,
          and group accommodation needs. Use our free, interactive trip-planning tools below to estimate outstation
          cab fares, craft realistic day-by-day itineraries, and calculate your total yatra budget without guesswork.
        </AnswerFirst>

        {/* Tool Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {SEED_TOOLS.map((t) => (
            <div
              key={t.slug}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:border-[#E87722] hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-orange-600">
                    {t.slug.includes("fare") || t.slug.includes("cost") ? (
                      <Calculator size={24} />
                    ) : (
                      <Calendar size={24} />
                    )}
                  </span>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 border border-orange-100">
                    {t.tool_type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.h1}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {t.slug.includes("fare") || t.slug.includes("calculator")
                    ? "Estimate exact dedicated AC taxi fares between Ahmedabad, Rajkot, Dwarka, Somnath, and Sasan Gir with itemized toll and driver fee breakdowns."
                    : "Generate an hour-by-hour day-wise pilgrimage plan tailored to your arrival hub, group size, and preferred pace of darshan."}
                </p>
              </div>
              <Link
                href={`/tools/${t.slug}/`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-bold text-white hover:from-orange-600 hover:to-amber-600 shadow-sm transition"
              >
                <span>Launch Tool</span>
                <Navigation size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Distance & Travel Time Cheat Sheet */}
      <Section id="distances" title="Saurashtra Highway Distance & Travel Time Reference">
        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
          Reference driving distances and realistic travel times when building your Gujarat pilgrimage schedule:
        </p>
        <div className="overflow-x-auto rounded-xl border border-orange-200 shadow-sm">
          <table className="w-full text-left text-sm text-gray-700 border-collapse">
            <thead className="bg-orange-100 text-gray-900 font-semibold">
              <tr>
                <th className="p-3.5 border-b border-orange-200">Route Segment</th>
                <th className="p-3.5 border-b border-orange-200">Distance</th>
                <th className="p-3.5 border-b border-orange-200">Driving Time</th>
                <th className="p-3.5 border-b border-orange-200">Highway Route &amp; Highlights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 bg-white">
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Rajkot to Dwarka</td>
                <td className="p-3.5">225 km</td>
                <td className="p-3.5">4.5 hours</td>
                <td className="p-3.5">Via Jamnagar &amp; Khambhalia (NH 947). Smooth 4-lane highway.</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Dwarka to Bet Dwarka (Okha)</td>
                <td className="p-3.5">32 km</td>
                <td className="p-3.5">40 minutes</td>
                <td className="p-3.5">Direct transit via the new 4-lane Sudarshan Setu cable-stayed bridge.</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Dwarka to Somnath</td>
                <td className="p-3.5">230 km</td>
                <td className="p-3.5">4.5 to 5 hours</td>
                <td className="p-3.5">Scenic coastal highway NH 51 via Porbandar &amp; Madhavpur Beach.</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Somnath to Sasan Gir</td>
                <td className="p-3.5">45 km</td>
                <td className="p-3.5">1 hour</td>
                <td className="p-3.5">Pleasant rural road through Hiran River valley and mango orchards.</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Somnath to Diu Airport</td>
                <td className="p-3.5">85 km</td>
                <td className="p-3.5">2 hours</td>
                <td className="p-3.5">Smooth coastal corridor through Kodinar.</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Somnath to Ahmedabad</td>
                <td className="p-3.5">410 km</td>
                <td className="p-3.5">7.5 hours</td>
                <td className="p-3.5">Via Junagadh, Rajkot &amp; Bagodara (NH 27 / NH 47).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Practical Travel Budgeting Tips */}
      <Section id="budgeting-tips" title="Essential Pilgrimage Budgeting Guidelines">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-orange-100 bg-white p-5">
            <h4 className="font-bold text-gray-900 text-base mb-2">Transport Sizing</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              For 1 to 4 passengers with light luggage, a Sedan (Dzire/Etios) offers peak efficiency. For 4 to 6 passengers or multi-generational families with strollers/luggage, an Ertiga or Innova Crysta is essential for legroom on longer highway stretches.
            </p>
          </div>

          <div className="rounded-xl border border-orange-100 bg-white p-5">
            <h4 className="font-bold text-gray-900 text-base mb-2">Temple Proximity</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Booking hotels within 1 km of Dwarkadhish temple and Somnath mandir saves substantial daily auto-rickshaw costs and makes attending early 6:30 AM Mangla Aarti or late 7:00 PM Sandhya Aarti stress-free for senior citizens.
            </p>
          </div>

          <div className="rounded-xl border border-orange-100 bg-white p-5">
            <h4 className="font-bold text-gray-900 text-base mb-2">Buffer Time Management</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Always budget a minimum of 2 hours for security checks, footwear deposit, and general darshan queue movement at major shrines during weekends, Ekadashi, and Purnima days.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Faq items={TOOLS_FAQS} heading="Frequently Asked Questions About Trip Tools" />

      <CtaBand context="Gujarat pilgrimage trip planning" />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Somnath Dwarka Trip Planning Tools",
          description:
            "Free trip-planning tools for Somnath and Dwarka — an itinerary planner and a cab fare calculator.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Planning Tools", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}

