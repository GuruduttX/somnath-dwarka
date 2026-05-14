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


    const res = await fetch("/api/sembark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: finalData.name,
        phone: finalData.phone,
        email: finalData.email,

        comments: `
        Travel Date: ${finalData.travelDate}
        Travellers: ${finalData.travellers}
        Booking Time: ${finalData.bookingTime}
        Message: ${finalData.message}
                `.trim(),
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
    <div className="w-full max-w-sm z-10">
      {/* FORM CARD */}
      <div className="bg-white rounded-2xl border border-gray-400 p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-orange-900 mb-6">
          Enquire About This Package
        </h3>

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

        
        {/* {success && (
          <p className="mt-3 text-xs text-green-700 text-center">
            Enquiry sent successfully ✔ Redirecting to WhatsApp…
          </p>
        )} */}
      </div>
    </div>
  );
}


const Step1 = ({ form, setForm, next }: any) => {
  return (
    <form onSubmit={(e : React.FormEvent)=>{ e.preventDefault()
        next()
     }} className="space-y-4">

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
        <div className="w-20 border rounded-xl flex items-center justify-center text-sm">
          +91
        </div>
        <div className="flex-1">
          <FloatingInput
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={(e:any)=>setForm({...form, phone:e.target.value})}
            required
          />
        </div>
      </div>

      {/* Travel Date */}
      <div className="relative">
        <input
          type="date"
          value={form.travelDate}
          onChange={(e)=>setForm({...form, travelDate:e.target.value})}
          required
          className="peer w-full rounded-xl border border-gray-300 px-4 pt-5 pb-2"
        />
        <label className="absolute left-3 top-1 text-xs text-gray-500">
          Travel Date *
        </label>
      </div>

      <FloatingInput
        label="Traveller Count"
        name="travellers"
        value={form.travellers}
        onChange={(e:any)=>setForm({...form, travellers:e.target.value})}
        required
      />

      <FloatingTextarea
        label="Message"
        name="message"
        value={form.message}
        onChange={(e:any)=>setForm({...form, message:e.target.value})}
      />

      <button
         type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-xl"
      >
        Continue
      </button>

    </form>
  );
};


const Step2 = ({ form, setForm, next } : any) => {

  const options = ["Solo", "Spouse", "Family", "Friends"];

  return (
    <div className="space-y-4 ">
       {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg">
          ✓
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Awesome{" "}
            <span className="text-orange-500">
              {form?.name || "Traveler"}!
            </span>
          </h2>
          <p className="text-sm text-gray-500">
            Couple of more details to a personalised quotation.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold">
        Who are you planning this vacation with?
      </h3>

      <div className="">

        {options.map((opt) => {
        const isSelected = form.travelWith === opt;

        return (
          <div
            key={opt}
            onClick={() => {
              setForm({ ...form, travelWith: opt });
              setTimeout(() => next(), 200); // smooth feel
            }}
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all my-4 
              ${isSelected 
                ? "border-orange-500 bg-orange-50 shadow-md" 
                : "border-gray-300 hover:border-orange-400 hover:shadow-sm"}
            `}
          >
            {/* Custom Radio */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${isSelected ? "border-orange-500" : "border-gray-400"}
              `}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
              )}
            </div>

            {/* Label */}
            <span className="text-gray-800 font-medium">{opt}</span>
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
    <div className="space-y-4  md:h-[420px] slim-scroll overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg">
          ✓
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Awesome{" "}
            <span className="text-orange-500">
              {form?.name || "Traveler"}!
            </span>
          </h2>
          <p className="text-sm text-gray-500">
            Couple of more details to a personalised quotation.
          </p>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold">
        How soon would you like to book this trip?
      </h3>

      {/* Options */}
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
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
              ${
                isSelected
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-gray-300 hover:border-orange-400 hover:shadow-sm"
              }
            `}
          >
            {/* Custom Radio */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${isSelected ? "border-orange-500" : "border-gray-400"}
              `}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
              )}
            </div>

            {/* Label */}
            <span className="text-gray-800 font-medium">{opt}</span>
          </div>
        );
      })}
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
