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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border backdrop-blur-xl",
        "transition-[padding,background] duration-300",
        scrolled
          ? "py-3 bg-bg/90"
          : "py-5 bg-bg/70",
      )}
    >
      <div className="container-page flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-text-primary"
        >
          <CrownIcon className="size-7" animated />
          <span className="text-[17px] font-bold tracking-tight">
            Crowned<span className="text-gold">Code</span>
          </span>
        </Link>

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
      </div>
    </nav>
  );
}
