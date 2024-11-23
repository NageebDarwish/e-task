import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import CartChangerContext from "./Context/CartChangerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./Context/UserContext";
import "react-image-gallery/styles/css/image-gallery.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <WindowContext>
          <MenuContext>
            <CartChangerContext>
              <Router>
                <App />
              </Router>
            </CartChangerContext>
          </MenuContext>
        </WindowContext>
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>
);
