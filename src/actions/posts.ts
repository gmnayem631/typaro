"use server";

import { prisma as db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type PostWithRelations = Awaited<ReturnType<typeof getPosts>>[number];
export type PostDetail = NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;

export type PostFilters = {
  search?: string;
  categorySlug?: string;
  tagSlugs?: string[];
  limit?: number;
};

export async function getPosts(filters: PostFilters = {}) {
  const { search, categorySlug, tagSlugs, limit } = filters;

  return db.post.findMany({
    where: {
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } },
          { author: { name: { contains: search, mode: "insensitive" } } },
        ],
      }),
      ...(categorySlug && {
        category: { slug: categorySlug },
      }),
      ...(tagSlugs?.length && {
        tags: {
          some: {
            slug: {
              in: tagSlugs,
            },
          },
        },
      }),
    },
    include: {
      author: { select: { name: true, image: true } },
      category: true,
      tags: true,
    },
    orderBy: { createdAt: "desc" },
    ...(limit && { take: limit }),
  });
}

export async function getPostBySlug(slug: string) {
  return db.post.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true, image: true } },
      category: true,
      tags: true,
    },
  });
}

export async function getPostsByAuthor() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  return db.post.findMany({
    where: {
      authorId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deletePost(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const post = await db.post.findUnique({ where: { id } });
  if (!post || post.authorId !== session.user.id) throw new Error("Forbidden");

  await db.post.delete({ where: { id } });
  revalidatePath("/blogs");
  revalidatePath("/blogs/manage");
}
