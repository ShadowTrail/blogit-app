// frontend/src/hooks/useCreatePost.ts

import { Post } from "@/types/Post";
import useSWRMutation from "swr/mutation";

interface CreatePostInput {
  title: string;
  content: string;
  categoryName: string;
  imageUrl?: File;
}

const createPostFetcher = async (
  url: string,
  { arg }: { arg: CreatePostInput }
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("title", arg.title);
  formData.append("content", arg.content);
  formData.append("categoryName", arg.categoryName);

  if (arg.imageUrl) {
    formData.append("image", arg.imageUrl); // ensure 'image' matches backend's multer field
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData, // Send FormData
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create post");
  }

  return response.json();
};

export const useCreatePost = () => {
  return useSWRMutation<Post, Error, string, CreatePostInput>(
    "/posts/create_post",
    createPostFetcher
  );
};
