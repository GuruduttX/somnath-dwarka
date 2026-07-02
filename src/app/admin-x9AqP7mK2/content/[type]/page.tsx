import { notFound } from "next/navigation";
import ContentManager from "@/src/components/Admin/ContentManager";
import { getContentType } from "@/src/lib/contentRegistry";

export const dynamic = "force-dynamic";

export default async function ContentTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const def = getContentType(type);
  if (!def) notFound();
  return (
    <ContentManager type={def.key} label={def.label} pathHint={def.pathHint} typeFields={def.typeFields} />
  );
}
