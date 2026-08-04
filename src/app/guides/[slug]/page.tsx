import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { buildMetadata, articleSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import GuideEnquiryForm from "@/src/components/guides/GuideEnquiryForm";
import GuideTestimonials from "@/src/components/guides/GuideTestimonials";
import { fromCms, type CmsTestimonial } from "@/src/config/testimonials";
import JsonLd from "@/src/components/seo/JsonLd";
import { CalendarDays, Clock, Sparkles } from "lucide-react";

/**
 * Tailwind-only styling for the CMS HTML body — no dependency on the global
 * `.BlogContent` rules. Arbitrary child selectors target the rendered tags so
 * this page owns its own typography.
 */
const GUIDE_PROSE = [
  "max-w-none text-[16.5px] leading-8 text-gray-700",
  "[&>*:first-child]:mt-0",
  "[&_h2]:mt-11 [&_h2]:mb-3 [&_h2]:border-l-4 [&_h2]:border-orange-400 [&_h2]:pl-4 [&_h2]:text-[26px] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_h2]:scroll-mt-28",
  "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-orange-600",
  "[&_p]:my-4 [&_p]:leading-8 [&_p]:text-gray-600",
  "[&_ul]:my-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-1",
  "[&_ul>li]:relative [&_ul>li]:pl-6 [&_ul>li]:text-gray-700",
  "[&_ul>li]:before:absolute [&_ul>li]:before:left-1 [&_ul>li]:before:top-[0.72em] [&_ul>li]:before:h-[7px] [&_ul>li]:before:w-[7px] [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-gradient-to-br [&_ul>li]:before:from-orange-500 [&_ul>li]:before:to-amber-400 [&_ul>li]:before:content-['']",
  "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:marker:font-semibold [&_ol]:marker:text-orange-500",
  "[&_a]:font-medium [&_a]:text-orange-600 [&_a]:underline [&_a]:decoration-orange-300 [&_a]:underline-offset-2 hover:[&_a]:text-orange-700",
  "[&_strong]:font-semibold [&_strong]:text-gray-900",
  "[&_img]:my-7 [&_img]:w-full [&_img]:rounded-2xl [&_img]:shadow-sm [&_img]:ring-1 [&_img]:ring-orange-100",
  "[&_blockquote]:my-6 [&_blockquote]:rounded-r-xl [&_blockquote]:border-l-4 [&_blockquote]:border-orange-300 [&_blockquote]:bg-orange-50/60 [&_blockquote]:py-3 [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:italic [&_blockquote]:text-gray-700",
  "[&_table]:my-6 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-sm",
  "[&_th]:whitespace-nowrap [&_th]:border [&_th]:border-orange-100 [&_th]:bg-orange-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-800",
  "[&_td]:border [&_td]:border-orange-100 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:text-gray-600",
].join(" ");
import { getGuideBySlug, getPublishedGuides, guidePath } from "@/src/lib/content";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;
type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const guides = (await getPublishedGuides()) as Array<Record<string, unknown>>;
  return guides.map((g) => ({ slug: String(g.slug) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const g = (await getGuideBySlug(slug)) as Record<string, unknown> | null;
  if (!g) return {};
  const meta = (g.meta as { title?: string; description?: string }) || {};
  return buildMetadata({
    title: meta.title || String(g.title),
    description: meta.description || String(g.subContent || ""),
    path: guidePath(slug),
    ogType: "article",
    ogImage: g.image ? String(g.image) : undefined,
    noindex: Boolean(g.noindex),
  });
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const g = (await getGuideBySlug(slug)) as Record<string, unknown> | null;
  if (!g) notFound();

  const faqs = ((g.faqs as { question: string; answer: string }[]) || []).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  const cmsTestimonials = fromCms(g.testimonials as CmsTestimonial[] | undefined);

  const related = buildRelatedLinks({
    self: guidePath(slug),
    pillar: { target: "/guides/", anchor: "all travel guides" },
    money: "packages",
    siblings: [
      { target: "/plan/", anchor: "plan your trip", type: "sibling" },
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab", type: "money" },
    ],
  });

  return (
    <PageShell
      fullWidthCrumb
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides/" },
        { name: String(g.title), path: guidePath(slug) },
      ]}
    >
      <div className="w-full px-4 pt-3 sm:px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          {/* ── MAIN COLUMN ── */}
          <article className="min-w-0">
            {/* Header */}
            <h1 className="text-[1.6rem] font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-3xl md:text-[2.15rem]">
              {String(g.title)}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[13px] text-gray-500">
              <span className="inline-flex items-center gap-1.5 font-medium text-gray-700">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-[10px] font-bold text-white">
                  {String(g.author || "Our team").trim().charAt(0).toUpperCase()}
                </span>
                {String(g.author || "Our team")}
              </span>
              {g.updatedAt ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden />
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-orange-400" />
                    {new Date(g.updatedAt as string).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </>
              ) : null}
              <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden />
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-orange-400" />
                {Math.max(3, Math.round(String(g.content || "").replace(/<[^>]+>/g, " ").split(/\s+/).length / 200))} min read
              </span>
            </div>

            {g.image ? (
              <div className="relative mt-6 aspect-[16/8] max-w-7xl overflow-hidden rounded-2xl shadow-lg shadow-orange-950/5 ring-1 ring-orange-100">
                <Image src={String(g.image)} alt={String(g.alt || g.title)} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 700px" />
              </div>
            ) : null}

            {/* Summary callout (Tailwind, modern — replaces the heavy peach box) */}
            {g.subContent ? (
              <div className="mt-7 flex items-start gap-3.5 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50/40 p-5">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-500/10 text-orange-600">
                  <Sparkles size={16} />
                </span>
                <p className="text-[15.5px] leading-relaxed text-gray-700">{String(g.subContent)}</p>
              </div>
            ) : null}

            {/* Guide body — styled entirely with Tailwind, no global CSS */}
            <div
              className={`mt-8 ${GUIDE_PROSE}`}
              dangerouslySetInnerHTML={{ __html: String(g.content || "") }}
            />
          </article>

          {/* ── STICKY ENQUIRY SIDEBAR (desktop) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_50px_rgba(234,88,12,0.10)]">
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 px-5 py-5 text-white">
                  <h3 className="text-lg font-bold">Plan this trip with us</h3>
                  <p className="mt-1 text-[13px] text-orange-50/90">
                    Share your details — we&apos;ll call back with the best plan &amp; price.
                  </p>
                </div>
                <div className="px-5 py-5">
                  <GuideEnquiryForm context={`Guide: ${String(g.title)}`} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FAQ answers the last objections before the CTA asks for the enquiry. */}
      <Faq items={faqs} heading="Guide FAQs" />

      <CtaBand context={`Guide: ${String(g.title)}`} />
      <RelatedLinks links={related} />

      {/* Social proof closes the page, after the related links. Falls back to the
          shared list when this guide has no testimonials of its own. */}
      <GuideTestimonials items={cmsTestimonials.length ? cmsTestimonials : undefined} />

      <JsonLd
        data={articleSchema({
          headline: String(g.title),
          description: String((g.meta as { description?: string })?.description || g.subContent || ""),
          path: guidePath(slug),
          image: g.image ? String(g.image) : undefined,
          author: String(g.author || "Our team"),
          datePublished: g.createdAt ? new Date(g.createdAt as string).toISOString() : undefined,
          dateModified: g.updatedAt ? new Date(g.updatedAt as string).toISOString() : undefined,
        })}
      />
    </PageShell>
  );
}
