import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { createEnquiryController } from "@/src/controllers/users/enquiryControllers";

export async function POST(req: Request) {
    try {
        await connectDB();

        return await createEnquiryController(req);
    } catch (error) {
        console.error("Enquiry error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Could not submit your enquiry. Please try again.",
            },
            { status: 500 }
        );
    }
}
