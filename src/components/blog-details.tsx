import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { PostDetail } from "@/actions/posts";

export function BlogDetail({ post }: { post: PostDetail }) {
  // TODO: uncomment post.aiSummary after merging seed.ts

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-12">
      {/* Back link */}
      <Link
        href="/blogs"
        className="mb-10 flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={12} />
        All posts
      </Link>

      {/* Header */}
      <div className="mx-auto max-w-2xl">
        {/* Category + tags */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {post.category.name}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag.slug}
              className="font-mono text-xs text-muted-foreground/60"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="mb-6 font-serif text-4xl leading-tight tracking-tight text-foreground italic sm:text-5xl">
          {post.title}
        </h1>

        {/* Author + meta */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-mono text-xs text-muted-foreground">
            {post.author.name?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <span>{post.author.name ?? "Anonymous"}</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="mb-10 aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* AI Summary */}
        <div className="mb-10 rounded-md border border-border bg-muted/30 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-muted-foreground" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              AI Summary
            </span>
          </div>
          {post.aiSummary ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {post.aiSummary}
            </p>
          ) : (
            <p className="font-mono text-xs text-muted-foreground/50">
              Summary not available yet.
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="mb-10 h-px w-12 bg-border" />

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="mt-10 mb-4 font-serif text-3xl tracking-tight text-foreground italic">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-8 mb-3 font-serif text-2xl tracking-tight text-foreground italic">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-6 mb-2 font-serif text-xl tracking-tight text-foreground italic">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-5 text-base leading-relaxed text-foreground/90">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="font-serif text-foreground italic">
                  {children}
                </em>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-6 border-l-2 border-border pl-4 font-serif text-muted-foreground italic">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="my-6 overflow-x-auto rounded-md border border-border bg-muted p-4 font-mono text-sm">
                  {children}
                </pre>
              ),
              ul: ({ children }) => (
                <ul className="my-4 list-disc space-y-1 pl-5 text-foreground/90">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-4 list-decimal space-y-1 pl-5 text-foreground/90">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-base leading-relaxed">{children}</li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="my-8 border-border" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-mono text-sm text-muted-foreground">
                {post.author.name?.[0]?.toUpperCase() ?? "A"}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {post.author.name ?? "Anonymous"}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  Author
                </p>
              </div>
            </div>
            <Link
              href="/blogs"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
