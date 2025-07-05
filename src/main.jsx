import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "flowbite";
import { BrowserRouter } from "react-router-dom";
import Context from "./context/Context.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <StrictMode>
        <App />
        <ToastContainer />
      </StrictMode>
    </BrowserRouter>
  </Context>
);
