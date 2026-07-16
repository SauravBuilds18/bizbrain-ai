import { useState, useEffect } from "react";

export default function EditProductModal({
  product,
  onClose,
  updateProduct,
}) {
  const [form, setForm] = useState(product);

  useEffect(() => {
    setForm(product);
  }, [product]);

  if (!product) return null;

  const handleUpdate = () => {
  if (
    !form.name ||
    !form.category ||
    form.quantity === "" ||
    form.costPrice === ""
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const updatedProduct = {
  ...form,
  quantity: Number(form.quantity),
  costPrice: Number(form.costPrice),
  reorderLevel: Number(form.reorderLevel || 10),
  warrantyMonths: Number(form.warrantyMonths || 0),
};

if (["Medicine", "Grocery", "Personal Care"].includes(updatedProduct.category)) {
  updatedProduct.warrantyMonths = 0;
} else {
  updatedProduct.expiryDate = "";
}

updateProduct(updatedProduct);
onClose();
};

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl w-[750px] max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">

        {/* Header */}

        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-700">

          <h2 className="text-3xl font-bold">
            ✏️ Edit Product
          </h2>

          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-500 text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="p-8">

          <div className="grid md:grid-cols-2 gap-6">

            {/* Product Name */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Product Name
              </label>

              <input
                className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

            </div>

            {/* Category */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Category
              </label>

              <select
  className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
  value={form.category}
  onChange={(e) =>
  setForm({
    ...form,
    category: e.target.value,
  })
}
>
  <option>Medicine</option>
  <option>Electronics</option>
  <option>Grocery</option>
  <option>Personal Care</option>
  <option>Stationery</option>
  <option>Other</option>
</select>

            </div>

            {/* Quantity */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Quantity
              </label>

              <input
                type="number"
                className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
                value={form.quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity: e.target.value,
                  })
                }
              />

            </div>

            {/* Cost Price */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Cost Price
              </label>

              <input
                type="number"
                className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
                value={form.costPrice}
                onChange={(e) =>
                  setForm({
                    ...form,
                    costPrice: e.target.value,
                  })
                }
              />

            </div>

            {/* Supplier */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Supplier
              </label>

              <input
                className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
                value={form.supplier}
                onChange={(e) =>
                  setForm({
                    ...form,
                    supplier: e.target.value,
                  })
                }
              />

            </div>

            {/* Reorder */}

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Reorder Level
              </label>

              <input
                type="number"
                className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
                value={form.reorderLevel}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reorderLevel: e.target.value,
                  })
                }
              />

            </div>

            {/* Dynamic Expiry / Warranty */}

            {["Medicine", "Grocery", "Personal Care"].includes(form.category) ? (

              <div className="md:col-span-2">

                <label className="block text-sm text-slate-400 mb-2">
                  Expiry Date
                </label>

                <input
  type="date"
  className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
  value={form.expiryDate || ""}
  onChange={(e) =>
    setForm({
      ...form,
      expiryDate: e.target.value,
      warrantyMonths: "",
    })
  }
/>

              </div>

            ) : (

              <div className="md:col-span-2">

                <label className="block text-sm text-slate-400 mb-2">
                  Warranty (Months)
                </label>

                <input
  type="number"
  placeholder="12"
  className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
  value={form.warrantyMonths || ""}
  onChange={(e) =>
    setForm({
      ...form,
      warrantyMonths: e.target.value,
      expiryDate: "",
    })
  }
/>

              </div>

            )}

          </div>

          {/* Notes */}

          <div className="mt-6">

            <label className="block text-sm text-slate-400 mb-2">
              Notes
            </label>

            <textarea
              rows={4}
              className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
              value={form.notes || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-medium"
            >
              ✅ Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}