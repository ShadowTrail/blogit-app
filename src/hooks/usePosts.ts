// frontend/src/hooks/usePosts.ts
"use client";

import useSWR from "swr";
import { Post } from "@/types/Post";
import fetcher from "../../utils/fetcher";

export const usePosts = () => {
  const { data, error, mutate } = useSWR<Post[]>("/posts", fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
