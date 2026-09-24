import { EXPERIENCE_VIDEO } from "@/src/config/site";

/**
 * Experience video (home map §9) — renders only when EXPERIENCE_VIDEO is set
 * in config/site.ts with original or permissioned footage. Its VideoObject
 * JSON-LD is emitted by the page from the same config, so the markup and the
 * schema appear together or not at all. The transcript is in the HTML so the
 * video's content is crawlable and accessible.
 */
export default function ExperienceVideo() {
  const v = EXPERIENCE_VIDEO;
  if (!v) return null;
  return (
    <section id="video" aria-labelledby="video-h" className="scroll-mt-24 bg-white px-4 py-10 sm:px-6 md:py-14">
      <div className="mx-auto max-w-4xl">
        <h2 id="video-h" className="text-2xl font-bold text-[#2D1B10] md:text-3xl">{v.title}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{v.description}</p>
        <div className="mt-6 aspect-video overflow-hidden rounded-3xl border border-orange-100 bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
            title={v.title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        {v.transcript ? (
          <details className="mt-4 rounded-2xl bg-orange-50/60 p-4 text-[14px] leading-relaxed text-slate-700">
            <summary className="cursor-pointer font-semibold text-[#2D1B10]">Read the transcript</summary>
            <p className="mt-3 whitespace-pre-line">{v.transcript}</p>
          </details>
        ) : null}
      </div>
    </section>
  );
}
