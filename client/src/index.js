import React from "react";
import ReactDOM from "react-dom/client";

// Main App component
import App from "./App";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap JS bundle
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Global custom styles
import "./index.css";

// Create React root
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// Render application
root.render(

  <React.StrictMode>

    {/* Main Application */}
    <App />

  </React.StrictMode>
);