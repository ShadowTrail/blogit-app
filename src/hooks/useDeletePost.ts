import useSWRMutation from "swr/mutation";

const deletePostFetcher = async (url: string, { arg }: { arg: number }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${encodeURIComponent(arg)}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete post");
  }
  return arg;
};

export const useDeletePost = () => {
  return useSWRMutation<number, Error, string>(`/posts`, deletePostFetcher);
};
