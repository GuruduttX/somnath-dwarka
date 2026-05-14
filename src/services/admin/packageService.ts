import { connectDB } from "@/src/lib/mongodb";
import TourPackageModel from "@/src/models/packageModel";

export async function createAdminPackageService(data : any){
     await connectDB();
     const tour  = await TourPackageModel.create(data);
     return tour;
}

export async function getAdminPackagesService() {
    await connectDB();
    const tours = await TourPackageModel.find();
    return tours;
}

export async function updateAdminPackagesService(id : string, data : any) {
    await connectDB();
    const updated = await TourPackageModel.findByIdAndUpdate(id,data, {new : true});

    return updated;
}

export async function deleteAdminPackageService(id: string) {
  await connectDB();

  const deletedTour = await TourPackageModel.findByIdAndDelete(id);

  if (!deletedTour) {
    throw new Error("Tour not found");
  }

  return deletedTour;
}

export async function getAdminPackageByIdService(id : string) {
  await connectDB();
  const tour = await TourPackageModel.findById(id);

  if (!tour) {
    throw new Error("Tour not found");
  }

  return tour;
}

export async function getPackageBySlugServices(slug : string){
     await connectDB();
     const tour = await TourPackageModel.findOne({slug : slug});
     
     return tour;
}

