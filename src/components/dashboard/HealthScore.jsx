import { useInvoices } from "../../context/InvoiceContext";
import { getBusinessHealth } from "../../utils/businessMetrics";

export default function HealthScore({ products }) {

  const { invoices } = useInvoices();

  const { score, status, color } = getBusinessHealth(
    products,
    invoices
  );

  const lowStock = products.filter(
    (p) =>
      p.quantity > 0 &&
      p.quantity <= (p.reorderLevel || 10)
  ).length;

  const outOfStock = products.filter(
    (p) => p.quantity === 0
  ).length;

  return (

    <div className="bg-slate-900 rounded-2xl p-6 mt-8 border border-slate-800">

      <h2 className="text-2xl font-bold mb-8">
        💚 Inventory Health
      </h2>

      <div className="flex flex-col items-center">

        <div
          className={`w-48 h-48 rounded-full border-[8px] flex flex-col justify-center items-center
          ${
            score >= 90
              ? "border-green-500"
              : score >= 75
              ? "border-blue-500"
              : score >= 50
              ? "border-yellow-500"
              : "border-red-500"
          }`}
        >

          <h1 className="text-6xl font-bold">
            {score}
          </h1>

          <p className={`${color} mt-2 text-xl font-bold`}>
            {status}
          </p>

        </div>

        <div className="mt-8 w-full space-y-3">

          <div className="flex justify-between">
            <span>📦 Total Products</span>
            <span>{products.length}</span>
          </div>

          <div className="flex justify-between">
            <span>⚠ Low Stock</span>
            <span>{lowStock}</span>
          </div>

          <div className="flex justify-between">
            <span>❌ Out of Stock</span>
            <span>{outOfStock}</span>
          </div>

          <div className="flex justify-between">
            <span>🟢 Inventory Status</span>
            <span className={color}>
              {status}
            </span>
          </div>

        </div>

      </div>

    </div>

  );

}