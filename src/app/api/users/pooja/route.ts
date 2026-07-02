import { getAllPoojasController } from "@/src/controllers/users/poojaController";
import { connectDB } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {

  try {

     await connectDB();

    return await getAllPoojasController();

  } catch (error) {

    return NextResponse.json({

      success: false,
      message: "Failed to fetch users pooja"

    }, { status: 500 });

  }
  
}



