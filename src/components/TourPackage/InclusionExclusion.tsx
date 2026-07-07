import { Check, X } from "lucide-react";

interface ItemType {
  description: string;
}

interface PackageType {
  inclusions: ItemType[];
  exclusions: ItemType[];
}

export default function InclusionExclusion({
  PackageData,
}: {
  PackageData: PackageType;
}) {
  return (
    <section id="inclusions" className=" px-6">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-orange-600 mb-4 md:mb-12">
          What's Included & Excluded
        </h2>

        {/* MAIN CONTAINER */}
        <div className="rounded-3xl border border-orange-100/80 bg-white shadow-sm shadow-orange-100/60 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* INCLUSIONS */}
            <div className="p-8 border-b-2 md:border-b-0 md:border-r border-orange-300/80">
              <h3 className="text-lg font-semibold text-green-400 mb-6">
                Included in Your Package
              </h3>

              <ul className="space-y-4">
                {PackageData.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-200/50">
                      <Check className="w-3.5 h-3.5 text-green-700" />
                    </span>
                    <p className="text-orange-800 leading-relaxed text-[15px]">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXCLUSIONS */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-red-400 mb-6">
                Not Included
              </h3>

              <ul className="space-y-4">
                {PackageData.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-400/50">
                      <X className="w-3.5 h-3.5 text-red-700" />
                    </span>
                    <p className="text-orange-700 leading-relaxed text-[15px]">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}