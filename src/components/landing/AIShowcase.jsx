import { Bot, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";

export default function AIShowcase() {
  return (
    <section className="py-28 bg-slate-950">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <h2 className="text-5xl font-black">

            Meet Your

            <span className="text-blue-500">

              {" "}AI Business CEO

            </span>

          </h2>

          <p className="text-slate-400 text-xl mt-6 max-w-3xl mx-auto">

            Ask questions about your business and receive
            intelligent recommendations powered by Google Gemini AI.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Chat */}

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

            <div className="flex items-center gap-3 mb-8">

              <Bot className="text-blue-500" size={34}/>

              <h3 className="text-2xl font-bold">

                BizBrain AI CEO

              </h3>

            </div>

            <div className="space-y-5">

              {/* User */}

              <div className="flex justify-end">

                <div className="bg-blue-600 rounded-2xl px-6 py-4 max-w-sm">

                  Which product gives me the highest profit?

                </div>

              </div>

              {/* AI */}

              <div className="flex">

                <div className="bg-slate-800 rounded-2xl px-6 py-5 max-w-md">

                  📈 Samsung Galaxy A36 generates the highest
                  profit margin.

                  <br /><br />

                  Estimated Profit:
                  <span className="text-green-400 font-bold">

                    {" "}₹4,500

                  </span>

                </div>

              </div>

              {/* User */}

              <div className="flex justify-end">

                <div className="bg-blue-600 rounded-2xl px-6 py-4 max-w-sm">

                  Which product should I restock?

                </div>

              </div>

              {/* AI */}

              <div className="flex">

                <div className="bg-slate-800 rounded-2xl px-6 py-5 max-w-md">

                  ⚠ Bluetooth Earbuds are running low.

                  <br /><br />

                  Recommended Restock:
                  <span className="text-yellow-400 font-bold">

                    {" "}20 Units

                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Features */}

          <div className="space-y-6">

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

              <div className="flex gap-4">

                <Sparkles className="text-blue-500"/>

                <div>

                  <h3 className="font-bold text-xl">

                    Smart Recommendations

                  </h3>

                  <p className="text-slate-400 mt-2">

                    AI suggests pricing improvements,
                    stock planning and profit optimization.

                  </p>

                </div>

              </div>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

              <div className="flex gap-4">

                <TrendingUp className="text-green-500"/>

                <div>

                  <h3 className="font-bold text-xl">

                    Growth Analysis

                  </h3>

                  <p className="text-slate-400 mt-2">

                    Detect trends and increase revenue
                    with data-driven insights.

                  </p>

                </div>

              </div>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

              <div className="flex gap-4">

                <AlertTriangle className="text-red-500"/>

                <div>

                  <h3 className="font-bold text-xl">

                    Risk Alerts

                  </h3>

                  <p className="text-slate-400 mt-2">

                    Get alerts about low stock,
                    losses and business risks before
                    they become serious.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}