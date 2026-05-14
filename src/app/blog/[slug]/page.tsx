import BlogAuthor from "@/src/components/Blog/BlogAuthor";
import BlogContent from "@/src/components/Blog/BlogContent";
import BlogHero from "@/src/components/Blog/BlogHero";
import BlogShare from "@/src/components/Blog/BlogShare";
import BlogCTA from "@/src/components/Blog/BlogCTA";
import FAQSection from "@/src/components/Blog/FAQSection";
import BlogCategories from "@/src/components/BlogArchive/BlogCategories";
import BlogStickyCTA from "@/src/components/Blog/BlogStickyCTA";
import Navbar from "@/src/utils/Navbar";
import LuxuryFooter from "@/src/utils/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogStickyCTAWithForm from "@/src/components/Blog/BlogStickyCTAWithForm";


const dummyBlog = {
  id: "1",

  title: "Complete Dwarka Somnath Yatra Guide 2026",

  slug: "complete-dwarka-somnath-yatra-guide-2026",

  category: "Dwarka Somnath",

  author: "Experience My India Team",

  image:
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",

  createdAt: "2026-05-12T10:00:00.000Z",

  updatedAt: "2026-05-12T10:00:00.000Z",

  status: "published",

  subcontent:
    "Explore the sacred beauty of Dwarka and Somnath through divine temple journeys, peaceful coastlines and spiritual Gujarat experiences.",

  content: `
  
  <h2>Experience The Divine Dwarka Somnath Journey</h2>

  <p>
    Dwarka and Somnath are among the most sacred spiritual destinations in Gujarat.
    Thousands of devotees visit these divine places every year to experience peace,
    temple darshan and spiritual energy.
  </p>

  <img 
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop"
    alt="Dwarka Temple"
  />

  <h3>Why Visit Dwarka?</h3>

  <p>
    Dwarka is believed to be the ancient kingdom of Lord Krishna.
    The Dwarkadhish Temple stands majestically near the Arabian Sea and creates
    a deeply spiritual atmosphere for pilgrims.
  </p>

  <blockquote>
    “Dwarka is not just a destination, it is a spiritual experience.”
  </blockquote>

  <h3>Top Places To Explore</h3>

  <ul>
    <li>Dwarkadhish Temple</li>
    <li>Bet Dwarka</li>
    <li>Nageshwar Jyotirlinga</li>
    <li>Rukmini Temple</li>
    <li>Somnath Temple</li>
  </ul>

  <img 
    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=1400&auto=format&fit=crop"
    alt="Somnath Temple"
  />

  <h3>Somnath Temple Experience</h3>

  <p>
    Somnath Jyotirlinga is one of the twelve sacred Jyotirlingas of Lord Shiva.
    The temple located near the Arabian Sea creates a powerful and peaceful spiritual vibe.
  </p>

  <p>
    Evening aarti at Somnath Temple is considered one of the most beautiful spiritual
    experiences in Gujarat.
  </p>

  <h3>Best Time To Visit</h3>

  <p>
    October to March is considered the ideal time for visiting Dwarka and Somnath.
    The weather remains pleasant and suitable for temple sightseeing.
  </p>

  <table>
    <thead>
      <tr>
        <th>Season</th>
        <th>Experience</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Winter</td>
        <td>Best time for pilgrimage</td>
      </tr>

      <tr>
        <td>Monsoon</td>
        <td>Beautiful coastal atmosphere</td>
      </tr>

      <tr>
        <td>Summer</td>
        <td>Hot but manageable temple visits</td>
      </tr>
    </tbody>
  </table>

  <h3>Travel Tips</h3>

  <ol>
    <li>Carry comfortable traditional clothing.</li>
    <li>Start temple visits early morning.</li>
    <li>Keep water bottles during sightseeing.</li>
    <li>Book hotels in advance during festivals.</li>
  </ol>

  <p>
    A spiritual Gujarat journey offers peace, devotion and unforgettable memories.
    Dwarka and Somnath together create one of India’s most divine pilgrimage experiences.
  </p>

  `,

  faqs: [
    {
      question: "What is the best time to visit Dwarka and Somnath?",
      answer:
        "October to March is considered the ideal time due to pleasant weather and peaceful temple experiences.",
    },

    {
      question: "How many days are enough for Dwarka Somnath tour?",
      answer:
        "A 4 to 6 day itinerary is ideal for comfortably exploring Dwarka, Somnath and nearby temples.",
    },

    {
      question: "Is private cab service available?",
      answer:
        "Yes, premium private cab services are available for comfortable Gujarat spiritual journeys.",
    },

    {
      question: "Can senior citizens join the tour comfortably?",
      answer:
        "Yes, these tours are family and senior citizen friendly with comfortable travel planning.",
    },
  ],
};


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogs(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Mathura Vrindavan Travel Guide",
      robots: { index: false, follow: false }
    };
  }

  const title = `${blog.title} | Mathura Vrindavan Travel Blog`;
  const description =
    blog.subcontent?.slice(0, 155) ??
    `Read about ${blog.title}. Explore travel tips, temple guides and spiritual stories from Mathura and Vrindavan.`;

  return {
    title,
    description,
    keywords: [
      blog.title,
      blog.category ?? "Vrindavan travel",
      "Mathura Vrindavan blog",
      "Braj spiritual guide",
      "Vrindavan temple tips",
      "Mathura travel story"
    ],
    alternates: {
      canonical: `https://vrindavantoursandpackages.com/stories/blog/${slug}`
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `https://vrindavantoursandpackages.com/stories/blog/${slug}`,
      siteName: "Mathura Vrindavan Travel Guide",
      images: blog.image
        ? [{ url: blog.image, width: 1200, height: 630, alt: title }]
        : [{ url: "https://vrindavantoursandpackages.com/Experience_my_India.webp", width: 1200, height: 630, alt: title }],
      type: "article",
      publishedTime: blog.createdAt
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.image
        ? [blog.image]
        : ["https://vrindavantoursandpackages.com/Experience_my_India.webp"]
    }
  };
}

const getBlogs = async (slug: string) => {

    // try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/blog/${slug}`, { cache: "no-store" });

    //     if(response.status == 404) {
    //         return null;
    //     }

    //     if(!response.ok) {
    //         throw new Error("Failed to fetch the User blog : ");
    //     }

    //     const { data } = await response.json();

    //     return data
    // } catch (error) {

    //     console.log(error)
        
    // }
    return dummyBlog;

}


export default async function page({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;

    const Blog = await getBlogs(slug);

    if (!Blog) {
        notFound();
    }

    if(Blog.status == "draft"){
        notFound();
    }


  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": Blog.title,
    "url": `https://vrindavantoursandpackages.com/stories/blog/${slug}`,
    "image": Blog.image ?? "https://vrindavantoursandpackages.com/Experience_my_India.webp",
    "datePublished": Blog.createdAt,
    "dateModified": Blog.updatedAt ?? Blog.createdAt,
    "author": {
      "@type": "Organization",
      "name": Blog.author ?? "MathuraVrindavanService Team",
      "url": "https://vrindavantoursandpackages.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mathura Vrindavan Travel Guide",
      "url": "https://vrindavantoursandpackages.com/",
      "logo": "https://vrindavantoursandpackages.com/Experience_my_India.webp"
    },
    "description": Blog.subcontent?.slice(0, 155) ?? Blog.title,
    "articleSection": Blog.category ?? "Travel Guide",
    "inLanguage": "en-IN"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vrindavantoursandpackages.com/" },
      { "@type": "ListItem", "position": 2, "name": "Travel Blog", "item": "https://vrindavantoursandpackages.com/stories/blog" },
      { "@type": "ListItem", "position": 3, "name": Blog.title, "item": `https://vrindavantoursandpackages.com/stories/blog/${slug}` }
    ]
  };

  const faqSchema = Blog.faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Blog.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  return <div className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogPostingSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])])
        }}
      />
        <Navbar />

        <BlogHero
            title={Blog.title}
            category={Blog.category}
            date={Blog.createdAt}
            author={Blog.author}
            image={Blog.image}
        />

       <div className="w-full px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-10 gap-8 xl:gap-12">

            <article className="lg:col-span-7 min-w-0">
                <BlogContent
                content={Blog.content}
                />
            </article>

            <aside className="hidden lg:block lg:col-span-3 mt-10">
                <div className="sticky top-28 flex-col">
                  <BlogStickyCTAWithForm/>
                  <BlogStickyCTA />

                  
                </div>
            </aside>

       </div>



        <BlogAuthor
            name="MathuraVrindavanService Team"
            role="Travel & Temple Guide Experts"
            bio={Blog.subcontent}
            image={Blog.image}
        />

        <BlogShare
            url={`https://vrindavantoursandpackages.com/blogs/temple-guide`}
            title={Blog.title}
        />

        <BlogCTA />
        <FAQSection faqs={Blog.faqs} />

        <LuxuryFooter />


    </div>
}