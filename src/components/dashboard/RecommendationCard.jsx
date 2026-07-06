import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Package,
  IndianRupee,
} from "lucide-react";

export default function RecommendationCard({ products }) {
  const recommendations = [];

  const lowStock = products.filter((p) => p.quantity < 10);

  const highStock = products.filter((p) => p.quantity > 50);

  const categories = [...new Set(products.map((p) => p.category))];

  const inventoryValue = products.reduce(
    (sum, item) => sum + item.costprice * item.quantity,
    0
  );

  // Low Stock
  lowStock.forEach((item) => {
    recommendations.push({
      icon: AlertTriangle,
      color: "text-red-400",
      text: `Restock ${item.name} (${item.quantity} left)`,
    });
  });

  // High Stock
  highStock.forEach((item) => {
    recommendations.push({
      icon: TrendingUp,
      color: "text-yellow-400",
      text: `${item.name} has high stock (${item.quantity})`,
    });
  });

  // Category Suggestion
  if (categories.length < 5) {
    recommendations.push({
      icon: Package,
      color: "text-blue-400",
      text: "Expand your product categories.",
    });
  }

  // Inventory Value
  if (inventoryValue > 50000) {
    recommendations.push({
      icon: IndianRupee,
      color: "text-green-400",
      text: "Inventory value is high. Improve stock turnover.",
    });
  }

  // Healthy Inventory
  if (recommendations.length === 0) {
    recommendations.push({
      icon: CheckCircle,
      color: "text-green-400",
      text: "Inventory looks healthy.",
    });
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8 border border-slate-800">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Recommendations
      </h2>

      <div className="space-y-4">

        {recommendations.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <Icon
                className={item.color}
                size={22}
              />

              <span>{item.text}</span>
            </div>
          );
        })}

      </div>

    </div>
  );
}