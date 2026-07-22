import { NextResponse } from "next/server";
import { z } from "zod";
import Enquiry from "@/src/models/enquiryModel";
import { getResend, MAIL_FROM, MAIL_ADMIN } from "@/src/lib/email/resend";
import {
    enquiryConfirmationHtml,
    enquiryConfirmationSubject,
    enquiryConfirmationText,
    enquiryAdminHtml,
    enquiryAdminSubject,
} from "@/src/lib/email/enquiryTemplate";

import { EnquiryService } from "@/src/types/enquiryTypes";

const SERVICES: readonly EnquiryService[] = [
    "Tour Package",
    "Taxi Booking",
    "Hotel Booking",
    "Pooja",
    "General Enquiry",
];

/**
 * Call sites pass free-text service labels ("Somnath Dwarka Tour", "Custom
 * Somnath Dwarka Package"…). Bucket them into the enum so the admin can filter,
 * while `serviceLabel` keeps whatever the CTA actually said.
 */
function normaliseService(label?: string): EnquiryService {
    if (!label) return "General Enquiry";
    if (SERVICES.includes(label as EnquiryService)) return label as EnquiryService;

    const l = label.toLowerCase();
    if (/(taxi|cab|car)/.test(l)) return "Taxi Booking";
    if (/(hotel|stay|room)/.test(l)) return "Hotel Booking";
    if (/pooja|puja/.test(l)) return "Pooja";
    if (/(tour|package|yatra|trip)/.test(l)) return "Tour Package";
    return "General Enquiry";
}

const enquirySchema = z.object({
    name: z.string().trim().min(2, "Name is required").max(120),
    email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
    countryCode: z.string().trim().max(6).optional(),
    // Digits only after the country code; 6–15 covers Indian and overseas numbers.
    phone: z
        .string()
        .trim()
        .regex(/^[0-9]{6,15}$/, "Enter a valid phone number"),
    service: z.string().trim().max(80).optional(),
    message: z.string().trim().max(2000).optional(),
    details: z
        .object({
            travelWith: z.string().trim().max(120).optional(),
            bookingTiming: z.string().trim().max(120).optional(),
            pickup: z.string().trim().max(200).optional(),
            drop: z.string().trim().max(200).optional(),
            travelDate: z.string().trim().max(40).optional(),
            checkin: z.string().trim().max(40).optional(),
            checkout: z.string().trim().max(40).optional(),
            guests: z.string().trim().max(40).optional(),
        })
        .optional(),
    source: z.string().trim().max(80).optional(),
    pageUrl: z.string().trim().max(500).optional(),
});

/**
 * Public lead capture. The enquiry is persisted first and the mail is sent
 * after — a mail failure must never lose a lead, so it only flips `emailSent`.
 */
export async function createEnquiryController(req: Request) {
    let body: unknown;

    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { success: false, message: "Invalid request body" },
            { status: 400 }
        );
    }

    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            {
                success: false,
                message: parsed.error.issues[0]?.message ?? "Invalid enquiry details",
            },
            { status: 400 }
        );
    }

    const input = parsed.data;
    const email = input.email || undefined;

    const enquiry = await Enquiry.create({
        name: input.name,
        email,
        countryCode: input.countryCode || "+91",
        phone: input.phone,
        service: normaliseService(input.service),
        serviceLabel: input.service,
        message: input.message,
        details: input.details,
        source: input.source,
        pageUrl: input.pageUrl,
        status: "new",
    });

    const emailSent = await sendEnquiryMails(enquiry.toObject(), input.source, input.pageUrl);

    if (emailSent) {
        enquiry.emailSent = true;
        await enquiry.save();
    }

    return NextResponse.json(
        {
            success: true,
            message: "Enquiry submitted successfully",
            data: { id: enquiry._id.toString(), emailSent },
        },
        { status: 201 }
    );
}

/** Returns true when the customer confirmation went out. Never throws. */
async function sendEnquiryMails(
    enquiry: any,
    source?: string,
    pageUrl?: string
): Promise<boolean> {
    const resend = getResend();
    if (!resend) {
        console.warn("[enquiry] RESEND_API_KEY not set — skipping confirmation email");
        return false;
    }

    let sent = false;

    if (enquiry.email) {
        try {
            const { error } = await resend.emails.send({
                from: MAIL_FROM,
                to: enquiry.email,
                subject: enquiryConfirmationSubject(enquiry),
                html: enquiryConfirmationHtml(enquiry),
                text: enquiryConfirmationText(enquiry),
            });
            if (error) console.error("[enquiry] customer mail failed:", error);
            else sent = true;
        } catch (err) {
            console.error("[enquiry] customer mail threw:", err);
        }
    }

    if (MAIL_ADMIN) {
        try {
            await resend.emails.send({
                from: MAIL_FROM,
                to: MAIL_ADMIN.split(",").map((a) => a.trim()).filter(Boolean),
                replyTo: enquiry.email || undefined,
                subject: enquiryAdminSubject(enquiry),
                html: enquiryAdminHtml(enquiry, source, pageUrl),
            });
        } catch (err) {
            console.error("[enquiry] admin notification failed:", err);
        }
    }

    return sent;
}
