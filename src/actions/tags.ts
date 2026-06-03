"use server";

import { prisma as db } from "@/lib/prisma";

export type Tag = Awaited<ReturnType<typeof getTags>>[number];

export async function getTags() {
  return db.tag.findMany({
    orderBy: { name: "asc" },
  });
}
