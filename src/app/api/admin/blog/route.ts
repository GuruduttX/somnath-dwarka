import { createAdminBlogController, getAllAdminBlogController } from "@/src/controllers/admin/blogControllers";
import { connectDB } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {

    try {

        await connectDB();

        return await getAllAdminBlogController();

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: "Failed to fetch blogs"
        }, { status: 500 });

    }

}



export async function POST(req: Request) {

    try {

        await connectDB();

        return createAdminBlogController(req);

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: "Failed to create blog"
        }, { status: 500 });

    }

}