/**
 * Moves the site's Cloudinary images to Cloudflare R2.
 *
 *   node --env-file=.env.local scripts/migrate-cloudinary-to-r2.mjs copy
 *     Copies every Cloudinary image used by the blogs collection and the
 *     hardcoded code images to R2, then checks each one on the public URL.
 *     Safe to re-run: objects already in R2 with the same size are skipped.
 *
 *   node --env-file=.env.local scripts/migrate-cloudinary-to-r2.mjs db
 *     Dry run: shows which blogs.image values would change.
 *
 *   node --env-file=.env.local scripts/migrate-cloudinary-to-r2.mjs db --apply
 *     Rewrites blogs.image from Cloudinary to R2. Writes a backup first
 *     (scripts/data/r2-migration-backup-<time>.json) with every old value.
 *     Run it only after the code that serves R2 images is deployed: the old
 *     build has no R2 host in images.remotePatterns, so it cannot show them.
 *
 *   node --env-file=.env.local scripts/migrate-cloudinary-to-r2.mjs rollback <backup.json>
 *     Puts the Cloudinary URLs from a backup file back.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import sharp from "sharp";
import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, "scripts", "data");
const CLOUDINARY = "https://res.cloudinary.com/dnhau4zv2/image/upload/";

const env = process.env;
for (const k of ["MONGODB_URI", "R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME", "NEXT_PUBLIC_R2_PUBLIC_URL"]) {
  if (!env[k]) throw new Error(`${k} is missing from .env.local`);
}
const PUBLIC_URL = env.NEXT_PUBLIC_R2_PUBLIC_URL.trim().replace(/\/+$/, "");
const BUCKET = env.R2_BUCKET_NAME.trim();

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID.trim()}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY_ID.trim(), secretAccessKey: env.R2_SECRET_ACCESS_KEY.trim() },
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

/**
 * Images hardcoded in src/. These are JPG originals; they are re-encoded once,
 * here, to WebP at the largest width the site shows them, because R2 images
 * skip Next's optimizer.
 */
const CODE_IMAGES = [
  ...["ahmedabad", "ambaji", "diu", "kutch", "palitana", "porbandar", "saputara"].map((name) => ({
    from: `${CLOUDINARY}somnath-dwarka/destinations/${name}.jpg`,
    key: `somnath-dwarka/destinations/${name}.webp`,
    width: 640, // home cards render at most 300px wide; 640 covers 2x screens
  })),
  ...["ertiga", "innova-crysta", "tempo-traveller"].map((name) => ({
    from: `${CLOUDINARY}somnath-dwarka/fleet/${name}.jpg`,
    key: `somnath-dwarka/fleet/${name}.webp`,
    width: 960, // taxi card grids go up to a third of the page
  })),
];

/** Cloudinary blog URL -> R2 key: the public_id path without the version segment. */
function keyForCloudinary(url) {
  if (!url.startsWith(CLOUDINARY)) return null;
  return url.slice(CLOUDINARY.length).replace(/^v\d+\//, "");
}

async function existingSize(key) {
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return head.ContentLength ?? -1;
  } catch (e) {
    if (e?.$metadata?.httpStatusCode === 404) return null;
    throw e;
  }
}

async function download(url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { body: Buffer.from(await res.arrayBuffer()), type: res.headers.get("content-type") ?? "" };
    } catch (e) {
      if (attempt >= 3) throw new Error(`download failed (${url}): ${e.message}`);
    }
  }
}

async function verifyPublic(key, expectedSize) {
  const res = await fetch(`${PUBLIC_URL}/${key}`, { method: "HEAD", signal: AbortSignal.timeout(20000) });
  const len = Number(res.headers.get("content-length") ?? -1);
  if (!res.ok) return `HTTP ${res.status}`;
  if (expectedSize >= 0 && len >= 0 && len !== expectedSize) return `size ${len} != ${expectedSize}`;
  return null;
}

async function blogImages() {
  await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  const docs = await mongoose.connection.db
    .collection("blogs")
    .find({ image: { $regex: "^https://res\\.cloudinary\\.com/" } }, { projection: { image: 1 } })
    .toArray();
  return docs;
}

async function runPool(items, size, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => { while (i < items.length) await fn(items[i++]); }));
}

async function copy() {
  const docs = await blogImages();
  await mongoose.disconnect();

  const jobs = [];
  const seen = new Set();
  for (const d of docs) {
    const key = keyForCloudinary(d.image);
    if (!key) { console.log(`skip (not this Cloudinary account): ${d.image}`); continue; }
    if (seen.has(d.image)) continue;
    seen.add(d.image);
    jobs.push({ from: d.image, key, convert: false });
  }
  for (const c of CODE_IMAGES) jobs.push({ ...c, convert: true });

  console.log(`Copying ${jobs.length} images to R2 bucket "${BUCKET}"...`);
  const mapping = {};
  const failures = [];
  let copied = 0, skipped = 0, bytesIn = 0, bytesOut = 0;

  await runPool(jobs, 8, async (job) => {
    try {
      const { body, type } = await download(job.from);
      bytesIn += body.length;
      let out = body, contentType = type || "image/webp";
      if (job.convert) {
        out = await sharp(body).rotate().resize({ width: job.width, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
        contentType = "image/webp";
      } else if (contentType !== "image/webp") {
        throw new Error(`expected WebP, got ${contentType}`);
      }
      bytesOut += out.length;

      if ((await existingSize(job.key)) === out.length) {
        skipped++;
      } else {
        await s3.send(new PutObjectCommand({
          Bucket: BUCKET,
          Key: job.key,
          Body: out,
          ContentType: contentType,
          // Blog keys are unique Cloudinary ids; code-image keys are fixed names
          // that may be re-uploaded, so they get a shorter cache.
          CacheControl: job.convert ? "public, max-age=2592000" : "public, max-age=31536000, immutable",
        }));
        copied++;
      }

      const problem = await verifyPublic(job.key, out.length);
      if (problem) throw new Error(`public URL check failed: ${problem}`);
      mapping[job.from] = `${PUBLIC_URL}/${job.key}`;
    } catch (e) {
      failures.push({ from: job.from, error: e.message });
    }
    const done = copied + skipped + failures.length;
    if (done % 25 === 0 || done === jobs.length) console.log(`  ${done}/${jobs.length}`);
  });

  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(join(DATA_DIR, "r2-migration-map.json"), JSON.stringify(mapping, null, 2));
  console.log(`\nDone. uploaded ${copied}, already there ${skipped}, failed ${failures.length}`);
  console.log(`Downloaded ${(bytesIn / 1048576).toFixed(1)} MB, stored ${(bytesOut / 1048576).toFixed(1)} MB`);
  console.log(`Verified on ${PUBLIC_URL}: ${Object.keys(mapping).length}/${jobs.length}`);
  for (const f of failures) console.log(`  FAILED ${f.from}: ${f.error}`);
  console.log(`Mapping written to scripts/data/r2-migration-map.json`);
  if (failures.length) process.exitCode = 1;
}

async function db(apply) {
  const mapping = JSON.parse(readFileSync(join(DATA_DIR, "r2-migration-map.json"), "utf8"));
  const docs = await blogImages();
  const changes = docs.filter((d) => mapping[d.image]).map((d) => ({ _id: d._id, old: d.image, new: mapping[d.image] }));
  const unmapped = docs.filter((d) => !mapping[d.image]);
  console.log(`blogs with a Cloudinary image: ${docs.length}; will change: ${changes.length}; no R2 copy yet: ${unmapped.length}`);
  for (const u of unmapped.slice(0, 10)) console.log(`  not copied: ${u._id} ${u.image}`);

  if (!apply) {
    for (const c of changes.slice(0, 3)) console.log(`  ${c._id}\n    ${c.old}\n -> ${c.new}`);
    console.log("\nDry run only. Add --apply to write.");
    await mongoose.disconnect();
    return;
  }

  const backup = join(DATA_DIR, `r2-migration-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(backup, JSON.stringify(changes.map((c) => ({ _id: String(c._id), old: c.old, new: c.new })), null, 2));
  console.log(`Backup written: ${backup}`);

  const col = mongoose.connection.db.collection("blogs");
  // Matching on the old value too means a blog edited since the scan is left alone.
  const res = await col.bulkWrite(changes.map((c) => ({
    updateOne: { filter: { _id: c._id, image: c.old }, update: { $set: { image: c.new } } },
  })));
  console.log(`Updated ${res.modifiedCount} of ${changes.length} blogs.`);
  await mongoose.disconnect();
}

async function rollback(file) {
  const rows = JSON.parse(readFileSync(file, "utf8"));
  await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  const col = mongoose.connection.db.collection("blogs");
  const res = await col.bulkWrite(rows.map((r) => ({
    updateOne: { filter: { _id: new mongoose.Types.ObjectId(r._id), image: r.new }, update: { $set: { image: r.old } } },
  })));
  console.log(`Restored ${res.modifiedCount} of ${rows.length} blogs.`);
  await mongoose.disconnect();
}

const [mode, arg] = process.argv.slice(2);
if (mode === "copy") await copy();
else if (mode === "db") await db(arg === "--apply");
else if (mode === "rollback" && arg) await rollback(arg);
else console.log("usage: copy | db [--apply] | rollback <backup.json>");
