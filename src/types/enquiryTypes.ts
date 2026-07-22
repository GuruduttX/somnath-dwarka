export type EnquiryStatus = "new" | "contacted" | "converted" | "closed";

export type EnquiryService =
    | "Tour Package"
    | "Taxi Booking"
    | "Hotel Booking"
    | "Pooja"
    | "General Enquiry";

/** Free-form extra fields captured by the service-specific popups. */
export interface IEnquiryDetails {
    travelWith?: string;
    bookingTiming?: string;
    pickup?: string;
    drop?: string;
    travelDate?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
}

export interface IEnquiry {
    _id: string;
    name: string;
    email?: string;
    countryCode?: string;
    phone: string;
    service: EnquiryService;
    /** Raw CTA wording, when it differs from the bucketed `service`. */
    serviceLabel?: string;
    message?: string;
    details?: IEnquiryDetails;
    source?: string;
    pageUrl?: string;
    status: EnquiryStatus;
    adminNotes?: string;
    emailSent?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
