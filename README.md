# Typaro | [Live Demo](https://typaro.vercel.app)

An AI-integrated blogging platform built with Next.js, Prisma, Better Auth, and Gemini Api.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Auth**: Better Auth (credentials + Google OAuth)
- **AI**: Google Gemini (blog post summaries)
- **Animations**: GSAP, Framer Motion, Lenis

## Team

| Member              | Role                  |
| ------------------- | --------------------- |
| Farhan Aziz         | UI & Frontend         |
| Faisal Mahmud       | Auth & Infrastructure |
| Gulam Mustafa Nayem | Blog Core & AI        |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- A Neon PostgreSQL database
- Google OAuth credentials (optional)
- Gemini API key (optional, for AI summaries)

### Setup

```bash
# Clone the repo
git clone [https://github.com/gmnayem631/typaro](https://github.com/gmnayem631/typaro)
cd typaro

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Fill in your environment variables

# Run database migrations
pnpm prisma migrate deploy

# Seed the database
pnpm prisma db seed

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable               | Description                       |
| ---------------------- | --------------------------------- |
| `DATABASE_URL`         | Neon PostgreSQL connection string |
| `BETTER_AUTH_SECRET`   | Secret key for Better Auth        |
| `BETTER_AUTH_URL`      | Base URL of the app               |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID            |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret        |
| `GEMINI_API_KEY`       | Gemini API key for AI summaries   |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Auth routes (login, signup)
│   ├── blogs/            # Blog routes
│   │   ├── [id]/         # Blog detail
│   │   ├── create/       # Create post
│   │   └── manage/       # Manage posts
│   └── about/            # About page
├── components/           # Shared UI components
├── lib/                  # Auth, Prisma, utilities
├── actions/              # Server actions
└── validations/          # Zod schemas
prisma/
├── schema.prisma         # Database schema
└── seed.ts               # Seed data
```

## Pages

| Route              | Description                          | Auth      |
| ------------------ | ------------------------------------ | --------- |
| `/`                | Homepage with hero and recent posts  | Public    |
| `/blogs`           | Blog listing with search and filters | Public    |
| `/blogs/[id]`      | Blog detail with AI summary          | Public    |
| `/about`           | About page with scroll animations    | Public    |
| `/login`           | Login with email or Google           | Public    |
| `/signup`          | Signup with email or Google          | Public    |
| `/blogs/create`    | Create a new post                    | Protected |
| `/blogs/manage`    | Manage your posts                    | Protected |
| `/blogs/[id]/edit` | Edit an existing blog post           | Protected |
