export default function InventoryInsights({ products }) {

  const lowStock = products.filter(
    (item) => item.quantity <= 10
  );

  const expensive = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 1);

  const highestStock = [...products]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 1);

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8 border border-slate-800">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Inventory Insights
      </h2>

      {lowStock.length > 0 ? (
        <div className="mb-4">
          ⚠️ <span className="font-semibold">
            {lowStock[0].name}
          </span>{" "}
          stock is low. Restock soon.
        </div>
      ) : (
        <div className="mb-4 text-green-400">
          ✅ No low-stock items.
        </div>
      )}

      {expensive.length > 0 && (
        <div className="mb-4">
          💰 Highest priced product:
          <span className="font-semibold">
            {" "}
            {expensive[0].name}
          </span>
        </div>
      )}

      {highestStock.length > 0 && (
        <div>
          📦 Highest inventory:
          <span className="font-semibold">
            {" "}
            {highestStock[0].name}
          </span>
        </div>
      )}

    </div>
  );
}