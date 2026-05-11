"use client";

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition
`;

const locations = [
  "Vrindavan",
  "Mathura",
  "Barsana",
  "Gokul",
  "Govardhan",
  "Nandgaon",
  
];

type Props = {
  title: string;
  temple: string;
  location: string;
  slug: string;
  rating: string;
  duration: string
  updateForm: (field: string, value: string) => void;
};

export default function PoojaMeta({
  title,
  temple,
  location,
  slug,
  rating,
  duration,
  updateForm,
}: Props) {
  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <label className="text-sm text-pink-300/70">Pooja Title</label>
        <input
          value={title}
          onChange={(e) => updateForm("title", e.target.value)}
          className={inputClass}
          placeholder="Enter pooja title"
        />
      </div>

      {/* TEMPLE */}
      <div>
        <label className="text-sm text-pink-300/70">Temple</label>
        <input
          value={temple}
          onChange={(e) => updateForm("temple", e.target.value)}
          className={inputClass}
          placeholder="Banke Bihari Temple"
        />
      </div>

      {/* LOCATION */}
      <div>
        <label className="text-sm text-pink-300/70">Location</label>
        <select
          value={location}
          onChange={(e) => updateForm("location", e.target.value)}
          className={`${inputClass} cursor-pointer`}
        >
          <option className="bg-pink-950 text-white cursor-pointer" value="">Select Location</option>
          {locations.map((loc, i) => (
            <option className="bg-pink-950 text-white cursor-pointer" key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* SLUG */}
      <div>
        <label className="text-sm text-pink-300/70">Slug</label>
        <input
          value={slug}
          onChange={(e) => updateForm("slug", e.target.value)}
          className={inputClass}
          placeholder="banke-bihari-special-pooja"
        />
      </div>

      {/* RATING */}
      <div>
        <label className="text-sm text-pink-300/70">rating ⭐️</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => updateForm("rating", e.target.value)}
          className={inputClass}
          placeholder="rating for this Pooja"
        />
      </div>
      {/* DURATION */}
      <div>
        <label className="text-sm text-pink-300/70">Duration</label>
        <input
          value={duration}
          onChange={(e) => updateForm("duration", e.target.value)}
          className={inputClass}
          placeholder="Duration of this Pooja"
        />
      </div>
    </div>
  );
}