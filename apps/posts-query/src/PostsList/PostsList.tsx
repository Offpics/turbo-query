import { Link } from "@tanstack/react-router";
import { usePostsQuery } from "../hooks/usePostsQuery";
import { NewPostForm } from "./NewPostForm";

export const PostsList = () => {
  const { data: posts, isLoading } = usePostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Posts</h2>
      <ul>
        {posts?.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <NewPostForm />
    </div>
  );
};
