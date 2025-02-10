// frontend/src/components/ui/footer.tsx

"use client";

import React from "react";
import { usePosts } from "@/hooks/usePosts";
import { Icons } from "./icons";
import Link from "next/link";
import NewsletterSubscriptionForm from "./NewsletterSubscriptionForm";

export default function Footer() {
  // Use SWR hook to fetch posts
  const { posts, isLoading, isError } = usePosts();

  // If posts are loading or an error occurred, it will use an empty array.
  const blogPosts = posts ? posts.slice(0, 4) : [];

  return (
    <footer className="bg-gray-100 py-8 dark:bg-gray-800 mt-10">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="text-md font-semibold">Blogger's Stop</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm xl:mr-28">
              Stay up-to-date with the latest news and insights from our blog.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Icons.twitter className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Icons.facebook className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Icons.instagram className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <Icons.github className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold">Blog</h3>
            <ul className="space-y-2 text-sm">
              {isLoading && <li>Loading posts...</li>}
              {isError && <li>Error loading posts</li>}
              {!isLoading && !isError && blogPosts.length === 0 && (
                <li>No posts available.</li>
              )}
              {blogPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/posts/${encodeURIComponent(post.category.name)}/${encodeURIComponent(post.id)}`}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="mailto:meowiiemeowiie@gmail.com"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-services"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Terms of Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold">Newsletter</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Subscribe to our newsletter to stay up-to-date with the latest
              news and updates.
            </p>
            <NewsletterSubscriptionForm/>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:text-gray-400 dark:border-gray-200">
          &copy; 2025 Blogger's Stop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
