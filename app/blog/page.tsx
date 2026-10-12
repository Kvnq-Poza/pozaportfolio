import { getSortedPostsData } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, graph, PERSON_ID } from "@/lib/seo";

const description =
  "Articles by full-stack developer James Alaribe (Poza) on Next.js, React, Node.js, API design, performance and building a career in software development.";

export const metadata: Metadata = {
  title: "Blog: Web Development Articles & Tutorials",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog by James Alaribe (Poza)",
    description,
  },
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Blog",
            "@id": absoluteUrl("/blog#blog"),
            url: absoluteUrl("/blog"),
            name: "Blog by James Alaribe (Poza)",
            description,
            author: { "@id": PERSON_ID },
            blogPost: allPostsData
              .filter((post) => !post.noindex)
              .map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                url: absoluteUrl(`/blog/${post.slug}`),
                datePublished: post.date,
                author: { "@id": PERSON_ID },
              })),
          },
          breadcrumbSchema([{ name: "Blog", path: "/blog" }])
        )}
      />
      <BlogPageClient allPostsData={allPostsData} />
    </>
  );
}
