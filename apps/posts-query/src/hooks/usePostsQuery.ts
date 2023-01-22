import { useQuery } from "@tanstack/react-query";
import { PostEntity } from "../types/Post";

const fetchPosts = async (): Promise<PostEntity[]> => {
  const response = await fetch("http://localhost:3002/feed");
  if (!response.ok) {
    throw new Error("Something went wrong 😔");
  }
  return response.json();
};

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};
