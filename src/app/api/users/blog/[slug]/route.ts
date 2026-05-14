import { getUserBlogBySlugController } from "@/controllers/users/blogControllers";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req : Request, { params }: { params: Promise<{ slug : string }> }) {

  try {

    await connectDB();

     const {slug} = await params;

    return getUserBlogBySlugController(slug);

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,
      message: "Users Blog not found"

    }, { status: 500 });

  }

}