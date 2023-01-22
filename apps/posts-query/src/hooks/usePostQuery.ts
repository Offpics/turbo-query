import { useQuery } from "@tanstack/react-query";
import { PostEntity } from "../types/Post";

const fetchPost = async (postId: string): Promise<PostEntity> => {
  const response = await fetch("http://localhost:3002/post/" + postId);
  if (!response.ok) {
    throw new Error("Something went wrong 😔");
  }
  return response.json();
};

export const usePostQuery = (postId: string) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: ({ queryKey }) => fetchPost(queryKey[1]),
  });
};
