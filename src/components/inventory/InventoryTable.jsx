import { useState } from "react";
import {
  Pencil,
  Trash2,
  Pill,
  Smartphone,
  ShoppingCart,
  BookOpen,
  Package,
  HeartPulse,
} from "lucide-react";
import { useInventory } from "../../context/InventoryContext";
import EditProductModal from "./EditProductModal";

export default function InventoryTable({
  products,
  deleteProduct,
}) {

  const { updateProduct } = useInventory();
  const getCategoryIcon = (category) => {

  switch (category) {

    case "Medicine":
      return <Pill size={20} className="text-red-400" />;

    case "Electronics":
      return <Smartphone size={20} className="text-blue-400" />;

    case "Grocery":
      return <ShoppingCart size={20} className="text-green-400" />;

    case "Personal Care":
      return <HeartPulse size={20} className="text-pink-400" />;

    case "Stationery":
      return <BookOpen size={20} className="text-yellow-400" />;

    default:
      return <Package size={20} className="text-slate-400" />;

  }

};

  const [selectedProduct, setSelectedProduct] =
    useState(null);
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mt-8 shadow-lg">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Product Inventory
        </h2>

        <span className="text-slate-400">
          {products.length} Products
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full table-auto">

          <thead>

            <tr className="border-b border-slate-700 text-slate-300">

              <th className="px-6 py-4 text-left min-w-[220px]">
                Product
              </th>

              <th className="px-6 py-4 text-center min-w-[140px]">
                Category
              </th>

              <th className="px-6 py-4 text-center w-24">
                Qty
              </th>

              <th className="px-6 py-4 text-center min-w-[130px]">
                Cost Price
              </th>

              <th className="px-6 py-4 text-center min-w-[180px]">
                Supplier
              </th>

              <th className="px-6 py-4 text-center min-w-[120px]">
                Reorder
              </th>

              <th className="px-6 py-4 text-center min-w-[180px]">
                Expiry / Warranty
              </th>

              <th className="px-6 py-4 text-center min-w-[130px]">
                Status
              </th>

              <th className="px-6 py-4 text-center min-w-[120px]">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((item) => {

              const lowStock =
                item.quantity <= (item.reorderLevel || 10);

              return (

                <tr
                  key={item.id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >

                  {/* Product */}

                 <td className="px-6 py-5">

  <div className="flex items-center gap-4">

    <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center">

      {getCategoryIcon(item.category)}

    </div>

    <div>

      <h3 className="font-semibold text-white">

        {item.name}

      </h3>

      <p className="text-xs text-slate-400">

        Product ID: {item.id}

      </p>

    </div>

  </div>

</td>

                  {/* Category */}

                  <td className="px-6 py-5 text-center">

                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">

                      {item.category}

                    </span>

                  </td>

                  {/* Quantity */}

                  <td className="px-6 py-5 text-center font-semibold">

                    {item.quantity}

                  </td>

                  {/* Cost Price */}

                  <td className="px-6 py-5 text-center">

                    ₹{item.costPrice}

                  </td>

                  {/* Supplier */}

                  <td className="px-6 py-5 text-center">

                    {item.supplier || "-"}

                  </td>

                  {/* Reorder */}

                  <td className="px-6 py-5 text-center">

                    {item.reorderLevel}

                  </td>

                  {/* Expiry / Warranty */}

                  <td className="px-6 py-5 text-center">

                    {item.category === "Medicine"

                      ? (
                        item.expiryDate
                          ? `📅 ${item.expiryDate}`
                          : "-"
                      )

                      : (
                        `🛡 ${item.warrantyMonths || 0} Months`
                      )}

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5 text-center">

  {lowStock ? (

    <span className="inline-flex items-center gap-2 bg-red-500/15 text-red-400 px-4 py-2 rounded-full font-medium">

      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>

      Low Stock

    </span>

  ) : (

    <span className="inline-flex items-center gap-2 bg-green-500/15 text-green-400 px-4 py-2 rounded-full font-medium">

      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>

      In Stock

    </span>

  )}

</td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

  <button
    onClick={() => setSelectedProduct(item)}
    className="w-10 h-10 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 flex items-center justify-center transition"
    title="Edit Product"
  >

    <Pencil
      className="text-blue-400"
      size={18}
    />

  </button>

  <button
    onClick={() => deleteProduct(item.id)}
    className="w-10 h-10 rounded-xl bg-red-500/15 hover:bg-red-500/25 flex items-center justify-center transition"
    title="Delete Product"
  >

    <Trash2
      className="text-red-400"
      size={18}
    />

  </button>

</div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>
<EditProductModal
  product={selectedProduct}
  onClose={() =>
    setSelectedProduct(null)
  }
  updateProduct={updateProduct}
/>
    </div>
  );
}