"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { BlogCard } from "@/components/blogCard";
import { Search, X } from "lucide-react";
import type { PostWithRelations } from "@/actions/posts";
import type { Category } from "@/actions/categories";
import type { Tag } from "@/actions/tags";

type Props = {
  posts: PostWithRelations[];
  categories: Category[];
  tags: Tag[];
  currentSearch: string;
  currentCategory: string;
  currentTags: string[];
};

export function BlogsClient({
  posts,
  categories,
  tags,
  currentSearch,
  currentCategory,
  currentTags,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/blogs?${params.toString()}`);
  }

  function toggleTag(slug: string) {
    const params = new URLSearchParams(searchParams.toString());

    const current = params.get("tags")?.split(",").filter(Boolean) ?? [];

    const next = current.includes(slug)
      ? current.filter((t) => t !== slug)
      : [...current, slug];

    if (next.length) {
      params.set("tags", next.join(","));
    } else {
      params.delete("tags");
    }

    router.push(`/blogs?${params.toString()}`);
  }

  const handleSearch = useDebouncedCallback((value: string) => {
    updateParams("q", value || null);
  }, 400);

  const hasFilters =
    !!currentSearch || !!currentCategory || currentTags.length > 0;

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
          defaultValue={currentSearch}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full rounded-md border border-border bg-transparent py-2.5 pr-4 pl-9 font-mono text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/40 focus:border-foreground"
        />
        {currentSearch && (
          <button
            type="button"
            onClick={() => updateParams("q", null)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="mb-3 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() =>
              updateParams(
                "category",
                currentCategory === category.slug ? null : category.slug,
              )
            }
            className={`rounded-sm px-2.5 py-1 font-mono text-xs transition-colors ${
              currentCategory === category.slug
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.slug}
            type="button"
            onClick={() => toggleTag(tag.slug)}
            className={`font-mono text-xs transition-colors ${
              currentTags.includes(tag.slug)
                ? "text-foreground"
                : "text-muted-foreground/60 hover:text-muted-foreground"
            }`}
          >
            #{tag.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {hasFilters && (
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"} found
          </span>

          <button
            type="button"
            onClick={() => router.push("/blogs")}
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Posts */}
      {posts.length === 0 ? (
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
          {posts.map((post, i) => (
            <BlogCard key={post.id} {...post} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
