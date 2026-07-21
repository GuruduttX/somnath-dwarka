import React from 'react'

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

/**
 * Destination — free text.
 *
 * This was a dropdown of Braj-circuit towns (Gokul, Mathura, Vrindavan, Agra)
 * carried over from another site, so it could not express what these packages
 * actually are: "Ahmedabad to Dwarka, Somnath". Every real value was written by
 * seed scripts, never through the picker.
 *
 * The field itself has to stay — publishing validates it, and it is the string
 * the destination carousels filter on (see toCarouselCards in utils/TourData.ts).
 */
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
        <label className="text-sm text-blue-300/70">
          Destination <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          value={destination}
          placeholder="e.g. Ahmedabad to Dwarka, Somnath"
          onChange={(e) => onChange("destination", e.target.value)}
          className={inputClass}
        />
        <p className="mt-2 text-xs text-blue-400/50">
          Shown as the package location, and used to group packages into the
          destination carousels on the home page.
        </p>
      </div>

    </div>
  )
}

export default DANDestination
