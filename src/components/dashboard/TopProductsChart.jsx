import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function TopProductsChart({ data }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8 border border-slate-800">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Best Selling Products
        </h2>

        <span className="text-blue-400 text-sm">
          Invoice Based
        </span>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
            />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Sales"]}
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "10px",
              }}
            />

            <Bar
              dataKey="sales"
              fill="#22C55E"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}