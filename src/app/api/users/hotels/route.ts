import { getUserAllHotelsController } from "@/src/controllers/users/hotelControllers";
import { connectDB } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {

    try {

        await connectDB();

        return getUserAllHotelsController();

    } catch (error) {

        NextResponse.json({ success: false })

    }

}
