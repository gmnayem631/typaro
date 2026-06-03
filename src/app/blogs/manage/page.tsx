"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ProtectedRoute } from "@/components/protectedRoute";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: { name: string };
  createdAt: Date;
};

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "The Art of Writing Simply",
    slug: "the-art-of-writing-simply",
    category: { name: "Writing" },
    createdAt: new Date("2026-05-01"),
  },
  {
    id: "2",
    title: "Why Every Developer Should Keep a Blog",
    slug: "why-every-developer-should-blog",
    category: { name: "Technology" },
    createdAt: new Date("2026-05-10"),
  },
  {
    id: "3",
    title: "Building Typaro — What We Learned",
    slug: "building-typaro-what-we-learned",
    category: { name: "Technology" },
    createdAt: new Date("2026-05-20"),
  },
];

export default function ManagePage() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    // optimistic remove
    setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleting(false);

    // TODO: call deletePost server action here
  };

  return (
    <ProtectedRoute>
      <div className="py-16">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
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

        {/* Empty state */}
        {posts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-muted-foreground italic">
              Nothing here yet.
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              Write your first post.
            </p>
            <Link
              href="/blogs/create"
              className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm text-background transition-colors hover:bg-foreground/80"
            >
              <Plus size={14} />
              New post
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      Title
                    </th>
                    <th className="pb-3 text-left font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      Category
                    </th>
                    <th className="pb-3 text-left font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      Date
                    </th>
                    <th className="pb-3 text-right font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="group border-b border-border transition-colors hover:bg-muted/30"
                    >
                      <td className="py-4 pr-6">
                        <span className="font-serif text-base text-foreground italic">
                          {post.title}
                        </span>
                      </td>
                      <td className="py-4 pr-6">
                        <span className="font-mono text-xs text-muted-foreground">
                          {post.category.name}
                        </span>
                      </td>
                      <td className="py-4 pr-6">
                        <span className="font-mono text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/blogs/${post.slug}/edit`}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Edit post"
                          >
                            <Pencil size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(post)}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                            aria-label="Delete post"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="flex flex-col md:hidden">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between border-b border-border py-5"
                >
                  <div className="flex flex-col gap-1.5 pr-4">
                    <span className="font-serif text-base text-foreground italic">
                      {post.title}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <span>{post.category.name}</span>
                      <span>·</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Link
                      href={`/blogs/${post.slug}/edit`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(post)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </p>
          </>
        )}

        {/* Delete confirmation dialog */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setDeleteTarget(null)}
            />

            {/* Dialog */}
            <div className="relative z-10 w-full max-w-sm space-y-6 rounded-lg border border-border bg-background p-6">
              <div className="space-y-2">
                <h2 className="font-serif text-xl text-foreground italic">
                  Delete this post?
                </h2>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {deleteTarget.title}
                  </span>{" "}
                  will be permanently deleted. This cannot be undone.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="text-destructive-foreground rounded-md bg-destructive px-4 py-2 text-sm transition-colors hover:bg-destructive/80 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
