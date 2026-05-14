import { getUserAllTaxiController} from "@/controllers/users/taxiControllers";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

  try {

    await connectDB();  

    return await getUserAllTaxiController();

  } catch (error: any) {

    return NextResponse.json(

      { success: false, message: error.message },
      { status: 500 }

    );
  }
}
