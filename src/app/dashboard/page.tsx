// frontend/src/app/dashboard/page.tsx

"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useDashboardPosts } from "@/hooks/useDashboardPosts";
import { Post } from "@/types/Post";
import { formatDate } from "@/app/posts/[category]/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const { data: posts, error, mutate } = useDashboardPosts();

  if (error) return <div>Error loading posts: {error.message}</div>;
  if (!posts) return <div>Loading your posts...</div>;
  if (!Array.isArray(posts)) return <div>Unexpected data format.</div>;
  if (posts.length === 0) return <div>You have not created any posts yet.</div>;

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to delete post");
      }
      mutate();
    } catch (err: any) {
      console.error("Error deleting post:", err);
      alert(err.message || "An error occurred while deleting the post.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      <div className="space-y-4">
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className="p-4 border rounded flex flex-col md:flex-row items-start justify-between"
          >
            <div className="flex gap-5">
              <div>
                <Image
                  src={post.imageUrl || "/default-image.jpg"}
                  alt={post.title || "No-image"}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                  priority
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">
                  Created on {formatDate(post.createdAt)}
                </p>
                <p>{post.summary}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href={`/dashboard/edit/${post.id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
