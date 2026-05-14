import mongoose, { Document } from "mongoose";

interface Itinerary {
  _id?: mongoose.Types.ObjectId;
  day?: number;
  title?: string;
  description?: string;
}

interface FAQ {
  _id?: mongoose.Types.ObjectId;
  question?: string;
  answer?: string;
}

interface Duration {
  days?: number;
  place?: string;
}

interface Testimonial {
  name?: string;
  description?: string;
  rating?: number;
}

interface RouteSegment {
  from?: string;
  to?: string;
}

interface RouteType {
  source?: string;
  destination?: string;
  segments?: RouteSegment[];
}

interface KnowBeforeYouGoType {
    id : string;
    description : string;
}

export interface ITourPackage extends Document {
  title?: string;
  slug?: string;
  category?: string;

  price?: number;
  rating?: number;

  duration?: string;

  status: "draft" | "published"; 

  days?: number;
  nights?: number;

  durationbreakdown?: Duration[];

  destination?: string;
  overview?: string;

  highlights?: string[];
  itinerary?: Itinerary[];

  inclusions?: string[];
  exclusions?: string[];

  faqs?: FAQ[];

  metaTitle?: string;
  metaDescription?: string;

  schemaTitle?: string;
  schemaDescription?: string;

  refund?: string;
  cancel?: string;
  confirmation?: string;
  payment?: string;

  heroImage?: string;
  images?: string[];

  childImages?: {
    image?: string;
    alt?: string;
  }[];

  testimonials?: Testimonial[];

  KnowBeforeYouGo?: KnowBeforeYouGoType[];

  routes?: RouteType[];

  isTransferIncluded?: boolean;
  isStayIncluded?: boolean;
  isBreakfastIncluded?: boolean;
  isSightseeingIncluded?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}