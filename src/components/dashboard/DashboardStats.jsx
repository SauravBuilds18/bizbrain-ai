import StatCard from "./StatCard";

import {
  IndianRupee,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

export default function DashboardStats({
  revenue,
  revenueChange,
  revenueTrend,

  profit,
  profitChange,
  profitTrend,

  products,
  ordersChange,
  ordersTrend,

  averageOrder,
  averageOrderChange,
  averageOrderTrend,

  lowStock,

  topSellingProducts,
}) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Revenue"
        value={`₹${revenue.toLocaleString()}`}
        change={`${revenueTrend === "up" ? "▲" : "▼"} ${revenueChange}%`}
        subtitle="Compared to Previous Period"
        positive={revenueTrend === "up"}
        icon={IndianRupee}
        color="text-green-400"
      />

      <StatCard
        title="Profit"
        value={`₹${profit.toLocaleString()}`}
        change={`${profitTrend === "up" ? "▲" : "▼"} ${profitChange}%`}
        subtitle="Compared to Previous Period"
        positive={profitTrend === "up"}
        icon={TrendingUp}
        color="text-emerald-400"
      />

      <StatCard
        title="Orders"
        value={products}
        
        change={`${ordersTrend === "up" ? "▲" : "▼"} ${ordersChange}%`}
subtitle={
  <div className="mt-2">

    <p className="text-xs font-semibold text-slate-300 mb-2">
      🔥 Highest Selling Products
    </p>

    {topSellingProducts.length === 0 ? (

      <p className="text-xs text-slate-500">
        No sales yet
      </p>

    ) : (

      topSellingProducts.map((product, index) => {

        const medal =
          index === 0
            ? "🥇"
            : index === 1
            ? "🥈"
            : "🥉";

        return (

          <div
            key={product.name}
            className="flex justify-between text-xs mb-1"
          >

            <span className="text-slate-300">

              {medal} {product.name}

            </span>

            <span className="text-green-400">

              {product.quantity} sold • {product.percentage}%

            </span>

          </div>

        );

      })

    )}

  </div>
}
        positive={ordersTrend === "up"}
        icon={ShoppingCart}
        color="text-blue-400"
      />

      <StatCard
        title="Low Stock"
        value={lowStock}
        change={
          lowStock === 0
            ? "Healthy"
            : `${lowStock} Product(s)`
        }
        subtitle="Current Inventory"
        positive={lowStock === 0}
        icon={AlertTriangle}
        color="text-red-400"
      />

    </div>

  );

}