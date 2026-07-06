import { createContext, useContext } from "react";
import { useInventory } from "./InventoryContext";
import { useInvoices } from "./InvoiceContext";

const BusinessContext = createContext();

export function BusinessProvider({ children }) {
  const inventory = useInventory();
  const invoices = useInvoices();

  // Create Complete Invoice
  const createInvoice = (invoice) => {

  // Save invoice
  invoices.addInvoice(invoice);

  // Deduct inventory
  invoice.items.forEach((item) => {

    inventory.sellProduct(
      item.productId,
      item.quantity
    );

  });

  // Save business timeline
  const history = JSON.parse(
    localStorage.getItem("bizbrain_history") || "[]"
  );

  history.unshift({

    id: Date.now(),

    type: "SALE",

    title: `Invoice ${invoice.invoiceNo}`,

    description: `${invoice.customer.name} purchased ${invoice.items.length} item(s)`,

    amount: invoice.grandTotal,

    date: invoice.date,

    time: invoice.time,

  });

  localStorage.setItem(
    "bizbrain_history",
    JSON.stringify(history)
  );

};

  return (
    <BusinessContext.Provider
      value={{
        createInvoice,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  return useContext(BusinessContext);
}