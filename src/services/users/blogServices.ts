import Blog from "@/src/models/blogModel";


export const getUserAllBlogsService = async () => {
  try {

    const blogs = await Blog.find({status : {$eq : "published"}}).sort({ createdAt: -1 });
    return blogs;
    
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch users blogs");
  }
};



export const getUserBlogBySlugService = async (slug : string) => {
  try {
    const blog = await Blog.findOne({slug : slug});

    if(blog.status == "draft"){
      return;
    }

    if (!blog) {
      throw new Error("Users Blog not found");
    }

    return blog;

  } catch (error: any) {

    throw new Error(error.message || "Failed to fetch users blog");
  }

};