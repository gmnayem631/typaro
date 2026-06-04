import { notFound, redirect } from "next/navigation";
import { getPostForEdit } from "@/actions/posts";
import { getCategories } from "@/actions/categories";
import { getTags } from "@/actions/tags";
import { ProtectedRoute } from "@/components/protectedRoute";
import EditBlogForm from "@/components/edit-blog-form";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;

  let post;
  try {
    post = await getPostForEdit(slug);
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "Post not found") notFound();
    if (message === "Forbidden") redirect("/blogs/manage");
    throw err;
  }

  const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  return (
    <ProtectedRoute>
      <EditBlogForm post={post} categories={categories} tags={tags} />
    </ProtectedRoute>
  );
}
