import cloudinary from "@/src/lib/cloudinary";

/**
 * Every asset this site uploads lives under one Cloudinary root folder, so the
 * media library stays scoped to this project. Callers pass a sub-folder only
 * (e.g. "packages"); it is nested under the root here rather than trusted
 * as-is, so no call site can write outside `somnath-dwarka/`.
 */
const ROOT_FOLDER = "somnath-dwarka";

const resolveFolder = (folder?: string) => {
  const sub = (folder || "")
    .trim()
    .replace(/^\/+|\/+$/g, "")          // no leading/trailing slashes
    .replace(/\.\./g, "")                // no path traversal
    .replace(new RegExp(`^${ROOT_FOLDER}/?`), ""); // don't double-nest the root
  return sub ? `${ROOT_FOLDER}/${sub}` : ROOT_FOLDER;
};

export const uploadImageService = async (file: File, folder : string) => {

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const upload = await new Promise<any>((resolve, reject) => {

    cloudinary.uploader
      .upload_stream(
        {
          folder: resolveFolder(folder),
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      )
      .end(buffer);

  });

  return upload.secure_url;
};