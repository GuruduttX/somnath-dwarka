import { getUserAllToursController } from "@/controllers/users/packageControllers";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  try {

    await connectDB();

    return await getUserAllToursController();

  } catch (error) {

    return NextResponse.json({

      success: false,
      message: "Failed to fetch users packages"

    }, { status: 500 });

  }

}





