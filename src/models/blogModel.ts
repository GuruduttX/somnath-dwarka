import mongoose, { Schema } from "mongoose";
import { IBlog } from "@/src/types/blogTypes";

const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            index: true,
            trim: true
        },

        slug: {

            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },


        meta: {
            title: {
                type: String,
                required: true,
                trim: true
            },

            description: {
                type: String,
                required: true,
                trim: true
            }
        },

        image: {
            type: String,
            required: true
        },

        alt: {
            type: String,
            required: true

        },

        subContent: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        structuredData: {
            title: {
                type: String
            },

            description: {
                type: String
            }
        },

        faqs: [
            {
                id : {
                    type : String,
                    required : true
                },

                question: {
                    type: String,
                    required: true
                },

                answer: {
                    type: String,
                    required: true
                }
            }
        ],


        /**
         * Traveller testimonials shown on the guide page. Optional: a guide
         * with none simply renders no testimonial section.
         *
         * Only `review` is required — a quote with no text is not a
         * testimonial. Everything else is optional so an editor can publish
         * what they genuinely have rather than inventing a city to satisfy a
         * required field.
         */
        testimonials: [
            {
                id: {
                    type: String,
                    required: true
                },

                name: {
                    type: String,
                    trim: true
                },

                location: {
                    type: String,
                    trim: true
                },

                destination: {
                    type: String,
                    trim: true
                },

                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                    default: 5
                },

                review: {
                    type: String,
                    required: true
                }
            }
        ],

        status: {
            type: String,
            required: true,
            enum: ["draft", "published"],
            default: "draft"
        }

    },
    {
        timestamps: true
    }
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;