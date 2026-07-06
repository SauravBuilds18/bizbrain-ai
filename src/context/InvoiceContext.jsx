import { createContext, useContext, useEffect, useState } from "react";

const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {

  // Logged-in user
  const user = JSON.parse(
    localStorage.getItem("bizbrain_user")
  );

  // Unique invoice key for each user
  const invoiceKey = user
    ? `bizbrain_invoices_${user.email}`
    : "bizbrain_invoices_guest";

  // Load invoices
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem(invoiceKey);

    return saved ? JSON.parse(saved) : [];
  });

  // Save invoices
  useEffect(() => {
    localStorage.setItem(
      invoiceKey,
      JSON.stringify(invoices)
    );
  }, [invoices, invoiceKey]);

  // Add Invoice
 const addInvoice = (invoice) => {

  setInvoices((prev) => [invoice, ...prev]);

  const user = JSON.parse(
    localStorage.getItem("bizbrain_user")
  );

  const historyKey = user
    ? `bizbrain_history_${user.email}`
    : "bizbrain_history_guest";

  const history = JSON.parse(
    localStorage.getItem(historyKey) || "[]"
  );

  history.unshift({
    id: Date.now(),
    type: "invoice",
    title: "Invoice Generated",
    description: `Invoice ${invoice.invoiceNo} created for ${invoice.customerName}`,
    amount: invoice.grandTotal,
    date: new Date().toISOString(),
    time: new Date().toLocaleTimeString(),
  });

  localStorage.setItem(
    historyKey,
    JSON.stringify(history)
  );

};

  // Delete Invoice
  const deleteInvoice = (id) => {
    setInvoices((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Clear All Invoices
  const clearInvoices = () => {
    setInvoices([]);
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        addInvoice,
        deleteInvoice,
        clearInvoices,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  return useContext(InvoiceContext);
}