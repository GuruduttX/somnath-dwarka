export default function PoojaPricingCard() {
  const packages = [
    {
      title: "Basic Pooja",
      price: "₹2100",
      features: [
        "Experienced Pandit",
        "Basic Pooja Samagri",
        "Sacred Mantras",
        "Temple Guidance",
      ],
    },
    {
      title: "Special Pooja",
      price: "₹5100",
      features: [
        "Senior Pandit",
        "Complete Pooja Samagri",
        "Temple Ritual Arrangement",
        "Prasad Distribution",
      ],
      popular: true,
    },
    {
      title: "Premium Pooja",
      price: "₹11000",
      features: [
        "Expert Pandit",
        "Full Ritual Ceremony",
        "Premium Samagri",
        "Temple Assistance",
        "Special Blessings Ritual",
      ],
    },
  ];

  return (
    <section className="py-20 bg-amber-50 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pooja Packages
          </h2>

          <p className="text-gray-600">
            Choose the pooja package that best suits your spiritual needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 relative border ${
                pkg.popular ? "border-amber-500 scale-105" : "border-amber-100"
              }`}
            >

              {/* Popular Tag */}
              {pkg.popular && (
                <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {pkg.title}
              </h3>

              <p className="text-3xl font-bold text-amber-600 mb-6">
                {pkg.price}
              </p>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="text-gray-600 flex items-center gap-2">
                    🌸 {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition">
                Book Now
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}