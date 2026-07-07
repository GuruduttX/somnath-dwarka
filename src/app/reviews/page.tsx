import type { Metadata } from "next";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";

const PATH = "/reviews/";

export const metadata: Metadata = buildMetadata({
  title: "Reviews — Somnath Dwarka Tour Package",
  description:
    "Traveller reviews for our Somnath–Dwarka tours. We publish only genuine reviews and do not display invented ratings.",
  path: PATH,
});

/**
 * Reviews page (SOP §5 #16, §12). Genuine on-page reviews only. No
 * AggregateRating/Review schema is emitted until real reviews exist here.
 */
const REVIEWS: { name: string; text: string; trip: string }[] = [];

export default function ReviewsPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Reviews", path: PATH }]}>
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Traveller reviews</h1>
        <AnswerFirst>
          We publish only genuine reviews from travellers who have taken our Somnath–Dwarka
          tours. We do not display fabricated ratings or star scores — when verified reviews
          are added here, they appear below with the traveller&apos;s trip details.
        </AnswerFirst>
      </div>

      <Section id="list" title="What travellers say">
        {REVIEWS.length ? (
          <ul className="space-y-4">
            {REVIEWS.map((r, i) => (
              <li key={i} className="rounded-xl border border-orange-100 bg-white p-4">
                <p className="text-gray-700">“{r.text}”</p>
                <p className="text-sm text-gray-500 mt-2">— {r.name}, {r.trip}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            Verified reviews will be published here. Travelled with us? Share your experience via
            WhatsApp and we&apos;ll add it once confirmed.
          </p>
        )}
      </Section>

      <CtaBand context="Somnath Dwarka tour enquiry" />

      {/* WebPage node only — no Review/AggregateRating until genuine reviews exist (SOP §12). */}
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Reviews — Somnath Dwarka Tour Package",
          description:
            "Genuine traveller reviews for our Somnath–Dwarka tours. We publish only real reviews.",
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
