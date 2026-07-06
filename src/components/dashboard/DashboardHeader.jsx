import { CalendarDays, Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          👋 Welcome Back
        </h1>

        <p className="text-slate-400 mt-2">
          Smarter Decisions. Better Business.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">

          <Search size={18} />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none w-48"
          />

        </div>

        <Bell className="text-blue-400 cursor-pointer" />

        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-2">

          <CalendarDays size={18} />

          <span>
            {today.toLocaleDateString()}
          </span>

        </div>

      </div>

    </div>
  );
}