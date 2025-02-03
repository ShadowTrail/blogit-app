// frontend/src/components/ui/main-nav.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";
import { usePosts } from "@/hooks/usePosts";
import { Button } from "./button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export function MainNav({ className }: { className?: string }) {
  // Use the usePosts hook to fetch posts from the database
  const { posts, isLoading, isError } = usePosts();
  // uSe authentication context
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between pt-10 z-50",
        className
      )}
    >
      <Link href={"/"}>
        <div className="flex items-center justify-between w-36 cursor-pointer">
          <Icons.logo className="h-6 w-6" />
          <p>Blogger's Stop</p>
        </div>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Articles</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {/* 
                  If posts are loading or error, you can show placeholder content.
                */}
                {isLoading && <li>Loading articles...</li>}
                {isError && <li>Error loading articles.</li>}
                {!isLoading &&
                  !isError &&
                  posts &&
                  posts
                    .filter(
                      (post) => post.category !== null && post.category.name
                    )
                    .map((post) => (
                      <ListItem
                        key={post.id}
                        title={post.title}
                        // Assuming that we can navigate to the post using its id:
                        href={`/posts/${encodeURIComponent(
                          post.category.name
                        )}/${encodeURIComponent(post.id)}`}
                      >
                        {post.summary || ""}
                      </ListItem>
                    ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center justify-between gap-2">
        {!isAuthenticated ? (
          <Link href="/login" legacyBehavior>
            <Button>Login/Register</Button>
          </Link>
        ) : (
          <>
            <ModeToggle />
            <Link href={"/create_post"}>
              <Icons.pen className="h-5 w-5" />
            </Link>
            <Avatar
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <Icons.user />
              </AvatarFallback>
            </Avatar>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
