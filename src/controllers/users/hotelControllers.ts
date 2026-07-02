import { NextResponse } from "next/server";
import {
  getUserAllHotelsService,
  getUserHotelBySlugService,
} from "@/src/services/users/hotelService";

export async function getUserAllHotelsController() {
  try {
    const data = await getUserAllHotelsService();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("hotel list error", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}

export async function getUserHotelBySlugController(slug: string) {
  try {
    const data = await getUserHotelBySlugService(slug);
    if (!data) {
      return NextResponse.json({ exists: false }, { status: 404 });
    }
    return NextResponse.json({ exists: true, data });
  } catch (error) {
    console.error("hotel detail error", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
