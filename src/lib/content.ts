/**
 * Central read layer over the CMS for public pages + sitemap.
 *
 * Each getter returns plain, index-safe data (published, non-noindex only) and
 * fails soft (returns []/null) so a DB hiccup can't break the build. As new
 * content-type models land they get wired in here and to getSitemapEntries().
 */
import { connectDB } from "@/src/lib/mongodb";
import TourPackageModel from "@/src/models/packageModel";
import Blog from "@/src/models/blogModel";

export type SitemapEntry = { path: string; lastModified?: Date };

/** A URL-safe slug: lowercase letters, digits and hyphens only (SOP §3). */
export const isValidSlug = (slug: unknown): slug is string =>
  typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

/** Package variant canonical path (SOP §3). */
export const packagePath = (slug: string) => `/somnath-dwarka-tour-package/${slug}/`;
/** Guides replace the old /blog path (SOP §3). */
export const guidePath = (slug: string) => `/guides/${slug}/`;

export async function getPublishedPackages() {
  try {
    await connectDB();
    return await TourPackageModel.find({ status: "published" })
      .sort({ createdAt: -1 })
      .lean();
  } catch {
    return [];
  }
}

export async function getPackageBySlug(slug: string) {
  try {
    await connectDB();
    const pkg = await TourPackageModel.findOne({ slug }).lean();
    if (!pkg || (pkg as { status?: string }).status !== "published") return null;
    return pkg;
  } catch {
    return null;
  }
}

export async function getPublishedGuides() {
  try {
    await connectDB();
    const guides = await Blog.find({ status: "published" }).sort({ createdAt: -1 }).lean();
    // Skip legacy/invalid slugs (e.g. containing spaces) so we never emit broken links.
    return (guides as Array<Record<string, unknown>>).filter((g) => isValidSlug(g.slug));
  } catch {
    return [];
  }
}

export async function getGuideBySlug(slug: string) {
  try {
    await connectDB();
    const g = await Blog.findOne({ slug, status: "published" }).lean();
    return g ?? null;
  } catch {
    return null;
  }
}

/** All dynamic, index-safe URLs for the sitemap (SOP §11). */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const [packages, guides] = await Promise.all([
    getPublishedPackages(),
    getPublishedGuides(),
  ]);

  const entries: SitemapEntry[] = [];

  for (const p of packages as Array<Record<string, unknown>>) {
    if (p.noindex) continue;
    if (typeof p.slug === "string")
      entries.push({ path: packagePath(p.slug), lastModified: p.updatedAt as Date });
  }
  for (const g of guides as Array<Record<string, unknown>>) {
    if (g.noindex) continue;
    if (typeof g.slug === "string")
      entries.push({ path: guidePath(g.slug), lastModified: g.updatedAt as Date });
  }

  return entries;
}
