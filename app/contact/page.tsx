import type { Metadata } from "next";
import { Mail, Globe } from "lucide-react";
import { ContactForm } from "./contact-form";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. We'll respond within one business day.",
};

export default function ContactPage() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid items-start gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[2px] text-gold">
            Contact
          </p>
          <h1 className="mt-3 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            Let&apos;s build something serious.
          </h1>
          <p className="mt-5 max-w-md text-balance text-[16px] leading-[1.75] text-text-secondary">
            Tell us about the project — what you&apos;re trying to do, what
            you&apos;ve tried, and what&apos;s in the way. We respond within
            one business day.
          </p>

          <div className="mt-10 space-y-3">
            <ContactItem
              href={`mailto:${SITE.email}`}
              icon={<Mail className="size-4" />}
              label="Email"
              value={SITE.email}
            />
            <ContactItem
              href={SITE.url}
              icon={<Globe className="size-4" />}
              label="Website"
              value="crownedcode.com"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function ContactItem({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:translate-x-1 hover:border-gold/30"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-gold-dim text-gold">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </span>
        <span className="text-[15px] font-medium">{value}</span>
      </span>
    </a>
  );
}
