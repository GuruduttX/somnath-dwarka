"use client";

import RichTextEditor from "@/src/components/Admin/shared/RichTextEditor";

const PackageOverview = ({
  overview,
  onChange,
}: {
  overview: string;
  onChange: any;
  editorType: "Blog" | "Package";
}) => {
  return (
    <div className="border border-pink-900/50 rounded-2xl w-full p-6 bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-pink-100 mb-5">
        Package Overview
      </h3>

      <RichTextEditor
        value={overview}
        onChange={(val) => onChange("overview", val)}
        minHeight="65vh"
        maxHeight="70vh"
      />
    </div>
  );
};

export default PackageOverview;
