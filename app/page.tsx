import Link from "next/link";
import { Button } from "@/components/ui/button";

// @ts-ignore - content-collections types will be generated after build
import { allPosts } from "content-collections";

export default function Home() {
  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Tech Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the latest insights, tutorials, and best practices in web
          development, React, Next.js, and modern frontend technologies.
        </p>
      </div>

      <div className="grid gap-8 md:gap-12">
        {sortedPosts.map((post: any) => (
          <article key={post._meta.path} className="group">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post._meta.path}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post._meta.path}`}>
                  <Button variant="outline" className="text-sm">
                    Read more →
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
