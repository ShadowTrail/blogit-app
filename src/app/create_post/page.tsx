"use client";

import CreatePost from "@/components/create_post/createPostForm"
import Container from "@/components/ui/Container";

export default function CreatePostPage() {
  return (
    <Container >
      <div className="p-10 align-middle">
        <CreatePost />
      </div>
    </Container>
  );
}
