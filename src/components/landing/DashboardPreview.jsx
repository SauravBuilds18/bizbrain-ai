import { BarChart3, Package, TrendingUp, Bot } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="py-28 bg-slate-900">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <h2 className="text-5xl font-black">

            Powerful Dashboard

          </h2>

          <p className="text-slate-400 text-xl mt-6">

            Everything you need to monitor your business in one place.

          </p>

        </div>

        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-10 shadow-2xl">

          {/* Top Cards */}

          <div className="grid lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-slate-900 rounded-2xl p-6">

              <TrendingUp className="text-green-400 mb-4"/>

              <p className="text-slate-400">

                Revenue

              </p>

              <h2 className="text-3xl font-black mt-2">

                ₹2,45,000

              </h2>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6">

              <BarChart3 className="text-blue-400 mb-4"/>

              <p className="text-slate-400">

                Profit

              </p>

              <h2 className="text-3xl font-black mt-2 text-green-400">

                ₹56,200

              </h2>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6">

              <Package className="text-yellow-400 mb-4"/>

              <p className="text-slate-400">

                Products

              </p>

              <h2 className="text-3xl font-black mt-2">

                352

              </h2>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6">

              <Bot className="text-cyan-400 mb-4"/>

              <p className="text-slate-400">

                Business Health

              </p>

              <h2 className="text-3xl font-black mt-2 text-green-400">

                96%

              </h2>

            </div>

          </div>

          {/* AI Box */}

          <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 rounded-2xl p-8">

            <h3 className="text-3xl font-bold mb-6">

              🤖 BizBrain AI CEO

            </h3>

            <div className="space-y-4 text-lg">

              <p>

                ✔ Revenue increased by 18% this month.

              </p>

              <p>

                ✔ Restock Samsung Galaxy A36 within 3 days.

              </p>

              <p>

                ✔ Increase Paracetamol selling price by ₹3.

              </p>

              <p>

                ✔ Estimated monthly profit can improve by 12%.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}