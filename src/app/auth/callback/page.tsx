"use client";

import { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      // Store the token securely in local storage.
      localStorage.setItem("token", token);
      // Redirect the user to the homepage
      router.push("/");
    } else {
      // If token not found, redirect to login with an error message
      router.push("/login?error=Authentication failed");
    }
  }, [token, router]);

  return <div>Authenticating...</div>;
}