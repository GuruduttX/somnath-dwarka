interface BlogShareProps {
  url: string;
  title: string;
}

export default function BlogShare({ url, title }: BlogShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <section className="px-6 lg:px-20 py-12 bg-white">
      <div className="mx-auto max-w-3xl border-t border-gray-200 pt-10">

        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Share This Article
        </h4>

        <div className="mt-6 flex flex-wrap gap-4">

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-amber-500 hover:text-amber-600"
          >
            WhatsApp
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-amber-500 hover:text-amber-600"
          >
            Twitter
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-amber-500 hover:text-amber-600"
          >
            Facebook
          </a>

        </div>
      </div>
    </section>
  );
}