import { createContext, useContext, useEffect, useState } from "react";
import {
  getInvoices,
  createInvoice,
  createInvoiceItems,
   deleteInvoiceById,
} from "../services/invoiceService";
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
 const [invoices, setInvoices] = useState([]);

useEffect(() => {
  loadInvoices();
}, []);

async function loadInvoices() {
  const data = await getInvoices();

  const normalized = data.map((invoice) => ({
    ...invoice,

    // Keep compatibility with your existing UI
    invoiceNo: invoice.invoice_number,
grandTotal: Number(invoice.grand_total),
subtotal: Number(invoice.subtotal),
gst: Number(invoice.gst),
totalProfit: Number(invoice.total_profit),
discountPercent: Number(invoice.discount_percent),
cgstPercent: Number(invoice.cgst_percent),
sgstPercent: Number(invoice.sgst_percent),
    customer: {
      name: invoice.customer_name,
      phone: invoice.customer_phone,
      paymentMode: invoice.payment_method,
      
    },

    date: new Date(invoice.created_at).toLocaleDateString(),

    // We'll replace this with real invoice items later
    items: (invoice.invoice_items || []).map((item) => ({
  id: item.id,
  productId: item.product_id,

  name: item.product_name,

  quantity: Number(item.quantity),
  sellingPrice: Number(item.price),
  profit: Number(item.profit),

  total: Number(item.price) * Number(item.quantity),
})),
quantity: (invoice.invoice_items || []).reduce(
  (sum, item) => sum + Number(item.quantity),
  0
),
  }));

  setInvoices(normalized);
}

  // Save invoices
  useEffect(() => {
    localStorage.setItem(
      invoiceKey,
      JSON.stringify(invoices)
    );
  }, [invoices, invoiceKey]);

  // Add Invoice
const addInvoice = async (invoice) => {

  const invoiceWithDate = {
    ...invoice,

subtotal: Number(invoice.subtotal.toFixed(2)),
discount: Number(invoice.discount.toFixed(2)),
taxableAmount: Number(invoice.taxableAmount.toFixed(2)),
cgst: Number(invoice.cgst.toFixed(2)),
sgst: Number(invoice.sgst.toFixed(2)),
gst: Number(invoice.gst.toFixed(2)),
grandTotal: Number(invoice.grandTotal.toFixed(2)),
totalProfit: Number(invoice.totalProfit.toFixed(2)),
  };
console.log("Invoice being saved:");
console.log(invoiceWithDate);
const savedInvoice = await createInvoice(invoiceWithDate);

if (!savedInvoice) return;

await createInvoiceItems(
  savedInvoice.id,
  invoice.items
);

await loadInvoices();

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
    description: `Invoice ${invoiceWithDate.invoiceNo} created for ${invoiceWithDate.customer.name}`,
    amount: Number(invoice.grandTotal.toFixed(2)),
    date: new Date().toISOString(),
    time: new Date().toLocaleTimeString(),
  });

  localStorage.setItem(
    historyKey,
    JSON.stringify(history)
  );

};

  // Delete Invoice
  const deleteInvoice = async (id) => {

  const success = await deleteInvoiceById(id);

  if (!success) return;

  await loadInvoices();

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