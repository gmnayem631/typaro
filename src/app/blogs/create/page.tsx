import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateBlogForm from "@/components/create-blog-form";

export default async function CreateBlogPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return <CreateBlogForm />;
}
