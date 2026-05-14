import { connectDB } from "@/lib/mongodb";
import { getUserTaxiBySlugController } from "@/controllers/admin/taxiControllers";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB()
    console.log("user taxi fetch is working")
    const {id} = await context.params;
    return getUserTaxiBySlugController(id);

  } catch (error:any) {
    
    return NextResponse.json(
          { success: false, message: error.message },
          { status: 500 }
        );
  }
    
}