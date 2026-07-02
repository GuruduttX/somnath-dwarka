import { connectDB } from "@/src/lib/mongodb";
import { getContentType } from "@/src/lib/contentRegistry";

/** Generic CRUD over any registered content type (SOP §15). */

export async function listContent(type: string) {
  const def = getContentType(type);
  if (!def) throw new Error("Unknown content type");
  await connectDB();
  return def.model.find({}).sort({ updatedAt: -1 }).lean();
}

export async function getContent(type: string, id: string) {
  const def = getContentType(type);
  if (!def) throw new Error("Unknown content type");
  await connectDB();
  return def.model.findById(id).lean();
}

export async function createContent(type: string, data: Record<string, unknown>) {
  const def = getContentType(type);
  if (!def) throw new Error("Unknown content type");
  await connectDB();
  return def.model.create(data);
}

export async function updateContent(type: string, id: string, data: Record<string, unknown>) {
  const def = getContentType(type);
  if (!def) throw new Error("Unknown content type");
  await connectDB();
  return def.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
}

export async function deleteContent(type: string, id: string) {
  const def = getContentType(type);
  if (!def) throw new Error("Unknown content type");
  await connectDB();
  return def.model.findByIdAndDelete(id).lean();
}
