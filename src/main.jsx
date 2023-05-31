import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SaasProvider } from "@saas-ui/react";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SaasProvider theme={theme}>
      <App />
    </SaasProvider>
  </React.StrictMode>
);
