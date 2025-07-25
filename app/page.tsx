import SearchablePosts from "@/components/SearchablePosts";
// @ts-ignore - content-collections types will be generated after build
import { allPosts } from "content-collections";

export default function Home() {
  // Sort posts by date (newest first) - this runs on the server
  const sortedPosts = allPosts.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return <SearchablePosts posts={sortedPosts} />;
}
