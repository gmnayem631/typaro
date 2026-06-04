"use server";

import { prisma as db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  createPostSchema,
  editPostSchema,
  type CreatePostInput,
  type EditPostInput,
} from "@/validations/post";

export type PostWithRelations = Awaited<ReturnType<typeof getPosts>>[number];
export type PostDetail = NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;

export type PostFilters = {
  search?: string;
  categorySlug?: string;
  tagSlugs?: string[];
  limit?: number;
};

export type PostForEdit = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  readingTime: number;
  categoryId: string;
  tags: { id: string }[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

export async function createPost(input: CreatePostInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const data = createPostSchema.parse(input);

  const baseSlug = slugify(data.title);
  const existing = await db.post.findMany({
    where: { slug: { startsWith: baseSlug } },
    select: { slug: true },
  });
  const slug = existing.length > 0 ? `${baseSlug}-${Date.now()}` : baseSlug;

  const post = await db.post.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || null,
      readingTime: data.readingTime,
      categoryId: data.categoryId,
      authorId: session.user.id,
      published: true,
      ...(data.tagIds.length > 0
        ? { tags: { connect: data.tagIds.map((id) => ({ id })) } }
        : {}),
    },
  });

  revalidatePath("/blogs");
  revalidatePath("/blogs/manage");
  return post;
}

export async function getPostForEdit(slug: string): Promise<PostForEdit> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const post = await db.post.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      readingTime: true,
      categoryId: true,
      authorId: true,
      tags: { select: { id: true } },
    },
  });

  if (!post) throw new Error("Post not found");
  if (post.authorId !== session.user.id) throw new Error("Forbidden");

  const { authorId: _, ...postForEdit } = post;
  return postForEdit;
}

export async function editPost(id: string, input: EditPostInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const data = editPostSchema.parse(input);

  const current = await db.post.findUnique({
    where: { id },
    select: { authorId: true, slug: true },
  });
  if (!current) throw new Error("Post not found");
  if (current.authorId !== session.user.id) throw new Error("Forbidden");

  const baseSlug = slugify(data.title);
  let slug = current.slug;

  if (baseSlug !== current.slug) {
    const conflict = await db.post.findFirst({
      where: { slug: baseSlug, id: { not: id } },
      select: { id: true },
    });
    slug = conflict ? `${baseSlug}-${Date.now()}` : baseSlug;
  }

  const post = await db.post.update({
    where: { id },
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || null,
      readingTime: data.readingTime,
      categoryId: data.categoryId,
      tags: { set: data.tagIds.map((tagId) => ({ id: tagId })) },
    },
  });

  revalidatePath("/blogs");
  revalidatePath("/blogs/manage");
  revalidatePath(`/blogs/${slug}`);
  return post;
}
