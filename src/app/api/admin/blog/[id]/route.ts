import { getAdmingBlogByIdController , deleteAdminBlogController, updateAdminBlogController} from "@/src/controllers/admin/blogControllers";
import { connectDB } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req : Request,
  { params }: { params: Promise<{ id : string }> }
) {

  try {

    await connectDB();

    const {id} = await params;

    return getAdmingBlogByIdController(id);

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Blog not found"
    }, { status: 500 });

  }

}



export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id : string }> }
) {

  try {

    await connectDB();

    const { id } = await params;

    return updateAdminBlogController(req, id);

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: "Failed to update blog"
    }, { status: 500 });

  }

}



export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    const { id } = await params;

    return deleteAdminBlogController(id);

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: "Failed to delete blog"
    }, { status: 500 });

  }

}