import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

type Testimonials = {
  id: string
  name: string
  description: string
  rating: string
}

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const Testimonials = ({
  testimonials, setTestimonials,
}: {
  testimonials: Testimonials[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonials[]>>;
  editorType: "Blog" | "Package";
}) => {

  const handleAddTestimonial = () => {
    setTestimonials((prev) => [...prev, { id: crypto.randomUUID(), name: "", description: "", rating: "" }]);
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNameChange = (id: string, value: string) => {
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, name: value } : t));
  };

  const handleDescriptionChange = (id: string, value: string) => {
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, description: value } : t));
  };

  const handleRatingChange = (id: string, value: string) => {
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, rating: value } : t));
  };

  return (
    <div className="border border-blue-900/50 rounded-2xl w-full p-6 bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-blue-100 mb-6">Testimonials</h3>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="border border-blue-900/50 rounded-2xl p-5 bg-blue-950/30"
          >
            {/* Name */}
            <div>
              <label className="text-sm text-blue-300/70 font-medium">Candidate Name</label>
              <input
                required
                type="text"
                placeholder="Enter the name of the candidate"
                className={inputClass}
                value={testimonial.name}
                onChange={(e) => handleNameChange(testimonial.id, e.target.value)}
              />
            </div>

            {/* Rating */}
            <div className="mt-4">
              <label className="text-sm text-blue-300/70 font-medium">Rating</label>
              <input
                required
                type="text"
                placeholder="Enter rating given by candidate"
                className={inputClass}
                value={testimonial.rating}
                onChange={(e) => handleRatingChange(testimonial.id, e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="text-sm text-blue-300/70 font-medium">Description</label>
              <textarea
                rows={3}
                required
                placeholder="Enter the description about the candidate"
                className={`${inputClass} resize-none`}
                value={testimonial.description}
                onChange={(e) => handleDescriptionChange(testimonial.id, e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => handleDeleteTestimonial(testimonial.id)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleAddTestimonial}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
            bg-blue-600/20 text-blue-300 border border-blue-600/40
            hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-200
            transition cursor-pointer"
        >
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

    </div>
  );
};

export default Testimonials;