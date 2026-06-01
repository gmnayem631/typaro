import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateBlogPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <div>
      <h1>Add Blog Post</h1>
      <p>This is the page to add a new blog post.</p>
    </div>
  );
}
