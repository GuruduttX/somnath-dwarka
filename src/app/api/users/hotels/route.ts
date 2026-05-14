import { getUserAllHotelsController } from "@/controllers/users/hotelControllers";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {

    try {

        await connectDB();

        return getUserAllHotelsController();

    } catch (error) {

        NextResponse.json({ success: false })

    }

}
