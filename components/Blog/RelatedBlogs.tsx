"use client";

import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  slug: string;
}

const relatedBlogs: Blog[] = [
  {
    id: 1,
    title: "Top 5 Temples to Visit in Vrindavan",
    description: "Discover the most sacred and peaceful temples that define the spiritual heart of Vrindavan.",
    image: "/blogs/vrindavan-temples.jpg",
    category: "Temple Guides",
    slug: "top-5-temples-in-vrindavan",
  },
  {
    id: 2,
    title: "Best Time to Visit Mathura & Vrindavan",
    description: "Plan your spiritual journey with the perfect season for festivals, pooja, and sightseeing.",
    image: "/blogs/best-time-mathura.jpg",
    category: "Travel Tips",
    slug: "best-time-to-visit-mathura-vrindavan",
  },
  {
    id: 3,
    title: "Complete Guide to Booking Pooja in Mathura",
    description: "Everything you need to know before arranging a sacred pooja ceremony in Mathura.",
    image: "/blogs/pooja-guide.jpg",
    category: "Pooja Rituals",
    slug: "complete-pooja-guide-mathura",
  },
];

export default function RelatedBlogs() {
  return (
    <section className="bg-white py-20 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            Related Articles
          </h3>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-400"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedBlogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`}>
              <div className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">

                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">

                  {/* Category */}
                  <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600">
                    {blog.category}
                  </span>

                  {/* Title */}
                  <h4 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                    {blog.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {blog.description}
                  </p>

                  {/* Read More */}
                  <span className="mt-4 inline-block text-sm font-medium text-amber-600">
                    Read More →
                  </span>

                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}