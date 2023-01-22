import { useMutation, useQuery } from "@tanstack/react-query";
import { PostEntity } from "../types/Post";

type NewPost = {
  title: string;
  content: string;
  authorEmail: string;
};

const createNewPost = async ({ title, content, authorEmail }: NewPost) => {
  const response = await fetch("http://localhost:3002/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      authorEmail,
    }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong 😔");
  }
  return response.json();
};

export const useNewPostMutation = () =>
  useMutation({
    mutationFn: createNewPost,
  });
