import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CustomPageView from "@/src/components/CustomPage/CustomPageView";
import { customPagesCollection } from "@/src/lib/customPages";
import { prepareCustomPage } from "@/src/lib/customPageRender";

/*
  Admin preview of a custom page in any status, drafts included, at
  /admin-x9AqP7mK2-preview/custom-page/<id or slug>/. Behind the admin login
  (src/proxy.ts guards this prefix), outside the admin dashboard layout so it
  looks like the public page, never cached and never indexed.
*/

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function CustomPagePreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await (await customPagesCollection()).findOne({ $or: [{ id }, { slug: id }] }, { projection: { _id: 0 } });
  if (!page) notFound();
  const { page: filled, packages } = await prepareCustomPage(page);
  return <CustomPageView page={filled} packages={packages} preview />;
}
