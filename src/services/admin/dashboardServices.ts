import Blog from "@/src/models/blogModel"
import TourPackageModel from "@/src/models/packageModel"
import { connectDB } from "@/src/lib/mongodb"


export const getAllAdminDashboardDataServices = async ()=> {
        await connectDB();

       const [ blogsCount,  packageCount] =
         await Promise.all([
           Blog.countDocuments({ status: "published" }),
           TourPackageModel.countDocuments({ status: "published" }),
         ]);

       return {
       
         blogsCount,
         packageCount,
       };
        
}