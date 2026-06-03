import { prisma as db } from "@/lib/prisma";

async function main() {
  const author = await db.user.upsert({
    where: { email: "seed@typaro.dev" },
    update: {},
    create: {
      id: "seed-author-001",
      name: "Typaro Editorial",
      email: "seed@typaro.dev",
      emailVerified: true,
    },
  });

  // --- Categories ---
  const categoryData = [
    { name: "Technology", slug: "technology" },
    { name: "Design", slug: "design" },
    { name: "React", slug: "react" },
    { name: "Backend", slug: "backend" },
    { name: "DevOps", slug: "devops" },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoryData) {
    const record = await db.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories[cat.slug] = record.id;
  }

  // --- Tags ---
  const tagData = [
    { name: "nextjs", slug: "nextjs" },
    { name: "react", slug: "react" },
    { name: "javascript", slug: "javascript" },
    { name: "typescript", slug: "typescript" },
    { name: "css", slug: "css" },
    { name: "ui", slug: "ui" },
    { name: "hooks", slug: "hooks" },
    { name: "api", slug: "api" },
    { name: "nodejs", slug: "nodejs" },
    { name: "backend", slug: "backend" },
    { name: "layout", slug: "layout" },
    { name: "design", slug: "design" },
    { name: "vercel", slug: "vercel" },
    { name: "deployment", slug: "deployment" },
    { name: "git", slug: "git" },
    { name: "devops", slug: "devops" },
  ];

  const tags: Record<string, string> = {};
  for (const tag of tagData) {
    const record = await db.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
    tags[tag.slug] = record.id;
  }

  // --- Posts ---
  const posts = [
    {
      title: "Getting Started with Next.js 15",
      slug: "getting-started-nextjs-15",
      excerpt:
        "Learn how to build modern web applications with Next.js 15 and React 19.",
      content: `## Introduction\n\nNext.js 15 brings significant improvements to performance and developer experience.\n\n## Key Features\n\n- Improved performance with the new React compiler\n- Enhanced TypeScript support\n- Faster build times with Turbopack\n\n## Conclusion\n\nNext.js 15 is an excellent choice for modern web apps.`,
      aiSummary:
        "An introduction to Next.js 15 covering performance improvements, React compiler upgrades, better TypeScript support, and faster builds with Turbopack.",
      coverImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
      categorySlug: "technology",
      tagSlugs: ["nextjs", "react", "javascript"],
      readingTime: 5,
    },
    {
      title: "The Future of Web Design",
      slug: "future-of-web-design",
      excerpt:
        "Exploring emerging trends in web design and what they mean for developers in 2024.",
      content: `## The Evolution of Web Design\n\nWeb design has come a long way since the early days of the internet.\n\n## Current Trends\n\n- Minimalist and clean interfaces\n- Dark mode support\n- Accessibility-first design`,
      aiSummary:
        "A look at modern web design trends including minimal UI, dark mode adoption, and accessibility-first approaches.",
      coverImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
      categorySlug: "design",
      tagSlugs: ["design", "ui", "css"],
      readingTime: 4,
    },
    {
      title: "Mastering React Hooks",
      slug: "mastering-react-hooks",
      excerpt:
        "Deep dive into React hooks and how to use them effectively. Learn advanced patterns.",
      content: `## What are React Hooks?\n\nReact Hooks let you use state and lifecycle features in functional components.\n\n## Common Hooks\n\n- **useState** – manage local state\n- **useEffect** – handle side effects\n- **useReducer** – complex state logic`,
      aiSummary:
        "Explains React hooks like useState, useEffect, and useReducer with practical patterns for building modern React apps.",
      coverImage:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=600&fit=crop",
      categorySlug: "react",
      tagSlugs: ["react", "hooks", "javascript"],
      readingTime: 6,
    },
    {
      title: "TypeScript Best Practices",
      slug: "typescript-best-practices",
      excerpt:
        "Master TypeScript with essential patterns for large-scale applications.",
      content: `## Why TypeScript?\n\nTypeScript adds static typing to JavaScript, catching errors at compile time.\n\n## Key Practices\n\n- Use strict mode\n- Avoid \`any\`\n- Leverage generics`,
      aiSummary:
        "Covers TypeScript best practices including strict typing, avoiding any, and using generics for scalable codebases.",
      coverImage:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop",
      categorySlug: "technology",
      tagSlugs: ["typescript", "javascript"],
      readingTime: 5,
    },
    {
      title: "Building Scalable APIs with Node.js",
      slug: "building-scalable-apis-nodejs",
      excerpt: "Design and build APIs that can handle millions of requests.",
      content: `## Scalable API Design\n\nBuilding APIs that scale requires planning upfront.\n\n## Core Principles\n\n- Stateless design\n- Proper HTTP status codes\n- Rate limiting`,
      aiSummary:
        "Discusses how to build scalable Node.js APIs with stateless design, proper status codes, and rate limiting.",
      coverImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
      categorySlug: "backend",
      tagSlugs: ["nodejs", "api", "backend"],
      readingTime: 7,
    },
    {
      title: "CSS Grid: The Complete Guide",
      slug: "css-grid-complete-guide",
      excerpt:
        "Unlock the power of CSS Grid for creating complex, responsive layouts.",
      content: `## CSS Grid Basics\n\nCSS Grid is a two-dimensional layout system.\n\n## Core Concepts\n\n- grid-template-columns\n- gap for spacing\n- auto-fit for responsive grids`,
      aiSummary:
        "A guide to CSS Grid covering layout fundamentals, responsive design techniques, and core grid properties.",
      coverImage:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=600&fit=crop",
      categorySlug: "design",
      tagSlugs: ["css", "layout", "design"],
      readingTime: 4,
    },
    {
      title: "Deploying to Vercel: The Right Way",
      slug: "deploying-to-vercel",
      excerpt:
        "Everything you need to know to deploy Next.js apps to Vercel with CI/CD.",
      content: `## Why Vercel?\n\nVercel is purpose-built for Next.js.\n\n## Steps\n\n1. Push to GitHub\n2. Import on Vercel\n3. Add env vars\n4. Deploy`,
      aiSummary:
        "Explains how to deploy Next.js apps on Vercel using GitHub integration, environment variables, and CI/CD workflow.",
      coverImage:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop",
      categorySlug: "devops",
      tagSlugs: ["vercel", "deployment", "devops"],
      readingTime: 3,
    },
    {
      title: "Understanding Git Branching Strategies",
      slug: "git-branching-strategies",
      excerpt: "Learn effective Git branching models for teams of all sizes.",
      content: `## Why Branching Strategy Matters\n\nA consistent model keeps your team from stepping on each other.\n\n## Common Strategies\n\n- GitHub Flow\n- Git Flow\n- Trunk-Based Development`,
      aiSummary:
        "Overview of Git branching strategies like GitHub Flow, Git Flow, and trunk-based development for team collaboration.",
      coverImage:
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&h=600&fit=crop",
      categorySlug: "devops",
      tagSlugs: ["git", "devops", "deployment"],
      readingTime: 5,
    },
  ];

  for (const post of posts) {
    const { categorySlug, tagSlugs, ...rest } = post;
    await db.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...rest,
        authorId: author.id,
        categoryId: categories[categorySlug],
        tags: {
          connect: tagSlugs.map((slug) => ({ slug })),
        },
      },
    });
  }

  console.log(`✅ Seeded categories, tags, and posts`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
