import { renderOgImage, OG_SIZE } from "@/lib/og";
import { getAllPostSlugs, getPostData } from "@/lib/blog";

export const alt = "Blog post by James Alaribe (Poza)";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPostSlugs().map((p) => p.params);
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);
  return renderOgImage({
    eyebrow: `cat blog/${slug}.md`,
    title: post.title,
    subtitle: post.excerpt,
    tags: post.tags,
  });
}
