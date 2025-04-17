import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// import "bootstrap/dist/css/bootstrap.css";

import App from "./App.jsx";
import FullPageSlider from "./Components/FullPageSlider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FullPageSlider />
  </StrictMode>
);
