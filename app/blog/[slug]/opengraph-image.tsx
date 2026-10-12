import { renderOgImage, OG_SIZE } from "@/lib/og";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData } from "@/lib/blog";

export const alt = "Blog post by James Alaribe (Poza)";
export const size = OG_SIZE;
export const contentType = "image/png";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPostSlugs().map((p) => p.params);
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }
  return renderOgImage({
    eyebrow: `cat blog/${slug}.md`,
    title: post.title,
    subtitle: post.excerpt,
    tags: post.tags,
  });
}
