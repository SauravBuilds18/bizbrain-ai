import SalesChart from "./SalesChart";


export default function DashboardCharts({
  weeklySales,
  
}) {
  return (
    <div className="grid grid-cols-1 gap-6 mt-8">

      <SalesChart data={weeklySales} />

      

    </div>
  );
}