"use client";

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const poojaCategories = [
  "Special Pooja",
  "Festival Pooja",
  "Daily Pooja",
  "Online Pooja",
];

type Props = {
  category: string;
  price: string;
  discountPrice: string;
  updateForm: (field: string, value: string) => void;
};

export default function PoojaPricing({
  category,
  price,
  discountPrice,
  updateForm,
}: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      {/* CATEGORY */}
      <div>
        <label className="text-sm text-blue-300/70">Category</label>
        <select
          value={category}
          onChange={(e) => updateForm("category", e.target.value)}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">Select Category</option>
          {poojaCategories.map((cat, i) => (
            <option className="bg-blue-950 text-white cursor-pointer" key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE */}
      <div>
        <label className="text-sm text-blue-300/70">Price (₹)</label>
        <input
          type="number"
          placeholder="999"
          value={price}
          onChange={(e) => updateForm("price", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* DISCOUNT PRICE */}
      <div>
        <label className="text-sm text-blue-300/70">Discount Price (₹)</label>
        <input
          type="number"
          placeholder="799"
          value={discountPrice}
          onChange={(e) => updateForm("discountPrice", e.target.value)}
          className={inputClass}
        />
      </div>

    </div>
  );
}