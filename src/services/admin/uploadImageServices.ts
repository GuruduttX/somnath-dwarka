import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import cloudinary from "@/src/lib/cloudinary";

/**
 * Every asset this site uploads lives under one root folder, so the bucket (or
 * the Cloudinary media library) stays scoped to this project. Callers pass a
 * sub-folder only (e.g. "packages"); it is nested under the root here rather
 * than trusted as-is, so no call site can write outside `somnath-dwarka/`.
 */
const ROOT_FOLDER = "somnath-dwarka";

const resolveFolder = (folder?: string) => {
  const sub = (folder || "")
    .trim()
    .replace(/[^a-zA-Z0-9/_-]/g, "")    // URL-safe keys; also drops ".." traversal
    .replace(/\/{2,}/g, "/")
    .replace(/^\/+|\/+$/g, "")          // no leading/trailing slashes
    .replace(new RegExp(`^${ROOT_FOLDER}/?`), ""); // don't double-nest the root
  return sub ? `${ROOT_FOLDER}/${sub}` : ROOT_FOLDER;
};

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl: string;
};

/** Null when any R2 value is missing, so uploads keep working through Cloudinary. */
function getR2Config(): R2Config | null {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
  const bucket = process.env.R2_BUCKET_NAME?.trim();
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim().replace(/\/+$/, "");

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) return null;
  return { accountId, accessKeyId, secretAccessKey, bucket, publicUrl };
}

let r2Client: S3Client | undefined;

function getR2Client(r2: R2Config) {
  r2Client ??= new S3Client({
    region: "auto",
    endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: r2.accessKeyId, secretAccessKey: r2.secretAccessKey },
    // R2 rejects the newer default checksum headers on PutObject.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
  return r2Client;
}

/**
 * Stores a WebP image and returns its public URL: on Cloudflare R2 when it is
 * configured, otherwise on Cloudinary as before. The controller has already
 * checked that the bytes are WebP.
 */
export const uploadImageService = async (file: File, folder: string) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const r2 = getR2Config();

  if (r2) {
    const key = `${resolveFolder(folder)}/${randomUUID()}.webp`;
    await getR2Client(r2).send(
      new PutObjectCommand({
        Bucket: r2.bucket,
        Key: key,
        Body: buffer,
        ContentType: "image/webp",
        // Keys are unique per upload, so a stored image never changes.
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    return `${r2.publicUrl}/${key}`;
  }

  console.warn("R2 environment variables missing; uploading to Cloudinary instead.");

  const upload = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: resolveFolder(folder) }, (error, result) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary upload failed"));
        resolve(result);
      })
      .end(buffer);
  });

  return upload.secure_url;
};
