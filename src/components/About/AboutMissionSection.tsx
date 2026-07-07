"use client";

import Image from "next/image";

export default function AboutMissionSection() {
    return (
        <section id="mission" className="bg-[#f7f8fa] py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Top Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                    {/* LEFT CONTENT */}
                    <div>
                        <h2 className="text-4xl font-bold mb-6">
                            Our <span className="text-orange-500">Mission</span>
                        </h2>

                        <p className="text-gray-700 mb-4">
                            At <strong>Somnath Dwarka Guide</strong>, our mission is to design and operate
                            sacred pilgrimage experiences that turn yatras into divine memories.
                        </p>

                        <p className="text-gray-700 mb-4">
                            We believe a yatra doesn’t fail in devotion — it fails in execution.
                            That’s why we go beyond planning to take full ownership of your yatra,
                            from itinerary design to guided darshan and real-time support
                            resolution.
                        </p>

                        <p className="text-gray-700 mb-6">
                            By combining smart technology with experienced human operations, we ensure
                            every trip is personalized, reliable, and stress-free.
                        </p>

                        <p className="font-semibold text-gray-900">
                            When you perform your yatra with us, <span className="text-orange-500">we take care of every detail.</span>
                        </p>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="relative flex flex-col items-center">
                        <Image
                            src="/images/Experience_my_India.webp"
                            alt="Experience My India Logo"
                            width={360}
                            height={420}
                            className="rounded-xl object-contain bg-white p-10 shadow-sm"
                        />

                        {/* Names */}
                        <div className="absolute top-6 left-0 text-sm text-gray-600">
                            <p className="font-semibold">Local Experts</p>
                            <p>Gujarat Support</p>
                        </div>

                        <div className="absolute top-6 right-0 text-sm text-gray-600 text-right">
                            <p className="font-semibold">Experience My India</p>
                            <p>Parent Brand</p>
                        </div>

                        {/* Quote Card */}
                        <div className="bg-white shadow-lg rounded-xl p-6 text-center max-w-sm mt-6">
                            <p className="italic text-gray-700">
                                “A sacred yatra should be defined by peace, not logistics. 
                                We exist to ensure your focus stays on the divine.”
                            </p>
                        </div>
                    </div>
                </div>

                {/* BOTTOM CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">

                    <FeatureCard
                        title="Complete Yatra Ownership"
                        desc="From planning to execution, we manage every detail of your sacred journey."
                        bg="bg-orange-50"
                        icon="🗺️"
                    />

                    <FeatureCard
                        title="Local On-Ground Support"
                        desc="Verified hotels, private transport, and local guides coordinated in real time."
                        bg="bg-blue-50"
                        icon="📍"
                    />

                    <FeatureCard
                        title="Transparent Responsibility"
                        desc="Clear inclusions, no hidden surprises, and full accountability."
                        bg="bg-green-50"
                        icon="🛡️"
                    />

                    <FeatureCard
                        title="Spiritual Guidance"
                        desc="Expert local knowledge backed by dedicated human support available 24/7."
                        bg="bg-yellow-50"
                        icon="🤝"
                    />
                </div>
            </div>
        </section>
    );
}

/* Feature Card Component */
function FeatureCard({
    title,
    desc,
    bg,
    icon,
}: {
    title: string;
    desc: string;
    bg: string;
    icon: string;
}) {
    return (
        <div className={`${bg} p-6 rounded-xl border border-gray-100`}>
            <div className="text-3xl mb-4">{icon}</div>
            <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
            <p className="text-sm text-gray-600">{desc}</p>
        </div>
    );
}
