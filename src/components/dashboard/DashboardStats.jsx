import StatCard from "./StatCard";

import {
  IndianRupee,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

export default function DashboardStats({
  revenue,
  profit,
  products,
  lowStock,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Revenue"
        value={`₹${revenue.toLocaleString()}`}
        change="Total Sales"
        icon={IndianRupee}
        color="text-green-400"
      />

      <StatCard
        title="Profit"
        value={`₹${profit.toLocaleString()}`}
        change="Net Profit"
        icon={TrendingUp}
        color="text-emerald-400"
      />

      <StatCard
        title="Orders"
        value={products}
        change={`${products} Invoice(s)`}
        icon={ShoppingCart}
        color="text-blue-400"
      />

      <StatCard
        title="Low Stock"
        value={lowStock}
        change={
          lowStock === 0
            ? "Inventory Healthy"
            : `${lowStock} Product(s)`
        }
        icon={AlertTriangle}
        color="text-red-400"
      />

    </div>
  );
}