"use server";

import { prisma as db } from "@/lib/prisma";

export type Category = Awaited<ReturnType<typeof getCategories>>[number];

export async function getCategories() {
  return db.category.findMany({
    orderBy: { name: "asc" },
  });
}
