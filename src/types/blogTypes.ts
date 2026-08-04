import { Document } from "mongoose";

export interface IFAQ {
  question?: string;
  answer?: string;
}

/**
 * A traveller testimonial attached to one guide.
 *
 * The editor supplies only what they actually know — who said it, where they
 * are from, which trip, the rating and the quote. The avatar initials and
 * colours are derived at render time so nobody has to pick a hex code in the
 * CMS.
 */
export interface ITestimonial {
  id?: string;
  name?: string;
  location?: string;
  destination?: string;
  rating?: number;
  review?: string;
}

export interface IMETA {
  title?: string;
  description?: string;
}

export interface ISchema {
  title?: string;
  description?: string;
}

export interface IBlog extends Document {
  title?: string;
  category?: string;
  slug?: string;

  author?: string;

  content?: string;
  subContent?: string;

  image?: string;
  alt?: string;

  meta?: IMETA;
  structuredData?: ISchema;

  faqs?: IFAQ[];
  testimonials?: ITestimonial[];

  status: "draft" | "published";

  createdAt?: Date;
  updatedAt?: Date;
}