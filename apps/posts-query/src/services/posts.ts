// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostEntity } from "../types/Post";

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<PostEntity[], void>({
      query: () => "feed",
      providesTags: ["posts"],
    }),
    getPostById: builder.query<PostEntity, string>({
      query: (id) => `post/${id}`,
      providesTags: (result) => [{ type: "posts", id: result?.id }],
    }),
    newPost: builder.mutation<PostEntity, Partial<PostEntity>>({
      query: (body) => ({
        url: `post`,
        method: "POST",
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation<PostEntity, Partial<PostEntity>>({
      query: ({ id, ...rest }) => ({
        url: `post/${id}`,
        method: "PUT",
        body: JSON.stringify({ ...rest }),
      }),
      invalidatesTags: (result) => [{ type: "posts", id: result?.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useNewPostMutation,
  useUpdatePostMutation,
} = postsApi;
