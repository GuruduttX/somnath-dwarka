import React from 'react'

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const CMSSchema = ({
  schemaTitle, schemaDescription, onChange,
}: {
  schemaTitle: string;
  schemaDescription: string;
  onChange: any;
  editorType: "Blog" | "Package" | "Temple" | "Pooja" | "Hotel";
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="text-sm text-blue-300/70">Schema Title</label>
        <input
          value={schemaTitle}
          required
          placeholder="A Human Approach to Meet Krishna"
          className={inputClass}
          onChange={(e) => onChange("schemaTitle", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-blue-300/70">Schema Description</label>
        <input
          value={schemaDescription}
          required
          placeholder="Growing Spirtuality In you"
          className={inputClass}
          onChange={(e) => onChange("schemaDescription", e.target.value)}
        />
      </div>

    </div>
  );
};

export default CMSSchema;