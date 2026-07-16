import { TrendingUp, ShieldCheck, AlertTriangle, Bot } from "lucide-react";

export default function ExecutiveBrief({
  revenue,
  profit,
  orders,
  lowStock,
  businessHealth,
}) {
  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 p-8 shadow-2xl">

      <div className="flex items-center gap-4 mb-6">

        <Bot size={45} />

        <div>
          <h2 className="text-3xl font-bold">
            👋 {greeting()}
          </h2>

          <p className="text-blue-100">
            Welcome back to BizBrain AI CEO
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-black/20 rounded-2xl p-5">

          <TrendingUp className="mb-2" />

          <p className="text-sm">Revenue</p>

          <h3 className="text-2xl font-bold">
            ₹{revenue.toLocaleString()}
          </h3>

        </div>

        <div className="bg-black/20 rounded-2xl p-5">

          <TrendingUp className="mb-2" />

          <p className="text-sm">Profit</p>

          <h3 className="text-2xl font-bold">
            ₹{profit.toLocaleString()}
          </h3>

        </div>

        <div className="bg-black/20 rounded-2xl p-5">

          <ShieldCheck className="mb-2 text-green-300" />

          <p className="text-sm">Business Health</p>

          <h3 className="text-2xl font-bold">
            {businessHealth}
          </h3>

        </div>

        <div className="bg-black/20 rounded-2xl p-5">

          <AlertTriangle className="mb-2 text-yellow-300" />

          <p className="text-sm">Low Stock</p>

          <h3 className="text-2xl font-bold">
            {lowStock}
          </h3>

        </div>

      </div>

      <div className="mt-8 bg-black/20 rounded-2xl p-6">

        <h3 className="text-2xl font-bold mb-4">
          🤖 Executive AI Brief
        </h3>

        <ul className="space-y-3">

          <li>📈 Revenue performance looks healthy.</li>

          <li>💰 Current profit trend is positive.</li>

          <li>📦 Review low stock products before they run out.</li>

          <li>🚀 Focus on your highest-profit products.</li>

          <li>⚡ Continue monitoring inventory and invoices daily.</li>

        </ul>

      </div>

    </div>
  );
}