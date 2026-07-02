import { connectDB } from "@/src/lib/mongodb";
import PoojaModel from "@/src/models/poojaModel";

export async function getAllPoojasService() {
  await connectDB();
  return PoojaModel.find({ status: "published" }).sort({ createdAt: -1 }).lean();
}

export async function getUserPoojaBySlugService(slug: string) {
  await connectDB();
  const doc = await PoojaModel.findOne({ slug, status: "published" }).lean();
  return doc ?? null;
}
