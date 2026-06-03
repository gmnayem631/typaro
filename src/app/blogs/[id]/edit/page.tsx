import { ProtectedRoute } from "@/components/protectedRoute";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditBlogPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  // TODO(crud): check post authorship

  return (
    <ProtectedRoute>
      <div>
        <h1>Edit Blog Post</h1>
        <p>This is the page to edit an existing blog post.</p>
      </div>
    </ProtectedRoute>
  );
}
