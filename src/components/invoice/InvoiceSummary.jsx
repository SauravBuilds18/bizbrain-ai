import { useBusiness } from "../../context/BusinessContext";
import { downloadInvoicePDF } from "../../utils/pdfGenerator";
export default function InvoiceSummary({
  customer,
  invoiceItems,
  setInvoiceItems,
}) {

  const { createInvoice } = useBusiness();

  const subtotal = invoiceItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const totalProfit = invoiceItems.reduce(
    (sum, item) =>
      sum +
      (item.sellingPrice - item.costPrice) *
        item.quantity,
    0
  );

  const gst = 0;

  const discount = 0;

  const grandTotal = subtotal + gst - discount;

  const generateInvoice = () => {

    if (invoiceItems.length === 0) {
      alert("Please add products.");
      return;
    }

    const invoice = {

      id: Date.now(),

      invoiceNo: `INV-${Date.now()}`,

      customer,

      date: new Date().toISOString(),

      time: new Date().toLocaleTimeString(),

      items: invoiceItems,

      subtotal,

      gst,

      discount,

      grandTotal,

      totalProfit,

    };

    createInvoice(invoice);

    alert("Invoice Generated Successfully!");

    setInvoiceItems([]);

  };

  return (

    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 sticky top-5">

      <h2 className="text-2xl font-bold mb-6">
        Invoice Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Subtotal</span>

          <span>₹{subtotal}</span>

        </div>

        <div className="flex justify-between">

          <span>GST</span>

          <span>₹{gst}</span>

        </div>

        <div className="flex justify-between">

          <span>Discount</span>

          <span>₹{discount}</span>

        </div>

        <div className="flex justify-between text-green-400">

          <span>Total Profit</span>

          <span>₹{totalProfit}</span>

        </div>

        <hr className="border-slate-700"/>

        <div className="flex justify-between text-2xl font-bold">

          <span>Grand Total</span>

          <span>₹{grandTotal}</span>

        </div>

      </div>

      <button

        onClick={generateInvoice}

        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold"

      >

        Generate Invoice

      </button>

    </div>

  );

}