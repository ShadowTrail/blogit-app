import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { formatDate } from "../utils";
import { Post } from "@/types/Post";
import Image from "next/image";
import { BreadcrumbWithCustomSeparator } from "@/components/ui/CustomBreadcrumb";

interface PageProps {
  params: { category: string; id: string };
}

// Convert to a regular async function instead of an arrow function
async function SinglePostPage({ params }: PageProps) {
  const { category: categoryName, id } = params;
  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_BASE_URL
  }/posts/${encodeURIComponent(categoryName)}/${encodeURIComponent(id)}`;

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error fetching the post:", errorText);
      notFound();
    }

    const post: Post | null = await res.json();

    if (
      !post ||
      !post.category ||
      post.category.name.toLowerCase() !== categoryName.toLowerCase()
    ) {
      notFound();
    }

    return (
      <>
        <div className="px-10 mb-8"></div>
        <Container>
          <BreadcrumbWithCustomSeparator
            category={post.category.name}
            id={post.id}
          />
          <h1 className="title font-semibold text-2xl tracking-tighter mt-4">
            {post.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-4 text-sm">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              {formatDate(post.createdAt)}
            </p>
          </div>
          {post.imageUrl && (
            <div className="relative w-full h-64 mb-6">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded"
                priority
              />
            </div>
          )}
          <div className="prose dark:prose-dark">{post.content}</div>
        </Container>
      </>
    );
  } catch (error) {
    console.error("Error in SinglePostPage:", error);
    notFound();
  }
}

export default SinglePostPage;
