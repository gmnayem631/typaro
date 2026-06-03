"use server";

import { prisma as db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type PostWithRelations = Awaited<ReturnType<typeof getPosts>>[number];
export type PostFilters = {
  search?: string;
  categorySlug?: string;
  tagSlugs?: string[];
};

export async function getPosts(filters: PostFilters = {}) {
  const { search, categorySlug, tagSlugs } = filters;

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
  });
}
