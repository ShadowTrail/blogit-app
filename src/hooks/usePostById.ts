// frontend/src/hooks/usePostById.ts
"use client";

import useSWR from "swr";
import { Post } from "@/types/Post";
import fetcher from "../../utils/fetcher";

export const usePostById = (id:number) => {
  const { data, error, mutate } = useSWR<Post>(id ? `/posts/${id}` : null, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
