import React from "react";
import { Plus, Trash2 } from "lucide-react";

export type PriceTier = {
  id: string;
  tier: string;
  perNight: number;
  total: number;
  hotel: string;
};

const inputClass = `
  mt-1 w-full px-4 py-2.5 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const label = "text-xs text-blue-300/70";

const PriceTiers = ({
  priceTiers,
  setPriceTiers,
}: {
  priceTiers: PriceTier[];
  setPriceTiers: React.Dispatch<React.SetStateAction<PriceTier[]>>;
}) => {
  const add = () =>
    setPriceTiers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), tier: "", perNight: 0, total: 0, hotel: "" },
    ]);

  const change = (id: string, key: keyof PriceTier, value: string) =>
    setPriceTiers((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, [key]: key === "perNight" || key === "total" ? Number(value) || 0 : value }
          : t,
      ),
    );

  const remove = (id: string) =>
    setPriceTiers((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="border border-blue-900/50 rounded-2xl w-full p-6 bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <h3 className="text-base font-semibold text-blue-100 mb-1">Price tiers</h3>
      <p className="text-xs text-blue-300/50 mb-6">
        3 / 4 / 5 star breakdown shown as a table on the package page. Per person.
      </p>

      <div className="space-y-4">
        {priceTiers.map((t) => (
          <div key={t.id} className="border border-blue-900/50 rounded-2xl p-5 bg-blue-950/30 grid gap-3 sm:grid-cols-2">
            <div>
              <span className={label}>Tier</span>
              <input
                className={inputClass}
                placeholder="e.g. 3 star"
                value={t.tier}
                onChange={(e) => change(t.id, "tier", e.target.value)}
              />
            </div>
            <div>
              <span className={label}>Hotels</span>
              <input
                className={inputClass}
                placeholder="e.g. Lords Inn"
                value={t.hotel}
                onChange={(e) => change(t.id, "hotel", e.target.value)}
              />
            </div>
            <div>
              <span className={label}>Per person, per night (₹)</span>
              <input
                type="number"
                className={inputClass}
                placeholder="5000"
                value={t.perNight || ""}
                onChange={(e) => change(t.id, "perNight", e.target.value)}
              />
            </div>
            <div>
              <span className={label}>Total per person (₹)</span>
              <input
                type="number"
                className={inputClass}
                placeholder="15000"
                value={t.total || ""}
                onChange={(e) => change(t.id, "total", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => remove(t.id)}
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
          onClick={add}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
            bg-blue-600/20 text-blue-300 border border-blue-600/40
            hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-200
            transition cursor-pointer"
        >
          <Plus size={15} /> Add tier
        </button>
      </div>
    </div>
  );
};

export default PriceTiers;
