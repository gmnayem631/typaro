import Link from "next/link";

type BlogCardProps = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string | null;
  author: { name: string | null };
  category: { name: string; slug: string };
  tags: { name: string; slug: string }[];
  createdAt: Date;
  readingTime: number;
  index: number;
};

export function BlogCard({
  title,
  excerpt,
  slug,
  author,
  category,
  createdAt,
  readingTime,
  index,
}: BlogCardProps) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blogs/${slug}`} className="group block">
      <article className="flex gap-6 border-b border-border py-8 transition-colors first:border-t first:pt-8">
        {/* Index number */}
        <span className="mt-1 w-8 shrink-0 font-mono text-xs text-muted-foreground/40">
          {String(index).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3">
          <h2 className="font-serif text-2xl leading-snug tracking-tight text-foreground italic transition-colors group-hover:text-muted-foreground sm:text-3xl">
            {title}
          </h2>

          <p className="line-clamp-1 text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>{author.name ?? "Anonymous"}</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{readingTime} min</span>
            <span>·</span>
            <span>{category.name}</span>
          </div>
        </div>

        {/* Arrow */}
        <span className="mt-1 shrink-0 font-mono text-sm text-muted-foreground opacity-0 transition-all group-hover:opacity-100">
          →
        </span>
      </article>
    </Link>
  );
}
