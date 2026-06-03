import { getPosts } from "@/actions/posts";
import { getCategories } from "@/actions/categories";
import { getTags } from "@/actions/tags";
import { BlogsClient } from "@/components/blogsClient";

type SearchParams = Promise<{
  q?: string;
  category?: string;
  tags?: string;
}>;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const search = params.q ?? "";
  const categorySlug = params.category ?? "";

  const tagSlugs = params.tags?.split(",").filter(Boolean) ?? [];

  const [posts, categories, tags] = await Promise.all([
    getPosts({ search, categorySlug, tagSlugs }),
    getCategories(),
    getTags(),
  ]);

  return (
    <div>
      <section className="mb-5 space-y-3">
        <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
          All posts
        </span>
        <h1 className="font-serif text-4xl tracking-tight text-foreground italic sm:text-5xl">
          The blog.
        </h1>
      </section>

      <BlogsClient
        posts={posts}
        categories={categories}
        tags={tags}
        currentSearch={search}
        currentCategory={categorySlug}
        currentTags={tagSlugs}
      />
    </div>
  );
}
