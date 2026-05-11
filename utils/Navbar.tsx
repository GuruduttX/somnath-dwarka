"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight, Sparkles } from "lucide-react";
import CommonEnquiryForm from "./CommanEnquiryForm";

const navItems = [
  { label: "Home", url: "/" },
  { label: "Tours", url: "/tour-packages" },
  { label: "Taxi", url: "/taxi" },
  { label: "Hotels", url: "/hotels" },
  { label: "Pooja", url: "/pooja" },
  { label: "About", url: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [active, setActive] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // ACTIVE TAB
  useEffect(() => {
    const currentTab = navItems.find((item) => {
      if (item.url === "/") return pathname === "/";
      return pathname.startsWith(item.url);
    });

    if (currentTab) {
      setActive(currentTab.label);
    }
  }, [pathname]);

  // CLOSE MENU ON RESIZE
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // CLOSE MENU OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
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
      <header className="fixed top-6 left-0 w-full z-50 flex justify-center">
        <div className="relative w-[92vw] sm:w-[90vw] xl:w-[85vw]">
          {/* Glow Background */}
          <div
            className="absolute inset-0
                    bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500
                    blur-xl opacity-30 rounded-full"
          ></div>

          {/* Navbar */}
          <nav
            className={`relative
              flex items-center justify-between
              h-16
              px-4 sm:px-6 lg:px-8
              rounded-2xl lg:rounded-full
              backdrop-blur-xl
              bg-white/95
              border border-amber-200/50
              shadow-xl

                      
                    `}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="h-12 w-[140px] md:w-[180px] rounded-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center px-4">
              <Image
                  src="/images/Experience_my_India.webp"
                  height={50}
                  width={150}
                  alt="Mathura Vrindavan Taxi Services Logo"
                  className="w-full h-auto object-contain"
                  priority
                />

              </div>
            </Link>

            {/* Desktop Navigation */}
            <div
              className="
                hidden lg:flex
                items-center gap-1
                bg-gray-50/80
                rounded-full
                p-1
              "
            >
              {navItems.map((item) => (
                <Link
                  href={item.url}
                  key={item.label}
                  onClick={() =>
                    handleNavClick(item.label)
                  }
                  className={`
                    relative
                    px-5 py-2
                    rounded-full
                    font-medium
                    transition-colors duration-200
                    ${
                      active === item.label
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                        : "text-gray-700 hover:text-amber-600 hover:bg-white"
                    }
                  `}
                >
                  {active === item.label && (
                    <Sparkles
                      size={12}
                      className="
                        absolute
                        -top-1 -right-1
                        text-amber-300
                      "
                    />
                  )}

                  {item.label}
                </Link>
              ))}
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* CTA BUTTON */}
              <button
                onClick={() => setIsFormOpen(true)}
                className="
                  relative
                  flex items-center gap-2
                  px-4 sm:px-6
                  h-11
                  rounded-full
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-orange-500
                  to-amber-600
                  hover:from-orange-400
                  hover:to-amber-500
                  transition-colors duration-200
                  overflow-hidden
                  group
                  cursor-pointer
                "
              >
                {/* SHINE */}
                <span
                  className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform duration-1000
                  "
                />

                <Phone
                  size={16}
                  className="relative z-10"
                />

                <span
                  className="
                    hidden sm:inline
                    relative z-10
                    text-sm font-medium
                  "
                >
                  Enquire Now
                </span>

                <ArrowRight
                  size={14}
                  className="
                    hidden sm:inline
                    relative z-10
                  "
                />
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden flex items-center justify-center h-10 w-10 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* 3. common Form Component */}

            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="xl:hidden absolute top-full left-0 right-0 mt-3 mx-2 sm:mx-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-amber-200/60 shadow-2xl overflow-hidden z-50">
              <div className="flex flex-col py-3">
                {navItems.map((item, idx) => (
                  <Link
                    href={item.url}
                    key={idx}
                    onClick={() => {
                      setActive(item.label);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                                        px-6 py-3.5
                                        text-base
                                        font-medium
                                        transition
                                        ${
                                          active === item.label
                                            ? "text-amber-700 bg-amber-50"
                                            : "text-gray-700 hover:text-amber-600 hover:bg-amber-50/60"
                                        }
                                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
     
    </>
  );
}
