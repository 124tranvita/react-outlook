import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App.tsx";
import "./index.css";

// Configuration object constructed.
const config = {
  auth: {
    clientId: "2386ab9f-8d17-44e9-a22b-3e1c8bc1fce3",
  },
};

// create PublicClientApplication instance
const publicClientApplication = new PublicClientApplication(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={publicClientApplication}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
