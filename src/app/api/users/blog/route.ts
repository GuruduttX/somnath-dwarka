import { getUserAllBlogsController } from "@/controllers/users/blogControllers";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        await connectDB();

        return getUserAllBlogsController();

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: "Failed to fetch users blogs"
            
        }, { status: 500 });

    }

}
