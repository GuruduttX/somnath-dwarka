import { NextResponse } from "next/server";
import { isAdmin } from "@/src/lib/requireAdmin";
import { listContent, createContent } from "@/src/services/admin/contentService";
import { getContentType } from "@/src/lib/contentRegistry";

type Ctx = { params: Promise<{ type: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { type } = await params;
  if (!getContentType(type)) return NextResponse.json({ success: false, message: "Unknown type" }, { status: 404 });
  try {
    const data = await listContent(type);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json({ success: false, message: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const { type } = await params;
  if (!getContentType(type)) return NextResponse.json({ success: false, message: "Unknown type" }, { status: 404 });
  try {
    const body = await req.json();
    const created = await createContent(type, body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ success: false, message: (e as Error).message }, { status: 400 });
  }
}
