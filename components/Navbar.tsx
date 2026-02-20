"use client";

import Link from "next/link";
import Image from "next/image";
import { WalletButton } from "./WalletButton";
import { useState, useEffect, useRef } from "react";
import { useServicesCard } from "@/contexts/ServicesCardContext";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Services", href: "#services" },
  { label: "API", href: "#api" },
  { label: "Compliance", href: "#compliance" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["platform", "services", "api", "compliance", "contact"];

export function Navbar() {
  const { cardIndex: servicesCardIndex } = useServicesCard();
  const servicesCardIndexRef = useRef(servicesCardIndex);
  servicesCardIndexRef.current = servicesCardIndex;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledPastVideo90, setScrolledPastVideo90] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("platform");
  const ratiosRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const videoSectionHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    const threshold = videoSectionHeight * 0.9;

    const onScroll = () => {
      setScrolledPastVideo90(window.scrollY >= threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When carousel card changes while in services section, update header tab (API/Compliance) immediately
  useEffect(() => {
    if (activeSection !== "services" && activeSection !== "api" && activeSection !== "compliance") return;
    const next =
      servicesCardIndex === 4 ? "api" : servicesCardIndex === 5 ? "compliance" : "services";
    setActiveSection((prev) => (prev !== next ? next : prev));
  }, [servicesCardIndex, activeSection]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const t = setTimeout(() => {
      const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (elements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = entry.target.id;
            if (id) ratiosRef.current[id] = entry.intersectionRatio;
          }
          const r = ratiosRef.current;
          const maxId = Object.entries(r).reduce(
            (best, [id, ratio]) => (ratio > (r[best] ?? 0) ? id : best),
            SECTION_IDS[0]
          );
          // When in services section, use carousel card index so API (5th) and Compliance (6th) illuminate correctly
          const inServices = (r["services"] ?? 0) > 0.1;
          const idx = servicesCardIndexRef.current;
          if (inServices) {
            if (idx === 4) setActiveSection("api");
            else if (idx === 5) setActiveSection("compliance");
            else setActiveSection("services");
          } else if ((r[maxId] ?? 0) > 0) {
            setActiveSection(maxId);
          }
        },
        { root: null, rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      );

      elements.forEach((el) => observer.observe(el));
      cleanup = () => elements.forEach((el) => observer.unobserve(el));
    }, 150);
    return () => {
      clearTimeout(t);
      cleanup?.();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-7xl rounded-full border shadow-sm transition-colors duration-200 ${
          scrolledPastVideo90
            ? "border-black/20 bg-black backdrop-blur-none"
            : "border-vaulto-border bg-vaulto-bg/95 backdrop-blur supports-[backdrop-filter]:bg-vaulto-bg/80"
        }`}
      >
        <nav className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3 lg:px-8">
          <Link
            href="#platform"
            className="flex shrink-0 items-center gap-2 font-serif text-xl font-semibold tracking-tight text-white sm:text-2xl"
          >
            <Image
              src="/vaulto-logo.png"
              alt="Vaulto"
              width={120}
              height={36}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-sm transition-colors hover:text-vaulto-fg ${
                    isActive ? "font-medium text-vaulto-fg" : "text-vaulto-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="[&_button]:!rounded-lg [&_button]:!border [&_button]:!border-vaulto-accent [&_button]:!bg-vaulto-accent [&_button]:!px-4 [&_button]:!py-2 [&_button]:!font-medium [&_button]:!text-white [&_button]:hover:!bg-vaulto-accent-dim">
              <WalletButton />
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-vaulto-border p-2 text-vaulto-fg transition-colors hover:bg-white/5 md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-vaulto-border/80 px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 font-sans text-sm transition-colors hover:bg-white/5 hover:text-vaulto-fg ${
                      isActive ? "font-medium text-vaulto-fg bg-white/5" : "text-vaulto-muted"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
