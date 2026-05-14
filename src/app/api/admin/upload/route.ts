import { uploadImageController } from "@/src/controllers/admin/uploadImageControllers";

export async function POST(req: Request) {
  return uploadImageController(req);
}