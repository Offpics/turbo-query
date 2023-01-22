import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Link,
  createRouteConfig,
  ReactRouter,
} from "@tanstack/react-router";
import { PostsList } from "../PostsList/PostsList";
import { Post } from "../Post";

const rootRoute = createRouteConfig({});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: PostsList,
});

const postRoute = rootRoute.createRoute({
  path: "$id",
  component: Post,
});

const routeConfig = rootRoute.addChildren([indexRoute, postRoute]);

export const router = new ReactRouter({ routeConfig });
