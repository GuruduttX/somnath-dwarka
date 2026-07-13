"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Table } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/src/utils/Admin/DeleteConfirmModal";
import CMSLoading from "@/src/components/Admin/CMS/CMSLoading";

export default function PackagesPage() {
  const [view, setView] = useState<"card" | "table">("card");
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  /* ------------------ FETCH ------------------ */
  useEffect(() => {
    const getPackages = async () => {
      try {
        const res = await fetch(`/api/admin/tour-packages`);
        const data = await res.json();
        if (!data.success) throw new Error("Failed");
        setPackages(data.data || []);
      } catch (err) {
        toast.error("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    getPackages();
  }, []);

  /* ------------------ DELETE ------------------ */
  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(`/api/admin/tour-packages/${selectedId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setPackages((prev) => prev.filter((p) => p._id !== selectedId));
      toast.success("Deleted successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  /* ------------------ FILTER ------------------ */
  //   const filteredPackages = packages
  //     .filter((pkg) => {
  //       const matchesSearch = pkg.title
  //         .toLowerCase()
  //         .includes(search.toLowerCase());

  //       const matchesCategory =
  //         categoryFilter === "all" || pkg.category === categoryFilter;

  //       return matchesSearch && matchesCategory;
  //     })
  //     .sort((a, b) => {
  //       return sort === "latest"
  //         ? new Date(b.createdAt).getTime() -
  //             new Date(a.createdAt).getTime()
  //         : new Date(a.createdAt).getTime() -
  //             new Date(b.createdAt).getTime();
  //     });

  const filteredPackages = packages
    .filter((pkg) => {
      const matchesSearch = pkg.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || pkg.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" || pkg.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    })

  /* ------------------ STATS ------------------ */
  const total = packages.length;
  const published = packages.filter(p => p.status === "published").length;
  const drafts = packages.filter(p => p.status === "draft").length;

  const categories = [
    "all",
    ...new Set(packages.map((p) => p.category)),
  ];

  /* ------------------ Loading ------------------ */

  if (loading) {
    return <CMSLoading />;
  }

  return (
    <section id="admin-packages" className="min-h-screen">

      <DeleteConfirmModal
        open={open}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-blue-100">
          Packages Management
        </h1>
        <p className="text-sm text-blue-400/70">
          Advanced CMS dashboard
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 cursor-pointer">


        <StatCard title="Total" value={total} />
        <StatCard title="Published" value={published} />
        <StatCard title="Drafts" value={drafts} />

      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-6">

        {/* Search */}
        <input
          placeholder="Search packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-blue-950/40 border cursor-pointer border-blue-900/40 rounded-lg text-blue-200"
        />

        {/* Category */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-blue-950/40 border cursor-pointer border-blue-900/40 rounded-lg text-blue-200"
        >
          {categories.map((cat, i) => (
            <option key={i} className="bg-blue-950 text-white cursor-pointer" value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 bg-blue-950/40 border cursor-pointer border-blue-900/40 rounded-lg text-blue-200"
        >
          <option value="latest" className="bg-blue-950 text-white cursor-pointer">Latest</option>
          <option value="oldest" className="bg-blue-950 text-white cursor-pointer">Oldest</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-blue-950/40 border cursor-pointer border-blue-900/40 rounded-lg text-blue-200"
        >


          <option value="all" className="bg-blue-950 text-white cursor-pointer">All</option>
          <option value="published" className="bg-blue-950 text-white cursor-pointer">Published</option>
          <option value="draft" className="bg-blue-950 text-white cursor-pointer">Draft</option>
        </select>

        {/* View Toggle */}
        <div className="flex bg-blue-950/40 rounded-lg border border-blue-900/40 cursor-pointer">
          <button
            onClick={() => setView("card")}
            className="px-3 py-2 hover:bg-blue-800 cursor-pointer"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView("table")}
            className="px-3 py-2 hover:bg-blue-800 cursor-pointer"
          >
            <Table size={16} />
          </button>
        </div>

        {/* Create */}
        <Link
          href="/admin-x9AqP7mK2/packages/create-package"
          className="px-4 py-2 bg-blue-600/30 rounded-lg cursor-pointer text-blue-200"
        >
          + Create Package
        </Link>
      </div>

      {/* CONTENT */}
      {filteredPackages.length === 0 ? (
        <p className="text-blue-400">No results found</p>
      ) : view === "card" ? (
        <PackageCards
          packages={filteredPackages}
          setOpen={setOpen}
          setSelectedId={setSelectedId}
        />
      ) : (
        <PackageTable
          packages={filteredPackages}
          setOpen={setOpen}
          setSelectedId={setSelectedId}
        />
      )}
    </section>
  );
}

function PackageCards({ packages, setOpen, setSelectedId }: any) {
  const stripHtml = (html: string) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
  };

  return (
    <div className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
    >
      {packages.map((pkg: any) => (
        <div key={pkg._id}
          className="group rounded-xl overflow-hidden bg-[#0b1220]
          border border-blue-900/40 hover:-translate-y-1 transition"
        >
          <div className="relative">
            {/* Status Badge */}
            <span
              className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full z-10
                ${pkg.status === "published"
                  ? "bg-green-900/40 text-green-400"
                  : "bg-yellow-900/40 text-yellow-400"
                }`}
            >
              {pkg.status}
            </span>

            <div className="h-44 overflow-hidden">
              <img
                src={pkg.heroImage?.image}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-blue-100 font-semibold mb-2">
              {pkg.title}
            </h3>

            <p className="text-sm text-blue-400/60 line-clamp-3">
              {stripHtml(pkg.overview)}
            </p>

            <div className="flex justify-between mt-4 text-xs text-blue-400">
              <span>{pkg.category}</span>
              <span>₹ {pkg.price}</span>
            </div>

            <div className="flex gap-2 mt-4">
              <Link
                href={`/admin-x9AqP7mK2/packages/edit-package/${pkg._id}`}
                className="flex-1 text-center py-2 rounded-lg text-sm
                bg-blue-600/20 text-blue-300"
              >
                Edit
              </Link>

              <button
                onClick={() => {
                  setSelectedId(pkg._id);
                  setOpen(true);
                }}
                className="flex-1 py-2 rounded-lg text-sm
                bg-red-900/20 text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PackageTable({ packages, setOpen, setSelectedId }: any) {
  return (
    <div className="overflow-x-auto border border-blue-900/40 rounded-xl">
      <table className="w-full text-sm text-blue-200">

        <thead className="bg-blue-950/40 text-blue-300 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {packages.map((pkg: any) => (
            <tr key={pkg._id}
              className="border-t border-blue-900/30 hover:bg-blue-900/20"
            >
              <td className="px-4 py-3">{pkg.title}</td>
              <td className="px-4 py-3">{pkg.category}</td>
              <td className="px-4 py-3">₹ {pkg.price}</td>
              <td className="px-4 py-3">
                {new Date(pkg.createdAt).toDateString()}
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-1 rounded text-xs ${pkg.status === "published"
                      ? "bg-green-900/40 text-green-400"
                      : "bg-yellow-900/40 text-yellow-400"
                    }`}
                >
                  {pkg.status}
                </span>
              </td>

              <td className="px-4 py-3 flex gap-2 justify-center">
                <Link
                  href={`/admin-x9AqP7mK2/packages/edit-package/${pkg._id}`}
                  className="px-3 py-1 rounded text-xs bg-blue-600/20 text-blue-300"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setSelectedId(pkg._id);
                    setOpen(true);
                  }}
                  className="px-3 py-1 rounded text-xs bg-red-900/20 text-red-400"
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

function StatCard({ title, value }: any) {
  return (
    <div className="bg-[#0b1220] border border-blue-900/40 rounded-xl p-4">
      <p className="text-blue-400 text-sm">{title}</p>
      <h2 className="text-xl text-blue-100 font-bold">{value}</h2>
    </div>
  );
}