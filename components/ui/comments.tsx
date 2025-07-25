"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-8 pt-8 border-t border-secondary">
      <Giscus
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID as string}
        category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY as string}
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID as string}
        mapping="pathname"
        theme="light"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
