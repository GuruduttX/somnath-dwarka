"use client"

import React from 'react'

type Inclusions = {
    id: string
    description: string
}

const TaxiInclusion = ({
    inclusions,
    setInclusions
}: {
    inclusions: Inclusions[],
    setInclusions: React.Dispatch<React.SetStateAction<Inclusions[]>>,
    editorType: "Blog" | "Taxi"
}) => {

    const handleAddInclusions = () => {
        setInclusions((prev) => [
            ...prev,
            { id: crypto.randomUUID(), description: "" }
        ])
    }

    const handleInclusionChange = (inclusionId: string, value: string) => {
        setInclusions((prev) =>
            prev.map((inclusion) =>
                inclusion.id === inclusionId
                    ? { ...inclusion, description: value }
                    : inclusion
            )
        )
    }

    const handleDeleteInclusion = (inclusionId: string) => {
        setInclusions((prev) =>
            prev.filter((inclusion) => inclusion.id !== inclusionId)
        )
    }

    return (
        <div className="bg-[#1e0d14] border border-pink-900/40 rounded-2xl w-full p-6
        shadow-[0_0_25px_rgba(236,72,153,0.08)] transition">

            {/*  Title */}
            <div className="text-2xl font-semibold text-pink-300 text-center mb-6">
                Inclusions
            </div>

            {inclusions.map((inclusion , idx) => (
                <div
                    key={inclusion.id || idx}
                    className="bg-pink-950/30 border border-pink-900/40 rounded-xl w-full p-5
                    shadow-[0_0_15px_rgba(236,72,153,0.05)] mb-5"
                >

                    {/*  Textarea */}
                    <textarea
                        rows={3}
                        required
                        placeholder="Enter inclusion details..."
                        className="w-full px-4 py-3 rounded-lg
                        bg-pink-950/40 text-pink-200
                        border border-pink-900/40
                        placeholder:text-pink-400/40
                        focus:outline-none focus:ring-2 focus:ring-pink-500
                        transition resize-none"
                        value={inclusion.description}
                        onChange={(e) =>
                            handleInclusionChange(inclusion.id, e.target.value)
                        }
                    />

                    {/*  Delete Button */}
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={() => handleDeleteInclusion(inclusion.id)}
                            className="px-4 py-2 rounded-lg text-white
                            bg-red-500 hover:bg-red-600
                            transition shadow-md cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* 🔥 Add Button */}
            <div className="mt-8 w-full flex justify-center">
                <button
                    onClick={handleAddInclusions}
                    type="button"
                    className="px-10 py-3 rounded-xl text-white
                    bg-pink-600 hover:bg-pink-700
                    transition-all duration-300
                    shadow-[0_0_15px_rgba(236,72,153,0.4)]
                    hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]
                    cursor-pointer"
                >
                    + Add Inclusion
                </button>
            </div>

        </div>
    )
}

export default TaxiInclusion