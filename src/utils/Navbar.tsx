"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight, MapPin, Compass } from "lucide-react";
import CommonEnquiryForm from "./CommanEnquiryForm";

const navItems = [
  { label: "Home", url: "/", icon: "🏠" },
  { label: "Tours", url: "/tour-packages", icon: "🗺️" },
  { label: "About", url: "/about", icon: "✨" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [active, setActive] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ACTIVE TAB
  useEffect(() => {
    const currentTab = navItems.find((item) => {
      if (item.url === "/") return pathname === "/";
      return pathname.startsWith(item.url);
    });
    if (currentTab) setActive(currentTab.label);
  }, [pathname]);

  // CLOSE MENU ON RESIZE
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // CLOSE MENU OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((label: string) => {
    setActive(label);
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="General Enquiry"
      />

      <header className="fixed top-6 left-0 w-full z-40 flex justify-center">
        <div ref={mobileMenuRef} className="relative w-[92vw] sm:w-[90vw] xl:w-[85vw]">

          {/* Ambient glow — stronger when scrolled */}
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-500
              bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400
              blur-2xl pointer-events-none
              ${scrolled ? "opacity-40" : "opacity-20"}`}
          />

          {/* Navbar pill */}
          <nav
            className={`relative flex items-center justify-between h-16
              px-3 sm:px-5 lg:px-6 rounded-full
              border transition-all duration-300
              ${scrolled
                ? "bg-white/98 border-amber-200/70 shadow-2xl shadow-amber-100/60"
                : "bg-white/92 border-amber-100/50 shadow-xl"
              }
              backdrop-blur-xl`}
          >
            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <div className="relative h-11 w-[130px] md:w-[160px] rounded-full overflow-hidden
                bg-gradient-to-br from-amber-50 to-orange-100
                ring-1 ring-amber-200/60 group-hover:ring-amber-300
                transition-all duration-200 flex items-center justify-center px-3">
                <Image
                  src="/images/Experience_my_India.webp"
                  height={44}
                  width={144}
                  alt="Experience My India Logo"
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden lg:flex items-center gap-1
              bg-gray-50/70 rounded-full px-1.5 py-1.5
              border border-gray-100/80">
              {navItems.map((item) => {
                const isActive = active === item.label;
                return (
                  <Link
                    href={item.url}
                    key={item.label}
                    onClick={() => handleNavClick(item.label)}
                    className={`relative flex items-center gap-2 px-5 py-2 rounded-full
                      font-medium text-sm transition-all duration-200 group
                      ${isActive
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200"
                        : "text-gray-600 hover:text-amber-700 hover:bg-white hover:shadow-sm"
                      }`}
                  >
                    {/* Active pill dot indicator */}
                    {isActive && (
                      <span className="absolute -top-0.5 left-1/2 -translate-x-1/2
                        w-1 h-1 rounded-full bg-amber-200 opacity-80" />
                    )}
                    <span>{item.label}</span>
                    {/* Hover underline for non-active */}
                    {!isActive && (
                      <span className="absolute bottom-1.5 left-5 right-5 h-px
                        bg-amber-400 scale-x-0 group-hover:scale-x-100
                        transition-transform duration-200 origin-left" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── RIGHT SECTION ── */}
            <div className="flex items-center gap-2">

              {/* Phone number — visible md+ */}
              <a
                href="tel:+919876543210"
                className="hidden md:flex items-center gap-1.5
                  text-sm font-medium text-gray-600 hover:text-amber-700
                  transition-colors duration-200 px-3 py-2 rounded-full
                  hover:bg-amber-50 group"
              >
                <Phone size={14} className="text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline">+91 7302265809</span>
              </a>

              {/* Divider */}
              <div className="hidden md:block w-px h-6 bg-amber-100" />

              {/* CTA BUTTON */}
              <button
                onClick={() => setIsFormOpen(true)}
                className="relative flex items-center gap-2
                  px-4 sm:px-5 h-10 rounded-full
                  font-semibold text-sm text-white
                  bg-gradient-to-r from-orange-500 to-amber-500
                  hover:from-orange-400 hover:to-amber-400
                  shadow-md shadow-orange-200/60
                  hover:shadow-lg hover:shadow-orange-200/80
                  hover:-translate-y-px
                  transition-all duration-200
                  overflow-hidden group cursor-pointer"
              >
                {/* Shine sweep */}
                <span className="absolute inset-0
                  bg-gradient-to-r from-transparent via-white/25 to-transparent
                  -translate-x-full group-hover:translate-x-full
                  transition-transform duration-700" />

                <Compass size={15} className="relative z-10 hidden sm:block" />
                <span className="relative z-10 whitespace-nowrap">Enquire Now</span>
                <ArrowRight size={13} className="relative z-10 hidden sm:inline
                  group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center h-10 w-10
                  rounded-full bg-amber-50 hover:bg-amber-100
                  text-amber-700 transition-all duration-200 cursor-pointer
                  border border-amber-100"
                aria-label="Toggle menu"
              >
                <span className={`transition-transform duration-200 ${isMobileMenuOpen ? "rotate-90" : ""}`}>
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </span>
              </button>
            </div>
          </nav>

          {/* ── MOBILE MENU ── */}
          <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 mx-1
            rounded-3xl overflow-hidden z-50
            transition-all duration-300 origin-top
            ${isMobileMenuOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
            }`}>
            <div className="bg-white/97 backdrop-blur-xl
              border border-amber-200/50 shadow-2xl shadow-amber-100/40
              rounded-3xl overflow-hidden">

              {/* Nav links */}
              <div className="flex flex-col p-3 gap-1">
                {navItems.map((item) => {
                  const isActive = active === item.label;
                  return (
                    <Link
                      href={item.url}
                      key={item.label}
                      onClick={() => {
                        setActive(item.label);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl
                        text-base font-medium transition-all duration-200
                        ${isActive
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-100"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                        }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                      {isActive && (
                        <ArrowRight size={14} className="ml-auto opacity-70" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA strip */}
              <div className="mx-3 mb-3 p-3 rounded-2xl
                bg-gradient-to-r from-amber-50 to-orange-50
                border border-amber-100/80">
                <div className="flex items-center gap-2 mb-2.5">
                  <MapPin size={14} className="text-amber-500" />
                  <span className="text-xs font-medium text-amber-700">
                    Mathura · Vrindavan · Agra
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsFormOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2
                    py-3 rounded-xl font-semibold text-sm text-white
                    bg-gradient-to-r from-orange-500 to-amber-500
                    shadow-md shadow-orange-100 cursor-pointer
                    hover:from-orange-400 hover:to-amber-400 transition-colors"
                >
                  <Phone size={15} />
                  Enquire About a Tour
                </button>
              </div>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}