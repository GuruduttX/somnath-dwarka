import Image from "next/image";
import Link from "next/link";

interface BlogAuthorProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  articleCount?: number;
}

export default function BlogAuthor({
  name,
  role,
  bio,
  image,
  articleCount = 0,
}: BlogAuthorProps) {
  return (
    <section className="px-6 lg:px-20 py-16 bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

          {/* Top gradient banner */}
          <div
            className="relative px-6 pb-10 pt-5 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7d3310 0%, #c2410c 60%, #ea580c 100%)",
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/[0.07]" />
            <div className="absolute right-8 top-5 h-16 w-16 rounded-full bg-white/[0.07]" />

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-0.5">
              Written by
            </p>
            <p className="text-[15px] font-bold text-white">About the Author</p>
          </div>

          {/* Body — overlaps banner via negative margin */}
          <div className="px-6 pb-6 -mt-8 relative">

            {/* Avatar + name row */}
            <div className="flex items-end gap-4 mb-4">
              <div className="relative h-[72px] w-[72px] shrink-0 rounded-full border-[3px] border-white shadow-md overflow-hidden bg-orange-100">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 pb-1 pt-12">
                <h3 className="text-[16px] font-bold text-stone-900 leading-tight">
                  {name}
                </h3>
                <p className="text-[12px] font-semibold text-orange-600 mt-0.5">
                  {role}
                </p>
              </div>

              {articleCount > 0 && (
                <div className="flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[11.5px] font-bold text-amber-800 self-end mb-1">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {articleCount} articles
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-orange-100 mb-4" />

            {/* Bio */}
            <p className="text-[13px] leading-relaxed text-stone-500">{bio}</p>

            {/* Social links */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: "Follow", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { label: "Contact", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
                { label: "All Posts", icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3.5 py-1.5 text-[11.5px] font-semibold text-orange-700 transition hover:bg-orange-100"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}