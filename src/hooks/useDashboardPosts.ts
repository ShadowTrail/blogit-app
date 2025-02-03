// frontend/src/hooks/useDashboardPosts.ts

import useSWR from "swr";
import { Post } from "@/types/Post";

const fetcher = (url: string) => {
  // Get the token from localStorage (if available)
  const token = localStorage.getItem("token");

  return fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    return res.json();
  });
};

export const useDashboardPosts = () => {
  return useSWR<Post[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/posts`,
    fetcher
  );
};
