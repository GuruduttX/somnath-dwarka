"use client"
import Image from 'next/image';
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import DesktopPagination from './DesktopPagination';
import MobilePagination from './MobilePagination'
import { ChevronDown, User, BookOpen, Tag } from 'lucide-react'

export type InternshipCard = {
    id: string;
    title: string;
    content: string;
    FAQ: { question: string; answer: string }[];
    image: string;
    meta: { title: string; description: string };
    slug: string;
    alt: string;
    subContent: string;
    created_at: number;
    author: string;
    category: string;
};

const BlogList: React.FC = () => {

    const [blogs, setBlogs]                       = useState<InternshipCard[]>([]);
    const [page, setPage]                         = useState(1);
    const limit                                   = 12;
    const [activeCategory, setActiveCategory]     = useState('All Blogs');
    const [selectedAuthor, setSelectedAuthor]     = useState("");
    const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);

    useEffect(() => {
        const dummyBlogs: InternshipCard[] = [
            { id:"1",  title:"Complete Dwarka Somnath Yatra Guide",        content:"Detailed pilgrimage guide for Dwarka and Somnath.",           FAQ:[], image:"https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1600&auto=format&fit=crop", meta:{title:"Dwarka Somnath Yatra Guide",description:"Explore Gujarat spiritual journeys."},        slug:"complete-dwarka-somnath-yatra-guide",      alt:"Dwarka Temple",      subContent:"Experience peaceful temple darshan, sacred coastlines and divine Gujarat spiritual journeys.",                     created_at:Date.now(), author:"Rohit Sharma", category:"Dwarka"        },
            { id:"2",  title:"Best Time To Visit Somnath Temple",          content:"Seasonal guide for Somnath pilgrimage.",                      FAQ:[], image:"https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop", meta:{title:"Best Time To Visit Somnath",description:"Plan your Somnath temple trip."},              slug:"best-time-to-visit-somnath",              alt:"Somnath Temple",     subContent:"Discover the ideal season for peaceful Somnath darshan and spiritual experiences.",                               created_at:Date.now(), author:"Priya Mehta",  category:"Somnath"       },
            { id:"3",  title:"Top Places To Visit In Dwarka",              content:"Explore sacred destinations in Dwarka.",                      FAQ:[], image:"https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=1600&auto=format&fit=crop", meta:{title:"Top Places In Dwarka",description:"Explore Dwarkadhish and nearby temples."},           slug:"top-places-to-visit-in-dwarka",           alt:"Dwarka Gujarat",     subContent:"Visit Dwarkadhish Temple, Bet Dwarka, Nageshwar Jyotirlinga and sacred coastal sites.",                           created_at:Date.now(), author:"Amit Verma",   category:"Dwarka"        },
            { id:"4",  title:"Luxury Gujarat Pilgrimage Experience",        content:"Premium spiritual Gujarat journeys.",                         FAQ:[], image:"https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1600&auto=format&fit=crop", meta:{title:"Luxury Gujarat Pilgrimage",description:"Premium spiritual tours."},                     slug:"luxury-gujarat-pilgrimage",               alt:"Luxury Gujarat",     subContent:"Experience premium hotels, private cabs and divine Gujarat spiritual retreats.",                                  created_at:Date.now(), author:"Neha Joshi",   category:"Luxury Tours"  },
            { id:"5",  title:"Complete Guide To Bet Dwarka",               content:"Everything about Bet Dwarka island.",                         FAQ:[], image:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop", meta:{title:"Bet Dwarka Guide",description:"Explore sacred island experiences."},                    slug:"complete-guide-to-bet-dwarka",            alt:"Bet Dwarka",         subContent:"Discover the peaceful island believed to be Lord Krishna's original residence.",                                  created_at:Date.now(), author:"Rohit Sharma", category:"Dwarka"        },
            { id:"6",  title:"Somnath Temple Darshan Tips",                content:"Travel and darshan guidance.",                               FAQ:[], image:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop", meta:{title:"Somnath Darshan Tips",description:"Helpful Somnath temple guidance."},               slug:"somnath-temple-darshan-tips",             alt:"Somnath Temple",     subContent:"Helpful temple timings, dress code and peaceful darshan recommendations.",                                        created_at:Date.now(), author:"Amit Verma",   category:"Somnath"       },
            { id:"7",  title:"Gujarat Spiritual Road Trip",                 content:"Road journey across sacred Gujarat.",                        FAQ:[], image:"https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop", meta:{title:"Gujarat Spiritual Road Trip",description:"Explore Gujarat pilgrimage roads."},           slug:"gujarat-spiritual-road-trip",             alt:"Gujarat Road Trip",  subContent:"Travel across sacred Gujarat destinations through scenic spiritual routes.",                                      created_at:Date.now(), author:"Priya Mehta",  category:"Road Trips"    },
            { id:"8",  title:"Why Visit Dwarka During Janmashtami",        content:"Janmashtami celebrations in Dwarka.",                        FAQ:[], image:"https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1600&auto=format&fit=crop", meta:{title:"Dwarka Janmashtami",description:"Festival celebration guide."},                        slug:"why-visit-dwarka-during-janmashtami",     alt:"Janmashtami Dwarka", subContent:"Experience vibrant Krishna celebrations and divine spiritual energy in Dwarka.",                                  created_at:Date.now(), author:"Neha Joshi",   category:"Festivals"     },
            { id:"9",  title:"Best Gujarat Temple Photography Spots",      content:"Photography guide for temples.",                             FAQ:[], image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop", meta:{title:"Temple Photography Gujarat",description:"Best spiritual photography spots."},       slug:"best-gujarat-temple-photography-spots",  alt:"Temple Photography", subContent:"Capture cinematic spiritual views of Gujarat temples and sacred coastlines.",                                      created_at:Date.now(), author:"Rohit Sharma", category:"Photography"   },
            { id:"10", title:"Exploring Nageshwar Jyotirlinga",            content:"Sacred Jyotirlinga travel guide.",                           FAQ:[], image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop", meta:{title:"Nageshwar Jyotirlinga Guide",description:"Sacred Gujarat pilgrimage."},               slug:"exploring-nageshwar-jyotirlinga",         alt:"Nageshwar Temple",   subContent:"Visit one of the sacred Jyotirlingas located near Dwarka in Gujarat.",                                           created_at:Date.now(), author:"Amit Verma",   category:"Jyotirlinga"   },
            { id:"11", title:"Top Gujarat Pilgrimage Destinations",        content:"Best spiritual places in Gujarat.",                          FAQ:[], image:"https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop", meta:{title:"Gujarat Pilgrimage Destinations",description:"Sacred places across Gujarat."},        slug:"top-gujarat-pilgrimage-destinations",     alt:"Gujarat Pilgrimage", subContent:"Explore sacred temples, peaceful coastlines and divine destinations across Gujarat.",                               created_at:Date.now(), author:"Priya Mehta",  category:"Pilgrimage"    },
            { id:"12", title:"Complete Statue Of Unity Travel Guide",      content:"Travel tips for Statue of Unity.",                          FAQ:[], image:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=1600&auto=format&fit=crop", meta:{title:"Statue Of Unity Guide",description:"Explore Gujarat tourism."},                     slug:"complete-statue-of-unity-travel-guide",  alt:"Statue Of Unity",    subContent:"Plan your perfect Statue of Unity trip with sightseeing and travel guidance.",                                    created_at:Date.now(), author:"Neha Joshi",   category:"Tourism"       },
            { id:"13", title:"Best Hotels Near Dwarkadhish Temple",        content:"Stay recommendations in Dwarka.",                           FAQ:[], image:"https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop", meta:{title:"Hotels Near Dwarkadhish Temple",description:"Comfortable spiritual stays."},       slug:"best-hotels-near-dwarkadhish-temple",    alt:"Dwarka Hotels",      subContent:"Find comfortable premium hotels near Dwarkadhish Temple for peaceful stays.",                                     created_at:Date.now(), author:"Rohit Sharma", category:"Hotels"        },
            { id:"14", title:"Why Gujarat Is Perfect For Spiritual Tourism",content:"Spiritual importance of Gujarat.",                         FAQ:[], image:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop", meta:{title:"Gujarat Spiritual Tourism",description:"Discover Gujarat spirituality."},           slug:"why-gujarat-is-perfect-for-spiritual-tourism", alt:"Gujarat Tourism", subContent:"Gujarat offers sacred temples, peaceful coastlines and timeless spiritual journeys.",                               created_at:Date.now(), author:"Amit Verma",   category:"Travel Guides" },
            { id:"15", title:"Family Friendly Gujarat Temple Tours",       content:"Family pilgrimage travel ideas.",                           FAQ:[], image:"https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop", meta:{title:"Family Gujarat Tours",description:"Comfortable family pilgrimage."},               slug:"family-friendly-gujarat-temple-tours",   alt:"Family Gujarat Tour",subContent:"Comfortable spiritual journeys designed for families and senior citizens.",                                        created_at:Date.now(), author:"Neha Joshi",   category:"Family Tours"  },
        ];
        setBlogs(dummyBlogs);
    }, []);

    function toNormalCase(name: string): string {
        return name.toLowerCase().split(" ").filter(Boolean)
            .map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
    }

    const authors = useMemo(() =>
        [...new Set(blogs.map(b => toNormalCase(b.author).trim()))], [blogs]);

    const filteredBlogs = useMemo(() => blogs.filter(blog => {
        if (selectedAuthor) return toNormalCase(blog.author) === selectedAuthor;
        if (activeCategory === "All Blogs" || activeCategory === blog.category) return true;
        return activeCategory === blog.category;
    }), [blogs, activeCategory, selectedAuthor]);

    const totalBlogs = useMemo(() => Math.ceil(filteredBlogs.length / limit), [filteredBlogs]);

    const currBlogs = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredBlogs.slice(start, start + limit);
    }, [filteredBlogs, page]);

    // ── Unique categories for filter tabs ──────────────────────
    const categories = useMemo(() =>
        ["All Blogs", ...new Set(blogs.map(b => b.category))], [blogs]);

    return (
        <section className="w-full bg-white py-12">
            <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">

                {/* ── SECTION HEADER ───────────────────────────────── */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-400">
                            Spiritual Knowledge Hub
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Latest Blogs
                        </h2>
                    </div>

                    {/* Author filter */}
                    <div className="relative">
                        <button
                            onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                            className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-orange-300 hover:bg-orange-50"
                        >
                            <User size={14} className="text-orange-400" />
                            {selectedAuthor ? selectedAuthor : "All Authors"}
                            <ChevronDown
                                size={14}
                                className={`text-orange-400 transition-transform duration-200 ${showAuthorDropdown ? "rotate-180" : ""}`}
                            />
                        </button>

                        {showAuthorDropdown && (
                            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-xl">
                                <button
                                    onClick={() => { setSelectedAuthor(""); setShowAuthorDropdown(false); }}
                                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-orange-500 hover:bg-orange-50"
                                >
                                    All Authors
                                </button>
                                <div className="h-px bg-orange-50" />
                                {authors.map(author => (
                                    <button
                                        key={author}
                                        onClick={() => { setSelectedAuthor(author); setShowAuthorDropdown(false); setActiveCategory("All Blogs"); }}
                                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-orange-50 ${selectedAuthor === author ? "bg-orange-50 font-semibold text-orange-600" : "text-gray-700"}`}
                                    >
                                        {author}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── CATEGORY FILTER TABS ─────────────────────────── */}
                <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {categories.slice(0, 8).map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setSelectedAuthor(""); setPage(1); }}
                            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                                activeCategory === cat && !selectedAuthor
                                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                                    : "border border-orange-100 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-600"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── BLOG GRID ────────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currBlogs.map((card, idx) => (
                        <Link
                            key={card.id}
                            href={`/blog/${card.slug}`}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/60"
                        >
                            {/* Image */}
                            <div className="relative h-44 w-full overflow-hidden cursor-pointer">
                                <Image
                                    src={card.image}
                                    alt={card.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Category badge over image */}
                                <div className="absolute left-3 top-3">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-orange-600 backdrop-blur-sm">
                                        <Tag size={8} />
                                        {card.category}
                                    </span>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex flex-1 flex-col gap-3 p-4">
                                <h3 className="text-[14px] font-semibold leading-snug text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-150">
                                    {card.title}
                                </h3>
                                <p className="flex-1 text-[12.5px] leading-relaxed text-gray-500 line-clamp-3">
                                    {card.subContent}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-orange-50 pt-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                                            <User size={11} className="text-orange-500" />
                                        </div>
                                        <span className="text-[11px] font-medium text-gray-400">
                                            {toNormalCase(card.author)}
                                        </span>
                                    </div>
                                    <span className="flex items-center gap-1 text-[11px] font-semibold text-orange-500 group-hover:text-orange-600">
                                        Read
                                        <BookOpen size={11} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ── EMPTY STATE ──────────────────────────────────── */}
                {currBlogs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                            <BookOpen size={28} className="text-orange-400" />
                        </div>
                        <p className="text-base font-semibold text-gray-700">No blogs found</p>
                        <p className="mt-1 text-sm text-gray-400">Try a different category or author filter.</p>
                    </div>
                )}

                {/* ── PAGINATION ───────────────────────────────────── */}
                <div className="mt-12 hidden justify-center md:flex">
                    <DesktopPagination
                        currentPage={page}
                        totalPages={totalBlogs}
                        onPageChange={p => setPage(p)}
                    />
                </div>
                <div className="mt-12 flex justify-center md:hidden">
                    <MobilePagination
                        currentPage={page}
                        totalPages={totalBlogs}
                        onPageChange={p => setPage(p)}
                    />
                </div>
            </div>
        </section>
    );
};

export default BlogList;