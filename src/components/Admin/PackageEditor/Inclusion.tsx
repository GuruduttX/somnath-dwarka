import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

type Inclusions = {
  id: string
  description: string
}

const inputClass = `
  w-full px-4 py-2.5 rounded-lg text-sm
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const Inclusion = ({
  inclusions, setInclusions,
}: {
  inclusions: Inclusions[];
  setInclusions: React.Dispatch<React.SetStateAction<Inclusions[]>>;
  editorType: "Blog" | "Package" | "Hotel";
}) => {

  const handleAddInclusions = () => {
    setInclusions((prev) => [...prev, { id: crypto.randomUUID(), description: "" }]);
  };

  const handleInclusionChange = (id: string, value: string) => {
    setInclusions((prev) =>
      prev.map((i) => i.id === id ? { ...i, description: value } : i)
    );
  };

  const handleDeleteInclusion = (id: string) => {
    setInclusions((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="border border-blue-900/50 rounded-2xl w-full p-6 bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-emerald-300 mb-5">Inclusions</h3>

      <div className="space-y-2.5">
        {inclusions.map((inclusion, index) => (
          <div key={inclusion.id} className="flex items-center gap-2">
            <span className="text-xs text-blue-400/50 w-5 shrink-0 text-right">{index + 1}.</span>
            <input
              required
              placeholder="What's included"
              className={inputClass}
              value={inclusion.description}
              onChange={(e) => handleInclusionChange(inclusion.id, e.target.value)}
            />
            <button
              type="button"
              className="shrink-0 p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
              onClick={() => handleDeleteInclusion(inclusion.id)}
              aria-label="Remove inclusion"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddInclusions}
        className="mt-5 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          bg-blue-600/20 text-blue-300 border border-blue-600/40
          hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-200
          transition cursor-pointer"
      >
        <Plus size={15} /> Add Inclusion
      </button>

    </div>
  );
};

export default Inclusion;