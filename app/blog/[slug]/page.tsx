import { notFound } from "next/navigation";
import Link from "next/link";
import Comments from "../../../components/ui/comments";
import { CodeBlock } from "../../../components/ui/code-block";

// @ts-ignore - content-collections types will be generated after build
import { allPosts } from "content-collections";
// @ts-ignore - content-collections types will be generated after build
import { MDXContent } from "@content-collections/mdx/react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.map((post: any) => ({
    slug: post._meta.path,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post: any) => post._meta.path === slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post: any) => post._meta.path === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-none">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          ← Back to home
        </Link>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-secondary-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-4xl font-bold text-card-foreground leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-secondary-foreground leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="border border-secondary inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="prose prose-lg prose-slate max-w-none prose-headings:text-primary prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-700 prose-p:leading-7 prose-strong:text-slate-900 prose-code:text-sm prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-50">
        <MDXContent
          code={post.mdx}
          components={{
            pre: CodeBlock,
          }}
        />
      </div>

      {/* Replace these with your actual GitHub repository details */}
      <Comments />
    </article>
  );
}
