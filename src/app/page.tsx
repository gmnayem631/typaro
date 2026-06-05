import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import Link from "next/link";
import { BlogCard } from "@/components/blogCard";
import { getPosts } from "@/actions/posts";

export default async function Home() {
  // fetch posts, sort by published date desc and take the latest 3
  const posts = await getPosts();
  const recentPosts = (posts || [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div>
      <Hero />

      {/* Recent posts */}
      <section className="py-16">
        <div className="mb-10 flex items-end justify-between">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
              Recent posts
            </span>
            <h2 className="font-serif text-3xl tracking-tight text-foreground italic">
              Latest from the blog.
            </h2>
          </div>
          <Link
            href="/blogs"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            View all →
          </Link>
        </div>

        <div>
          {recentPosts.map((post, i) => (
            <BlogCard key={post.id} {...post} index={i + 1} />
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
