// frontend/src/components/home/top-categories.tsx
"use client";

import React from "react";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "../ui/button";
import Link from "next/link";

const TopCategories: React.FC = () => {
  const { categories, isLoading, isError } = useCategories();

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories.</div>;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
      {categories && categories.length > 0 ? (
        categories?.slice(0, 6).map((category) => (
          <Button
            key={category.id}
            variant={"secondary"}
            className="hover:scale-110 transition-all"
          >
            <Link href={`posts/${encodeURIComponent(category.name)}`}>
              {category.name}
            </Link>
          </Button>
        ))
      ) : (
        <div>No categories available.</div>
      )}
    </div>
  );
};

export default TopCategories;
