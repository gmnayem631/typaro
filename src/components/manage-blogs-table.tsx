"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { deletePost } from "@/actions/posts";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: { name: string };
  createdAt: Date;
};

export default function ManageBlogsTable({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    // optimistic remove
    setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleting(false);

    await deletePost(deleteTarget.id);
  };

  return (
    <div>
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
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="block w-full"
                        >
                          {post.title}
                        </Link>
                      </span>
                    </td>
                    <td className="py-4 pr-6">
                      <span className="font-mono text-xs text-muted-foreground">
                        {post.category.name}
                      </span>
                    </td>
                    <td className="py-4 pr-6">
                      <span className="font-mono text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
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
  );
}
