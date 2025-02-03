// frontend/src/components/dashboard/EditPostForm.tsx

"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { Post } from "@/types/Post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditPostFormProps {
  postId: string;
}

export default function EditPostForm({ postId }: EditPostFormProps) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  // Local state for post fields and original values
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the existing post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch post");
        const data: Post = await res.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        if (data.category) {
          setCategoryName(data.category.name);
        }
        if (data.imageUrl) {
          setCurrentImageUrl(data.imageUrl);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchPost();
  }, [postId]);

  // Create a preview URL when a new image is selected
  useEffect(() => {
    if (newImageFile) {
      const objectUrl = URL.createObjectURL(newImageFile);
      setNewImagePreview(objectUrl);

      // Cleanup the URL object when the component unmounts or when newImageFile changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setNewImagePreview(null);
    }
  }, [newImageFile]);

  // Handler for image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  // Handler for form submission to update the post
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!post) {
      setError("Post data is not loaded yet.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append only if the field has changed.
      if (title !== post.title) {
        formData.append("title", title);
      }
      if (content !== post.content) {
        formData.append("content", content);
      }
      const originalCategory = post.category ? post.category.name : "";
      if (categoryName !== originalCategory) {
        formData.append("categoryName", categoryName);
      }
      // Always include new image if selected (to override current image)
      if (newImageFile) {
        formData.append("image", newImageFile);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            // Do not set Content-Type when using FormData.
          },
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to update post");
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Loading post data...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block">Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
        </div>
        <div>
          <label className="block">Category</label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newImageFile && newImagePreview && (
            <div className="mt-2">
              <p>New image preview:</p>
              <img
                src={newImagePreview}
                alt="New image preview"
                className="max-h-48"
              />
            </div>
          )}
          {currentImageUrl && !newImageFile && (
            <div className="mt-2">
              <p>Current image:</p>
              <img
                src={currentImageUrl}
                alt="Current post image"
                className="max-h-48"
              />
            </div>
          )}
        </div>
        <Button type="submit">Update Post</Button>
      </form>
    </div>
  );
}
