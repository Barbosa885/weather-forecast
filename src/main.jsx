import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Lexend:100,200,300,400,500,600,700,800,900", "sans-serif"],
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
