import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { isAdmin } from "@/src/lib/requireAdmin";
import {
    getEnquiryByIdController,
    updateEnquiryController,
    deleteEnquiryController,
    unauthorized,
} from "@/src/controllers/admin/enquiryControllers";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!(await isAdmin())) return unauthorized();

        await connectDB();

        const { id } = await params;

        return await getEnquiryByIdController(id);
    } catch (error) {
        console.error("Enquiry fetch error:", error);

        return NextResponse.json(
            { success: false, message: "Failed to fetch enquiry" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!(await isAdmin())) return unauthorized();

        await connectDB();

        const { id } = await params;

        return await updateEnquiryController(id, req);
    } catch (error) {
        console.error("Enquiry update error:", error);

        return NextResponse.json(
            { success: false, message: "Failed to update enquiry" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!(await isAdmin())) return unauthorized();

        await connectDB();

        const { id } = await params;

        return await deleteEnquiryController(id);
    } catch (error) {
        console.error("Enquiry delete error:", error);

        return NextResponse.json(
            { success: false, message: "Failed to delete enquiry" },
            { status: 500 }
        );
    }
}
