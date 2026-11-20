import { NextResponse } from "next/server";
import { isAdmin } from "@/src/lib/requireAdmin";
import { toWebp } from "@/src/lib/mcp/images";
import { SiteError } from "@/src/lib/mcp/types";
import { uploadImageService } from "@/src/services/admin/uploadImageServices";

/*
  Upload for the admin "Media upload" page (/admin-x9AqP7mK2/media-upload/):
  a photo from the editor's own phone or computer (JPG, PNG, WebP, AVIF, ...)
  is turned upright, scaled to at most 2400px and saved as WebP on the site's
  image host (R2), the same way the /mcp/ connector's upload_image does. The
  URL it returns can be pasted into a Claude chat. Admin only.
*/

export const runtime = "nodejs";

const MAX_BYTES = 25 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ success: false, error: "No file was sent." }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ success: false, error: "The file is larger than 25 MB." }, { status: 413 });

    const image = await toWebp(new Uint8Array(await file.arrayBuffer()), file.name || "image");
    const webp = new File([image.bytes], image.fileName, { type: "image/webp" });
    const url = await uploadImageService(webp, "media-uploads");
    return NextResponse.json(
      { success: true, url, width: image.width, height: image.height, sizeKb: Math.round(image.bytes.length / 1024) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    const status = error instanceof SiteError ? error.status : 500;
    if (!(error instanceof SiteError)) console.error("POST /api/admin/media-upload error:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Upload failed" }, { status });
  }
}
