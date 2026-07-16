import { Trash2 } from "lucide-react";

export default function InvoiceItems({
  invoiceItems,
  setInvoiceItems,
}) {

  const removeItem = (index) => {
    setInvoiceItems(
      invoiceItems.filter((_, i) => i !== index)
    );
  };

  if (invoiceItems.length === 0) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

        <h2 className="text-2xl font-bold mb-4">
          Invoice Items
        </h2>

        <p className="text-gray-400">
          No products added yet.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 overflow-x-auto">

      <h2 className="text-2xl font-bold mb-6">
        Invoice Items
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700">

            <th className="text-left py-3">Product</th>

            <th className="text-center">
              Qty
            </th>

            <th className="text-center">
              Selling Price
            </th>

            <th className="text-center">
              Total
            </th>

            <th className="text-center">
              Profit
            </th>

            <th className="text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {invoiceItems.map((item, index) => {

            const profit =
              (item.sellingPrice - item.costPrice) *
              item.quantity;

            return (

              <tr
                key={index}
                className="border-b border-slate-800"
              >

                <td className="py-4 font-medium">

                  {item.name}

                </td>

                <td className="text-center">

                  {item.quantity}

                </td>

                <td className="text-center">

                  ₹{item.sellingPrice}

                </td>

                <td className="text-center font-semibold">

                  ₹{Number(item.total).toFixed(2)}

                </td>

                <td className="text-center text-green-400 font-semibold">

                  ₹{profit}

                </td>

                <td className="text-center">

                  <button
                    onClick={() => removeItem(index)}
                  >

                    <Trash2
                      size={18}
                      className="text-red-400 hover:text-red-600"
                    />

                  </button>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}