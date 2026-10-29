import React from "react";
import ReactDOM from "react-dom/client";

// Global styles load before components so module styles can override them.
import "@fontsource-variable/inter";
import "@fontsource-variable/outfit";
import "./index.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
