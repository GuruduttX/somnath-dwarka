"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    Mail,
    MailCheck,
    Phone,
    MessageSquare,
    Trash2,
    X,
    Search,
    RefreshCw,
    CalendarClock,
    Globe,
} from "lucide-react";
import CmsLoader from "@/src/components/Admin/CMS/CMSLoading";
import DeleteConfirmModal from "@/src/utils/Admin/DeleteConfirmModal";
import { IEnquiry, EnquiryStatus } from "@/src/types/enquiryTypes";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "converted", "closed"];

const STATUS_STYLE: Record<EnquiryStatus, string> = {
    new: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    contacted: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    converted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    closed: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const SERVICES = [
    "Tour Package",
    "Taxi Booking",
    "Hotel Booking",
    "Pooja",
    "General Enquiry",
];

const fmtDate = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "—";

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<IEnquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | EnquiryStatus>("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [sort, setSort] = useState<"latest" | "oldest">("latest");

    const [active, setActive] = useState<IEnquiry | null>(null);
    const [deleteId, setDeleteId] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);

    /* ------------------ Fetch ------------------ */

    const fetchEnquiries = async (silent = false) => {
        try {
            silent ? setRefreshing(true) : setLoading(true);

            const res = await fetch("/api/admin/enquiries", { cache: "no-store" });
            const data = await res.json();

            if (!data.success) throw new Error(data.message || "Failed to load");

            setEnquiries(data.data);
        } catch (err: any) {
            toast.error(err.message || "Failed to load enquiries");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    /* ------------------ Derived ------------------ */

    const stats = useMemo(
        () => ({
            total: enquiries.length,
            new: enquiries.filter((e) => e.status === "new").length,
            contacted: enquiries.filter((e) => e.status === "contacted").length,
            converted: enquiries.filter((e) => e.status === "converted").length,
        }),
        [enquiries]
    );

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();

        return enquiries
            .filter((e) => {
                const matchesSearch =
                    !q ||
                    [e.name, e.email, e.phone, e.message, e.source]
                        .filter(Boolean)
                        .some((v) => v!.toLowerCase().includes(q));

                const matchesStatus = statusFilter === "all" || e.status === statusFilter;
                const matchesService = serviceFilter === "all" || e.service === serviceFilter;

                return matchesSearch && matchesStatus && matchesService;
            })
            .sort((a, b) => {
                const ta = new Date(a.createdAt!).getTime();
                const tb = new Date(b.createdAt!).getTime();
                return sort === "latest" ? tb - ta : ta - tb;
            });
    }, [enquiries, search, statusFilter, serviceFilter, sort]);

    /* ------------------ Mutations ------------------ */

    const updateEnquiry = async (id: string, patch: Partial<IEnquiry>) => {
        try {
            const res = await fetch(`/api/admin/enquiries/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patch),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, ...patch } : e)));
            setActive((prev) => (prev && prev._id === id ? { ...prev, ...patch } : prev));
            toast.success("Enquiry updated");
        } catch (err: any) {
            toast.error(err.message || "Update failed");
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/admin/enquiries/${deleteId}`, { method: "DELETE" });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            setEnquiries((prev) => prev.filter((e) => e._id !== deleteId));
            setActive((prev) => (prev && prev._id === deleteId ? null : prev));
            toast.success("Enquiry deleted");
        } catch (err: any) {
            toast.error(err.message || "Delete failed");
        } finally {
            setConfirmOpen(false);
            setDeleteId("");
        }
    };

    if (loading) return <CmsLoader />;

    return (
        <section id="admin-enquiries" className="min-h-screen pb-16">
            <DeleteConfirmModal
                open={confirmOpen}
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />

            {/* HEADER */}
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-blue-100">Enquiries</h1>
                    <p className="text-sm text-blue-400/70">
                        Every lead captured from the website forms
                    </p>
                </div>

                <button
                    onClick={() => fetchEnquiries(true)}
                    className="flex items-center gap-2 rounded-lg border border-blue-900/40 bg-blue-950/40 px-4 py-2 text-sm text-blue-200 hover:bg-blue-900/40 cursor-pointer"
                >
                    <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {/* STATS */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard title="Total" value={stats.total} />
                <StatCard title="New" value={stats.new} accent="text-amber-300" />
                <StatCard title="Contacted" value={stats.contacted} accent="text-sky-300" />
                <StatCard title="Converted" value={stats.converted} accent="text-emerald-300" />
            </div>

            {/* CONTROLS */}
            <div className="mb-6 flex flex-wrap gap-3">
                <div className="relative">
                    <Search
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                    />
                    <input
                        placeholder="Search name, phone, email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-64 rounded-lg border border-blue-900/40 bg-blue-950/40 py-2 pl-9 pr-4 text-blue-200 placeholder:text-blue-500/60 outline-none focus:border-blue-700"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="cursor-pointer rounded-lg border border-blue-900/40 bg-blue-950/40 px-3 py-2 text-blue-200"
                >
                    <option value="all" className="bg-blue-950">All statuses</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-blue-950 capitalize">
                            {s}
                        </option>
                    ))}
                </select>

                <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="cursor-pointer rounded-lg border border-blue-900/40 bg-blue-950/40 px-3 py-2 text-blue-200"
                >
                    <option value="all" className="bg-blue-950">All services</option>
                    {SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-blue-950">
                            {s}
                        </option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as any)}
                    className="cursor-pointer rounded-lg border border-blue-900/40 bg-blue-950/40 px-3 py-2 text-blue-200"
                >
                    <option value="latest" className="bg-blue-950">Latest first</option>
                    <option value="oldest" className="bg-blue-950">Oldest first</option>
                </select>
            </div>

            {/* LIST */}
            {filtered.length === 0 ? (
                <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 py-20 text-center">
                    <Mail className="mx-auto mb-3 text-blue-700" size={34} />
                    <p className="text-blue-300">No enquiries found</p>
                    <p className="mt-1 text-sm text-blue-500/70">
                        New leads from the website will appear here automatically.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-blue-900/40">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-blue-950/60 text-xs uppercase tracking-wide text-blue-400">
                            <tr>
                                <th className="px-5 py-3 font-medium">Name</th>
                                <th className="px-5 py-3 font-medium">Contact</th>
                                <th className="hidden px-5 py-3 font-medium md:table-cell">Service</th>
                                <th className="hidden px-5 py-3 font-medium lg:table-cell">Received</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                                <th className="px-5 py-3" />
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((e) => (
                                <tr
                                    key={e._id}
                                    onClick={() => setActive(e)}
                                    className="cursor-pointer border-t border-blue-900/30 bg-blue-950/20 transition hover:bg-blue-900/30"
                                >
                                    <td className="px-5 py-4">
                                        <div className="font-medium text-blue-100">{e.name}</div>
                                        {e.source && (
                                            <div className="text-xs text-blue-500">{e.source}</div>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-blue-300">
                                        <div>
                                            {e.countryCode}
                                            {e.phone}
                                        </div>
                                        {e.email && (
                                            <div className="text-xs text-blue-500">{e.email}</div>
                                        )}
                                    </td>
                                    <td className="hidden px-5 py-4 text-blue-300 md:table-cell">
                                        {e.service}
                                    </td>
                                    <td className="hidden px-5 py-4 text-blue-400 lg:table-cell">
                                        {fmtDate(e.createdAt)}
                                    </td>
                                    <td className="px-5 py-4">
                                        <StatusPill status={e.status} />
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <button
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                setDeleteId(e._id);
                                                setConfirmOpen(true);
                                            }}
                                            className="rounded-lg p-2 text-red-400 hover:bg-red-900/30 cursor-pointer"
                                            aria-label="Delete enquiry"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* DETAIL DRAWER */}
            {active && (
                <EnquiryDrawer
                    enquiry={active}
                    onClose={() => setActive(null)}
                    onUpdate={updateEnquiry}
                    onDelete={() => {
                        setDeleteId(active._id);
                        setConfirmOpen(true);
                    }}
                />
            )}
        </section>
    );
}

/* ------------------ Detail Drawer ------------------ */

function EnquiryDrawer({
    enquiry,
    onClose,
    onUpdate,
    onDelete,
}: {
    enquiry: IEnquiry;
    onClose: () => void;
    onUpdate: (id: string, patch: Partial<IEnquiry>) => Promise<void>;
    onDelete: () => void;
}) {
    const [notes, setNotes] = useState(enquiry.adminNotes ?? "");
    const [saving, setSaving] = useState(false);

    // Re-seed the textarea when a different enquiry is opened.
    useEffect(() => {
        setNotes(enquiry.adminNotes ?? "");
    }, [enquiry._id, enquiry.adminNotes]);

    const d = enquiry.details ?? {};

    const detailRows: Array<[string, string | undefined]> = [
        ["Travelling with", d.travelWith],
        ["Looking to book", d.bookingTiming],
        ["Pickup", d.pickup],
        ["Drop", d.drop],
        ["Travel date", d.travelDate],
        ["Check-in", d.checkin],
        ["Check-out", d.checkout],
        ["Guests", d.guests],
    ];

    const visibleDetails = detailRows.filter(([, v]) => v && v.trim());

    const saveNotes = async () => {
        setSaving(true);
        await onUpdate(enquiry._id, { adminNotes: notes });
        setSaving(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-blue-900/40 bg-[#0b1220] shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-blue-900/40 bg-[#0b1220] px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-blue-100">{enquiry.name}</h2>
                        <p className="text-xs text-blue-500">
                            {enquiry.serviceLabel || enquiry.service} · {fmtDate(enquiry.createdAt)}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-blue-400 hover:bg-blue-900/40 cursor-pointer"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-6 px-6 py-6">
                    {/* Status */}
                    <div>
                        <SectionLabel>Status</SectionLabel>
                        <div className="flex flex-wrap gap-2">
                            {STATUSES.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => onUpdate(enquiry._id, { status: s })}
                                    className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition cursor-pointer ${
                                        enquiry.status === s
                                            ? STATUS_STYLE[s]
                                            : "border-blue-900/40 text-blue-500 hover:border-blue-700 hover:text-blue-300"
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-3 gap-2">
                        <QuickAction
                            href={`tel:${enquiry.countryCode ?? ""}${enquiry.phone}`}
                            icon={<Phone size={15} />}
                            label="Call"
                        />
                        <QuickAction
                            href={`https://wa.me/${`${enquiry.countryCode ?? ""}${enquiry.phone}`.replace(/\D/g, "")}`}
                            icon={<MessageSquare size={15} />}
                            label="WhatsApp"
                        />
                        <QuickAction
                            href={enquiry.email ? `mailto:${enquiry.email}` : undefined}
                            icon={<Mail size={15} />}
                            label="Email"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <SectionLabel>Contact</SectionLabel>
                        <InfoTable
                            rows={[
                                ["Full name", enquiry.name],
                                ["Phone", `${enquiry.countryCode ?? ""}${enquiry.phone}`],
                                ["Email", enquiry.email || "Not provided"],
                            ]}
                        />
                    </div>

                    {/* Trip details */}
                    {visibleDetails.length > 0 && (
                        <div>
                            <SectionLabel>Trip details</SectionLabel>
                            <InfoTable rows={visibleDetails as Array<[string, string]>} />
                        </div>
                    )}

                    {/* Message */}
                    {enquiry.message && (
                        <div>
                            <SectionLabel>Message</SectionLabel>
                            <p className="whitespace-pre-wrap rounded-xl border border-blue-900/40 bg-blue-950/30 px-4 py-3 text-sm leading-relaxed text-blue-200">
                                {enquiry.message}
                            </p>
                        </div>
                    )}

                    {/* Meta */}
                    <div>
                        <SectionLabel>Source</SectionLabel>
                        <div className="space-y-2 text-sm text-blue-300">
                            <MetaRow icon={<Globe size={14} />} value={enquiry.source || "Unknown form"} />
                            {enquiry.pageUrl && (
                                <MetaRow icon={<Globe size={14} />} value={enquiry.pageUrl} />
                            )}
                            <MetaRow
                                icon={<CalendarClock size={14} />}
                                value={fmtDate(enquiry.createdAt)}
                            />
                            <MetaRow
                                icon={
                                    enquiry.emailSent ? (
                                        <MailCheck size={14} className="text-emerald-400" />
                                    ) : (
                                        <Mail size={14} className="text-amber-400" />
                                    )
                                }
                                value={
                                    enquiry.emailSent
                                        ? "Confirmation email sent"
                                        : "Confirmation email not sent"
                                }
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <SectionLabel>Internal notes</SectionLabel>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            placeholder="Call outcome, quoted price, follow-up date..."
                            className="w-full resize-y rounded-xl border border-blue-900/40 bg-blue-950/30 px-4 py-3 text-sm text-blue-200 placeholder:text-blue-600 outline-none focus:border-blue-700"
                        />
                        <button
                            onClick={saveNotes}
                            disabled={saving || notes === (enquiry.adminNotes ?? "")}
                            className="mt-2 w-full rounded-lg bg-blue-600/30 py-2.5 text-sm font-medium text-blue-100 transition hover:bg-blue-600/50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                        >
                            {saving ? "Saving..." : "Save notes"}
                        </button>
                    </div>

                    {/* Delete */}
                    <button
                        onClick={onDelete}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-900/40 py-2.5 text-sm text-red-400 transition hover:bg-red-900/20 cursor-pointer"
                    >
                        <Trash2 size={15} />
                        Delete enquiry
                    </button>
                </div>
            </aside>
        </>
    );
}

/* ------------------ Small pieces ------------------ */

function StatCard({
    title,
    value,
    accent = "text-blue-100",
}: {
    title: string;
    value: number;
    accent?: string;
}) {
    return (
        <div className="rounded-xl border border-blue-900/40 bg-blue-950/30 px-5 py-4">
            <p className="text-xs uppercase tracking-wide text-blue-500">{title}</p>
            <p className={`mt-1 text-2xl font-semibold ${accent}`}>{value}</p>
        </div>
    );
}

function StatusPill({ status }: { status: EnquiryStatus }) {
    return (
        <span
            className={`inline-block rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLE[status]}`}
        >
            {status}
        </span>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-blue-500">
            {children}
        </p>
    );
}

function InfoTable({ rows }: { rows: Array<[string, string]> }) {
    return (
        <div className="overflow-hidden rounded-xl border border-blue-900/40">
            {rows.map(([label, value], i) => (
                <div
                    key={label}
                    className={`flex gap-3 px-4 py-3 text-sm ${
                        i % 2 ? "bg-blue-950/20" : "bg-blue-950/40"
                    }`}
                >
                    <span className="w-32 shrink-0 text-blue-500">{label}</span>
                    <span className="break-words font-medium text-blue-100">{value}</span>
                </div>
            ))}
        </div>
    );
}

function MetaRow({ icon, value }: { icon: React.ReactNode; value: string }) {
    return (
        <div className="flex items-start gap-2">
            <span className="mt-0.5 text-blue-500">{icon}</span>
            <span className="break-all">{value}</span>
        </div>
    );
}

function QuickAction({
    href,
    icon,
    label,
}: {
    href?: string;
    icon: React.ReactNode;
    label: string;
}) {
    const cls =
        "flex flex-col items-center gap-1.5 rounded-xl border border-blue-900/40 bg-blue-950/30 py-3 text-xs font-medium transition";

    if (!href) {
        return (
            <span className={`${cls} cursor-not-allowed text-blue-700`}>
                {icon}
                {label}
            </span>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cls} text-blue-200 hover:border-blue-700 hover:bg-blue-900/40`}
        >
            {icon}
            {label}
        </a>
    );
}
