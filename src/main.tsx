import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import bigPie from "./Store/BigPie.ts";
import CookieConsentProvider from "./cookies/CookieConsentProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={bigPie}>
      <BrowserRouter>
        <CookieConsentProvider>
          <App />
        </CookieConsentProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
