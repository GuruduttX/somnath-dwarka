import { Bus, Hotel, Coffee, MapPin, Check, X } from "lucide-react";

interface PackageType {
  transfer_included: boolean;
  stay_included: boolean;
  breakfast_included: boolean;
  sightseeing_included: boolean;
}

export default function PackageInclusionsStrip({
  packageData,
}: {
  packageData: PackageType;
}) {
  const inclusions = [
    {
      label: "Transfer",
      sublabel: "Door-to-door pickup",
      Icon: Bus,
      checked: packageData.transfer_included,
    },
    {
      label: "Stay",
      sublabel: "Comfortable hotels",
      Icon: Hotel,
      checked: packageData.stay_included,
    },
    {
      label: "Breakfast",
      sublabel: "Daily morning meals",
      Icon: Coffee,
      checked: packageData.breakfast_included,
    },
    {
      label: "Sightseeing",
      sublabel: "Guided temple visits",
      Icon: MapPin,
      checked: packageData.sightseeing_included,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4 px-0">
        {inclusions.map(({ label, sublabel, Icon, checked }) => (
          <div
            key={label}
            className={`relative flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all sm:flex-col sm:items-center sm:gap-2 sm:px-3 sm:py-4 sm:text-center ${
              checked
                ? "border-orange-100 bg-orange-50/50 shadow-[0_10px_35px_rgba(234,88,12,0.05)]"
                : "border-slate-100 bg-slate-50/50 opacity-50"
            }`}
          >
            {/* Check / X badge — top-right corner */}
            <span
              className={`absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                checked
                  ? "bg-orange-500 text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {checked ? <Check size={9} strokeWidth={3} /> : <X size={9} strokeWidth={3} />}
            </span>

            {/* Icon circle */}
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                checked ? "bg-orange-100/50" : "bg-slate-100"
              }`}
            >
              <Icon
                size={17}
                strokeWidth={1.8}
                className={checked ? "text-orange-500" : "text-slate-300"}
              />
            </div>

            {/* Text */}
            <div className="min-w-0 sm:space-y-0.5">
              <p
                className={`text-[13px] font-semibold leading-tight ${
                  checked ? "text-slate-800" : "text-slate-300"
                }`}
              >
                {label}
              </p>
              <p
                className={`hidden text-[11px] leading-snug sm:block ${
                  checked ? "text-orange-500" : "text-slate-300"
                }`}
              >
                {sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}