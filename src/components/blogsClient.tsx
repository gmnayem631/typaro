"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "@/components/blogCard";
import { Search, X } from "lucide-react";

type Post = {
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
};

export function BlogsClient({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categories = useMemo(
    () =>
      Array.from(new Set(posts.map((p) => p.category.slug))).map((slug) => ({
        slug,
        name: posts.find((p) => p.category.slug === slug)!.category.name,
      })),
    [posts],
  );

  const tags = useMemo(
    () =>
      Array.from(
        new Map(posts.flatMap((p) => p.tags).map((t) => [t.slug, t])).values(),
      ),
    [posts],
  );

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        search === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === null || post.category.slug === activeCategory;

      const matchesTag =
        activeTag === null || post.tags.some((t) => t.slug === activeTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, search, activeCategory, activeTag]);

  const hasFilters =
    search !== "" || activeCategory !== null || activeTag !== null;

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={14}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full rounded-md border border-border bg-transparent py-2.5 pr-4 pl-9 font-mono text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/40 focus:border-foreground"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="mb-3 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() =>
              setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
            }
            className={`rounded-sm px-2.5 py-1 font-mono text-xs transition-colors ${
              activeCategory === cat.slug
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.slug}
            type="button"
            onClick={() =>
              setActiveTag(activeTag === tag.slug ? null : tag.slug)
            }
            className={`font-mono text-xs transition-colors ${
              activeTag === tag.slug
                ? "text-foreground"
                : "text-muted-foreground/60 hover:text-muted-foreground"
            }`}
          >
            #{tag.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      {hasFilters && (
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"} found
          </span>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory(null);
              setActiveTag(null);
            }}
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Posts */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-muted-foreground italic">
            Nothing found.
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Try a different search or filter.
          </p>
        </div>
      ) : (
        <div>
          {filtered.map((post, i) => (
            <BlogCard key={post.id} {...post} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
