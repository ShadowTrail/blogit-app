// frontend/src/components/home/popular-posts.tsx

"use client";

import React, { useContext } from "react";
import { usePopularPosts } from "@/hooks/usePopularPosts";
import { Icons } from "../ui/icons";
import { Post } from "@/types/Post";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

export default function PopularPosts() {
  const { popularPosts, isLoading, isError } = usePopularPosts();
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <div>Please log in to view popular posts.</div>;
  }

  if (isLoading) {
    return <div>Loading popular posts...</div>;
  }

  if (isError) {
    return <div>Error loading data: {isError.message}</div>;
  }

  // Filter out posts with null category or missing properties
  const validPosts = Array.isArray(popularPosts)
    ? popularPosts.filter(
        (post) => post.category !== null && post.category.name
      )
    : [];

  if (validPosts.length === 0) {
    return <div>No popular posts found.</div>;
  }

  return (
    <ul className="overflow-auto">
      {validPosts.map((post: Post) => (
        <li
          key={post.id}
          className="flex items-center gap-2 group cursor-pointer py-2"
        >
          <Icons.arrowRight className="h-6 w-6 group-hover:translate-x-1 transition-all" />
          <Link
            href={`/posts/${encodeURIComponent(
              post.category.name
            )}/${encodeURIComponent(post.id)}`}
          >
            <span className="text-xl text-blue-600 hover:underline">
              {post.title}
            </span>
          </Link>
          <p className="text-gray-600 text-sm">
            By {post.author?.name || "Unknown Author"} on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
