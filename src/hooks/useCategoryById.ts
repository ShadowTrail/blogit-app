// frontend/src/hooks/useCategoryById.ts
"use client";

import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { Category } from "@/types/Category";

export const useCategoryById = () => {
  const { data, error, mutate } = useSWR<Category[]>("/categories/:id", fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
