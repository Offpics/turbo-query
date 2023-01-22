import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNewPostMutation } from "../../hooks/useNewPostMutation";

export const NewPostForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = useNewPostMutation();
  // @ts-ignore
  const onSubmit = (data) => {
    mutateAsync(
      {
        ...data,
        authorEmail: "alice@prisma.io",
      },
      {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
      }
    );
  };

  return (
    <div>
      <h6>Create a post</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            placeholder="Title"
            required
            {...register("title")}
          />
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
