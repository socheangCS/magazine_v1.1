import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CSprovider } from "./contexts/CScontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CSprovider>
      <App />
    </CSprovider>
  </React.StrictMode>
);
