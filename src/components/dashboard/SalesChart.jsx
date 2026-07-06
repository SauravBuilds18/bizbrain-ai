import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SalesChart({ data }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8 border border-slate-800">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Revenue Analytics
        </h2>

        <span className="text-green-400 text-sm">
          Live Invoice Data
        </span>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

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
              formatter={(value) => [`₹${value}`, "Revenue"]}
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "10px",
              }}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3B82F6"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}