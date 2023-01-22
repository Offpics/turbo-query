import { useMutation, useQuery } from "@tanstack/react-query";
import { PostEntity } from "../types/Post";

type UpdatePostData = {
  id: number;
  title: string;
  content: string;
};

const updatePost = async ({ id, title, content }: UpdatePostData) => {
  const response = await fetch(`http://localhost:3002/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong 😔");
  }
  return response.json();
};

export const useUpdatePostMutation = () =>
  useMutation({
    mutationFn: updatePost,
  });
