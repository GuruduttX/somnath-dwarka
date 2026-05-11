"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Choose Your Pooja",
    desc: "Select the pooja or spiritual ritual you wish to perform in Mathura or Vrindavan.",
    icon: "🛕",
    tag: "Step 01",
  },
  {
    title: "Book Your Slot",
    desc: "Pick a convenient date and time for the ceremony through our simple booking process.",
    icon: "📅",
    tag: "Step 02",
  },
  {
    title: "Pandit & Samagri Arranged",
    desc: "We arrange experienced priests and all required pooja samagri for the ritual.",
    icon: "🪔",
    tag: "Step 03",
  },
  {
    title: "Perform Sacred Ritual",
    desc: "Participate in the divine ceremony and receive blessings from Lord Krishna.",
    icon: "🕉️",
    tag: "Step 04",
  },
];

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function StepRow({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView(0.2);
  const isLeft = index % 2 === 0;

  const card = (side: "left" | "right") => (
    <div
      className={`group w-full max-w-full md:max-w-[280px] bg-white border border-amber-100 rounded-2xl p-6
        shadow-sm hover:shadow-lg hover:shadow-amber-100 hover:-translate-y-1
        relative overflow-hidden transition-all duration-500
        ${inView
          ? "opacity-100 translate-x-0"
          : side === "left"
          ? "opacity-0 md:-translate-x-14"
          : "opacity-0 md:translate-x-14"
        }`}
    >
      <div
        className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r
        ${side === "left" ? "from-amber-500 to-orange-400" : "from-orange-400 to-amber-500"}`}
      />

      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl border bg-amber-50 border-amber-100">
          {step.icon}
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-amber-400">
            {step.tag}
          </span>
          <h3 className="text-gray-900 font-bold text-base mt-1">
            {step.title}
          </h3>
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-3">{step.desc}</p>

      {/* arrows only desktop */}
      {side === "left" && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent border-l-amber-200" />
        </div>
      )}
      {side === "right" && (
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-t-transparent border-b-transparent border-r-orange-200" />
        </div>
      )}
    </div>
  );

  return (
    <div ref={ref} className="flex flex-col items-center w-full">

      {/* responsive row */}
      <div className="flex flex-col md:flex-row items-center w-full gap-4 md:gap-0">

        {/* left */}
        <div className="w-full md:flex-1 flex justify-center md:justify-end md:pr-6">
          {isLeft ? card("left") : <div className="hidden md:block w-[280px]" />}
        </div>

        {/* center */}
        <div className="flex flex-col items-center z-10">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500
            flex items-center justify-center text-white font-bold
            transition-all duration-500
            ${inView ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
            {index + 1}
          </div>
        </div>

        {/* right */}
        <div className="w-full md:flex-1 flex justify-center md:justify-start md:pl-6">
          {!isLeft ? card("right") : <div className="hidden md:block w-[280px]" />}
        </div>

      </div>

      {/* connector */}
      {!isLast && (
        <div className="flex flex-col items-center my-2">
          <div className={`w-px h-8 bg-amber-300 ${inView ? "opacity-100" : "opacity-0"}`} />
        </div>
      )}
    </div>
  );
}

function FinalNode() {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-px h-6 bg-amber-300" />
      <div className="w-14 h-14 rounded-full bg-amber-100 border flex items-center justify-center text-xl">
        🙏
      </div>
      <p className="text-amber-500 text-xs mt-2">Receive Blessings</p>
    </div>
  );
}

export default function PoojaProcessTimeline() {
  return (
    <section className="py-8 mb-5 md:py-24 px-4 md:px-6 bg-white">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            How the{" "}
            <span className="text-amber-600">Pooja Process</span> Works
          </h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Simple guided steps for your spiritual journey.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {steps.map((step, index) => (
            <StepRow
              key={index}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
          <FinalNode />
        </div>

      </div>
    </section>
  );
}