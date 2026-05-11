"use client"
import Image from 'next/image';
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import DesktopPagination from './DesktopPagination';
import MobilePagination from './MobilePagination'


export type InternshipCard = {

    id: string;
    title: string;
    content: string;
    FAQ: {
        question: string;
        answer: string
    }[];
    image: string,

    meta: {

        title: string,
        description: string
    },

    slug: string,
    alt: string,
    subContent: string,
    created_at: number;
    author: string,
    category: string;


};

const categories = [
    "All Blogs",
    "Krishna Leela & Spirtuality",
    "Temple Guides",
    "Sacred Places & Nature",
    "Travel Guides",
    "Festivals & Events",
    "Pilgrimage & Yatra",
    "Food & Culture",
    "Tour Packages & Services",
    "Stories & Experiences",
];





const BlogArchive = () => {


    const [blogs, setBlogs] = useState<InternshipCard[]>([]);
    const [page, setPage] = useState(1);
    const limit = 12;



    const [activeCategory, setActiveCategory] = useState('All Blogs');
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);


    useEffect(() => {

        const getBlogData = async () => {

            const res = await fetch("/api/users/blog", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });


            if (!res.ok) {

                console.log("There is some of the error I have got");

            }

            const data = await res.json();

            console.log("THE DATA SOME FORM THE BLOS IS THIS : ");
            console.log(data);

            setBlogs(data.data || []);

        }


        getBlogData();

    }, []);



    function toNormalCase(name: string): string {
        return name
            .toLowerCase()
            .split(" ")
            .filter(Boolean)
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(" ");
    }

    const authors = useMemo(() => {
        return [...new Set(blogs.map((blog) => toNormalCase(blog.author).trim()))]
    }, [blogs]);


    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            if (selectedAuthor) return toNormalCase(blog.author) === selectedAuthor;
            if (activeCategory === "All Blogs") return true;
            return activeCategory === blog.category;
        });
    }, [blogs, activeCategory, selectedAuthor]);


    const totalBlogs = useMemo(() => {
        return Math.ceil(filteredBlogs.length / limit);
    }, [filteredBlogs, limit]);




    const currBlogs = useMemo(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        return filteredBlogs.slice(start, end);
    }, [filteredBlogs, page, limit]);




    return (


        <section className="py-16 relative">


            <div className="mx-auto w-full px-6 ">
                {/* BreadCrumb */}

                




                {/* Author Dropdown */}
                <div className="relative left-3 sm:left-8 md:left-14 -top-3">
                    <button
                        onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                        className="px-4 py-2 rounded-full text-xs font-medium transition shadow-sm
                        whitespace-nowrap flex-shrink-0 w-fit cursor-pointer bg-gray-200 hover:bg-orange-200"
                    >
                        By   {selectedAuthor ? ` ${selectedAuthor} ` : "Author"}
                        <span className={`text-xs transition-transform duration-300 ${showAuthorDropdown ? 'rotate-0' : '-rotate-180'}`}>▼</span>
                    </button>

                    {showAuthorDropdown && (
                        <div className="absolute left-0 mt-2 w-44 bg-white shadow-lg rounded-xl border border-orange-300 z-20 cursor-pointer">
                            {authors.map((author) => (
                                <button
                                    key={author}
                                    onClick={() => {
                                        setSelectedAuthor(author);
                                        setShowAuthorDropdown(false);
                                        setActiveCategory("All Blogs");
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                                >
                                    {author}
                                </button>
                            ))}
                        </div>
                    )}
                </div>






                <div className='text-center mb-10'>
                    <h2 className="relative inline-block  font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-10 px-20 md:px-16 lg:px-8 ">
                        Latest Blogs
                        <svg
                            className="absolute left-0 -bottom-6 w-full"
                            viewBox="0 0 300 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 15 C 60 5, 240 5, 295 15"
                                stroke="#ffa500"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:px-8 pb-4">
                    {currBlogs.map((card, idx) => (
                        <Link
                            key={idx}
                            href={`/stories/blogs/${card.slug}`}
                            className="md:max-w-[300px] lg:max-w-[340px] bg-white rounded-3xl shadow hover:shadow-2xl hover:shadow-orange-300 transition border-2 border-orange-400"
                        >

                            <div className="relative h-44 w-full overflow-hidden rounded-t-3xl border-b border-orange-400">

                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <span className="inline-block mb-3 rounded-full bg-gray-100 px-4 py-1 text-xs font-medium text-gray-700">
                                    {card.category}
                                </span>
                                <h3 className="text-lg font-semibold leading-snug mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {
                                        card.subContent.slice(0, 400)
                                    }
                                    ...
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="sticky bottom-6 hidden md:flex justify-center z-40 mt-12">
                    <DesktopPagination
                        currentPage={page}
                        totalPages={totalBlogs}
                        onPageChange={(p) => setPage(p)}
                    />
                </div>

                <div className="md:hidden sticky bottom-6 flex justify-center z-40 mt-12">
                    <MobilePagination
                        currentPage={page}
                        totalPages={totalBlogs}
                        onPageChange={(p) => setPage(p)}
                    />
                </div>

            </div>
        </section>
    );
};

export default BlogArchive;