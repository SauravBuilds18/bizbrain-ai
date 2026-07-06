import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-28 bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500">

      <div className="max-w-5xl mx-auto px-8 text-center">

        <h2 className="text-6xl font-black leading-tight">

          Ready to Transform

          <br />

          Your Business?

        </h2>

        <p className="text-2xl text-blue-100 mt-8 leading-10">

          Join thousands of businesses using AI to manage inventory,
          generate invoices and make smarter business decisions.

        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">

          <Link
            to="/register"
            className="bg-white text-blue-700 hover:bg-slate-100 px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 transition"
          >

            Get Started

            <ArrowRight size={22} />

          </Link>

          <Link
            to="/login"
            className="border-2 border-white hover:bg-white hover:text-blue-700 px-10 py-5 rounded-2xl font-bold text-xl transition"
          >

            Login

          </Link>

        </div>

      </div>

    </section>
  );
}