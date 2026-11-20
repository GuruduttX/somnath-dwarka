import { NextResponse } from "next/server";
import {
  CustomPageError,
  customPagePath,
  customPageSlug,
  customPagesCollection,
  mergeUpdate,
  normalizeCustomPage,
  rootSlugOwner,
  type CustomPage,
} from "@/src/lib/customPages";
import { refreshSite } from "@/src/lib/refreshSite";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const fail = (status: number, error: string) => NextResponse.json({ success: false, error }, { status });

/** Looks a page up by its id or its current slug. */
async function find(key: string) {
  const pages = await customPagesCollection();
  return { pages, page: await pages.findOne({ $or: [{ id: key }, { slug: key }] }, { projection: { _id: 0 } }) };
}

export async function GET(_req: Request, { params }: Ctx) {
  try {
    const { page } = await find((await params).id);
    if (!page) return fail(404, "Custom page not found.");
    return NextResponse.json({ success: true, data: { ...page, path: customPagePath(page.slug) } });
  } catch (error) {
    console.error("GET /api/admin/custom-pages/[id] error:", error);
    return fail(500, error instanceof Error ? error.message : "Server error");
  }
}

/**
 * Changes some fields. Each top-level field sent replaces the stored one;
 * inside meta and hero, sub-fields left out keep their value. A new slug moves
 * the page and its old URL permanently redirects to the new one.
 */
export async function PUT(req: Request, { params }: Ctx) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "The body must be JSON.");
  }
  try {
    const { pages, page: existing } = await find((await params).id);
    if (!existing) return fail(404, "Custom page not found.");

    const fields = normalizeCustomPage(mergeUpdate(existing, body));
    const update: Partial<CustomPage> = { ...fields, updatedAt: new Date().toISOString() };

    if (typeof body.slug === "string" && body.slug.trim() && body.slug.trim() !== existing.slug) {
      const errors: string[] = [];
      const wanted = customPageSlug(body.slug, fields.title, errors);
      if (errors.length) return fail(400, errors.join(" "));
      if (wanted !== existing.slug) {
        const owner = await rootSlugOwner(wanted);
        if (owner) return fail(409, owner);
        const taken = await pages.findOne(
          { id: { $ne: existing.id }, $or: [{ slug: wanted }, { previousSlugs: wanted }] },
          { projection: { _id: 1 } }
        );
        if (taken) return fail(409, `The URL slug "${wanted}" is already used by another custom page.`);
        const previous = (existing.previousSlugs ?? []).filter((s) => s !== wanted);
        if (!previous.includes(existing.slug)) previous.push(existing.slug);
        Object.assign(update, { slug: wanted, previousSlugs: previous });
      }
    }

    await pages.updateOne({ id: existing.id }, { $set: update });
    refreshSite();
    const saved = await pages.findOne({ id: existing.id }, { projection: { _id: 0 } });
    return NextResponse.json({ success: true, data: saved ? { ...saved, path: customPagePath(saved.slug) } : null });
  } catch (error) {
    if (error instanceof CustomPageError) return fail(400, error.message);
    if ((error as { code?: number })?.code === 11000) return fail(409, "That slug is already used by another custom page.");
    console.error("PUT /api/admin/custom-pages/[id] error:", error);
    return fail(500, error instanceof Error ? error.message : "Server error");
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const { pages, page } = await find((await params).id);
    if (!page) return fail(404, "Custom page not found.");
    await pages.deleteOne({ id: page.id });
    refreshSite();
    return NextResponse.json({ success: true, data: { id: page.id, title: page.title, slug: page.slug } });
  } catch (error) {
    console.error("DELETE /api/admin/custom-pages/[id] error:", error);
    return fail(500, error instanceof Error ? error.message : "Server error");
  }
}
