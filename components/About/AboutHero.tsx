"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function AboutHero() {
  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-32 mt-14"
      style={{
        background:
          "linear-gradient(135deg, #fff7ed 0%, #ffedd5 30%, #fef3c7 60%, #fde68a 100%)",
      }}
    >
      {/* Animated blurred orbs */}
      <motion.div
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,146,60,0.35) 0%, rgba(251,146,60,0) 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 40, 0], y: [0, 50, -30, 0] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(234,179,8,0.3) 0%, rgba(234,179,8,0) 70%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{ x: [0, 40, -60, 0], y: [0, -60, 20, 0] }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(245,158,11,0) 70%)",
          filter: "blur(45px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <motion.div
        animate={{ x: [0, -70, 30, 0], y: [0, 30, -50, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-20 right-16 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(252,211,77,0.4) 0%, rgba(252,211,77,0) 70%)",
          filter: "blur(35px)",
        }}
      />

      {/* Subtle shimmer lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(105deg, transparent, transparent 80px, rgba(251,146,60,0.15) 80px, rgba(251,146,60,0.15) 81px)",
        }}
      />

      {/* Floating Images LEFT */}
      <div className="hidden lg:block absolute left-10 top-20 space-y-6 mt-10">
        <FloatingImage
          src="https://dynamic.tourtravelworld.com/package-images/photo-big/dir_17/496456/348961.jpg"
          size="w-24 h-24"
          ring="ring-2 ring-amber-400/60"
          delay={0}
        />
        <FloatingImage
          src="https://static2.tripoto.com/media/filter/tst/img/OgData/1609564964_beautiful_ghats_of_vrindavan_1.jpg"
          size="w-20 h-20 ml-10"
          ring="ring-2 ring-orange-400/60"
          delay={1}
        />
        <FloatingImage
          src="https://th.bing.com/th/id/R.a886750a47c913b6baeffa7c6092863b?rik=H5hmCUB9Y651WQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-gCnO4P6jfMg%2fT8n4CTQoLJI%2fAAAAAAAABog%2fBbwi6VVQzZo%2fs1600%2fRadha%2bSyamasundar.jpg&ehk=7rY2XINAqReORFq%2fn0r%2fkkxojgS%2fbi7kNck5R9QZGE0%3d&risl=&pid=ImgRaw&r=0"
          size="w-28 h-28"
          ring="ring-2 ring-yellow-400/60"
          delay={2}
        />
      </div>

      {/* Floating Images RIGHT */}
      <div className="hidden lg:block absolute right-10 top-24 space-y-6 mt-10">
        <FloatingImage
          src="https://mathuravrindavantourism.com/wp-content/uploads/2025/02/Mathura-Vrindavan-Gokul.jpg"
          size="w-24 h-24"
          ring="ring-2 ring-yellow-400/60"
          delay={1.5}
        />
        <FloatingImage
          src="https://www.indiaparenting.com/images/76/krishnas-life-in-gokul.jpg"
          size="w-20 h-20 mr-8"
          ring="ring-2 ring-amber-400/60"
          delay={0.5}
        />
        <FloatingImage
          src="https://vrindavanmathura.com/wp-content/uploads/Daan_Ghati_Temple_in_Govardhan-scaled.jpg"
          size="w-28 h-28"
          ring="ring-2 ring-orange-400/60"
          delay={2.5}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <nav className="mb-4 sm:mb-6">
          <ol className="flex items-center justify-center gap-1 text-sm flex-nowrap overflow-hidden">
            <li className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors duration-200 z-20"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>

            <li className="text-gray-300 flex-shrink-0">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>

            <li className="flex items-center gap-1.5 min-w-0">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100/80 truncate block">
                About
              </span>
            </li>
          </ol>
        </nav>
        {/* Decorative top badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 py-1.5 rounded-full text-sm font-medium"
          style={{
            background:
              "linear-gradient(90deg, rgba(251,146,60,0.2), rgba(234,179,8,0.2))",
            border: "1px solid rgba(251,146,60,0.4)",
            color: "#92400e",
          }}
        >
          <span style={{ fontSize: 14 }}>✦</span>
          Divine Experiences Await
          <span style={{ fontSize: 14 }}>✦</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-semibold text-gray-900 leading-tight"
        >
          Your Spiritual Journey,
          <span
            className="block italic"
            style={{
              background: "linear-gradient(90deg, #c2410c, #d97706, #b45309)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Perfectly Curated.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-gray-700"
        >
          Explore expert-designed Mathura &amp; Vrindavan tours — crafted with
          devotion, authenticity, and comfort.
        </motion.p>

        {/* Decorative divider dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center gap-2 mt-6 sm:mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              className="block w-2 h-2 rounded-full"
              style={{
                background:
                  i === 0 ? "#f97316" : i === 1 ? "#f59e0b" : "#fbbf24",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* Floating Image Component */
function FloatingImage({
  src,
  size,
  ring,
  delay = 0,
}: {
  src: string;
  size: string;
  ring?: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`relative ${size} rounded-xl overflow-hidden shadow-xl ${ring ?? ""}`}
      style={{
        boxShadow:
          "0 8px 32px rgba(251,146,60,0.3), 0 2px 8px rgba(0,0,0,0.12)",
      }}
    >
      <img
        src={src}
        alt="Tour Preview"
        className="object-cover w-full h-full"
      />
      {/* Warm overlay tint */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(234,179,8,0.06) 100%)",
        }}
      />
    </motion.div>
  );
}
