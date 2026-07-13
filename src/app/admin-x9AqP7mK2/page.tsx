"use client";

import { useEffect, useState } from "react";
import {
    Hotel,
    Car,
    Package,
    FileText,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import CountUp from "react-countup";

export default function DashboardPage() {

    const [stats, setStats] = useState({
       
        packages: 0,
        blogs: 0,
    });

    const [syncTime, setSyncTime] = useState('');

    const getDashBoardData = async ()=>  {
        try {
            const response = await fetch(`/api/admin/dashboard`);
            const data = await response.json();
            setStats({
            
              packages: data.data.packageCount,
              blogs: data.data.blogsCount,
            });
            return data.data;
        } catch (error) {
            console.log("Error fetching Desh")
        }
    }
    useEffect(() => {
         getDashBoardData();
         setSyncTime(new Date().toLocaleTimeString());
    }, []);

    return (
      <section id="admin-dashboard" className="min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-blue-100">
            Dashboard Overview
          </h1>
          <p className="text-sm text-blue-400/70">
            Monitor and manage your platform efficiently
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-10">
          {[
           
            { title: "Packages", value: stats.packages, icon: Package },
            { title: "Blogs", value: stats.blogs, icon: FileText },
          ].map((card, i) => (
            <div
              key={i}
              className="relative rounded-xl p-5 bg-[#0b1220] border border-blue-900/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(236,72,153,0.1)]"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/20 blur-3xl" />
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-blue-400/70">{card.title}</span>
                <card.icon className="text-blue-400" size={20} />
              </div>

              <h2 className="text-2xl font-bold text-blue-100">
                {/* Animated Count Up */}
                <CountUp end={card.value} duration={2} />
              </h2>

              <p className="text-xs text-blue-500/60 mt-1">
                Total {card.title}
              </p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-[#0b1220] rounded-xl p-6 border border-blue-900/40">
            <h3 className="text-lg font-semibold text-blue-100 mb-4">
              Recent Activity
            </h3>

            <div className="space-y-4">
              {[
                "New hotel added in Vrindavan",
                "Taxi booking updated",
                "New blog published",
                "Package price updated",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-lg
                  bg-blue-950/30 border border-blue-900/30"
                >
                  <span className="text-sm text-blue-300">{item}</span>
                  <ArrowUpRight size={16} className="text-blue-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0b1220] rounded-xl p-6 border border-blue-900/40">
            <h3 className="text-lg font-semibold text-blue-100 mb-4">
              Quick Actions
            </h3>

            <div className="space-y-3">
              {[
               
                {
                  action: "Add Package",
                  path: "admin-x9AqP7mK2/packages/create-package",
                },
                {
                  action: "Add Blog",
                  path: "admin-x9AqP7mK2/blogs/create-blog",
                },
                // "Add Hotel",
                // "Add Taxi",
                // "Create Package",
                // "Write Blog",
              ].map((item, i) => (
                <Link key={i} href={item.path}>
                  <button
                    className="w-full text-left px-4 py-3 rounded-lg
                  bg-blue-900/20 border border-blue-900/40
                  text-blue-300 hover:bg-blue-900/30 transition"
                  >
                    {item.action}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {/* Performance Card */}
          <div className="bg-[#0b1220] p-6 rounded-xl border border-blue-900/40">
            <h3 className="text-lg text-blue-100 mb-4">Platform Performance</h3>

            <div className="space-y-3 text-sm text-blue-300">
              <div className="flex justify-between">
                <span>Bookings Growth</span>
                <span className="text-green-400">+18%</span>
              </div>

              <div className="flex justify-between">
                <span>Active Users</span>
                <span>1,240</span>
              </div>

              <div className="flex justify-between">
                <span>Revenue</span>
                <span>₹ 2.4L</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-[#0b1220] p-6 rounded-xl border border-blue-900/40">
            <h3 className="text-lg text-blue-100 mb-4">System Status</h3>

            <div className="space-y-3 text-sm text-blue-300">
              <div className="flex justify-between">
                <span>API Status</span>
                <span className="text-green-400">Online</span>
              </div>

              <div className="flex justify-between">
                <span>Database</span>
                <span className="text-green-400">Connected</span>
              </div>

              <div className="flex justify-between">
                <span>Server Load</span>
                <span className="text-yellow-400">Moderate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="relative rounded-2xl border border-blue-900/40 bg-[#0b1220] p-6 overflow-hidden">
            {/* Glow background */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/10 blur-3xl pointer-events-none " />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-blue-100">
                Command Center
              </h3>

              <span className="text-xs px-3 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-800/40">
                System Stable
              </span>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Live Activity */}
              <div className="space-y-3">
                <p className="text-sm text-blue-400/70">Live Activity</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-blue-300">
                    <span>Hotels Added</span>
                    <span>+2</span>
                  </div>
                  <div className="flex justify-between text-blue-300">
                    <span>Taxi Updated</span>
                    <span>+1</span>
                  </div>
                  <div className="flex justify-between text-blue-300">
                    <span>Blogs Published</span>
                    <span>+3</span>
                  </div>
                </div>
              </div>

              {/* System Metrics */}
              <div className="space-y-3">
                <p className="text-sm text-blue-400/70">System Metrics</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-300">API</span>
                    <span className="text-green-400">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">DB Load</span>
                    <span className="text-yellow-400">Moderate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Response</span>
                    <span className="text-green-400">120ms</span>
                  </div>
                </div>
              </div>

              {/* Quick Controls */}
              <div className="space-y-3">
                <p className="text-sm text-blue-400/70">Quick Controls</p>

                <div className="flex flex-col gap-2">
                  <Link href={"admin-x9AqP7mK2/hotels/create-hotel"}>
                    <button className="text-sm px-3 py-2 rounded-lg bg-blue-900/20 border border-blue-900/40 text-blue-300 hover:bg-blue-900/30 transition">
                      + Add Hotel
                    </button>
                  </Link>
                  <Link href={"admin-x9AqP7mK2/taxi/create-taxi"}>
                    <button className="text-sm px-3 py-2 rounded-lg bg-blue-900/20 border border-blue-900/40 text-blue-300 hover:bg-blue-900/30 transition">
                      + Add Taxi
                    </button>
                  </Link>
                  <Link href={"admin-x9AqP7mK2/packages/create-package"}>
                    <button className="text-sm px-3 py-2 rounded-lg bg-blue-900/20 border border-blue-900/40 text-blue-300 hover:bg-blue-900/30 transition">
                      + Create Package
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="mt-6 mb-5 pt-4 border-t border-blue-900/30 flex justify-between items-center text-xs text-blue-500/60">
              <span>Last Sync: {syncTime}</span>

              <span>MongoDB Connected • v1.0.0</span>
            </div>
          </div>
        </div>
      </section>
    );
}