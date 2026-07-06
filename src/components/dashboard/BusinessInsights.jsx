import {
  AlertTriangle,
  TrendingUp,
  Package,
  IndianRupee,
} from "lucide-react";

export default function BusinessInsights({
  products,
  revenue = 0,
  profit = 0,
}) {

  const lowStock = products.filter(
    (p) => p.quantity <= (p.reorderLevel || 10)
  );

  const inventoryValue = products.reduce(
    (sum, p) => sum + p.costPrice * p.quantity,
    0
  );

  const highestProduct = [...products].sort(
    (a, b) =>
      b.costPrice * b.quantity -
      a.costPrice * a.quantity
  )[0];

  return (

    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <h2 className="text-2xl font-bold mb-6">
        📊 Business Insights
      </h2>

      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <IndianRupee className="text-green-400"/>
          <span>
            Revenue :
            <strong> ₹{revenue.toLocaleString()}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <TrendingUp className="text-emerald-400"/>
          <span>
            Profit :
            <strong> ₹{profit.toLocaleString()}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Package className="text-blue-400"/>
          <span>
            Inventory Value :
            <strong> ₹{inventoryValue.toLocaleString()}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-400"/>
          <span>
            Low Stock :
            <strong> {lowStock.length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Package className="text-yellow-400"/>
          <span>
            Highest Value :
            <strong> {highestProduct?.name || "-"}</strong>
          </span>
        </div>

      </div>

    </div>

  );

}