import { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import ProductForm from "../components/inventory/ProductForm";
import SearchBar from "../components/inventory/SearchBar";
import InventoryTable from "../components/inventory/InventoryTable";
import InventoryStats from "../components/inventory/InventoryStats";
import InventoryInsights from "../components/inventory/InventoryInsights";

export default function Inventory() {
    const {
  products,
  addProduct,
  deleteProduct,
} = useInventory();

 const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

  const filtered = products.filter((item) => {

  const matchesSearch =
    item.name.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    category === "All" ||
    item.category === category;

  return matchesSearch && matchesCategory;

});

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* Inventory Header */}

<div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl p-8 mb-8 shadow-xl">

  <div className="flex justify-between items-center flex-wrap gap-6">

    <div>

      <h1 className="text-4xl font-bold">

        📦 Inventory Management

      </h1>

      <p className="text-blue-100 mt-3 text-lg">

        Manage products, suppliers, stock levels and business inventory.

      </p>

    </div>

    <div className="bg-black/20 rounded-2xl px-6 py-4">

      <p className="text-blue-100">

        Total Products

      </p>

      <h2 className="text-4xl font-bold">

        {products.length}

      </h2>

    </div>

  </div>

</div>

<InventoryStats products={products} />

          <ProductForm addProduct={addProduct} />

<SearchBar
  search={search}
  setSearch={setSearch}
  category={category}
  setCategory={setCategory}
/>
          <InventoryTable
    products={filtered}
    deleteProduct={deleteProduct}
/>
<InventoryInsights products={products} />
        </div>

      </div>

    </div>
  );
}