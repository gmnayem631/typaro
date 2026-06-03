import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateBlogForm from "@/components/create-blog-form";
import { ProtectedRoute } from "@/components/protectedRoute";

export default async function CreateBlogPage() {
  return (
    <ProtectedRoute>
      <CreateBlogForm />
    </ProtectedRoute>
  );
}
