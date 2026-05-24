import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/content";
import { Reveal, RevealStagger, RevealItem } from "@/components/marketing/reveal";
import { TiltCard } from "@/components/marketing/tilt-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the studio — how we think about AI integration, custom software, and shipping real systems for real businesses.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[2px] text-gold">
            Blog
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-3 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            Notes from the studio.
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-balance text-[16px] leading-[1.75] text-text-secondary">
            Posts on AI integration, custom software, and what we&apos;ve
            learned shipping things for serious businesses.
          </p>
        </Reveal>
      </div>

      {posts.length === 0 ? (
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border border-dashed bg-card p-10 text-center">
          <p className="text-[14px] uppercase tracking-[2px] text-text-muted">
            Coming soon
          </p>
          <p className="mt-3 text-text-secondary">
            First batch of articles is being written.
          </p>
        </div>
      ) : (
        <RevealStagger className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <RevealItem key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block h-full">
                <TiltCard className="flex h-full flex-col p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-gold-dim px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-gold-light"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-[20px] font-bold leading-snug tracking-[-0.015em]">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-text-secondary">
                    {p.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-[12.5px] text-text-muted">
                    <span>
                      {formatDate(p.date)} · {p.readingMinutes} min read
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-gold">
                      Read <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </TiltCard>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      )}
    </section>
  );
}
