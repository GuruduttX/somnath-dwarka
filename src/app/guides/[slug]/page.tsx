import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { buildMetadata, articleSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import BlogContent from "@/src/components/Blog/BlogContent";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
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
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides/" },
        { name: String(g.title), path: guidePath(slug) },
      ]}
    >
      <article className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{String(g.title)}</h1>
        <p className="text-sm text-gray-500 mt-2">By {String(g.author || "Our team")}</p>
        {g.image ? (
          <div className="relative aspect-video mt-4 rounded-xl overflow-hidden">
            <Image src={String(g.image)} alt={String(g.alt || g.title)} fill className="object-cover" priority sizes="(max-width:768px) 100vw, 768px" />
          </div>
        ) : null}
        {g.subContent ? <AnswerFirst>{String(g.subContent)}</AnswerFirst> : null}
        <BlogContent content={String(g.content || "")} />
      </article>

      <Faq items={faqs} heading="Guide FAQs" />
      <CtaBand context={`Guide: ${String(g.title)}`} />
      <RelatedLinks links={related} />

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
