import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { router } from "./routes";
import "@picocss/pico/css/pico.min.css";
import { Provider } from "react-redux";
import { store } from "./store";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000 } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <main>
          <RouterProvider router={router} />
        </main>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
