import { NextResponse } from "next/server";
import { pagesCollection } from "@/src/lib/pages/db";
import { PAGE_DEFS } from "@/src/lib/pages/registry";
import { canHide } from "@/src/lib/pages/visibility";

export const dynamic = "force-dynamic";

/** Every code-built page whose copy can be edited, and which of them have edits. */
export async function GET() {
  try {
    const stored = await (await pagesCollection())
      .find({}, { projection: { _id: 0, id: 1, updatedAt: 1, content: 1, status: 1 } })
      .toArray();
    const byId = new Map(stored.map((s) => [s.id, s]));

    return NextResponse.json({
      success: true,
      data: PAGE_DEFS.map((d) => {
        const s = byId.get(d.id);
        return {
          id: d.id,
          pageTitle: d.title,
          pageGroup: d.group,
          pagePath: d.path,
          ...(canHide(d) ? { pageStatus: s?.status === "hidden" ? "hidden" : "live" } : {}),
          edited: s ? Object.keys(s.content ?? {}) : [],
          updatedAt: s?.updatedAt ?? null,
        };
      }),
    });
  } catch (error) {
    console.error("GET /api/admin/pages error:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
