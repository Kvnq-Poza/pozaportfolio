import { getSortedPostsData } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";

export const metadata = {
  title: "Blog | James Alaribe (Poza)",
  description:
    "Thoughts, tutorials, and insights on web development and design.",
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  return <BlogPageClient allPostsData={allPostsData} />;
}
