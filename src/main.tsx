import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store.js";
import { Toaster } from 'react-hot-toast';
import "./index.css";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={appStore}>
  <Toaster position="top-center" reverseOrder={false} />
        <App />
      </Provider>
    </React.StrictMode>
  );
}
