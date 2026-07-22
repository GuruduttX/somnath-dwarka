"use client";
import { FloatingInput } from "@/src/utils/FloatingInput";
import { FloatingTextarea } from "@/src/utils/FloatingTextarea";
import { useState } from "react";

export default function SideForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    travellers: "",
    message: "",
    bookingTime: "", 
    travelWith: "",
  });

  const WHATSAPP = "7302265809";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (data?: any) => {
  try {
    setLoading(true);

    const finalData = data || form;


    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:    finalData.name,
        phone:   finalData.phone,
        email:   finalData.email,
        service: "Tour Package",
        message: finalData.message,
        details: {
          travelDate:    finalData.travelDate,
          guests:        finalData.travellers,
          travelWith:    finalData.travelWith,
          bookingTiming: finalData.bookingTime,
        },
        source:  "TourPackageSideForm",
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      }),
    });

    const response = await res.json();

    if (response.success) {
      setSuccess(true);
      setStep(4); //  move to success
    }

    const whatsappText = encodeURIComponent(
      `Package Enquiry\n\n` +
      `Name: ${finalData.name}\n` +
      `Phone: +91 ${finalData.phone}\n` +
      `Email: ${finalData.email || "N/A"}\n` +
      `Travel Date: ${finalData.travelDate}\n` +
      `Travellers: ${finalData.travellers}\n` +
      `Booking Time: ${finalData.bookingTime}\n\n` +
      `Message:\n${finalData.message || "No additional message"}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP}?text=${whatsappText}`, "_blank");
    }, 600);

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="w-full z-10">
      {/* FORM CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.07)] relative overflow-hidden">
        {/* Subtle orange accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />

        <div className="mb-4">
          <h3 className="text-[17px] font-bold tracking-tight text-slate-900">
            Enquire About This Package
          </h3>
          <p className="text-[11.5px] text-slate-500 mt-0.5">
            Get a free custom quote within 24 hours.
          </p>
        </div>

        {step === 1 && (
          <Step1 form={form} setForm={setForm} next={() => setStep(2)} />
        )}

        {step === 2 && (
          <Step2 form={form} setForm={setForm} next={() => setStep(3)} />
        )}

        {step === 3 && (
          <Step3 form={form} setForm={setForm} handleSubmit={handleSubmit} />
        )}

        {step === 4 && <Success form={form} />}
      </div>
    </div>
  );
}


const Step1 = ({ form, setForm, next }: any) => {
  return (
    <form onSubmit={(e : React.FormEvent)=>{ e.preventDefault()
        next()
     }} className="space-y-2.5">

      <FloatingInput
        label="Full Name"
        name="name"
        value={form.name}
        onChange={(e:any)=>setForm({...form, name:e.target.value})}
        required
      />

      <FloatingInput
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={(e:any)=>setForm({...form, email:e.target.value})}
      />

      {/* Phone */}
      <div className="flex gap-2">
        <div className="w-[58px] shrink-0 border border-slate-200 bg-slate-100/70 text-slate-500 font-semibold rounded-lg flex items-center justify-center text-[13px]">
          +91
        </div>
        <div className="flex-1">
          <FloatingInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e:any)=>setForm({...form, phone:e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Travel Date */}
        <div className="relative">
          <input
            id="travelDate"
            type="date"
            value={form.travelDate}
            onChange={(e)=>setForm({...form, travelDate:e.target.value})}
            required
            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 pt-[18px] pb-1.5 text-[13px] font-medium text-slate-800 outline-none transition-colors hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/15"
          />
          <label
            htmlFor="travelDate"
            className="pointer-events-none absolute left-3.5 top-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
          >
            Travel Date<span className="text-orange-500"> *</span>
          </label>
        </div>

        <FloatingInput
          label="Travellers"
          name="travellers"
          type="number"
          value={form.travellers}
          onChange={(e:any)=>setForm({...form, travellers:e.target.value})}
          required
        />
      </div>

      <FloatingTextarea
        label="Message"
        name="message"
        value={form.message}
        onChange={(e:any)=>setForm({...form, message:e.target.value})}
      />

      <button
         type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm py-3 rounded-lg transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] cursor-pointer"
      >
        Continue
      </button>

      <p className="text-center text-[10.5px] text-slate-400 pt-0.5">
        No spam. We only use this to send your quote.
      </p>

    </form>
  );
};


const Step2 = ({ form, setForm, next } : any) => {

  const options = ["Solo", "Spouse", "Family", "Friends"];

  return (
    <div className="space-y-4">
       {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm shadow-sm">
          ✓
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-800">
            Awesome{" "}
            <span className="text-orange-600">
              {form?.name?.split(" ")[0] || "Traveler"}!
            </span>
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Just a few more details to customize your quote.
          </p>
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-700 mt-2">
        Who are you planning this vacation with?
      </h3>

      <div className="space-y-2 mt-2.5">
        {options.map((opt) => {
          const isSelected = form.travelWith === opt;

          return (
            <div
              key={opt}
              onClick={() => {
                setForm({ ...form, travelWith: opt });
                setTimeout(() => next(), 250); // smooth transition
              }}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all active:scale-[0.99]
                ${isSelected 
                  ? "border-orange-500 bg-orange-50/50 shadow-sm" 
                  : "border-slate-200 hover:border-orange-300 hover:bg-orange-50/10"}
              `}
            >
              {/* Custom Radio */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${isSelected ? "border-orange-500 bg-orange-500/10" : "border-slate-300"}
                `}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                )}
              </div>

              {/* Label */}
              <span className="text-slate-800 text-sm font-semibold">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const Step3 = ({ form, setForm, handleSubmit }: any) => {
  const options = [
    "Within 48 Hours",
    "Within 3 to 4 days",
    "Within a week",
    "Within a month",
    "Just Researching"
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm shadow-sm">
          ✓
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-800">
            Almost done{" "}
            <span className="text-orange-600">
              {form?.name?.split(" ")[0] || "Traveler"}!
            </span>
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Final step to generate your custom tour package.
          </p>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-base font-bold text-slate-700 mt-2">
        How soon would you like to book this trip?
      </h3>

      {/* Options */}
      <div className="space-y-2 mt-2.5">
        {options.map((opt) => {
          const isSelected = form.bookingTime === opt;

          return (
            <div
              key={opt}
              onClick={async () => {
                const updatedForm = { ...form, bookingTime: opt };
                setForm(updatedForm);
                await handleSubmit(updatedForm);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all active:scale-[0.99]
                ${isSelected
                  ? "border-orange-500 bg-orange-50/50 shadow-sm"
                  : "border-slate-200 hover:border-orange-300 hover:bg-orange-50/10"
                }
              `}
            >
              {/* Custom Radio */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${isSelected ? "border-orange-500 bg-orange-500/10" : "border-slate-300"}
                `}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                )}
              </div>

              {/* Label */}
              <span className="text-slate-800 text-sm font-semibold">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Success = ({ form }: any) => {
  const firstName = form?.name?.split(" ")[0] || "Traveler";

  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-12 px-6">
      
      {/* Icon with glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-orange-300 blur-xl opacity-40"></div>
        
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl shadow-lg">
          ✓
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Thank you{" "}
        <span className="text-orange-500">{firstName}!</span>
      </h2>

      {/* Subtext */}
      <p className="text-gray-500 mt-3 max-w-sm leading-relaxed">
        Our destination expert will reach out to you shortly!
      </p>
    </div>
  );
};
