// frontend/src/app/posts/[category]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import CardCategory from "@/components/ui/CardCategory";
import { formatDate } from "./utils";
import { Category } from "@/types/Category";
import { Post } from "@/types/Post";

interface PageProps {
  params: { category: string };
}

async function CategoryPage({ params }: PageProps) {
  const { category } = params;

  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_BASE_URL
  }/posts/${encodeURIComponent(category)}`;

  // Fetch posts by category from the backend API.
  try {
    const res = await fetch(apiUrl, {
      cache: "no-store", // Disable caching if you need fresh data
    });

    if (!res.ok) {
      // Log the raw response for debugging
      const errorText = await res.text();
      console.error("Error fetching posts by category:", errorText);
      if (res.status === 404) {
        notFound();
      } else {
        throw new Error(
          `Failed to fetch posts for ${category}. Status: ${res.status}`
        );
      }
    }

    const posts: Post[] = await res.json();


    // **Type Narrowing: Exclude posts with null categories and matching category name**
    const filteredPosts: Post[] = posts.filter(
      (post): post is Post & { category: Category } =>
        post.category !== null &&
        post.category.name.toLowerCase() === category.toLowerCase()
    );

    if (filteredPosts.length === 0) {
      notFound();
    }

    // Sort posts by createdAt in descending order
    const sortedPosts = [...filteredPosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
      <>
        <div className="text-left px-20">
          <h1 className="title font-semibold text-2xl tracking-wider mt-4 uppercase">
            {category}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 justify-items-center">
          {sortedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${encodeURIComponent(
                post.category.name
              )}/${encodeURIComponent(post.id)}`}
            >
              <CardCategory
                title={post.title}
                summary={post.summary}
                date={formatDate(post.createdAt)}
                imageUrl={post.imageUrl}
              />
            </Link>
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in CategoryPage:", error);
    return <div className="p-12 text-xl">No posts in the {category} category.</div>;
  }
}

export default CategoryPage;
