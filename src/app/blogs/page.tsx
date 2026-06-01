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
  {
    id: "4",
    title: "The Quiet Power of Consistent Writing",
    slug: "quiet-power-of-consistent-writing",
    excerpt:
      "You do not need to write every day. But showing up consistently, even imperfectly, compounds over time.",
    coverImage:
      "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800",
    readingTime: 5,
    createdAt: new Date("2026-05-22"),
    author: { name: "Farhan Aziz" },
    category: { name: "Writing", slug: "writing" },
    tags: [
      { name: "habit", slug: "habit" },
      { name: "craft", slug: "craft" },
    ],
  },
  {
    id: "5",
    title: "Reading as a Writer",
    slug: "reading-as-a-writer",
    excerpt:
      "The best writers are obsessive readers. Not to copy but to absorb rhythm, structure, and voice.",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    readingTime: 3,
    createdAt: new Date("2026-05-25"),
    author: { name: "Faisal Mahmud" },
    category: { name: "Writing", slug: "writing" },
    tags: [
      { name: "reading", slug: "reading" },
      { name: "craft", slug: "craft" },
    ],
  },
  {
    id: "6",
    title: "What AI Cannot Write For You",
    slug: "what-ai-cannot-write-for-you",
    excerpt:
      "AI can generate words. It cannot generate your perspective, your failures, or the things only you have lived through.",
    coverImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
    readingTime: 7,
    createdAt: new Date("2026-05-28"),
    author: { name: "Gulam Mustafa Nayem" },
    category: { name: "AI", slug: "ai" },
    tags: [
      { name: "ai", slug: "ai" },
      { name: "writing", slug: "writing" },
    ],
  },
];

export default async function BlogsPage() {
  return (
    <div className="py-16">
      {/* Header */}
      <div className="mb-12 space-y-3">
        <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
          All posts
        </span>
        <h1 className="font-serif text-4xl tracking-tight text-foreground italic sm:text-5xl">
          The blog.
        </h1>
        <p className="text-sm text-muted-foreground">
          {MOCK_POSTS.length} posts published
        </p>
      </div>

      {/* Grid */}
      <div>
        {MOCK_POSTS.map((post, i) => (
          <BlogCard key={post.id} {...post} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
