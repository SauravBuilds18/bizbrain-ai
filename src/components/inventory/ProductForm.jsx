import { useState, useEffect } from "react";

export default function ProductForm({
  addProduct,
  updateProduct,
  editingProduct,
  isEditing,
  setIsEditing,
  setEditingProduct,
})  {
  const [product, setProduct] = useState({
    name: "",
    category: "Medicine",
    quantity: "",
    costPrice: "",
    supplier: "",
    reorderLevel: "",
    expiryDate: "",
    warrantyMonths: "",
    notes: "",
  });
useEffect(() => {
  if (editingProduct) {
    setProduct({
      ...editingProduct,
      quantity: editingProduct.quantity || "",
      costPrice: editingProduct.costPrice || "",
      supplier: editingProduct.supplier || "",
      reorderLevel: editingProduct.reorderLevel || "",
      expiryDate: editingProduct.expiryDate || "",
      warrantyMonths: editingProduct.warrantyMonths || "",
      notes: editingProduct.notes || "",
    });
  }
}, [editingProduct]);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !product.name ||
    !product.category ||
    !product.quantity ||
    !product.costPrice
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const finalProduct = {
    ...product,
    quantity: Number(product.quantity),
    costPrice: Number(product.costPrice),
    reorderLevel: Number(product.reorderLevel || 10),
    warrantyMonths: Number(product.warrantyMonths || 0),
  };

  if (isEditing) {
    updateProduct(finalProduct);

    setIsEditing(false);
    setEditingProduct(null);

    alert("✅ Product Updated Successfully");
  } else {
    addProduct({
      ...finalProduct,
      id: Date.now(),
    });

    alert("✅ Product Added Successfully");
  }

  setProduct({
    name: "",
    category: "Medicine",
    quantity: "",
    costPrice: "",
    supplier: "",
    reorderLevel: "",
    expiryDate: "",
    warrantyMonths: "",
    notes: "",
  });
};

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
  {isEditing ? "✏️ Edit Product" : "➕ Add New Product"}
</h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-5"
      >

        {/* Product Name */}

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Enter product name"
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
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
            value={product.category}
            onChange={(e) =>
              setProduct({
                ...product,
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
            placeholder="0"
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
            value={product.quantity}
            onChange={(e) =>
              setProduct({
                ...product,
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
            placeholder="₹0"
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
            value={product.costPrice}
            onChange={(e) =>
              setProduct({
                ...product,
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
            type="text"
            placeholder="Supplier Name"
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
            value={product.supplier}
            onChange={(e) =>
              setProduct({
                ...product,
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
            placeholder="10"
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
            value={product.reorderLevel}
            onChange={(e) =>
              setProduct({
                ...product,
                reorderLevel: e.target.value,
              })
            }
          />
        </div>

        <div className="md:col-span-3 grid grid-cols-[1fr_auto_1fr] gap-4 items-end">

  {/* Expiry Date */}

  {/* Expiry / Warranty */}

<div className="md:col-span-3">

  {["Medicine", "Grocery", "Personal Care"].includes(product.category) ? (

    <div>

      <label className="block text-sm text-slate-400 mb-2">
        Expiry Date
      </label>

      <input
        type="date"
        className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
        value={product.expiryDate}
        onChange={(e) =>
          setProduct({
            ...product,
            expiryDate: e.target.value,
            warrantyMonths: "",
          })
        }
      />

    </div>

  ) : (

    <div>

      <label className="block text-sm text-slate-400 mb-2">
        Warranty (Months)
      </label>

      <input
        type="number"
        placeholder="12"
        className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
        value={product.warrantyMonths}
        onChange={(e) =>
          setProduct({
            ...product,
            warrantyMonths: e.target.value,
            expiryDate: "",
          })
        }
      />

    </div>

  )}

</div>
</div>

        {/* Notes */}

        <div className="md:col-span-3">
          <label className="block text-sm text-slate-400 mb-2">
            Notes
          </label>

          <textarea
            rows={3}
            placeholder="Additional notes..."
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700 focus:border-blue-500 outline-none"
            value={product.notes}
            onChange={(e) =>
              setProduct({
                ...product,
                notes: e.target.value,
              })
            }
          />
        </div>

        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
        >
          {isEditing ? "💾 Save Changes" : "+ Add Product"}
        </button>

      </form>

    </div>
  );
}