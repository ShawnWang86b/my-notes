"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Fuse from "fuse.js";

const POSTS_PER_PAGE = 4;

type Post = {
  _meta: { path: string };
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
};

type SearchablePostsProps = {
  posts: Post[];
};

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
      <span className="ml-3 text-secondary-foreground text-sm">
        Loading more articles...
      </span>
    </div>
  );
}

export default function SearchablePosts({ posts }: SearchablePostsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Configure Fuse.js for search
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.3 },
        { name: "tags", weight: 0.2 },
        { name: "author", weight: 0.1 },
      ],
      threshold: 0.3, // Lower = more strict matching
      includeScore: true,
    });
  }, [posts]);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, posts]);

  // Get posts for current page
  const displayedPosts = useMemo(() => {
    const endIndex = currentPage * POSTS_PER_PAGE;
    return filteredPosts.slice(0, endIndex);
  }, [filteredPosts, currentPage]);

  // Check if there are more posts to load
  const hasMorePosts = displayedPosts.length < filteredPosts.length;

  // Load more posts function
  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMorePosts) return;

    setIsLoading(true);

    // Simulate loading delay (several seconds as requested)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCurrentPage((prev) => prev + 1);
    setIsLoading(false);
  }, [isLoading, hasMorePosts]);

  // Intersection observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMorePosts && !isLoading) {
        loadMorePosts();
      }
    },
  });

  // Reset pagination when search query changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* Search Input */}
        <div className="max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-center h-10"
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-secondary-foreground max-w-4xl mx-auto">
            Discover the latest insights, tutorials, and best practices in web
            development, React, Next.js, and modern technologies.
          </p>
        </div>
      </div>

      <Separator className="my-4 bg-muted" />

      <div className="grid gap-8 md:gap-12">
        {filteredPosts.length === 0 && searchQuery.trim() && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No articles found for {searchQuery}. Try different keywords.
            </p>
          </div>
        )}

        {displayedPosts.map((post: Post) => (
          <div key={post._meta.path}>
            <article className="group">
              <Link href={`/blog/${post._meta.path}`} className="block">
                <div className="flex gap-6 p-6 rounded-lg cursor-pointer">
                  {/* Content */}
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-secondary-foreground">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>

                      <h2 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-secondary-foreground text-lg leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="border border-secondary inline-flex items-center px-2.5 py-0.5 rounded-md text-xs bg-primary text-primary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail Image */}
                  {post.image && (
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-24 md:w-40 md:h-28 rounded-lg overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </article>
            <Separator className="my-4 bg-muted" />
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && <LoadingSpinner />}

        {/* Infinite scroll trigger */}
        {hasMorePosts && !isLoading && (
          <div ref={ref} className="h-10 flex justify-center items-center">
            <div className="text-sm text-secondary-foreground">
              {displayedPosts.length} of {filteredPosts.length} articles
            </div>
          </div>
        )}

        {/* End message */}
        {!hasMorePosts && displayedPosts.length > 0 && !searchQuery.trim() && (
          <div className="text-center py-8">
            <p className="text-secondary-foreground text-sm">
              You&quot;ve reached the end! That&apos;s all{" "}
              {filteredPosts.length} articles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
