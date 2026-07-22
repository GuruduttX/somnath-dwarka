import mongoose, { Schema } from "mongoose";
import { IEnquiry } from "@/src/types/enquiryTypes";

const enquirySchema = new Schema<IEnquiry>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            index: true
        },

        countryCode: {
            type: String,
            trim: true,
            default: "+91"
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        service: {
            type: String,
            required: true,
            enum: [
                "Tour Package",
                "Taxi Booking",
                "Hotel Booking",
                "Pooja",
                "General Enquiry"
            ],
            default: "General Enquiry",
            index: true
        },

        // The exact CTA wording the visitor clicked, e.g. "Custom Somnath Dwarka
        // Package" — `service` is the bucketed enum used for filtering.
        serviceLabel: {
            type: String,
            trim: true
        },

        message: {
            type: String,
            trim: true
        },

        // Service-specific extras (travel dates, pickup/drop, guests…)
        details: {
            travelWith: { type: String, trim: true },
            bookingTiming: { type: String, trim: true },
            pickup: { type: String, trim: true },
            drop: { type: String, trim: true },
            travelDate: { type: String, trim: true },
            checkin: { type: String, trim: true },
            checkout: { type: String, trim: true },
            guests: { type: String, trim: true }
        },

        // Which component/form the lead came from
        source: {
            type: String,
            trim: true
        },

        pageUrl: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            required: true,
            enum: ["new", "contacted", "converted", "closed"],
            default: "new",
            index: true
        },

        adminNotes: {
            type: String,
            trim: true
        },

        emailSent: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

enquirySchema.index({ createdAt: -1 });

const Enquiry =
    mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", enquirySchema);

export default Enquiry;
