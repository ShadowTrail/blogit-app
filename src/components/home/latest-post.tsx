import { formatDate, getBlogPosts } from "@/app/blog/utils";
import Image from "next/image";
import Link from "next/link";

export default function LatestPosts(){
    let latestPosts = getBlogPosts();
    return (
      <>
        <h1>Recently Posted</h1>
        {latestPosts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <article
              key={post.slug}
              className="text-wrap max-w-md my-10 t-right"
            >
              <div>
                <Image
                  src={post.metadata.previewImage}
                  alt="image"
                  width={500}
                  height={500}
                />
                <Link href={"#"}>
                  <h3 className="font-bold py-2 leading-5 hover:text-blue-400">
                    {post.metadata.title}
                  </h3>
                </Link>
                <p className="leading-8 my-5">{post.metadata.summary}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
            </article>
          ))}
      </>
    );
}