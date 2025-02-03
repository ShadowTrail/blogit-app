"use client";
import LatestPosts from "@/components/home/latest-post";
import PopularPosts from "@/components/home/popular-posts";
import TopCategories from "@/components/home/top-categories";
import Container from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  useAuth();
  return (
    <>
      <Container>
        <main className="flex w-full flex-col items-start justify-evenly mt-16 md:flex-row xl:list-disc">
          <div className="w-3/5">
            <LatestPosts />
          </div>
          <div className="h-screen w-2/5">
            <div>
              <h1 className="font-bold mb-4">TOP CATEGORIES</h1>
              <TopCategories />
            </div>
            <div className="mt-10 sticky top-0">
              <h1 className="font-bold mb-4">POPULAR POSTS</h1>
              <PopularPosts />
            </div>
          </div>
        </main>
      </Container>
    </>
  );
}
