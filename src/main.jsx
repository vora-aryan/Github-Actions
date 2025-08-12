import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

import Routing from "./Routes/Routing.jsx";
import { BrowserRouter, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <Routing />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
