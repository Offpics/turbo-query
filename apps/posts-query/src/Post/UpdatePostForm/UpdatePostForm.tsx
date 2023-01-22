import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useUpdatePostMutation } from "../../hooks/useUpdatePostMutation";

export const UpdatePostForm = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = useUpdatePostMutation();
  // @ts-ignore
  const onSubmit = (data) => {
    console.log(data);
    mutateAsync({
      ...data,
      id: postId,
    });
  };

  return (
    <div>
      <h6>Update a post</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          Title
          <input type="text" id="title" required {...register("title")} />
        </label>
        <label htmlFor="content">
          Content
          <textarea id="content" required {...register("content")} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};
