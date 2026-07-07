"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutGrid, Table } from "lucide-react";
import { IBlog } from "@/src/types/blogTypes";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/src/utils/Admin/DeleteConfirmModal";
import CmsLoader from "@/src/components/Admin/CMS/CMSLoading";


export const BLOG_CATEGORIES = [
  "Somnath Travel Guide",
  "Dwarka Travel Guide",
  "Pilgrimage Guide",
  "Temple Guide",

  "Somnath Tour Packages",
  "Dwarka Tour Packages",

  "Places to Visit in Somnath",
  "Places to Visit in Dwarka",
  "Things to Do",
  "Travel Tips",

  "Festivals",
  "Temple History",
  "Mythology & Legends",

  "Devotional Stories",
  "Spiritual Knowledge",
  "Latest Updates"
];


/* ------------------ Page ------------------ */
export default function BlogsPage() {
  const [view, setView] = useState<"card" | "table">("card");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState("latest");
  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);

  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  /* ------------------ Fetch Blogs ------------------ */
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/blog`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Blog fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ------------------ Filtering ------------------ */

  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesSearch = blog?.title || "" 
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || blog.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || blog.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      return sort === "latest"
        ? new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        : new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
    });

  /* ------------------ DELETE Blog ------------------ */
  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(
        `/api/admin/blog/${selectedId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setBlogs((prev) => prev.filter((p) => p._id.toString() !== selectedId));
      toast.success("Deleted successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  /* ------------------ Stats ------------------ */

  const total = blogs.length;

  const published = blogs.filter((b) => b.status === "published").length;

  const drafts = blogs.filter((b) => b.status === "draft").length;

  /* ------------------ Loading ------------------ */

  if (loading) {
    return <CmsLoader />;
  }

  return (
    <section id="admin-blogs" className="min-h-screen">
      <DeleteConfirmModal
        open={open}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-pink-100">
          Blog Management
        </h1>
        <p className="text-sm text-pink-400/70">Advanced CMS dashboard</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Total" value={total} />
        <StatCard title="Published" value={published} />
        <StatCard title="Drafts" value={drafts} />
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <input
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-pink-950/40 border border-pink-900/40 rounded-lg text-pink-200"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-pink-950/40 border border-pink-900/40 rounded-lg text-pink-200 cursor-pointer"
        >
          <option value="all" className="bg-pink-950 text-white cursor-pointer">All</option>
          <option value="published" className="bg-pink-950 text-white cursor-pointer">Published</option>
          <option value="draft" className="bg-pink-950 text-white cursor-pointer">Draft</option>
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-pink-950/40 border border-pink-900/40 rounded-lg text-pink-200 cursor-pointer"
        >
          <option className="bg-pink-950 text-white cursor-pointer" value="all">All Categories</option>

          {BLOG_CATEGORIES.map((cat) => (
            <option className="bg-pink-950 text-white cursor-pointer py-2"  key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 bg-pink-950/40 border border-pink-900/40 rounded-lg text-pink-200 cursor-pointer"
        >
          <option value="latest" className="bg-pink-950 text-white cursor-pointer">
            Latest
          </option>
          <option value="oldest" className="bg-pink-950 text-white cursor-pointer">
            Oldest
          </option>
        </select>

        {/* View Toggle */}
        <div className="flex bg-pink-950/40 rounded-lg border border-pink-900/40 cursor-pointer">
          <button
            onClick={() => setView("card")}
            className="px-3 py-2 hover:bg-pink-800 cursor-pointer"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView("table")}
            className="px-3 py-2 hover:bg-pink-800 cursor-pointer"
          >
            <Table size={16} />
          </button>
        </div>

        {/* Create Blog */}
        <Link
          href="/admin-x9AqP7mK2/blogs/create-blog"
          className="px-4 py-2 bg-pink-600/30 rounded-lg text-pink-200"
        >
          + Create Blog
        </Link>
      </div>

      {/* CONTENT */}
      {filteredBlogs.length === 0 ? (
        <p className="text-pink-400">No blogs found</p>
      ) : view === "card" ? (
        <BlogCards
          blogs={filteredBlogs}
          setSelectedId={setSelectedId}
          setOpen={setOpen}
        />
      ) : (
        <BlogTable
          blogs={filteredBlogs}
          setSelectedId={setSelectedId}
          setOpen={setOpen}
        />
      )}
    </section>
  );
}

/* ------------------ Card View ------------------ */

function BlogCards({ blogs, setSelectedId, setOpen }: { blogs: IBlog[], setSelectedId: (id: string)=> void, setOpen: (open:boolean)=> void }) {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
    >
      {blogs.map((blog) => (
        <div
          key={blog._id.toString()}
          className="group relative rounded-xl overflow-hidden bg-[#1e0d14]
          border border-pink-900/40 hover:-translate-y-1 transition"
        >

          <span
            className={`absolute top-3 right-3 px-2 py-1 text-md rounded-full z-10
            ${
              blog.status === "published"
                ? "bg-green-900/40 text-green-400"
                : "bg-yellow-900/40 text-yellow-400"
            }`}
          >
            {blog.status}
          </span>

          <div className="h-44 overflow-hidden">
            <img
              src={blog.image}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
          </div>

          <div className="p-4">

            <h3 className="text-pink-100 font-semibold mb-2">
              {blog.title}
            </h3>

            <p className="text-sm text-pink-400/60 line-clamp-3">
              {blog.subContent}
            </p>

            <div className="flex justify-between mt-4 text-xs text-pink-400">
              <span>{blog.category}</span>
              <span>{new Date(blog.createdAt!).toDateString()}</span>
            </div>

            <div className="flex gap-2 mt-4">

              <Link
                href={`/admin-x9AqP7mK2/blogs/edit-blog/${blog._id}`}
                className="flex-1 text-center py-2 rounded-lg text-sm
                bg-pink-600/20 text-pink-300"
              >
                Edit
              </Link>

              <button className="flex-1 py-2 rounded-lg text-sm
                bg-red-900/20 text-red-400"
                onClick={()=> {
                  setSelectedId(blog._id.toString())
                  setOpen(true);
                }}>
                Delete
              </button>

            </div>

          </div>

        </div>
      ))}
    </div>
  );
}

/* ------------------ Table View ------------------ */

function BlogTable({
  blogs,
  setSelectedId,
  setOpen,
}: {
  blogs: IBlog[];
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="overflow-x-auto border border-pink-900/40 rounded-xl">
      <table className="w-full text-sm text-pink-200">
        <thead className="bg-pink-950/40 text-pink-300 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog._id.toString()}
              className="border-t border-pink-900/30 hover:bg-pink-900/20"
            >
              <td className="px-4 py-3">{blog.title}</td>
              <td className="px-4 py-3">{blog.category}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    blog.status === "published"
                      ? "bg-green-900/40 text-green-400"
                      : "bg-yellow-900/40 text-yellow-400"
                  }`}
                >
                  {blog.status}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                {new Date(blog.createdAt!).toDateString()}
              </td>

              <td className="px-4 py-3 flex gap-2 justify-center">
                <Link
                  href={`/admin-x9AqP7mK2/blogs/edit-blog/${blog._id}`}
                  className="px-3 py-1 rounded text-xs bg-pink-600/20 text-pink-300"
                >
                  Edit
                </Link>

                <button
                  className="px-3 py-1 rounded text-xs bg-red-900/20 text-red-400"
                  onClick={() => {
                    setSelectedId(blog._id.toString());
                    setOpen(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------ Stat Card ------------------ */

function StatCard({ title, value }: any) {
  return (
    <div className="bg-[#1e0d14] border border-pink-900/40 rounded-xl p-4">
      <p className="text-pink-400 text-sm">{title}</p>
      <h2 className="text-xl text-pink-100 font-bold">{value}</h2>
    </div>
  );
}