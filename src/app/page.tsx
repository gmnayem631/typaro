import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import Link from "next/link";
import { BlogCard } from "@/components/blogCard";

const MOCK_POSTS = [
  {
    id: "1",
    title: "The Art of Writing Simply",
    slug: "the-art-of-writing-simply",
    excerpt:
      "Good writing is not about using big words or complex sentences. It is about saying what you mean as clearly as possible.",
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    readingTime: 4,
    createdAt: new Date("2026-05-01"),
    author: { name: "Farhan Aziz" },
    category: { name: "Writing", slug: "writing" },
    tags: [
      { name: "craft", slug: "craft" },
      { name: "tips", slug: "tips" },
    ],
  },
  {
    id: "2",
    title: "Why Every Developer Should Keep a Blog",
    slug: "why-every-developer-should-blog",
    excerpt:
      "Writing about what you build forces you to understand it deeply. It also helps others learn from your mistakes.",
    coverImage:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    readingTime: 6,
    createdAt: new Date("2026-05-10"),
    author: { name: "Faisal Mahmud" },
    category: { name: "Technology", slug: "technology" },
    tags: [
      { name: "dev", slug: "dev" },
      { name: "career", slug: "career" },
    ],
  },
  {
    id: "3",
    title: "Building Typaro — What We Learned",
    slug: "building-typaro-what-we-learned",
    excerpt:
      "Three developers. One project. Countless lessons about collaboration, architecture, and shipping under pressure.",
    coverImage:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800",
    readingTime: 8,
    createdAt: new Date("2026-05-20"),
    author: { name: "Gulam Mustafa Nayem" },
    category: { name: "Technology", slug: "technology" },
    tags: [
      { name: "nextjs", slug: "nextjs" },
      { name: "teamwork", slug: "teamwork" },
    ],
  },
];

export default function Home() {
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
          {MOCK_POSTS.map((post, i) => (
            <BlogCard key={post.id} {...post} index={i + 1} />
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
