import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { createEnquiryController, qualifyEnquiryController } from "@/src/controllers/users/enquiryControllers";

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

/** Step 2 of the home two-step form — adds qualifying answers to a fresh lead. */
export async function PATCH(req: Request) {
    try {
        await connectDB();

        return await qualifyEnquiryController(req);
    } catch (error) {
        console.error("Enquiry qualify error:", error);

        return NextResponse.json(
            { success: false, message: "Could not save your details. Please try again." },
            { status: 500 }
        );
    }
}
