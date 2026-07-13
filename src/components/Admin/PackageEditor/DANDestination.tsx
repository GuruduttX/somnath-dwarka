import React from 'react'

export const destinations = [
  "Gokul",
  "Mathura",
  "Vrindavan",
  "Govardhan",
  "Barsana",
  "Agra",
  "Fatehpur Sikri",
  "Delhi",
  "Bhandirvan",
];

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition cursor-pointer
`;

const DANDestination = ({
  destination, onChange, editorType,
}: {
  destination: string;
  onChange: any;
  editorType: "Blog" | "Package" | "Hotel";
}) => {
  return (
    <div className="space-y-3">

      <div>
        <label className="text-sm text-blue-300/70">Destinations</label>
        <select
          required
          value={destination}
          onChange={(e) => onChange("destination", e.target.value)}
          className={inputClass}
        >
          <option value="" className="bg-[#1a0b11]">Select Destinations</option>
          {destinations.map((des, index) => (
            <option key={index} value={des} className="bg-[#1a0b11]">
              {des}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" />

    </div>
  );
};

export default DANDestination;