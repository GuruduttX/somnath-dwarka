"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight, MapPin, Compass, ChevronDown } from "lucide-react";
import CommonEnquiryForm from "./CommanEnquiryForm";
import { PRIMARY_NAV, DESTINATIONS_NAV } from "@/src/config/routes";

const HUB_ICONS: Record<string, string> = {
  "Tour packages": "🗺️",
  "Taxi service": "🚗",
  Hotels: "🏨",
  Destinations: "🛕",
  Temples: "🛕",
  Somnath: "🛕",
  Dwarka: "🛕",
  Gir: "🦁",
  "Junagadh Girnar": "⛰️",
  Plan: "🧭",
  Festivals: "🎉",
  Guides: "📖",
};

type NavLink = { label: string; url: string; icon: string };
type NavGroup = { label: string; icon: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

const isGroup = (item: NavItem): item is NavGroup => "children" in item;

const toLink = (n: { label: string; path: string }): NavLink => ({
  label: n.label,
  url: n.path,
  icon: HUB_ICONS[n.label] ?? "📍",
});

const DESTINATIONS_GROUP: NavGroup = {
  label: "Destinations",
  icon: HUB_ICONS.Destinations,
  children: DESTINATIONS_NAV.map(toLink),
};

/**
 * Primary hubs (home stays available through the logo). The destinations
 * dropdown sits where Somnath and Dwarka used to be as flat items.
 */
const navItems: NavItem[] = PRIMARY_NAV.flatMap((n) =>
  n.label === "Hotels" ? [toLink(n), DESTINATIONS_GROUP] : [toLink(n)],
);

const normalizePath = (path: string) => {
  if (path === "/") return path;
  return path.replace(/\/+$/, "");
};

const isActivePath = (itemUrl: string, pathname: string) => {
  const currentPath = normalizePath(pathname);
  const targetPath = normalizePath(itemUrl);

  if (targetPath === "/") return currentPath === "/";
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
};

export default function Navbar() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /** Label of the open desktop dropdown, or null. */
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  /** Which groups are expanded in the mobile sheet. */
  const [openMobileGroups, setOpenMobileGroups] = useState<string[]>([]);
  /**
   * Only open on hover where hovering is real. On a touch screen a tap fires
   * mouseenter and then click, so a hover-opened menu would be toggled shut by
   * the very tap that opened it.
   */
  const [canHover, setCanHover] = useState(false);

  // Close the dropdown when the route changes — including on browser back and
  // forward, which never fire the links' onClick. Adjusting state during render
  // rather than in an effect avoids a second render pass with a stale menu open.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenGroup(null);
  }

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // POINTER CAPABILITY — a hybrid laptop can gain or lose a mouse, so track it.
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

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

  // The dropdown is a separate popover from the mobile sheet: close it when a
  // click lands outside it, and on Escape.
  useEffect(() => {
    if (!openGroup) return;

    const onPointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroup]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setOpenGroup(null);
  };

  const toggleMobileGroup = (label: string) =>
    setOpenMobileGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );

  const isGroupActive = (group: NavGroup) =>
    group.children.some((child) => isActivePath(child.url, pathname));

  return (
    <>
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="General Enquiry"
      />

      <header className="fixed top-6 left-0 w-full z-40 flex justify-center">
        <div ref={mobileMenuRef} className="relative w-[92vw] sm:w-[90vw] xl:w-[85vw]">



          {/* Navbar pill */}
          <nav
            className={`relative flex items-center justify-between h-16
              px-3 sm:px-5 lg:px-6 rounded-full
              border transition-all duration-300
              ${scrolled
                ? "bg-white border-slate-200/80 shadow-md"
                : "bg-white/95 border-slate-100/60 shadow-sm"
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

            {/* ── DESKTOP NAV ──
                overflow-visible, not overflow-x-auto: a scroll container clips
                the absolutely-positioned dropdown panel. */}
            <div
              ref={dropdownRef}
              className="hidden lg:flex items-center gap-1 min-w-0
              bg-gray-50/70 rounded-full px-1.5 py-1.5
              border border-gray-100/80 overflow-visible"
            >
              {navItems.map((item) => {
                if (isGroup(item)) {
                  const isActive = isGroupActive(item);
                  const isOpen = openGroup === item.label;
                  return (
                    <div
                      key={item.label}
                      className="relative flex-shrink-0"
                      onMouseEnter={canHover ? () => setOpenGroup(item.label) : undefined}
                      onMouseLeave={canHover ? () => setOpenGroup(null) : undefined}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenGroup(isOpen ? null : item.label)}
                        onFocus={() => setOpenGroup(item.label)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        className={`relative flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-2 xl:px-3.5
                          whitespace-nowrap
                          font-medium text-[13px] transition-colors duration-200 group xl:text-sm
                          ${isActive || isOpen
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200"
                            : "text-gray-600 hover:text-amber-700 hover:bg-white hover:shadow-sm"
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* pt-2 is a hover bridge, not decoration: the gap between
                          the button and the card must stay inside the wrapper,
                          or crossing it fires mouseleave and shuts the menu. */}
                      <div
                        className={`absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2
                          origin-top transition-all duration-200
                          ${isOpen
                            ? "visible scale-100 opacity-100"
                            : "pointer-events-none invisible scale-95 opacity-0"
                          }`}
                      >
                        <div className="rounded-2xl border border-amber-200/60 bg-white p-2
                          shadow-xl shadow-amber-100/50">
                          {item.children.map((child) => {
                            const childActive = isActivePath(child.url, pathname);
                            return (
                              <Link
                                key={child.label}
                                href={child.url}
                                onClick={handleNavClick}
                                aria-current={childActive ? "page" : undefined}
                                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5
                                  text-sm font-medium transition-colors duration-150
                                  ${childActive
                                    ? "bg-amber-50 text-amber-700"
                                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                                  }`}
                              >
                                <span className="text-base">{child.icon}</span>
                                <span>{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                const isActive = isActivePath(item.url, pathname);
                return (
                  <Link
                    href={item.url}
                    key={item.label}
                    onClick={handleNavClick}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex h-9 items-center gap-1.5 rounded-full px-2.5 py-2 xl:px-3.5
                      whitespace-nowrap flex-shrink-0
                      font-medium text-[13px] transition-colors duration-200 group xl:text-sm
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
                      <span className="absolute bottom-1.5 left-4 right-4 h-px
                        bg-amber-400 scale-x-0 group-hover:scale-x-100
                        transition-transform duration-200 origin-left" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── RIGHT SECTION ── */}
            <div className="flex items-center gap-2">

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
              <div className="flex flex-col p-3 gap-1 max-h-[60vh] overflow-y-auto">
                {navItems.map((item) => {
                  if (isGroup(item)) {
                    const isActive = isGroupActive(item);
                    const isExpanded = openMobileGroups.includes(item.label);
                    return (
                      <div key={item.label}>
                        <button
                          type="button"
                          onClick={() => toggleMobileGroup(item.label)}
                          aria-expanded={isExpanded}
                          className={`flex w-full cursor-pointer items-center gap-3 px-5 py-3.5 rounded-2xl
                            text-base font-medium transition-all duration-200
                            ${isActive
                              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-100"
                              : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                            }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            aria-hidden="true"
                            className={`ml-auto transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>

                        {isExpanded ? (
                          <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-amber-100 pl-3">
                            {item.children.map((child) => {
                              const childActive = isActivePath(child.url, pathname);
                              return (
                                <Link
                                  key={child.label}
                                  href={child.url}
                                  onClick={handleNavClick}
                                  aria-current={childActive ? "page" : undefined}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-xl
                                    text-[15px] font-medium transition-all duration-200
                                    ${childActive
                                      ? "bg-amber-50 text-amber-700"
                                      : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                                    }`}
                                >
                                  <span className="text-base">{child.icon}</span>
                                  <span>{child.label}</span>
                                  {childActive && (
                                    <ArrowRight size={14} className="ml-auto opacity-70" />
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    );
                  }

                  const isActive = isActivePath(item.url, pathname);
                  return (
                    <Link
                      href={item.url}
                      key={item.label}
                      onClick={handleNavClick}
                      aria-current={isActive ? "page" : undefined}
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
