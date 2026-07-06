import {
  Bot,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import {
  getBusinessHealth,
  getRiskLevel,
  getHighestProduct,
  getLowStock,
} from "../../utils/businessMetrics";

export default function Copilot({ products }) {

  const health = getBusinessHealth(products);

  const risk = getRiskLevel(products);

  const best = getHighestProduct(products);

  const lowStock = getLowStock(products);

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

      <div className="flex items-center gap-3 mb-6">

        <Bot className="text-blue-400" />

        <h2 className="text-2xl font-bold">
          BizBrain Copilot
        </h2>

      </div>

      <div className="space-y-5">

        <div className="flex gap-3">

          <ShieldCheck className="text-green-400"/>

          <div>

            <p className="font-semibold">
              Business Health
            </p>

            <p>
              {health.score}/100 ({health.status})
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <TrendingUp className="text-yellow-400"/>

          <div>

            <p className="font-semibold">
              Highest Value Product
            </p>

            <p>
              {best?.name || "None"}
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <AlertTriangle className="text-red-400"/>

          <div>

            <p className="font-semibold">
              Risk Level
            </p>

            <p>
              {risk}
            </p>

          </div>

        </div>

        {lowStock.length > 0 && (

          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500">

            <h3 className="font-bold mb-2">

              AI Alert

            </h3>

            <p>

              {lowStock[0].name} is running low.

            </p>

            <p>

              Recommended reorder:

              {30 - lowStock[0].quantity} units

            </p>

          </div>

        )}

      </div>

    </div>

  );

}