import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, "At least 5 characters")
    .max(100, "Max 100 characters"),

  excerpt: z
    .string()
    .min(10, "At least 10 characters")
    .max(250, "Max 250 characters"),

  content: z.string().min(50, "At least 50 characters"),

  categoryId: z.string().min(1, "Pick a category"),

  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),

  readingTime: z.coerce.number().min(1).max(60),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
