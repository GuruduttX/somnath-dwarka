import { connectDB } from "@/src/lib/mongodb";
import HotelModel from "@/src/models/hotelModel";

export async function getUserAllHotelsService() {
  await connectDB();
  return HotelModel.find({ status: "published" }).sort({ createdAt: -1 }).lean();
}

export async function getUserHotelBySlugService(slug: string) {
  await connectDB();
  const doc = await HotelModel.findOne({ slug, status: "published" }).lean();
  return doc ?? null;
}
