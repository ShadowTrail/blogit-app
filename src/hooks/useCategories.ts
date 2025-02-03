// frontend/src/hooks/useCategories.ts

"use client";

import useSWR from "swr";
import { Category } from "@/types/Category";
import fetcher from "../../utils/fetcher";

// Hook to fetch categories
export const useCategories = () => {
  const { data, error, mutate } = useSWR<Category[]>("/categories", fetcher);

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};


