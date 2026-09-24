import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import Enquiry from "@/src/models/enquiryModel";
import { getResend, MAIL_FROM, MAIL_ADMIN } from "@/src/lib/email/resend";
import { pushLeadToSembark } from "@/src/lib/crm/sembark";
import {
    enquiryConfirmationHtml,
    enquiryConfirmationSubject,
    enquiryConfirmationText,
    enquiryAdminHtml,
    enquiryAdminSubject,
} from "@/src/lib/email/enquiryTemplate";

import { EnquiryService, IEnquiry } from "@/src/types/enquiryTypes";

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

    // Email confirmation and CRM push run in parallel and independently — neither
    // can fail the request or lose the lead (it is already persisted above).
    const [emailSent, crm] = await Promise.all([
        sendEnquiryMails(enquiry.toObject(), input.source, input.pageUrl),
        pushLeadToSembark(enquiry.toObject() as IEnquiry),
    ]);

    if (emailSent) enquiry.emailSent = true;
    if (crm.synced) {
        enquiry.crmSynced = true;
        if (crm.id) enquiry.crmRequestId = crm.id;
    }
    if (emailSent || crm.synced) {
        await enquiry.save();
    }

    return NextResponse.json(
        {
            success: true,
            message: "Enquiry submitted successfully",
            data: {
                id: enquiry._id.toString(),
                // Lets the same browser attach step-2 answers to this lead
                // (home two-step form) without exposing an update-by-id hole.
                token: leadToken(enquiry._id.toString()),
                emailSent,
                crmSynced: crm.synced,
            },
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

/* ------------------------- two-step form: step 2 ------------------------- */

/**
 * The home page enquiry form is two steps (home SOP §14): step 1 creates the
 * lead — so it counts even if the visitor stops there — and step 2 adds the
 * qualifying answers to that same lead instead of creating a duplicate.
 *
 * Step 1's response carries an HMAC of the lead id. Only a holder of that token
 * can update the lead, the update is limited to the qualifying fields, and it
 * is accepted only while the lead is fresh and still untouched by the team.
 */
const QUALIFY_WINDOW_MS = 24 * 60 * 60 * 1000;

function leadToken(id: string): string {
    const secret = process.env.JWT_SECRET || "enquiry-lead-token";
    return createHmac("sha256", secret).update(`lead:${id}`).digest("base64url");
}

function tokenMatches(id: string, token: string): boolean {
    const expected = Buffer.from(leadToken(id));
    const given = Buffer.from(token);
    return expected.length === given.length && timingSafeEqual(expected, given);
}

const qualifySchema = z.object({
    id: z.string().trim().regex(/^[a-f0-9]{24}$/i, "Invalid lead"),
    token: z.string().trim().min(10).max(100),
    adults: z.coerce.number().int().min(1).max(60),
    children: z.coerce.number().int().min(0).max(60).default(0),
    startingCity: z.string().trim().min(2).max(80),
    hotelCategory: z.string().trim().max(80).optional(),
    request: z.string().trim().max(1000).optional(),
});

export async function qualifyEnquiryController(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
    }

    const parsed = qualifySchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { success: false, message: parsed.error.issues[0]?.message ?? "Invalid details" },
            { status: 400 }
        );
    }

    const input = parsed.data;
    if (!tokenMatches(input.id, input.token)) {
        return NextResponse.json({ success: false, message: "Invalid lead" }, { status: 403 });
    }

    const enquiry = await Enquiry.findById(input.id);
    const createdAt = enquiry?.createdAt ? new Date(enquiry.createdAt).getTime() : 0;
    if (!enquiry || enquiry.status !== "new" || Date.now() - createdAt > QUALIFY_WINDOW_MS) {
        return NextResponse.json({ success: false, message: "Lead can no longer be updated" }, { status: 409 });
    }

    const guests = `${input.adults} adult${input.adults === 1 ? "" : "s"}${
        input.children ? `, ${input.children} child${input.children === 1 ? "" : "ren"}` : ""
    }`;
    const extra = [
        input.hotelCategory ? `Hotel category: ${input.hotelCategory}` : "",
        input.request ? `Special request: ${input.request}` : "",
    ].filter(Boolean);

    enquiry.details = { ...(enquiry.details?.toObject?.() ?? enquiry.details ?? {}), guests, pickup: input.startingCity };
    if (extra.length) {
        enquiry.message = [enquiry.message, ...extra].filter(Boolean).join("\n");
    }
    await enquiry.save();

    return NextResponse.json({ success: true, message: "Details added" });
}
