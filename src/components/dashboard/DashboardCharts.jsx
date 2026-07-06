import SalesChart from "./SalesChart";
import TopProductsChart from "./TopProductsChart";

export default function DashboardCharts({
  weeklySales,
  topProducts,
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

      <SalesChart data={weeklySales} />

      <TopProductsChart data={topProducts} />

    </div>
  );
}