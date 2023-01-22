import { Link, useParams } from "@tanstack/react-router";
import { usePostQuery } from "../hooks/usePostQuery";
import { useUsersQuery } from "../hooks/useUsersQuery";
import { UpdatePostForm } from "./UpdatePostForm";

export const Post = () => {
  const { id } = useParams();
  const { data: post, isLoading: isPostLoading } = usePostQuery(id);
  const { data: users, isLoading: isUserLoading } = useUsersQuery();

  if (isPostLoading || isUserLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="container">
      <article>
        <header>
          <hgroup>
            <h1>{post?.title}</h1>
            <h2>{users && post && `Author: ${users[post.authorId].name}`}</h2>
          </hgroup>
        </header>
        {post?.content}
        <footer>
          <Link to="/">
            <button>Go back</button>
          </Link>
        </footer>
      </article>
      <UpdatePostForm postId={id} />
    </div>
  );
};
