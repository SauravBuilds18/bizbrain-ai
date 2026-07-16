import AISummaryCard from "./AISummaryCard";
import HealthScore from "./HealthScore";

export default function DashboardBottom({
  summary,
  loading,
  onAnalyze,
  products,
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-8">

   <AISummaryCard
      summary={summary}
      loading={loading}
      onAnalyze={onAnalyze}
   />

   <HealthScore
      products={products}
   />

</div>
  );
}