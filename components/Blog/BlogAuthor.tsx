import Image from "next/image";

interface BlogAuthorProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function BlogAuthor({
  name,
  role,
  bio,
  image,
}: BlogAuthorProps) {
  return (
    <section className="px-6 lg:px-20 py-16 bg-white">
      <div className="mx-auto max-w-3xl">

        <div className="flex flex-col sm:flex-row items-start gap-6 p-8 rounded-2xl border border-amber-100 shadow-sm bg-amber-50/40">

          {/* Author Image */}
          <div className="relative h-20 w-20 shrink-0">
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          {/* Author Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {name}
            </h3>

            <p className="text-sm text-amber-600 font-medium mt-1">
              {role}
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed text-sm">
              {bio}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}