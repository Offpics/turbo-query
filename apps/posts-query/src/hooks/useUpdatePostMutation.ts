import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostEntity } from "../types/Post";

type UpdatePostData = {
  id: string;
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

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    // Fired before doinb mutation
    onMutate: async ({ id, title, content }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["posts", id] });

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(["posts", id]);

      let newPost: PostEntity | undefined;
      // Optimistically update to the new value
      queryClient.setQueryData<PostEntity>(["posts", id], (oldPost) => {
        newPost = {
          ...oldPost,
          title,
          content,
          id,
        } as PostEntity;
        return newPost;
      });

      // Return a context object with the snapshotted value
      return { previousPost, newPost };
    },
    // If the mutation fails, use the context we returned above
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["posts", context?.newPost?.id],
        context?.previousPost
      );
    },
    // Always refetch after error or success:
    onSettled: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ["todos", newTodo.id] });
    },
  });
};
