// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostEntity } from "../types/Post";

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostEntity[], void>({
      query: () => "feed",
    }),
    getPostById: builder.query<PostEntity, string>({
      query: (id) => `post/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
