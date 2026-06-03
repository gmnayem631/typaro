import { ProtectedRoute } from "@/components/protectedRoute";
import ManageBlogsTable from "@/components/manage-blogs-table";
import { getPostsByAuthor } from "@/actions/posts";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ManagePage() {
  const posts = await getPostsByAuthor();

  return (
    <ProtectedRoute>
      {/* Header */}
      <div className="mb-10 flex items-end justify-between pt-16">
        <div className="space-y-2">
          <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            Your posts
          </span>
          <h1 className="font-serif text-4xl tracking-tight text-foreground italic sm:text-5xl">
            Manage.
          </h1>
        </div>
        <Link
          href="/blogs/create"
          className="flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm text-background transition-colors hover:bg-foreground/80"
        >
          <Plus size={14} />
          New post
        </Link>
      </div>

      {/* Table */}
      <ManageBlogsTable initialPosts={posts} />
    </ProtectedRoute>
  );
}
