import React from "react"

/* ================== CATEGORY ARRAYS ================== */

type CarForm = {
  name: string
  category: string
  price: string
  duration: string
  image: string
  alt: string
  seat : string,
  cabtype : string,
  fueltype : string
}

export const CabCategories: string[] = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Tempo Traveller",
  
]

export const FuelCategories: string[] = ["Petrol", "Diesel", "CNG", "Electric"];

/* ================== TYPES ================== */

type Props = {
  name : string,
  seat: string
  price: string
  cabtype: string
  fueltype: string
  onChange: any
  editorType: "Taxi"
}

/* ================== COMPONENT ================== */

const TaxiDetailsSection = ({
  name,
  seat,
  price,
  cabtype,
  fueltype,
  onChange,
  editorType
}: Props) => {

  return (
    
    <div className="space-y-6">
        <div>
        <label className="text-sm text-white/70">
          {editorType} name
        </label>
        <input
          value={name}
          placeholder="Enter seat capacity"
          className="mt-2 w-full px-5 py-3 rounded-xl bg-white/5 text-white
          placeholder-white/40 border border-white/10
          focus:ring-2 focus:ring-sky-500 transition"
          required
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>

      
      <div>
        <label className="text-sm text-white/70">
          {editorType} Seat
        </label>
        <input
          value={seat}
          type="number"
          placeholder="Enter seat capacity"
          className="mt-2 w-full px-5 py-3 rounded-xl bg-white/5 text-white
          placeholder-white/40 border border-white/10
          focus:ring-2 focus:ring-sky-500 transition"
          required
          onChange={(e) => onChange("seat", e.target.value)}
        />
      </div>

      
      <div>
        <label className="text-sm text-white/70">
          Base Price
        </label>
        <input
          value={price}
          type="number"
          placeholder="Enter base price"
          className="mt-2 w-full px-5 py-3 rounded-xl bg-white/5 text-white
          placeholder-white/40 border border-white/10
          focus:ring-2 focus:ring-sky-500 transition"
          required
          onChange={(e) => onChange("price", e.target.value)}
        />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        
        <div>
          <label className="text-sm text-white/70">
            Cab Category
          </label>
          <select
            required
            value={cabtype}
            onChange={(e) => onChange("cabtype", e.target.value)}
            className="mt-2 w-full px-5 py-3 rounded-xl bg-white/5 text-white
            border border-white/10 focus:ring-2 focus:ring-sky-500 transition cursor-pointer"
          >
            <option value="">Select Category</option>
            {CabCategories.map((cat, idx) => (
              <option
                key={idx}
                value={cat}
                className="bg-[#0b1220]"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="text-sm text-white/70">
            Fuel Type
          </label>
          <select
            required
            value={fueltype}
            onChange={(e) => onChange("fueltype", e.target.value)}
            className="mt-2 w-full px-5 py-3 rounded-xl bg-white/5 text-white
            border border-white/10 focus:ring-2 focus:ring-sky-500 transition cursor-pointer"
          >
            <option value="">Select Fuel Type</option>
            {FuelCategories.map((cat, idx) => (
              <option
                key={idx}
                value={cat}
                className="bg-[#0b1220]"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  )
}

export default TaxiDetailsSection