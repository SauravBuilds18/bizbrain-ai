import BusinessInsights from "./BusinessInsights";
import RecommendationCard from "./RecommendationCard";
import HealthScore from "./HealthScore";

export default function DashboardInsights({ products }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

      <BusinessInsights products={products} />

      <RecommendationCard products={products} />

      <HealthScore products={products} />

    </div>
  );
}