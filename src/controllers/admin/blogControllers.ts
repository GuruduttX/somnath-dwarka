import { createAdminBlogService, deleteAdminBlogService, getAllAdminBlogsService, getAdminBlogByIdService , updateAdminBlogService} from "@/src/services/admin/blogServices";
import { blogSchema } from "@/src/zodSchema/blogSchema";
import { getBlogBySlugServices } from "@/src/services/admin/blogServices";
import { revalidateGuide } from "@/src/lib/revalidate";

import { NextResponse } from "next/server";
import { success } from "zod";


/**
 * Drop testimonial rows the editor added but never filled in.
 *
 * The CMS starts a new row empty, so an editor who clicks "Add testimonial"
 * and then changes their mind would otherwise send a row with no quote — and
 * the model requires `review`, which would fail the whole save with a mongoose
 * validation error rather than the one blank row being ignored.
 */
const stripEmptyTestimonials = <T extends { testimonials?: { review?: string }[] }>(
  data: T
): T =>
  data.testimonials
    ? { ...data, testimonials: data.testimonials.filter((t) => t.review?.trim()) }
    : data;

export const createAdminBlogController = async (req: Request) => {

    try {

        const body = await req.json();
        const result = blogSchema.safeParse(body);

        if(!result.success){
            return Response.json({
                success : false,
                error : result.error.flatten()
            }, {status : 400})
        }

        const blogData = stripEmptyTestimonials(result.data);

        const blog = await createAdminBlogService(blogData);

        // Publish is useless if /guides/ keeps serving its hour-old copy.
        revalidateGuide(blogData.slug);

        return NextResponse.json({
            success: true,
            data: blog
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });

    }

};



export const getAllAdminBlogController = async () => {

    try {

        const blogs = await getAllAdminBlogsService();

        return NextResponse.json({
            success: true,
            data: blogs
        }, { status: 200 });

    } catch (error) {
        console.log("Error Mesage", error);
        return NextResponse.json({
            success: false,
            message: "Blogs Not Found. There Are Some Errors"
        }, { status: 500 });

    }

};



export const getAdmingBlogByIdController = async (id : string) => {

    try {

        const blog = await getAdminBlogByIdService(id);

        if (!blog) {
            return NextResponse.json({
                success: false,
                message: "Blog Not Found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: blog
        });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });

    }

};



export const updateAdminBlogController = async (req: Request, id: string) => {

    try {

        const body = await req.json();
        console.log(body.faqs, "this is blog faqs")
        if(!id){
            return Response.json({success : false, error : 'Id is required'}, {status : 400})
        }
        
        const result = blogSchema.safeParse(body);

        if(!result.success){
            return Response.json({
                success : false,
                error : result.error.flatten()
            }, {status : 400})
        }

        const blogData = stripEmptyTestimonials(result.data);

        // Read the current slug first: if the editor renamed it, the old URL
        // has to be flushed too or it keeps serving the cached guide.
        const previous = await getAdminBlogByIdService(id).catch(() => null);
        const previousSlug = (previous as { slug?: string } | null)?.slug;

        const blog = await updateAdminBlogService(id, blogData);

        revalidateGuide(blogData.slug);
        if (previousSlug && previousSlug !== blogData.slug) revalidateGuide(previousSlug);

        return NextResponse.json({
            success: true,
            data: blog
        });

    } catch (error: any) {
        console.log("Error in admin", error);

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });

    }

};



export const deleteAdminBlogController = async (id: string) => {

    try {

        const deleted = await deleteAdminBlogService(id);

        revalidateGuide((deleted as { slug?: string } | null)?.slug);

        return NextResponse.json({
            success: true,
            message: "Blog Deleted Successfully"
        });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });

    }

};

export async function getBlogBySlugController(slug : string){
    try {

      const blog = await getBlogBySlugServices(slug);
      
      if(!blog){
         return NextResponse.json({exists : false}, {status : 404});
      }

      return NextResponse.json({exists : true, data : blog}, {status : 200});
      
    } catch (error) {
       console.log("This is the error ", error);
       return NextResponse.json({message : "Something went Wrong!"},{status:500})
    }
}