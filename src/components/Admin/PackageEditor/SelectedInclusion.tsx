export default function SelectedInclusion({
  transfer_included, stay_included, breakfast_included, sightseeing_included, onChange,
}: {
  transfer_included: boolean;
  stay_included: boolean;
  breakfast_included: boolean;
  sightseeing_included: boolean;
  onChange: any;
}) {
  const checkboxes = [
    { key: "transfer_included",   label: "Transfer Included",   value: transfer_included },
    { key: "stay_included",       label: "Stay Included",       value: stay_included },
    { key: "breakfast_included",  label: "Breakfast Included",  value: breakfast_included },
    { key: "sightseeing_included",label: "Sightseeing Included",value: sightseeing_included },
  ];

  return (
    <>
      <h3 className="text-sm mb-4 text-blue-300/70">Select Benefits Overview</h3>

      <div className="p-6 rounded-xl border border-blue-900/50 bg-blue-950/30">
        <div className="grid grid-cols-2 gap-4">
          {checkboxes.map(({ key, label, value }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(key, e.target.checked)}
                className="w-5 h-5 accent-blue-500 cursor-pointer rounded"
              />
              <span className="text-sm text-blue-100/80 group-hover:text-blue-200 transition">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}