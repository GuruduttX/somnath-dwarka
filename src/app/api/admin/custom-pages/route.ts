import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  CustomPageError,
  customPagePath,
  customPageSlug,
  customPagesCollection,
  normalizeCustomPage,
  rootSlugOwner,
  type CustomPage,
} from "@/src/lib/customPages";
import { refreshSite } from "@/src/lib/refreshSite";

/*
  Custom pages (lib/customPages.ts). Admin only, reads included: the list
  holds drafts (src/proxy.ts guards all of /api/admin). The public page reads
  the database itself (src/app/[rootSlug]/page.tsx).
*/

export const dynamic = "force-dynamic";

const fail = (status: number, error: string) => NextResponse.json({ success: false, error }, { status });

/** Every custom page, drafts included, newest first, without its sections. */
export async function GET() {
  try {
    const pages = await (await customPagesCollection())
      .find({}, { projection: { _id: 0, id: 1, title: 1, slug: 1, status: 1, previousSlugs: 1, createdAt: 1, updatedAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ success: true, data: pages.map((p) => ({ ...p, path: customPagePath(p.slug) })) });
  } catch (error) {
    console.error("GET /api/admin/custom-pages error:", error);
    return fail(500, error instanceof Error ? error.message : "Server error");
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, "The body must be JSON.");
  }
  try {
    const fields = normalizeCustomPage(body);
    const errors: string[] = [];
    const slug = customPageSlug(body.slug, fields.title, errors);
    if (errors.length) return fail(400, errors.join(" "));
    const owner = await rootSlugOwner(slug);
    if (owner) return fail(409, owner);

    const pages = await customPagesCollection();
    if (await pages.findOne({ $or: [{ slug }, { previousSlugs: slug }] }, { projection: { _id: 1 } })) {
      return fail(409, `The URL slug "${slug}" is already used by another custom page.`);
    }
    const now = new Date().toISOString();
    const page: CustomPage = { ...fields, id: randomUUID(), slug, previousSlugs: [], createdAt: now, updatedAt: now };
    await pages.insertOne({ ...page });
    refreshSite();
    return NextResponse.json({ success: true, data: { ...page, path: customPagePath(slug) } }, { status: 201 });
  } catch (error) {
    if (error instanceof CustomPageError) return fail(400, error.message);
    if ((error as { code?: number })?.code === 11000) return fail(409, "That slug is already used by another custom page.");
    console.error("POST /api/admin/custom-pages error:", error);
    return fail(500, error instanceof Error ? error.message : "Server error");
  }
}
