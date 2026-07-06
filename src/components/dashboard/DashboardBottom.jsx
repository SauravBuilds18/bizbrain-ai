import AISummaryCard from "./AISummaryCard";
import Copilot from "./Copilot";

export default function DashboardBottom({
  summary,
  loading,
  onAnalyze,
  products,
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

      <AISummaryCard
        summary={summary}
        loading={loading}
        onAnalyze={onAnalyze}
      />

      <Copilot products={products} />

    </div>
  );
}