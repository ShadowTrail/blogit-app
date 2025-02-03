// frontend/src/components/home/latest-post.tsx
"use client";

import React from "react";
import { usePosts } from "@/hooks/usePosts";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/posts/[category]/utils";

const LatestPosts: React.FC = () => {
  const { posts, isLoading, isError } = usePosts();

  if (isLoading) return <div>Loading latest posts...</div>;
  if (isError) return <div>Error loading latest posts.</div>;

  // Sort posts by createdAt in descending order
  const sortedPosts = [...(posts ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Recently Posted</h1>
      {sortedPosts.slice(0,5).map((post) => (
        <article key={post.id} className="text-wrap max-w-md my-10 text-right">
          <div className="text-left">
            <Image
              src={post.imageUrl || "/default-image.jpg"}
              alt={post.title}
              width={500}
              height={500}
              className="object-cover rounded"
            />
            <Link href={`/posts/${encodeURIComponent(post.category.name)}/${encodeURIComponent(post.id)}`}>
                <h3 className="font-bold text-lg py-2 leading-5 hover:text-blue-400">
                  {post.title}
                </h3>
            </Link>
            <p className="">{post.summary}</p>
            <p className="text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </article>
      ))}
    </>
  );
};

export default LatestPosts;
