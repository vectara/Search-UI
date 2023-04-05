import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { ConfigContextProvider } from "./services/configContext";

// @ts-expect-error - grecaptcha is a global variable.
grecaptcha.ready(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <Router>
        <ConfigContextProvider>
          <App />
        </ConfigContextProvider>
      </Router>
    </React.StrictMode>
  );
});
