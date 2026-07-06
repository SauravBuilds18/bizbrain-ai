import {
Package,
IndianRupee,
AlertTriangle,
FolderOpen,
} from "lucide-react";
export default function InventoryStats({ products }) {

  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, item) =>
      sum + (item.costPrice || 0) * item.quantity,
    0
  );

  const lowStock = products.filter(
    (item) =>
      item.quantity <= (item.reorderLevel || 10)
  ).length;

  const categories = [
    ...new Set(products.map((item) => item.category)),
  ].length;

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-8">

      {/* Total Products */}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500 transition">

        <div className="flex items-center gap-2 text-slate-400">

<Package size={18}/>

<span>Total Products</span>

</div>

        <h1 className="text-4xl font-bold mt-3 text-white">
          {totalProducts}
        </h1>

      </div>

      {/* Inventory Value */}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500 transition">

        <div className="flex items-center gap-2 text-slate-400">

<IndianRupee size={18}/>

<span>Inventory Value</span>

</div>

        <h1 className="text-4xl font-bold mt-3 text-green-400">
          ₹{totalValue.toLocaleString()}
        </h1>

      </div>

      {/* Low Stock */}

     <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500 transition">

        <div className="flex items-center gap-2 text-slate-400">

<AlertTriangle size={18}/>

<span>Low Stock</span>

</div>

        <h1 className="text-4xl font-bold mt-3 text-red-400">
          {lowStock}
        </h1>

      </div>

      {/* Categories */}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500 transition">

        <div className="flex items-center gap-2 text-slate-400">

<FolderOpen size={18}/>

<span>Categories</span>

</div>

        <h1 className="text-4xl font-bold mt-3 text-purple-400">
          {categories}
        </h1>

      </div>

    </div>
  );
}