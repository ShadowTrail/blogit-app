// frontend/src/hooks/useAuth.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
};
