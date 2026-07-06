import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";

export default function InvoiceForm({
  customer,
  setCustomer,
  invoiceItems,
  setInvoiceItems,
}) {
  const { products } = useInventory();

  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [sellingPrice, setSellingPrice] = useState("");

  const [quantity, setQuantity] = useState(1);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addItem = () => {
    if (!selectedProduct) {
      alert("Select a product.");
      return;
    }

    if (!sellingPrice) {
      alert("Enter selling price.");
      return;
    }

    if (quantity <= 0) {
      alert("Invalid quantity.");
      return;
    }

    if (quantity > selectedProduct.quantity) {
      alert(
        `Only ${selectedProduct.quantity} items available in stock.`
      );
      return;
    }

    const item = {
      productId: selectedProduct.id,
      name: selectedProduct.name,
      quantity: Number(quantity),
      costPrice: selectedProduct.costPrice,
      sellingPrice: Number(sellingPrice),
      total: Number(sellingPrice) * Number(quantity),
    };

    setInvoiceItems([...invoiceItems, item]);

    setSelectedProduct(null);
    setSearch("");
    setSellingPrice("");
    setQuantity(1);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <h2 className="text-2xl font-bold mb-6">
        Create Invoice
      </h2>

      {/* Customer */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <input
          placeholder="Customer Name"
          className="bg-slate-800 rounded-xl p-3"
          value={customer.name}
          onChange={(e) =>
            setCustomer({
              ...customer,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone Number"
          className="bg-slate-800 rounded-xl p-3"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({
              ...customer,
              phone: e.target.value,
            })
          }
        />

        <select
          className="bg-slate-800 rounded-xl p-3"
          value={customer.paymentMode}
          onChange={(e) =>
            setCustomer({
              ...customer,
              paymentMode: e.target.value,
            })
          }
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Credit</option>
        </select>

      </div>

      {/* Product Search */}

      <input
        placeholder="Search Product..."
        className="bg-slate-800 rounded-xl p-3 w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedProduct(null);
        }}
      />

      {search && (

        <div className="bg-slate-800 rounded-xl mt-2 max-h-48 overflow-auto">

          {filteredProducts.map((item) => (

            <div
              key={item.id}
              onClick={() => {
                setSelectedProduct(item);
                setSearch(item.name);
              }}
              className="p-3 cursor-pointer hover:bg-slate-700 border-b border-slate-700"
            >
              <div className="font-medium">{item.name}</div>

              <div className="text-sm text-gray-400">
                Stock: {item.quantity}
              </div>

            </div>

          ))}

        </div>

      )}

      {selectedProduct && (

        <div className="bg-slate-800 rounded-xl p-5 mt-5">

          <div className="grid md:grid-cols-2 gap-4">

            <div>

              <p className="text-gray-400">
                Current Stock
              </p>

              <h3 className="text-xl font-bold">
                {selectedProduct.quantity}
              </h3>

            </div>

            <div>

              <p className="text-gray-400">
                Cost Price
              </p>

              <h3 className="text-xl font-bold">
                ₹{selectedProduct.costPrice}
              </h3>
<p className="text-green-400 mt-2">
Selling Price Entered: ₹{sellingPrice || 0}
</p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <input
              type="number"
              placeholder="Selling Price"
              className="bg-slate-900 rounded-xl p-3"
              value={sellingPrice}
              onChange={(e) =>
                setSellingPrice(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Quantity"
              className="bg-slate-900 rounded-xl p-3"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
            />

          </div>

          <button
            onClick={addItem}
            className="bg-blue-600 hover:bg-blue-700 mt-6 rounded-xl px-6 py-3"
          >
            Add Item
          </button>

        </div>

      )}

    </div>
  );
}