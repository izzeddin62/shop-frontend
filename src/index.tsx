import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import CartContextProvider from "./contexts/CartWrapper";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
