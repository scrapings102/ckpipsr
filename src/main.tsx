import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./typography.css";   // shared CKP type system, after index.css so it wins
import { installPictureViews } from "./utils/pictureView";

// Frames pictures on the visible area chosen for them in the admin panel.
installPictureViews();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
