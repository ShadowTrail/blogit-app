// frontend/src/app/dashboard/edit/[id]/page.tsx

"use client";

import React from "react";
import EditPostForm from "@/components/dashboard/editPostForm";

interface PageProps {
  params: { id: string };
}

export default function EditPostPage({ params }: PageProps) {
  return <EditPostForm postId={params.id} />;
}

