"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CrownIcon } from "./crown-icon";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border backdrop-blur-xl",
        "transition-[padding,background] duration-300",
        scrolled ? "py-3 bg-bg/90" : "py-5 bg-bg/70",
      )}
    >
      <div className="container-page flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-text-primary"
          onClick={closeMenu}
        >
          <CrownIcon className="size-7" animated />
          <span className="text-[17px] font-bold tracking-tight">
            Crowned<span className="text-gold">Code</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-all hover:-translate-y-px hover:bg-gold-light"
            >
              Get in Touch
            </Link>
          </li>
        </ul>

        {/* Mobile: persistent CTA + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/contact"
            onClick={closeMenu}
            className="rounded-lg bg-gold px-4 py-2 text-[13px] font-semibold text-black transition-colors hover:bg-gold-light"
          >
            Get in Touch
          </Link>
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-8 w-7 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-white transition-transform duration-200",
                menuOpen && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-white transition-all duration-200",
                menuOpen && "scale-x-0 opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-white transition-transform duration-200",
                menuOpen && "-translate-y-[7px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "absolute inset-x-0 top-full border-b border-border bg-bg/95 backdrop-blur-xl",
          "flex flex-col md:hidden",
          "transition-all duration-200",
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2",
        )}
      >
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={closeMenu}
            className="border-b border-border px-6 py-4 text-[15px] font-medium text-text-secondary transition-colors last:border-b-0 hover:bg-white/[0.03] hover:text-text-primary"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
