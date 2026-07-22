import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Enquiry from "@/src/models/enquiryModel";

const STATUSES = ["new", "contacted", "converted", "closed"] as const;

const unauthorized = () =>
    NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

const notFound = () =>
    NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });

export { unauthorized };

export async function getAllEnquiriesController() {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();

    const counts = enquiries.reduce<Record<string, number>>((acc, e: any) => {
        acc[e.status] = (acc[e.status] ?? 0) + 1;
        return acc;
    }, {});

    return NextResponse.json({
        success: true,
        data: enquiries,
        stats: {
            total: enquiries.length,
            new: counts.new ?? 0,
            contacted: counts.contacted ?? 0,
            converted: counts.converted ?? 0,
            closed: counts.closed ?? 0,
        },
    });
}

export async function getEnquiryByIdController(id: string) {
    if (!mongoose.isValidObjectId(id)) return notFound();

    const enquiry = await Enquiry.findById(id).lean();
    if (!enquiry) return notFound();

    return NextResponse.json({ success: true, data: enquiry });
}

/** Admin may only move an enquiry through the pipeline or annotate it. */
export async function updateEnquiryController(id: string, req: Request) {
    if (!mongoose.isValidObjectId(id)) return notFound();

    const body = await req.json();
    const update: Record<string, unknown> = {};

    if (body.status !== undefined) {
        if (!STATUSES.includes(body.status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status" },
                { status: 400 }
            );
        }
        update.status = body.status;
    }

    if (body.adminNotes !== undefined) {
        update.adminNotes = String(body.adminNotes).slice(0, 4000);
    }

    if (!Object.keys(update).length) {
        return NextResponse.json(
            { success: false, message: "Nothing to update" },
            { status: 400 }
        );
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!enquiry) return notFound();

    return NextResponse.json({ success: true, data: enquiry });
}

export async function deleteEnquiryController(id: string) {
    if (!mongoose.isValidObjectId(id)) return notFound();

    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) return notFound();

    return NextResponse.json({ success: true, message: "Enquiry deleted" });
}
