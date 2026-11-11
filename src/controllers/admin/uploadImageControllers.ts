import { NextResponse } from "next/server";
import { isAdmin } from "@/src/lib/requireAdmin";
import { uploadImageService } from "@/src/services/admin/uploadImageServices";

/** The CMS uploaders allow at most 2 MB; this enforces the same on the server. */
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;

/**
 * Site images are WebP only. The CMS checks the file type in the browser; this
 * checks the actual bytes, so a renamed JPG is refused too.
 */
function isWebp(bytes: Buffer) {
  return (
    bytes.length > 12 &&
    bytes.toString("latin1", 0, 4) === "RIFF" &&
    bytes.toString("latin1", 8, 12) === "WEBP"
  );
}

export const uploadImageController = async (req: Request) => {
  // /api/admin/* is outside the proxy's matcher, so the route checks the admin
  // cookie itself. Without this anyone could store files in the bucket.
  if (!(await isAdmin())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "File not found" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "Image must be under 2 MB." },
        { status: 413 }
      );
    }

    const head = Buffer.from(await file.slice(0, 16).arrayBuffer());
    if (!isWebp(head)) {
      return NextResponse.json(
        { success: false, error: "Only WebP images can be uploaded." },
        { status: 415 }
      );
    }

    const imageUrl = await uploadImageService(file, folder);

    return NextResponse.json(
      { success: true, url: imageUrl },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
};
