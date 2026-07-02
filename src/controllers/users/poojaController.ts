import { NextResponse } from "next/server";
import {
  getAllPoojasService,
  getUserPoojaBySlugService,
} from "@/src/services/users/poojaService";

export async function getAllPoojasController() {
  try {
    const data = await getAllPoojasService();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("pooja list error", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch poojas" },
      { status: 500 }
    );
  }
}

export async function getUserPoojaBySlugController(slug: string) {
  try {
    const data = await getUserPoojaBySlugService(slug);
    if (!data) {
      return NextResponse.json({ exists: false }, { status: 404 });
    }
    return NextResponse.json({ exists: true, data });
  } catch (error) {
    console.error("pooja detail error", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
