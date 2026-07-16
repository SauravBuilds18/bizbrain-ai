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
  content={({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div
          style={{
            background: "#0F172A",
            border: "1px solid #334155",
            borderRadius: "10px",
            padding: "12px",
            color: "white",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
            📦 {data.name}
          </p>

          <p style={{ color: "#22C55E" }}>
            💰 Revenue: ₹{data.sales}
          </p>

          <p style={{ marginTop: "6px" }}>
            📅 {new Date(data.date).toLocaleDateString("en-IN")}
          </p>

          <p>
            🕒 {new Date(data.date).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}
          </p>
        </div>
      );
    }

    return null;
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