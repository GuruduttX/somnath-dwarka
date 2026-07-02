import { connectDB } from "@/src/lib/mongodb";
import TaxiModel from "@/src/models/taxiModel";

export async function getUserAllTaxiService() {
  await connectDB();
  return TaxiModel.find({ status: "published" }).sort({ createdAt: -1 }).lean();
}

export async function getUserTaxiBySlugService(slug: string) {
  await connectDB();
  const doc = await TaxiModel.findOne({ slug, status: "published" }).lean();
  return doc ?? null;
}
