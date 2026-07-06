export default function HowItWorks() {
  return (
    <section className="py-28 bg-slate-950">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <h2 className="text-5xl font-black">

            How

            <span className="text-blue-500">
              {" "}BizBrain AI{" "}
            </span>

            Works

          </h2>

          <p className="text-slate-400 text-xl mt-6">

            Four simple steps to manage your business smarter.

          </p>

        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-blue-500 transition">

            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">

              📦

            </div>

            <h3 className="text-2xl font-bold text-center mb-4">

              Add Products

            </h3>

            <p className="text-slate-400 text-center leading-8">

              Store products with stock,
              supplier, cost price,
              expiry or warranty.

            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-green-500 transition">

            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">

              🧾

            </div>

            <h3 className="text-2xl font-bold text-center mb-4">

              Generate Invoice

            </h3>

            <p className="text-slate-400 text-center leading-8">

              Create invoices instantly.
              Inventory updates automatically.

            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-purple-500 transition">

            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">

              🤖

            </div>

            <h3 className="text-2xl font-bold text-center mb-4">

              AI Analysis

            </h3>

            <p className="text-slate-400 text-center leading-8">

              BizBrain AI analyzes
              profit, revenue,
              inventory and risks.

            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-yellow-500 transition">

            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">

              📈

            </div>

            <h3 className="text-2xl font-bold text-center mb-4">

              Grow Business

            </h3>

            <p className="text-slate-400 text-center leading-8">

              Improve decisions
              using AI insights
              and analytics.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}