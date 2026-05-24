import Link from "next/link";
import { CrownIcon } from "./crown-icon";
import { SITE } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-10 text-center md:flex-row md:text-left">
        <Link href="/" className="flex items-center gap-2">
          <CrownIcon className="size-5" />
          <span className="text-[15px] font-bold tracking-tight">
            Crowned<span className="text-gold">Code</span>
          </span>
        </Link>
        <p className="text-[13px] text-text-muted">
          © {new Date().getFullYear()} {SITE.name} LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
