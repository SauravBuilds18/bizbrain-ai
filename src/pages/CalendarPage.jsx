import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function CalendarPage() {

  const user = JSON.parse(
    localStorage.getItem("bizbrain_user")
  );

  const historyKey = user
    ? `bizbrain_history_${user.email}`
    : "bizbrain_history_guest";

  const history = JSON.parse(
    localStorage.getItem(historyKey) || "[]"
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  const normalizeDate = (date) => {
    const d = new Date(date);

    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  };

  const selected = normalizeDate(selectedDate);

  const events = history.filter(
    (item) => normalizeDate(item.date) === selected
  );

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="max-w-7xl mx-auto p-8">

          <h1 className="text-4xl font-bold">
            Business Calendar
          </h1>

          <p className="text-gray-400 mt-2 mb-8">
            View your business activity by date.
          </p>

          {/* AI Tip */}

          <div className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,.35)]">

            <h2 className="text-2xl font-bold">
              🤖 AI Tip of the Day
            </h2>

            <p className="mt-3 text-blue-100">
              Keep your inventory updated every day.
              Products approaching the reorder level
              should be restocked before demand increases.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Calendar */}

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-[0_0_40px_rgba(59,130,246,0.25)]">

              <div className="calendar-wrapper">

                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileContent={({ date }) => {

                    const current = normalizeDate(date);

                    const hasInvoice = history.some(
                      (e) =>
                        normalizeDate(e.date) === current &&
                        e.type === "invoice"
                    );

                    const hasLowStock = history.some(
                      (e) =>
                        normalizeDate(e.date) === current &&
                        e.type === "lowStock"
                    );

                    const hasExpiry = history.some(
                      (e) =>
                        normalizeDate(e.date) === current &&
                        e.type === "expiry"
                    );

                    const hasAI = history.some(
                      (e) =>
                        normalizeDate(e.date) === current &&
                        e.type === "ai"
                    );

                    return (
                      <div className="flex justify-center gap-1 mt-1">

                        {hasInvoice && (
                          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                        )}

                        {hasLowStock && (
                          <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red]" />
                        )}

                        {hasExpiry && (
                          <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_yellow]" />
                        )}

                        {hasAI && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                        )}

                      </div>
                    );
                  }}
                />

              </div>

              {/* Legend */}

              <div className="flex flex-wrap gap-5 justify-center mt-8 text-sm">

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-green-400"></div>

                  Invoice

                </div>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-red-500"></div>

                  Low Stock

                </div>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>

                  Expiry

                </div>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>

                  AI Insight

                </div>

              </div>

            </div>

            {/* Events */}

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">

              <h2 className="text-2xl font-bold mb-6">

                {selectedDate.toDateString()}

              </h2>

              {events.length === 0 ? (

                <p className="text-gray-400">
                  No business activity.
                </p>

              ) : (

                events.map((event) => (

                  <div
                    key={event.id}
                    className="bg-slate-800 rounded-2xl p-5 mb-5 border border-slate-700 hover:border-blue-500 transition"
                  >

                    <h3 className="font-bold text-lg">

                      {event.title}

                    </h3>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs mt-3
                      ${
                        event.type === "invoice"
                          ? "bg-green-500/20 text-green-400"
                          : event.type === "lowStock"
                          ? "bg-red-500/20 text-red-400"
                          : event.type === "expiry"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >

                      {event.type || "Activity"}

                    </span>

                    <p className="text-gray-400 mt-4">

                      {event.description}

                    </p>

                    <div className="flex justify-between mt-5">

                      <span>

                        {event.time}

                      </span>

                      <span className="text-green-400">

                        ₹{event.amount}

                      </span>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}