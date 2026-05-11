import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { BenefitType } from "@/app/admin-x9AqP7mK2/pooja/create-pooja/page";

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition
`;

const BenefitsHandler = ({
  benefits,
  setBenefits,
}: {
  benefits: BenefitType[];
  setBenefits: React.Dispatch<React.SetStateAction<BenefitType[]>>;
}) => {
  const handleAddBenefit = () => {
    setBenefits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: "" },
    ]);
  };

  const handleDeleteBenefit = (idToRemove: string) => {
    setBenefits((prev) => prev.filter((benefit) => benefit.id !== idToRemove));
  };

  const handleBenefitChange = (idToUpdate: string, newDescription: string) => {
    setBenefits((prev) =>
      prev.map(
        (benefit) =>benefit.id === idToUpdate ? { ...benefit, description: newDescription } : benefit, // Return others untouched
      ),
    );
  };

  return (
    <div className="border border-pink-900/50 rounded-2xl w-full p-6 bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <h3 className="text-base font-semibold text-pink-100 mb-6">
        Pooja Benefits
      </h3>

      <div className="space-y-4">
        {benefits.map((benefit:BenefitType) => (
          <div
            key={benefit.id}
            className="border border-pink-900/50 rounded-2xl p-5 bg-pink-950/30"
          >
            <input
              required
              type="text"
              placeholder="Enter a benefit (e.g., Brings peace and prosperity)"
              className={inputClass}
              value={benefit.description}
              onChange={(e) => handleBenefitChange(benefit.id, e.target.value)}
            />

            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => handleDeleteBenefit(benefit.id)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}

        {benefits.length === 0 && (
          <p className="text-sm text-pink-400/50 text-center py-4">
            No benefits added yet. Click below to add one.
          </p>
        )}
      </div>

      {/* Add Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleAddBenefit}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
            bg-pink-600/20 text-pink-300 border border-pink-600/40
            hover:bg-pink-600/30 hover:border-pink-500/60 hover:text-pink-200
            transition cursor-pointer"
        >
          <Plus size={15} /> Add Benefit
        </button>
      </div>
    </div>
  );
};

export default BenefitsHandler;
