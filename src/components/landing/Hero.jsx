import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BarChart3,
  Package,
  FileText,
  CalendarDays,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-40 pb-28">

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <div>

          <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700 rounded-full px-5 py-2 mb-8">

            <Bot size={18} />

            AI Powered Business Operating System

          </div>

          <h1 className="text-6xl font-black leading-tight">

            Manage Your

            <span className="text-blue-500">

              {" "}Business{" "}

            </span>

            Smarter with AI

          </h1>

          <p className="text-slate-300 text-xl mt-8 leading-9">

            Inventory Management,

            Smart Invoices,

            AI CEO Dashboard,

            Business Analytics

            and Reports—

            all in one intelligent platform.

          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl flex items-center gap-3 font-semibold"
            >
              Get Started

              <ArrowRight size={20} />

            </Link>

            <Link
              to="/login"
              className="border border-slate-700 hover:border-blue-500 px-8 py-4 rounded-xl"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-8">

              📊 Live Business Overview

            </h2>

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-slate-800 rounded-2xl p-6">

                <BarChart3 className="text-green-400 mb-3" />

                <p className="text-slate-400">

                  Revenue

                </p>

                <h2 className="text-3xl font-bold">

                  ₹2.4L

                </h2>

              </div>

              <div className="bg-slate-800 rounded-2xl p-6">

                <Package className="text-blue-400 mb-3" />

                <p className="text-slate-400">

                  Inventory

                </p>

                <h2 className="text-3xl font-bold">

                  352

                </h2>

              </div>

              <div className="bg-slate-800 rounded-2xl p-6">

                <FileText className="text-yellow-400 mb-3" />

                <p className="text-slate-400">

                  Invoices

                </p>

                <h2 className="text-3xl font-bold">

                  124

                </h2>

              </div>

              <div className="bg-slate-800 rounded-2xl p-6">

                <CalendarDays className="text-pink-400 mb-3" />

                <p className="text-slate-400">

                  AI Health

                </p>

                <h2 className="text-3xl font-bold text-green-400">

                  96%

                </h2>

              </div>

            </div>

            <div className="mt-8 bg-slate-800 rounded-2xl p-5">

              <p className="text-blue-400 font-semibold">

                🤖 BizBrain AI CEO

              </p>

              <p className="mt-4 text-slate-300">

                Revenue increased by

                <span className="text-green-400">

                  {" "}18%

                </span>

                this month.

              </p>

              <p className="text-slate-300 mt-2">

                Two products require restocking.

              </p>

              <p className="text-slate-300 mt-2">

                Profit margin can improve by

                <span className="text-green-400">

                  {" "}12%

                </span>

                using AI recommendations.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}