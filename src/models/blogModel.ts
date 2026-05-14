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