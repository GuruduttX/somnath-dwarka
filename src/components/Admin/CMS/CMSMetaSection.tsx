import React from 'react'

export const categories = [
  "1 Day Tour Package",
  "2 Day Tour Package",
  "3 Day Tour Package",
  "4 Day Tour Package",
  "5 Day Tour Package",
  "6 Day Tour Package",
  "7 Day Tour Package",
  "8 Day Tour Package",
  "9 Day Tour Package",
  "10 Day Tour Package",
];

export const Blogcategories = [
  "Hotels in Vrindavan",
  "Hotels in Mathura",
  "Luxury Hotels",
  "Budget Hotels",
  "Family Hotels",
  "Couple Friendly Hotels",
  "Hotels Near Temple",
  "Ashrams & Dharamshalas",
  "Hotel Reviews",
  "Best Hotels Guide",

  "Taxi Services",
  "Taxi Fare Guide",
  "Airport Taxi Transfer",
  "Local Sightseeing Taxi",
  "Outstation Taxi",
  "Taxi Travel Tips",
  "Taxi Booking Guide",

  "Vrindavan Tour Packages",
  "Mathura Tour Packages",
  "Same Day Tour Packages",
  "Weekend Tour Packages",
  "Family Tour Packages",
  "Pilgrimage Tour Packages",
  "Temple Tour Guide",

  "Vrindavan Puja Services",
  "Mathura Puja Services",
  "Temple Puja Booking",
  "Pandit Booking",
  "Special Puja Services",
  "Festival Puja",
  "Online Puja Services",

  "Places to Visit in Vrindavan",
  "Places to Visit in Mathura",
  "Temple Guide",
  "Travel Tips",
  "Local Food & Restaurants",
  "Festivals in Vrindavan",
  "Things to Do",

  "Travel Guide",
  "Pilgrimage Guide",
  "Devotional Stories",
  "Spiritual Knowledge",
  "Customer Experiences",
  "Latest Updates"
];

const HotelCategories = [
  "1-Star Hotel",
  "2-Star Hotel",
  "3-Star Hotel",
  "4-Star Hotel",
  "5-Star Hotel",
  "6-Star Hotel",
  "7-Star Hotel",
  "Standard",
  "Deluxe"
];

const Templecategories = [
  "All",
  "Vrindavan",
  "Mathura",
  "Barsana",
  "Gokul",
  "Govardhan",
  "Nandgaon",
  "Baldeo",
  "Rawal",
];

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const CMSMetaSection = ({
  title, category, slug, onChange, editorType,
}: {
  title: string;
  category: string;
  slug: string;
  onChange: any;
  editorType: "Blog" | "Package" | "Temple" | "Pooja" | "Hotel";
}) => {
  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <label className="text-sm text-blue-300/70">{editorType} Title</label>
        <input
          value={title}
          placeholder="A Way to Grow Your Online Business With Krishna"
          className={inputClass}
          required
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>

      {/* Category + Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="text-sm text-blue-300/70">Category</label>
          <select
            required
            value={category}
            onChange={(e) => onChange("category", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            {editorType === "Blog" ? (
              <>
                <option value="" className="bg-[#1a0b11]">Select Category</option>
                {Blogcategories.map((cat, idx) => (
                  <option key={idx} value={cat} className="bg-[#1a0b11]">{cat}</option>
                ))}
              </>
            ) : editorType === "Package" ? (
              <>
                <option value="" className="bg-[#1a0b11]">Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat} className="bg-[#1a0b11]">{cat}</option>
                ))}
              </>
            ) : editorType === "Hotel" ? (
              <>
                <option value="" className="bg-[#1a0b11]">Select Category</option>
                {HotelCategories.map((cat, idx) => (
                  <option key={idx} value={cat} className="bg-[#1a0b11]">{cat}</option>
                ))}
              </>
            ) : (
              <>
                <option value="" className="bg-[#1a0b11]">Select Location</option>
                {Templecategories.map((cat, idx) => (
                  <option key={idx} value={cat} className="bg-[#1a0b11]">{cat}</option>
                ))}
              </>
            )}
          </select>
        </div>

        <div>
          <label className="text-sm text-blue-300/70">
            Slug <span className="text-red-400">*</span>
          </label>
          <input
            value={slug}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="a-human-approach-to-meet-krishna"
            className={inputClass}
            required
          />
        </div>

      </div>
    </div>
  );
};

export default CMSMetaSection;