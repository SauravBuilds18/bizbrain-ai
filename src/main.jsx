import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { BusinessProfileProvider } from "./context/BusinessProfileContext";
import { InventoryProvider } from "./context/InventoryContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import { BusinessProvider } from "./context/BusinessContext";
import { DashboardFilterProvider } from "./context/DashboardFilterContext";
import { AuthProvider } from "./context/AuthContext";
// import { testConnection } from "./testSupabase";
// testConnection();
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
  <InventoryProvider>
    <InvoiceProvider>
      <DashboardFilterProvider>
        <BusinessProvider>
          <BusinessProfileProvider>
          <App />
          </BusinessProfileProvider>
        </BusinessProvider>
      </DashboardFilterProvider>
    </InvoiceProvider>
  </InventoryProvider>
  </AuthProvider>
</BrowserRouter>
);