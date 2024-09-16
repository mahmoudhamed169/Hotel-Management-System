import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoadingProvider } from "./Context/LoadingContext/LoadingContext.tsx";
import { ThemeContextProvider } from "./Context/ThemeContext/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ThemeContextProvider>
  </StrictMode>
);
