import { NextResponse } from "next/server";
import { uploadImageService } from "@/src/services/admin/uploadImageServices";

export const uploadImageController = async (req: Request) => {

  try {

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "File not found",
      }, { status: 400 });
    }

    const imageUrl = await uploadImageService(file, folder);

    return NextResponse.json({
      success: true,
      url: imageUrl,
    });

  } catch (error: any) {

    console.log(error)

    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });

  }

};