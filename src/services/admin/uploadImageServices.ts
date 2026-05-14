import cloudinary from "@/src/lib/cloudinary";

export const uploadImageService = async (file: File, folder : string) => {

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const upload = await new Promise<any>((resolve, reject) => {

    cloudinary.uploader
      .upload_stream(
        {
          folder: folder,
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