import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { isAdmin } from "@/src/lib/requireAdmin";
import {
    getAllEnquiriesController,
    unauthorized,
} from "@/src/controllers/admin/enquiryControllers";

export async function GET() {
    try {
        if (!(await isAdmin())) return unauthorized();

        await connectDB();

        return await getAllEnquiriesController();
    } catch (error) {
        console.error("Enquiry list error:", error);

        return NextResponse.json(
            { success: false, message: "Failed to fetch enquiries" },
            { status: 500 }
        );
    }
}
