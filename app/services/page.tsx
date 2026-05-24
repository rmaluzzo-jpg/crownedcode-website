import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Brain, Wrench, Workflow, Smartphone, Database, Boxes } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/marketing/reveal";
import { TiltCard } from "@/components/marketing/tilt-card";

export const metadata: Metadata = {
  title: "Services — Custom Software for Any Business Need",
  description:
    "We design and build custom software for businesses — AI integration, internal tools, automation, iOS, systems integration. If software can solve it, we can build it.",
};

const capabilities = [
  {
    icon: Brain,
    title: "AI Integration",
    body: "RAG systems, internal copilots, agent workflows, document extraction. We integrate AI into the systems your business already runs on.",
    href: "/services/ai-integration",
    available: true,
  },
  {
    icon: Wrench,
    title: "Internal Tools",
    body: "Replace the spreadsheets, Airtables, and brittle scripts your team is duct-taping together. Custom dashboards, admin tools, and ops software.",
    href: "/contact",
    available: false,
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    body: "End-to-end automations that connect your CRM, ERP, email, payments, and everything in between. Built to be debuggable, not magical.",
    href: "/contact",
    available: false,
  },
  {
    icon: Database,
    title: "Systems Integration",
    body: "Two systems that should talk and don't? We build the connective tissue — APIs, ETL pipelines, webhook handlers, data sync layers.",
    href: "/contact",
    available: false,
  },
  {
    icon: Smartphone,
    title: "iOS & Apple Ecosystem",
    body: "Native Swift, App Store-ready iOS apps, Mac apps, and tight integrations with the Apple ecosystem your customers already live in.",
    href: "/contact",
    available: false,
  },
  {
    icon: Boxes,
    title: "Custom Software",
    body: "The category your problem doesn't fit in. If it ships as software and runs on a computer, we'll build it. Start with a conversation.",
    href: "/contact",
    available: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="container-page pt-20 pb-14 text-center md:pt-28 md:pb-20">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[2px] text-gold">
            What we build
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-3 max-w-3xl text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            Custom software, for anything your business needs.
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-[1.7] text-text-secondary">
            We don&apos;t fit your problem into a product. We build the software
            your business actually needs — from a one-week internal tool to a
            year-long platform.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24 md:pb-32">
        <RevealStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <RevealItem key={c.title}>
                <Link href={c.href} className="block h-full">
                  <TiltCard className="flex h-full flex-col p-8">
                    <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-gold-dim text-gold">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[18px] font-bold tracking-tight">
                        {c.title}
                      </h3>
                      {c.available && (
                        <span className="rounded-full bg-gold-dim px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-light">
                          Detail page
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-text-secondary">
                      {c.body}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold transition-transform group-hover:translate-x-0.5">
                      {c.available ? "Learn more" : "Start a conversation"}
                      <ArrowRight className="size-3.5" />
                    </span>
                  </TiltCard>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>
    </>
  );
}
