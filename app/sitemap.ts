import type { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();
  const latestPost = posts[0]?.date ? new Date(posts[0].date) : new Date();
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/projects"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/resume"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: latestPost, changeFrequency: "weekly", priority: 0.8 },
  ];

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updated || post.date),
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...pages, ...postEntries];
}
