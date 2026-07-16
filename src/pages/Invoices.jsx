import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import InvoiceForm from "../components/invoice/InvoiceForm";
import InvoiceItems from "../components/invoice/InvoiceItems";
import InvoiceSummary from "../components/invoice/InvoiceSummary";

import { useInvoices } from "../context/InvoiceContext";
import { useInventory } from "../context/InventoryContext";
import InvoiceViewModal from "../components/invoice/InvoiceViewModal";
import { useBusinessProfile } from "../context/BusinessProfileContext";
import {
  Trash2,
  Eye,
  FileDown,
} from "lucide-react";

import { downloadInvoicePDF } from "../utils/pdfGenerator";

export default function Invoices() {

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    paymentMode: "Cash",
  });

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const { invoices, deleteInvoice } = useInvoices();
const { businessProfile } = useBusinessProfile();
  const { restockProduct } = useInventory();

  const handleDeleteInvoice = (invoice) => {

    const confirmDelete = window.confirm(
      `Delete ${invoice.invoiceNo}?`
    );

    if (!confirmDelete) return;

    // Restore inventory

    invoice.items.forEach((item) => {

      restockProduct(
        item.productId,
        item.quantity
      );

    });

    // Delete invoice

    deleteInvoice(invoice.id);

    // Remove Timeline

    const history = JSON.parse(
      localStorage.getItem("bizbrain_history") || "[]"
    );

    const updatedHistory = history.filter(
      (event) =>
        event.title !== `Invoice ${invoice.invoiceNo}`
    );

    localStorage.setItem(
      "bizbrain_history",
      JSON.stringify(updatedHistory)
    );

    alert("Invoice deleted successfully.");

  };

  return (

    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="max-w-7xl mx-auto p-8">

          <h1 className="text-4xl font-bold">
            Smart Invoice
          </h1>

          <p className="text-gray-400 mt-2 mb-8">
            Generate invoices and automatically update inventory.
          </p>

          {/* Invoice Form */}

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">

              <InvoiceForm
                customer={customer}
                setCustomer={setCustomer}
                invoiceItems={invoiceItems}
                setInvoiceItems={setInvoiceItems}
              />

            </div>

            <div>

              <InvoiceSummary
                customer={customer}
                invoiceItems={invoiceItems}
                setInvoiceItems={setInvoiceItems}
              />

            </div>

          </div>

          {/* Current Invoice */}

          <div className="mt-8">

            <InvoiceItems
              invoiceItems={invoiceItems}
              setInvoiceItems={setInvoiceItems}
            />

          </div>

          {/* Invoice History */}

          <div className="mt-10 bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-2xl font-bold mb-6">

              Invoice History

            </h2>

            {invoices.length === 0 ? (

              <div className="text-center py-10 text-gray-400">

                No invoices generated yet.

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead>

                    <tr className="border-b border-slate-700">

                      <th className="text-left px-4 py-3">
                        Invoice
                      </th>

                      <th className="text-left px-4 py-3">
                        Customer
                      </th>

                      <th className="text-left px-4 py-3">
                        Date
                      </th>

                      <th className="text-left px-4 py-3">
                        Payment
                      </th>

                      <th className="text-left px-4 py-3">
                        Items
                      </th>

                      <th className="text-left px-4 py-3">
                        Amount
                      </th>

                      <th className="text-center px-4 py-3">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {invoices.map((invoice) => (

                      <tr
                        key={invoice.id}
                        className="border-b border-slate-800 hover:bg-slate-800 transition"
                      >

                        <td className="px-4 py-4 font-semibold text-blue-400">

                          {invoice.invoiceNo}

                        </td>

                        <td className="px-4 py-4">

                          {invoice.customer.name}

                        </td>

                        <td className="px-4 py-4">

                          {invoice.date}

                        </td>

                        <td className="px-4 py-4">

                          {invoice.customer.paymentMode}

                        </td>

                        <td className="px-4 py-4">

                          {invoice.items.length}

                        </td>

                        <td className="px-4 py-4 font-bold text-green-400">

                          ₹{invoice.grandTotal}

                        </td>

                        <td className="px-4 py-4">

                          <div className="flex justify-center gap-3">

                            {/* View */}

                            <button
                              onClick={() =>
  setSelectedInvoice(invoice)
}
                              className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                            >

                              <Eye size={18} />

                            </button>

                            {/* Download PDF */}

                            <button
                              onClick={() =>
  downloadInvoicePDF(
    invoice,
    businessProfile
  )
}
                              className="bg-green-600 hover:bg-green-700 p-2 rounded-lg"
                            >

                              <FileDown size={18} />

                            </button>

                            {/* Delete */}

                            <button
                              onClick={() =>
                                handleDeleteInvoice(invoice)
                              }
                              className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                            >

                              <Trash2 size={18} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>
                <InvoiceViewModal
  invoice={selectedInvoice}
  onClose={() => setSelectedInvoice(null)}
/>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}