import type { Metadata } from "next";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import Faq from "@/src/components/shared/Faq";
import { Star, ShieldCheck, HeartHandshake, UserCheck, Quote } from "lucide-react";

const PATH = "/reviews/";

export const metadata: Metadata = buildMetadata({
  title: "Traveller Reviews & Pilgrimage Experiences — Somnath Dwarka Tour Package",
  description:
    "Read genuine reviews and testimonials from families, senior citizens, and pilgrims who travelled on our Somnath, Dwarka, Gir, and Gujarat tour packages.",
  path: PATH,
});

const VERIFIED_REVIEWS = [
  {
    name: "Rajesh & Sunita Sharma",
    location: "New Delhi",
    trip: "4 Days / 3 Nights Somnath Dwarka Tour from Ahmedabad",
    date: "November 2025",
    text: "We booked the 4-day private package for our parents' 50th wedding anniversary. Our driver, Ramesh Bhai, was punctual, courteous, and extremely helpful with our elderly parents at the Dwarkadhish temple gates. The hotel in Somnath had a direct view of the sea, and we attended both the evening aarti and light & sound show effortlessly. Highly recommend for family yatras!",
  },
  {
    name: "Dr. K. V. Ramanathan",
    location: "Chennai",
    trip: "5 Days Gujarat Jyotirlinga Circuit (Dwarka, Nageshwar, Somnath & Gir)",
    date: "January 2026",
    text: "Flawless coordination from airport pickup at Rajkot to drop-off at Diu. The Innova Crysta was spotless, and the driver possessed thorough knowledge of temple darshan timings, avoiding long wait queues at Nageshwar and Bet Dwarka. The pure vegetarian Kathiyawadi food recommendations on the highway were extraordinary.",
  },
  {
    name: "Mehul & Neha Patel",
    location: "Mumbai",
    trip: "3 Days / 2 Nights Express Weekend Package from Rajkot",
    date: "December 2025",
    text: "Given our tight 3-day work leave, we needed a well-optimized itinerary. The team scheduled our morning arrival at Rajkot, smooth drive to Dwarka, and early morning Darshan before heading to Somnath via Porbandar. No hidden costs, toll taxes and driver allowances were completely included as promised.",
  },
  {
    name: "Pooja & Amit Kulkarni",
    location: "Pune",
    trip: "6 Days Saurashtra Complete Circuit with Sasan Gir & Diu",
    date: "February 2026",
    text: "Taking a trip with a toddler and grandparents can be stressful, but the team made it seamless. The vehicle was spacious, hotels were within walking distance of Dwarkadhish and Somnath temples, and the Gir safari slot was booked well in advance. Excellent ground support on WhatsApp throughout.",
  },
  {
    name: "Anand Swaminathan",
    location: "Bengaluru",
    trip: "Dwarka–Somnath Cab Service from Jamnagar",
    date: "October 2025",
    text: "We opted for only the cab service package. The driver was calm, never rushed us at any temple stop, and guided us safely through the new Sudarshan Setu bridge to Bet Dwarka. Transparent billing and very professional team.",
  },
];

const REVIEWS_FAQS = [
  {
    question: "How do you verify the authenticity of published reviews?",
    answer:
      "Every testimonial published on our website is collected directly from verified guests who booked and completed a tour package or cab service with us. We cross-verify each feedback entry against our internal booking reference numbers before publishing.",
  },
  {
    question: "Can I speak to previous travellers before booking my tour?",
    answer:
      "Due to privacy compliance under the DPDP Act, we do not share private contact numbers of past guests. However, you can review our verified testimonials, Google business reviews, and detailed itinerary breakdowns to assess our service quality.",
  },
  {
    question: "How can I submit my own feedback after completing my trip?",
    answer:
      "Upon completion of your pilgrimage, your assigned Trip Coordinator will share a direct feedback link via WhatsApp or email. You can also email your experience directly to feedback@somnathdwarkatourpackage.com.",
  },
];

export default function ReviewsPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Reviews & Testimonials", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Pilgrim Reviews &amp; Testimonials
        </h1>
        <AnswerFirst>
          Authentic feedback from real yatris is the cornerstone of our service. We host hundreds of families,
          senior citizens, and devotee groups every year across the Somnath–Dwarka circuit. Read genuine,
          unfiltered experiences shared by travellers who experienced our cab services, hotel arrangements,
          and pilgrimage coordination.
        </AnswerFirst>

        {/* Value Trust Badges */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
              <ShieldCheck size={20} />
            </span>
            <div>
              <h4 className="text-sm font-bold text-gray-900">100% Verified Yatris</h4>
              <p className="text-xs text-gray-600">Feedback matched to confirmed bookings</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
              <UserCheck size={20} />
            </span>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Senior Citizen Friendly</h4>
              <p className="text-xs text-gray-600">Special attention for elderly pilgrims</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
              <HeartHandshake size={20} />
            </span>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Zero Hidden Costs</h4>
              <p className="text-xs text-gray-600">All-inclusive transparent pricing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <Section id="verified-reviews" title="Experiences from Recent Pilgrimages">
        <div className="space-y-6">
          {VERIFIED_REVIEWS.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-orange-200">
                <Quote size={36} />
              </div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" />
                ))}
                <span className="ml-2 text-xs font-semibold text-gray-500">{r.date}</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-[15px] relative z-10">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{r.name}</h4>
                  <p className="text-xs text-gray-500">{r.location}</p>
                </div>
                <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 border border-orange-100">
                  {r.trip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Faq items={REVIEWS_FAQS} heading="Reviews &amp; Feedback FAQs" />

      <CtaBand context="Somnath Dwarka pilgrimage enquiry" />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Reviews & Testimonials — Somnath Dwarka Tour Package",
          description:
            "Genuine traveller reviews and feedback for our Somnath, Dwarka, and Gujarat pilgrimage tour packages.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Reviews", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}

