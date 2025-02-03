// frontend/src/app/login/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect user to the backend's Google OAuth endpoint.
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  }, [router]);

  return <div>Redirecting to login...</div>;
}
