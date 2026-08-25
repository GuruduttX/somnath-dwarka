import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import Faq from "@/src/components/shared/Faq";
import { SEED_COMPARISONS } from "@/src/lib/seed/destinations";
import { CheckCircle2, Clock, MapPin, IndianRupee, Car, Hotel } from "lucide-react";

const PATH = "/compare/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Compare Somnath & Dwarka Tour Packages — Route, Cost & Itinerary Comparison",
  description:
    "Compare Somnath and Dwarka tour packages, routes, durations, cab options, and hotel categories. Side-by-side comparison tables with expert planning advice.",
  path: PATH,
});

const COMPARE_FAQS = [
  {
    question: "How do I choose between a 3-day and 5-day Somnath Dwarka tour package?",
    answer:
      "A 3-day package covers the essential darshans at Dwarkadhish, Nageshwar Jyotirlinga, Bet Dwarka, and Somnath Temple with direct highway transit. A 5-day package adds Porbandar (Kirti Mandir, Sudama Temple), Junagadh (Girnar), and Sasan Gir Lion Safari, allowing an unhurried, comfortable pace suitable for senior citizens and families.",
  },
  {
    question: "Is it more cost-effective to hire a private cab or take trains between Somnath and Dwarka?",
    answer:
      "For solo travellers, state transport or passenger trains are cheaper, but train frequencies between Dwarka and Veraval/Somnath are limited and require matching strict schedules. For families of 2 to 6 people, a private cab is often more cost-effective per person because it eliminates local auto-rickshaw fares to remote shrines like Bet Dwarka and Nageshwar while providing door-to-door flexibility.",
  },
  {
    question: "Should we book standard 3-star or premium 4-star hotels in Somnath and Dwarka?",
    answer:
      "Standard 3-star hotels provide clean air-conditioned rooms, hot water, and pure vegetarian dining within 1 to 2 km of the temple gates. Premium 4-star hotels offer sea-facing views, dedicated pilgrimage travel desks, private elevators, and early breakfast options. If travelling with elders, choose hotels within walking distance or with dedicated cab drop-off zones.",
  },
  {
    question: "What is the best order of travel: Somnath first or Dwarka first?",
    answer:
      "Choose based on your arrival airport or railway junction. If arriving at Jamnagar or Rajkot in the morning, starting at Dwarka minimizes day-one driving. If arriving via Diu or Keshod, starting at Somnath is the most efficient route. Both orders avoid backtracking when using a linear circuit ending at Ahmedabad or Rajkot.",
  },
];

export default function CompareHubPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Compare Tour Packages", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Compare Somnath & Dwarka Tour Packages & Routes
        </h1>
        <AnswerFirst>
          Planning a Gujarat pilgrimage involves critical choices: selecting the optimal trip duration,
          deciding between Dwarka-first vs Somnath-first routes, and comparing private cabs against public transit.
          Use our side-by-side comparison tables, itinerary breakdowns, and cost comparisons below to make an
          informed decision tailored to your family&apos;s comfort and budget.
        </AnswerFirst>

        {/* Quick Decision Summary Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
              <Clock size={18} />
              <span>Trip Duration</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>3 Days:</strong> Express temple run.<br />
              <strong>4 Days:</strong> Balanced + Porbandar.<br />
              <strong>5-6 Days:</strong> Complete + Gir Safari &amp; Diu.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
              <Car size={18} />
              <span>Transport Mode</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Private Sedan/SUV:</strong> Direct door-to-door transit, flexible aarti timing.<br />
              <strong>Train/Bus:</strong> Budget option, rigid timings.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
              <Hotel size={18} />
              <span>Stay Categories</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Standard:</strong> Clean, near temple gate.<br />
              <strong>Deluxe:</strong> Modern amenities &amp; dining.<br />
              <strong>Premium:</strong> Sea view &amp; priority comfort.
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-side Itinerary Comparison Table */}
      <Section id="duration-comparison" title="Itinerary Comparison: 3-Day vs 4-Day vs 5-Day Plans">
        <p className="text-gray-600 mb-4 leading-relaxed">
          Compare what each pilgrimage duration covers. Choose based on who is travelling in your group:
        </p>
        <div className="overflow-x-auto rounded-xl border border-orange-200 shadow-sm">
          <table className="w-full text-left text-sm text-gray-700 border-collapse">
            <thead className="bg-orange-100 text-gray-900 font-semibold">
              <tr>
                <th className="p-3.5 border-b border-orange-200">Comparison Factor</th>
                <th className="p-3.5 border-b border-orange-200">3 Days / 2 Nights</th>
                <th className="p-3.5 border-b border-orange-200">4 Days / 3 Nights</th>
                <th className="p-3.5 border-b border-orange-200">5 Days / 4 Nights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 bg-white">
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Key Destinations</td>
                <td className="p-3.5">Dwarka &amp; Somnath only</td>
                <td className="p-3.5">Dwarka, Porbandar &amp; Somnath</td>
                <td className="p-3.5">Dwarka, Porbandar, Somnath, Gir &amp; Junagadh</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Temples Covered</td>
                <td className="p-3.5">Dwarkadhish, Nageshwar, Bet Dwarka, Somnath Temple, Bhalka Tirth</td>
                <td className="p-3.5">All 3-Day temples + Kirti Mandir, Sudama Temple, Triveni Sangam, Gita Mandir</td>
                <td className="p-3.5">All 4-Day temples + Sasan Gir Safari, Girnar foothills &amp; Uparkot Fort</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Daily Travel Pace</td>
                <td className="p-3.5">Fast / Packed (5–6 hrs road travel per day)</td>
                <td className="p-3.5">Moderate &amp; Comfortable (3–4 hrs drive)</td>
                <td className="p-3.5">Relaxed &amp; Leisurely (2–3 hrs drive)</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Ideal For</td>
                <td className="p-3.5">Working professionals &amp; quick weekend yatris</td>
                <td className="p-3.5">Families with children &amp; senior citizens</td>
                <td className="p-3.5">Multi-generational families &amp; nature lovers</td>
              </tr>
              <tr className="hover:bg-orange-50/30">
                <td className="p-3.5 font-medium text-gray-900">Aarti Attendance</td>
                <td className="p-3.5">Evening aarti at Somnath or Dwarka</td>
                <td className="p-3.5">Both Mangla aarti &amp; Sandhya aarti possible</td>
                <td className="p-3.5">Multiple aartis plus Somnath Sound &amp; Light Show</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Travel Options Comparison */}
      <Section id="travel-modes" title="Transport Comparison: Private Cab vs Train vs Bus">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 hover:border-orange-300 transition">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Dedicated AC Cab</h3>
            <span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 mb-3">
              Recommended
            </span>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                <span>Door-to-door pickup from airport/station.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                <span>Direct transit to Bet Dwarka jetty &amp; Nageshwar.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                <span>Stop at Madhavpur Beach &amp; Porbandar at your own pace.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 hover:border-orange-300 transition">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Railways (IRCTC)</h3>
            <span className="inline-block rounded bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 mb-3">
              Budget Friendly
            </span>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <span>Lowest per-person long-distance fare.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gray-400 font-bold shrink-0">•</span>
                <span>Infrequent direct trains between Dwarka &amp; Veraval.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gray-400 font-bold shrink-0">•</span>
                <span>Requires local auto/taxi hires at every stop.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 hover:border-orange-300 transition">
            <h3 className="font-bold text-gray-900 text-lg mb-2">GSRTC State Buses</h3>
            <span className="inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 mb-3">
              Frequent Connectivity
            </span>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span>Frequent connections between major talukas.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gray-400 font-bold shrink-0">•</span>
                <span>Crowded during festivals and peak seasons.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gray-400 font-bold shrink-0">•</span>
                <span>No luggage handling or door-to-door temple drops.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Guide Links */}
      <Section id="comparisons" title="Detailed Side-by-Side Planning Guides">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SEED_COMPARISONS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/compare/${c.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-900">{c.h1}</span>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{c.answer_first}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQs */}
      <Faq items={COMPARE_FAQS} heading="Frequently Asked Questions on Comparing Tours" />

      <CtaBand context="Somnath Dwarka Tour Comparison" />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Compare Somnath & Dwarka Tour Packages — Route, Cost & Itinerary Comparison",
          description:
            "Side-by-side comparisons to plan your Somnath–Dwarka trip, with clear verdicts, route advice and package recommendations.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Compare Tour Packages", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}

