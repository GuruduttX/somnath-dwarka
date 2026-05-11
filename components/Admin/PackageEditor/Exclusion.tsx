import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

type Exclusions = {
  id: string
  description: string
}

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition resize-none
`;

const Exclusion = ({
  exclusions, setExclusions,
}: {
  exclusions: Exclusions[];
  setExclusions: React.Dispatch<React.SetStateAction<Exclusions[]>>;
  editorType: "Blog" | "Package" | "Hotel";
}) => {

  const handleAddExclusions = () => {
    setExclusions((prev) => [...prev, { id: crypto.randomUUID(), description: "" }]);
  };

  const handleExclusionChange = (id: string, value: string) => {
    setExclusions((prev) =>
      prev.map((e) => e.id === id ? { ...e, description: value } : e)
    );
  };

  const handleDeleteExclusion = (id: string) => {
    setExclusions((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="border border-pink-900/50 rounded-2xl w-full p-6 bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-pink-100 mb-6">Exclusions</h3>

      <div className="space-y-4">
        {exclusions.map((exclusion) => (
          <div
            key={exclusion.id}
            className="border border-pink-900/50 rounded-2xl p-5 bg-pink-950/30"
          >
            <textarea
              rows={3}
              required
              placeholder="Enter the description of your exclusion"
              className={inputClass}
              value={exclusion.description}
              onChange={(e) => handleExclusionChange(exclusion.id, e.target.value)}
            />

            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => handleDeleteExclusion(exclusion.id)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleAddExclusions}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
            bg-pink-600/20 text-pink-300 border border-pink-600/40
            hover:bg-pink-600/30 hover:border-pink-500/60 hover:text-pink-200
            transition cursor-pointer"
        >
          <Plus size={15} /> Add Exclusion
        </button>
      </div>

    </div>
  );
};

export default Exclusion;