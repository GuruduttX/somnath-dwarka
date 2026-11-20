import type { Metadata } from "next";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import Faq from "@/src/components/shared/Faq";
import { Star, ShieldCheck, HeartHandshake, UserCheck, Quote } from "lucide-react";
import { getDataset } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { REVIEWS_DATASET } from "@/src/lib/cms-groups/catalog";
import { REVIEWS_PAGE } from "./content";

const PATH = REVIEWS_PAGE.path;
/* Copy: ./content.ts (CMS page "reviews"); the cards: the site_reviews dataset (real guest reviews only). */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(REVIEWS_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
}

/** Trust badge icons by position. */
const BADGE_ICONS = [ShieldCheck, UserCheck, HeartHandshake];

export default async function ReviewsPage() {
  const [c, reviews] = await Promise.all([getPageContent(REVIEWS_PAGE), getDataset(REVIEWS_DATASET)]);
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Reviews & Testimonials", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {c.h1}
        </h1>
        <AnswerFirst>
          {c.answerFirst}
        </AnswerFirst>

        {/* Value Trust Badges */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {c.badges.map((badge, i) => {
            const Icon = BADGE_ICONS[i % BADGE_ICONS.length];
            return (
              <div key={badge.title} className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
                  <Icon size={20} />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{badge.title}</h4>
                  <p className="text-xs text-gray-600">{badge.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <Section id="verified-reviews" title={c.reviewsTitle}>
        <div className="space-y-6">
          {reviews.map((r) => (
            <div
              key={r.slug}
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
      <Faq items={c.faqs} heading={c.faqHeading} />

      <CtaBand context={c.ctaContext} />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: c.schema.name,
          description: c.schema.description,
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

