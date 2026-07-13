import React from 'react'

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const CMSSeoSection = ({
  metaTitle, metaDescription, onChange,
}: {
  metaTitle: string;
  metaDescription: string;
  onChange: any;
  editorType: "Blog" | "Package" | "Temple" | "Pooja" | "Hotel";
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="text-sm text-blue-300/70">Meta Title</label>
        <input
          value={metaTitle}
          required
          placeholder="A Human Approach to Meet Krishna"
          className={inputClass}
          onChange={(e) => onChange("metaTitle", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-blue-300/70">Meta Description</label>
        <input
          value={metaDescription}
          required
          placeholder="Growing Spirtuality In you"
          className={inputClass}
          onChange={(e) => onChange("metaDescription", e.target.value)}
        />
      </div>

    </div>
  );
};

export default CMSSeoSection;