import Blog from "@/src/models/blogModel";
import { IBlog } from "@/src/types/blogTypes";
import { connectDB } from "@/src/lib/mongodb";


export const createAdminBlogService = async (data: Partial<IBlog>) => {
  try {
    const blog = await Blog.create(data);
    return blog;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create blog");
  }
};


export const getAllAdminBlogsService = async () => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return blogs;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch blogs");
  }
};



export const getAdminBlogByIdService = async (id : string) => {
  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch blog");
  }
};



export const updateAdminBlogService = async (
  id: string,
  data: Partial<IBlog>
) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!updatedBlog) {
      throw new Error("Blog not found");
    }

    return updatedBlog;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update blog");
  }
};



export const deleteAdminBlogService = async (id: string) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      throw new Error("Blog not found");
    }

    return deletedBlog;
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete blog");
  }
};


export async function getBlogBySlugServices(slug : string){
     await connectDB();
     const blog = await Blog.findOne({slug : slug});
     
     return blog;
}