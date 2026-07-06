export default function InvoiceViewModal({
  invoice,
  onClose,
}) {

  if (!invoice) return null;

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl w-[700px] max-h-[85vh] overflow-y-auto p-8 border border-slate-700">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Invoice Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-400 text-xl"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">

          <div>

            <p className="text-gray-400">
              Invoice Number
            </p>

            <h3 className="font-bold">
              {invoice.invoiceNo}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Date
            </p>

            <h3>
              {invoice.date}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Customer
            </p>

            <h3>
              {invoice.customer.name}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Payment
            </p>

            <h3>
              {invoice.customer.paymentMode}
            </h3>

          </div>

        </div>

        <table className="w-full mb-8">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-3">
                Product
              </th>

              <th>
                Qty
              </th>

              <th>
                Selling
              </th>

              <th>
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {invoice.items.map((item, index) => (

              <tr
                key={index}
                className="border-b border-slate-800"
              >

                <td className="py-3">
                  {item.name}
                </td>

                <td className="text-center">
                  {item.quantity}
                </td>

                <td className="text-center">
                  ₹{item.sellingPrice}
                </td>

                <td className="text-center">
                  ₹{item.total}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="space-y-3">

          <div className="flex justify-between">

            <span>Subtotal</span>

            <span>
              ₹{invoice.subtotal}
            </span>

          </div>

          <div className="flex justify-between">

            <span>Profit</span>

            <span className="text-green-400">
              ₹{invoice.totalProfit}
            </span>

          </div>

          <div className="flex justify-between text-2xl font-bold mt-4">

            <span>Grand Total</span>

            <span className="text-blue-400">
              ₹{invoice.grandTotal}
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}