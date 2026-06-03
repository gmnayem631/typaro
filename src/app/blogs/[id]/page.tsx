import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/actions/posts";
import { BlogDetail } from "@/components/blog-details";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.slug }));
}

type Props = { params: Promise<{ id: string }> };

export default async function BlogDetailsPage({ params }: Props) {
  const { id: slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return <BlogDetail post={post} />;
}
