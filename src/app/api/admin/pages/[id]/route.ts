import { NextResponse } from "next/server";
import { findPageDef } from "@/src/lib/pages/registry";
import { PageEditError, pageView, savePage } from "@/src/lib/pages/api";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const fail = (status: number, error: string) => NextResponse.json({ success: false, error }, { status });

/** One page's editable content. */
export async function GET(_req: Request, { params }: Ctx) {
  const def = findPageDef((await params).id);
  if (!def) return fail(404, "No editable page with that id. GET /api/admin/pages lists them.");
  try {
    return NextResponse.json({ success: true, data: await pageView(def) });
  } catch (error) {
    console.error("GET /api/admin/pages/[id] error:", error);
    return fail(500, error instanceof Error ? error.message : "Server error");
  }
}

/**
 * Changes some top-level fields of the page. Admin session required (src/proxy.ts
 * guards /api/admin). Each field sent replaces the stored value whole; `null`
 * puts the field back to its code default.
 */
export async function PUT(req: Request, { params }: Ctx) {
  const def = findPageDef((await params).id);
  if (!def) return fail(404, "No editable page with that id. GET /api/admin/pages lists them.");
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "The body must be JSON.");
  }
  try {
    await savePage(def, body);
    return NextResponse.json({ success: true, data: await pageView(def) });
  } catch (error) {
    if (error instanceof PageEditError) return fail(400, error.message);
    console.error("PUT /api/admin/pages/[id] error:", error);
    return fail(500, error instanceof Error ? error.message : "Server error");
  }
}
