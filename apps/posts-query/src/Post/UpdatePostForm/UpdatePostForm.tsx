import { useForm } from "react-hook-form";
import { useUpdatePostMutation } from "../../services/posts";

export const UpdatePostForm = ({ postId }: { postId: string }) => {
  const { register, handleSubmit } = useForm();
  const [updatePost] = useUpdatePostMutation();
  // @ts-ignore
  const onSubmit = (data) => {
    console.log(data);
    updatePost({
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
