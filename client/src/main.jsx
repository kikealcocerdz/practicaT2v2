import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axe from "axe-core";

if (process.env.NODE_ENV === "development") {
  axe.run(document, {}, (error, results) => {
    if (error) console.error(error);
    console.log("Accessibility issues:", results.violations);
  });
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App lang="es" />
  </StrictMode>
);
