"use client";

import { useState } from "react";

export default function QuickQuery({setOpen, form, setForm} : any) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedbackMsg, setFeedbackMsg] = useState("");
  


  const clearStatue = async () => {
    setTimeout(() => setStatus("idle"), 5000)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMsg("");
    //phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    //name validation
    if (!form.name.trim()) {
      alert("Name is required.");
      return;
    }
    try {
      const response = await fetch("api/simbark", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const formsubmitData = await response.json();

      if (!response.ok) {
        throw new Error(formsubmitData.message || "Submission failed");
      }
      setStatus("success");
      setFeedbackMsg("Enquiry has been sent successfully.");
      clearStatue();
      console.log("Success:", formsubmitData);
    } catch (error) {
      setStatus("error");
      setFeedbackMsg("Something went wrong. Try again");
      console.log("ERROR: submitting form", error);
    } finally {
      setForm({
        name: "",
        phone: "",
      })

    }
  };

  return (
    <>
    <div className="w-full max-w-2xl mt-4 mx-auto p-4 md:p-6 bg-[#fdf8f4] border border-orange-200 rounded-3xl shadow-sm ">
      {/* Tighter bottom margin on header */}
      <h3 className="text-lg font-bold text-orange-400 mb-4">Quick Enquiry</h3>

      {/* Grid handles the responsive layout: 1 column mobile, 2 columns desktop */}
      <div
        // onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-2.5 
            bg-white 
            border border-orange-200 
            rounded-xl 
            text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
            transition
          "
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-2.5 
            bg-white 
            border border-orange-200 
            rounded-xl 
            text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
            transition
          "
        />

        {status === "success" && (
          <div className="p-2 mb-4 text-sm md:col-span-2 text-green-700 bg-green-50 rounded-xl border border-green-200">
            {feedbackMsg}
          </div>
        )}

        {status === "error" && (
          <div className="p-2 mb-4 text-sm md:col-span-2 text-red-700 bg-red-50 rounded-xl border border-red-200">
            {feedbackMsg}
          </div>
        )}

        {/* The button spans both columns on desktop (md:col-span-2) */}
       <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer
            w-full md:col-span-2 mt-1 py-2.5 
            bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500 
            text-white font-bold 
            rounded-xl 
            shadow-amber-400 hover:shadow-lg shadow-none
            hover:-translate-y-1
            transition-all duration-200"
        >
          Send Enquiry
        </button>
      </div>
    </div>
    </>
   
  );
}