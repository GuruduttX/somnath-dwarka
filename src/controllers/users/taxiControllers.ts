import { NextResponse } from "next/server";
import {
  getUserAllTaxiService,
  getUserTaxiBySlugService,
} from "@/src/services/users/taxiService";

export async function getUserAllTaxiController() {
  try {
    const data = await getUserAllTaxiService();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("taxi list error", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch taxis" },
      { status: 500 }
    );
  }
}

export async function getUserTaxiBySlugController(slug: string) {
  try {
    const data = await getUserTaxiBySlugService(slug);
    if (!data) {
      return NextResponse.json({ exists: false }, { status: 404 });
    }
    return NextResponse.json({ exists: true, data });
  } catch (error) {
    console.error("taxi detail error", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
