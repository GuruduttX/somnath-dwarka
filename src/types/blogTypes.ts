import { Document } from "mongoose";

export interface IFAQ {
  question?: string;
  answer?: string;
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

  status: "draft" | "published"; 

  createdAt?: Date;
  updatedAt?: Date;
}