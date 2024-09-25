import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoadingProvider } from "./Context/LoadingContext/LoadingContext.tsx";
import { ThemeContextProvider } from "./Context/ThemeContext/ThemeContext.tsx";
import AuthContextProvider from "./Context/AuthContext.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
