import CreateBlogForm from "@/components/create-blog-form";
import { ProtectedRoute } from "@/components/protectedRoute";
import { getCategories } from "@/actions/categories";
import { getTags } from "@/actions/tags";

export default async function CreateBlogPage() {
  const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  return (
    <ProtectedRoute>
      <CreateBlogForm categories={categories} tags={tags} />
    </ProtectedRoute>
  );
}
