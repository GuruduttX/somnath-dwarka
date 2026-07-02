import { NextResponse } from "next/server";
import { isAdmin } from "@/src/lib/requireAdmin";
import { getContent, updateContent, deleteContent } from "@/src/services/admin/contentService";
import { getContentType } from "@/src/lib/contentRegistry";

type Ctx = { params: Promise<{ type: string; id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { type, id } = await params;
  if (!getContentType(type)) return NextResponse.json({ success: false, message: "Unknown type" }, { status: 404 });
  try {
    const data = await getContent(type, id);
    if (!data) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json({ success: false, message: (e as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const { type, id } = await params;
  if (!getContentType(type)) return NextResponse.json({ success: false, message: "Unknown type" }, { status: 404 });
  try {
    const body = await req.json();
    const updated = await updateContent(type, id, body);
    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    return NextResponse.json({ success: false, message: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const { type, id } = await params;
  if (!getContentType(type)) return NextResponse.json({ success: false, message: "Unknown type" }, { status: 404 });
  try {
    await deleteContent(type, id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, message: (e as Error).message }, { status: 500 });
  }
}
