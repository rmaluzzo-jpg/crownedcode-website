import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/content";
import { articleJsonLd, JsonLd } from "@/lib/seo";
import { Reveal } from "@/components/marketing/reveal";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  return (
    <article className="container-page py-16 md:py-24">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          publishedAt: post.date,
          author: post.author,
        })}
      />

      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-[13px] font-semibold text-text-secondary transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-3.5" /> Back to blog
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gold-dim px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-gold-light"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em]">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 text-[18px] leading-[1.7] text-text-secondary">
            {post.description}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 flex items-center gap-3 text-[13px] text-text-muted">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </Reveal>

        <hr className="my-12 border-border" />

        <Reveal delay={0.25}>
          <div className="prose-cc">{content}</div>
        </Reveal>
      </div>
    </article>
  );
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-14 mb-4 text-[26px] font-bold leading-tight tracking-[-0.02em]"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-10 mb-3 text-[20px] font-bold tracking-[-0.01em]"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-5 text-[16.5px] leading-[1.78] text-text-secondary"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-5 list-disc space-y-2 pl-6 text-[16.5px] leading-[1.78] text-text-secondary marker:text-gold"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-5 list-decimal space-y-2 pl-6 text-[16.5px] leading-[1.78] text-text-secondary marker:text-gold marker:font-semibold"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 border-l-2 border-gold pl-6 text-[17px] italic text-text-primary"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-gold underline-offset-4 hover:underline" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-card px-1.5 py-0.5 text-[14px] text-gold-light"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-border bg-card p-4 text-[13.5px] leading-relaxed"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
};
