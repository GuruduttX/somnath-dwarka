import React from 'react'
import { Plus, Trash2, Star, Quote } from 'lucide-react'

export type testimonial = {
  id: string
  name: string
  location: string
  destination: string
  rating: number
  review: string
}

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const labelClass = "text-xs font-medium uppercase tracking-wide text-blue-300/70";

/** A blank row, so "Add" and the initial seed always agree on the shape. */
export const emptyTestimonial = (): testimonial => ({
  id: crypto.randomUUID(),
  name: "",
  location: "",
  destination: "",
  rating: 5,
  review: "",
});

/**
 * Traveller testimonials for a guide, edited alongside its FAQs.
 *
 * Deliberately mirrors FaqHandler's markup and dark-panel styling so the blog
 * editor reads as one form rather than two different design languages.
 *
 * No field is marked `required`. FaqHandler marks its inputs required, which
 * means a half-typed row blocks the whole form from submitting — wrong here,
 * because an editor may genuinely only have a quote and a first name. The
 * server drops rows with no quote, so a blank row is harmless rather than
 * fatal, and nobody has to invent a city to get past the validator.
 */
const TestimonialHandler = ({
  testimonials, setTestimonials,
}: {
  testimonials: testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<testimonial[]>>;
  editorType: "Blog" | "Package" | "Temple" | "Pooja";
}) => {

  const handleAdd = () => setTestimonials((prev) => [...prev, emptyTestimonial()]);

  const handleDelete = (id: string) =>
    setTestimonials((prev) => prev.filter((t) => t.id !== id));

  const update = <K extends keyof testimonial>(id: string, key: K, value: testimonial[K]) =>
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, [key]: value } : t)));

  return (
    <div className="border border-blue-900/50 rounded-2xl w-full p-6 bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <div className="mb-2 flex items-center gap-2">
        <Quote size={16} className="text-blue-300" />
        <h3 className="text-base font-semibold text-blue-100">Testimonials</h3>
      </div>
      <p className="mb-6 text-xs leading-relaxed text-blue-300/60">
        Shown on the guide page above the enquiry CTA. Publish only genuine
        traveller feedback — leave this empty and the section simply won&apos;t
        render. Only the review text is required.
      </p>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="border border-blue-900/50 rounded-2xl p-5 bg-blue-950/30"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Traveller name</label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  className={inputClass}
                  value={t.name}
                  onChange={(e) => update(t.id, "name", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  placeholder="e.g. Delhi, India"
                  className={inputClass}
                  value={t.location}
                  onChange={(e) => update(t.id, "location", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Trip / destination</label>
                <input
                  type="text"
                  placeholder="e.g. Somnath"
                  className={inputClass}
                  value={t.destination}
                  onChange={(e) => update(t.id, "destination", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Rating</label>
                <div className="mt-2 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      onClick={() => update(t.id, "rating", n)}
                      className="cursor-pointer transition hover:scale-110"
                    >
                      <Star
                        size={22}
                        className={
                          n <= (t.rating || 0)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-blue-950 text-blue-800"
                        }
                      />
                    </button>
                  ))}
                  <span className="ml-1 text-sm text-blue-300/70">{t.rating || 0}/5</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className={labelClass}>Review</label>
              <textarea
                rows={4}
                placeholder="What the traveller said about the trip..."
                className={`${inputClass} resize-none`}
                value={t.review}
                onChange={(e) => update(t.id, "review", e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => handleDelete(t.id)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleAdd}
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

export default TestimonialHandler;
