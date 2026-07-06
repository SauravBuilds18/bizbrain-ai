import { useState } from "react";
import { useBusiness } from "../../context/BusinessContext";
import { downloadInvoicePDF } from "../../utils/pdfGenerator";

export default function InvoiceSummary({
  customer,
  invoiceItems,
  setInvoiceItems,
}) {
  const { createInvoice } = useBusiness();

  const [discountPercent, setDiscountPercent] = useState(0);
  const [cgstPercent, setCgstPercent] = useState(9);
  const [sgstPercent, setSgstPercent] = useState(9);

  // ==========================
  // Calculations
  // ==========================

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

  const discount =
    subtotal * (discountPercent / 100);

  const taxableAmount =
    subtotal - discount;

  const cgst =
    taxableAmount * (cgstPercent / 100);

  const sgst =
    taxableAmount * (sgstPercent / 100);

  const gst = cgst + sgst;

  const grandTotal =
    taxableAmount + gst;

  // ==========================
  // Generate Invoice
  // ==========================

  const generateInvoice = () => {
    if (invoiceItems.length === 0) {
      alert("Please add products.");
      return;
    }

    const invoice = {
      id: Date.now(),
      invoiceNo: `INV-${Date.now()}`,
      customer,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      items: invoiceItems,

      subtotal,

      discountPercent,
      discount,

      taxableAmount,

      cgstPercent,
      cgst,

      sgstPercent,
      sgst,

      gst,

      grandTotal,

      totalProfit,
    };

    createInvoice(invoice);

    downloadInvoicePDF(invoice);

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
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>- ₹{discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Taxable Amount</span>
          <span>₹{taxableAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>CGST ({cgstPercent}%)</span>
          <span>₹{cgst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>SGST ({sgstPercent}%)</span>
          <span>₹{sgst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Total GST</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-green-400">
          <span>Total Profit</span>
          <span>₹{totalProfit.toFixed(2)}</span>
        </div>

        {/* Discount */}

        <div className="mt-5">

          <label className="text-gray-400">
            Discount (%)
          </label>

          <input
            type="number"
            min="0"
            max="100"
            value={discountPercent}
            onChange={(e) =>
              setDiscountPercent(
                Math.min(
                  100,
                  Math.max(
                    0,
                    Number(e.target.value)
                  )
                )
              )
            }
            className="w-full bg-slate-800 rounded-lg p-2 mt-2"
          />

        </div>

        {/* GST */}

        <div className="grid grid-cols-2 gap-4 mt-5">

          <div>

            <label className="text-gray-400">
              CGST %
            </label>

            <input
              type="number"
              min="0"
              value={cgstPercent}
              onChange={(e) =>
                setCgstPercent(
                  Math.max(
                    0,
                    Number(e.target.value)
                  )
                )
              }
              className="w-full bg-slate-800 rounded-lg p-2 mt-2"
            />

          </div>

          <div>

            <label className="text-gray-400">
              SGST %
            </label>

            <input
              type="number"
              min="0"
              value={sgstPercent}
              onChange={(e) =>
                setSgstPercent(
                  Math.max(
                    0,
                    Number(e.target.value)
                  )
                )
              }
              className="w-full bg-slate-800 rounded-lg p-2 mt-2"
            />

          </div>

        </div>

        <hr className="border-slate-700 my-5"/>

        <div className="flex justify-between text-2xl font-bold">

          <span>Grand Total</span>

          <span>
            ₹{grandTotal.toFixed(2)}
          </span>

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