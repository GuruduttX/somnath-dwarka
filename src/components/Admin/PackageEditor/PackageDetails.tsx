import React from 'react'

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const PackageDetails = ({
  price, duration, onChange, rating, reviews,
}: {
  price: string;
  duration: string;
  rating: string;
  reviews: string;
  onChange: any;
  editorType: "Blog" | "Package";
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="text-sm text-blue-300/70">Price</label>
        <input
          value={price}
          required
          type="number"
          placeholder="5999"
          className={inputClass}
          onChange={(e) => onChange("price", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-blue-300/70">
          Duration <span className="text-red-400">*</span>
        </label>
        <input
          value={duration}
          required
          placeholder="eg : one-day, four-day"
          type="text"
          className={inputClass}
          onChange={(e) => onChange("duration", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-blue-300/70">Rating</label>
        <input
          value={rating}
          required
          type="text"
          placeholder="4.8"
          className={inputClass}
          onChange={(e) => onChange("rating", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-blue-300/70">Reviews</label>
        <input
          value={reviews}
          required
          type="text"
          placeholder="120"
          className={inputClass}
          onChange={(e) => onChange("reviews", e.target.value)}
        />
      </div>

    </div>
  );
};

export default PackageDetails;