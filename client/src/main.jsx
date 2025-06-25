import React, { StrictMode } from "react";
import { RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import { router } from "./routes/Routes";
import FirebaseAuth from "./providers/FirebaseAuth";
import ScrollProvider from "./providers/ScrollProvider";
import ThemeProvider from "./providers/ThemeProvider";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <FirebaseAuth>
        <ScrollProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ScrollProvider>
      </FirebaseAuth>
    </ThemeProvider>
  </StrictMode>
);
