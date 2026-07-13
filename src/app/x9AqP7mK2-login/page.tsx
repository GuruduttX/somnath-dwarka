"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, LogIn } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Login successful");
                router.push("/admin-x9AqP7mK2");
                router.refresh();
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
            <Toaster />

            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-blue-700/20 blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-md rounded-2xl border border-blue-900/50 bg-[#0b1220] p-8 shadow-[0_20px_60px_rgba(30,64,175,0.25)]">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-900/40 border border-blue-700/50">
                        <Lock className="text-blue-300" size={24} />
                    </div>
                    <h1 className="text-2xl font-semibold text-blue-100">Admin Login</h1>
                    <p className="mt-1 text-sm text-blue-400/70">
                        Sign in to access the dashboard
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-1.5 block text-sm text-blue-300">
                            Username
                        </label>
                        <div className="flex items-center gap-2 rounded-lg border border-blue-900/50 bg-[#0f172a] px-3 focus-within:border-blue-600 transition">
                            <User size={18} className="text-blue-400/70" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                autoComplete="username"
                                required
                                className="w-full bg-transparent py-2.5 text-sm text-blue-100 placeholder-blue-500/50 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm text-blue-300">
                            Password
                        </label>
                        <div className="flex items-center gap-2 rounded-lg border border-blue-900/50 bg-[#0f172a] px-3 focus-within:border-blue-600 transition">
                            <Lock size={18} className="text-blue-400/70" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                autoComplete="current-password"
                                required
                                className="w-full bg-transparent py-2.5 text-sm text-blue-100 placeholder-blue-500/50 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <LogIn size={18} />
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </main>
    );
}
