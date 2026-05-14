import { NextRequest, NextResponse } from "next/server";
import { getTourBySlugAndDuration } from "@/controllers/users/packageControllers";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    const duration = req.nextUrl.searchParams.get("duration");

    if (!slug || !duration) {
      return NextResponse.json(
        { success: false, message: "Missing query params" },
        { status: 400 }
      );
    }

    return await getTourBySlugAndDuration(slug, duration);

  } catch (error) {

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}