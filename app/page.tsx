import { getSortedPostsData } from "@/lib/blog";
import HomeClient from "./home-client";

// Picks up scheduled posts on their publish date (see lib/blog.ts)
export const revalidate = 3600;

export default function HomePage() {
  const latestPosts = getSortedPostsData()
    .slice(0, 3)
    .map(({ slug, title, date, excerpt }) => ({ slug, title, date, excerpt }));
  return <HomeClient latestPosts={latestPosts} />;
}
