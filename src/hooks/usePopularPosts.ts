// frontend/src/hooks/usePopularPosts.ts
"use client";

import useSWR from "swr";
import { Post } from "@/types/Post";
import fetcher from "../../utils/fetcher";

export const usePopularPosts = () => {
  const { data, error, mutate } = useSWR<Post[]>("/posts/popular", fetcher);

  return {
    popularPosts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
